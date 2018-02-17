var request = require("request");
var mongojs = require("mongojs");
var cheerio = require("cheerio");


// Require all models
var db = require("../models");

module.exports = function(app) {
    
  // A GET route for scraping the echojs website
  app.get("/scrape", function(req, res) {

    // sites that will be used for the scrape data
    var jobSiteURLs = [{
        name: "Indeed.com",
        home: "https://www.indeed.com",
        jobs: "https://www.indeed.com/jobs?",
    }]

    // grab data from user entry for search info
    if (req.query.keyword === '') {

        var keyword = "junior developer";
    }
    else {

        var keyword = req.query.keyword;
    }

    if (req.query.location === '') {

        var city = "wake forest, nc";
    }
    else {

        var city = req.query.location
    }

    // format user entries
    keyword = keyword.split(" ").join("+");
    city = city.split(" ").join("+");
    city = city.split(",").join("%20");
    
    // setup URL query for each site ... ES6 format
    jobSiteURLs.forEach(element => {

        // indeed site link should look like this https://www.indeed.com/jobs?q=junior+developer&l=Wake+Forest%2C+NC
        element.jobs = `${element.jobs}q=${keyword}&l=${city}`;
        
    });

    // Make a request call to grab the HTML body from the site of your choice
    // this request only works for the indeed.com jobs pull (based on how the site is setup to display the information)
    request(jobSiteURLs[0].jobs, function(error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
    
        // An empty array to save the data that we'll scrape
        var results = [];
        
        // Select each element in the HTML body from which you want information.
        $(".result").each( function(i, element) {
    
            var jobTitle = $(element).find(".jobtitle").attr("title");
            var jobLink = $(element).find(".jobtitle").attr("href");
            
            // if jobtitle not in title element look here then
            if (jobTitle === undefined) {
                jobTitle = $(element).find(".jobtitle").find("a").text();
                jobLink = $(element).find(".jobtitle").find("a").attr("href");
            }
            
            var jobCompany = $(element).find(".company").find("a").text();
            var jobCompanyLink = jobSiteURLs[0].home + $(element).find(".company").find("a").attr("href");
            
            if (jobCompany === undefined || jobCompany === "") {
                jobCompany = $(element).find(".company").text();
                jobCompanyLink = "#";
            }
            
            var jobLocation = $(element).find(".location").text();
            var jobSummary = $(element).find(".summary").text();
            
            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: jobTitle,
                link: jobSiteURLs[0].home + jobLink,
                summary: jobSummary,
                company: jobCompany,
                companyLink: jobCompanyLink,
                location: jobLocation
            });
    
        }); // end each loop

        // put the results array into the jobs object w/ the job site name added
        var jobs = {
            sites: jobSiteURLs,
            jobs: results
        }
        // show handlebars file jobs w/ the job data being sent to the client side
        res.render("jobs", jobs);
    
        
    }); // end request method

  }); // end of app get /scrape route


  // Route for posting a new job to the db
  app.post("/api/savejob", function(req, res) {

    // Save the data from the client to an object
    jobInfo = {
        title: req.body.title,
        link: req.body.link,
        summary: req.body.summary,
        company: req.body.company,
        companyLink: req.body.companyLink,
        location: req.body.location
    };

    db.Job.find({
        title: jobInfo.title,
        link: jobInfo.link,
        summary: jobInfo.summary,
        company: jobInfo.company,
        companyLink: jobInfo.companyLink,
        location: jobInfo.location
    })
    .then(function(results) {
      
        // If we were able to successfully find a matching job then do not add it to the db
        if (results.length !== 0) {
            // send response to client that job data already in db
            return res.send("Duplicate");
        }
        else {

            console.log("no duplicate found in db ... trying to create it now")
            // Create a new Job posting in the db using the `jobInfo` object built from the client request
            db.Job.create(jobInfo)
            .then(function(dbJobs) {
                // send a response back to the client to complete the post method
                return res.send("Success");

            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                return res.json(err);
            }); // end create job document in db
        }
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });

  }); // end post route for /api/savejob

  
  // Route for getting all the jobs from the db
  app.get("/api/savedjobs", function(req, res) {

    // grab all jobs in the job collection
    db.Job.find({})
    .populate("notes")
    .then( function (allJobs) {

        console.log("find query completed");
        console.log(allJobs);

        var jobs = {
            savedJobs: allJobs
        };

        // show handlebars file savedjobs w/ the job data being sent to the client side from the db query
        res.render("savedjobs", jobs);
    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        return res.json(err);
    }); // end find all jobs method

  });  // end get route for /api/savedjobs

  // Route for delete the specific job document from the db by id from client
  app.delete("/api/jobs/:id", function(req, res) {

    // grab all jobs in the job collection
    db.Job.findByIdAndRemove(req.params.id)
    .then( function (job) {

        var response = {
            message: "Success",
            id: job._id
        };

        return res.status(200).send(response);

    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        return res.json(err);
    }); // end find all jobs method

  });  // end get route for /api/savedjobs

  // Route for delete the specific job document from the db by id from client
  app.delete("/api/deletenote/:id", function(req, res) {

    // find the specific note and remove it
    db.Note.findByIdAndRemove(req.params.id)
    .then( function (note) {

        var response = {
            message: "Success",
            id: note._id
        };

        return res.status(200).send(response);

    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        return res.json(err);
    }); // end find and remove note method

  });  // end get route for /api/deletenote/:id"
  

  // add route loads note view w/ form to submit note info 
  app.get("api/addnote/:id", function(req, res) {

    // get id and other job info to pass to notes template
    var jobInfo = {
        id: req.params.id,
        link: req.body.link,
        title: req.body.title,
        summary: req.body.summary,
        company: req.body.company,
        companyLink: req.body.companyLink,
        location: req.body.location
    }
    
    res.render("notes", jobInfo);
  });

  app.post("/addnote", function(req, res) {

    var noteInfo = {
        body: req.body.note,
        name: req.body.name,
    };

    // Create a new Job posting in the db using the `jobInfo` object built from the client request
    db.Note.create(noteInfo)
    .then(function(dbNote) {
        
        db.Job.findByIdAndUpdate(req.body.id, {$push: {"notes": dbNote._id}}, function(err, result) {

                // send a response back to the client to complete the post method
                return res.send("find / update done");
        });

    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        return res.json(err);
    }); // end create job document in db

  });

};  // end of export module for api routes



      