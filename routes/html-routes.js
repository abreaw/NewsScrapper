

// // Create routes and set up logic within those routes where required.
// app.get("/", function(req, res) {
//     cat.all(function(data) {
//       var hbsObject = {
//         cats: data
//       };
//       console.log(hbsObject);
//       res.render("index", hbsObject);
//     });
//   });


//   var path = require("path");


  // Routes
  module.exports = function(app) {
  
  
    // default route loads index w/ form to submit job search info into the template main page
    app.get("/", function(req, res) {

        res.render("index");
    });

    // // add route loads note view w/ form to submit note info 
    // app.put("/addnote/:id", function(req, res) {

    //     console.log(req.body);
    //     console.log(req.url);

        

    //     // get id and other job info to pass to notes template
    //     var jobInfo = {
    //         id: req.params.id,
    //         link: req.body.link,
    //         title: req.body.title,
    //         summary: req.body.summary,
    //         company: req.body.company,
    //         companyLink: req.body.companyLink,
    //         location: req.body.location
    //     }
        
    //     console.log("jobInfo in put /addnote/id route");
    //     console.log(jobInfo);

    //     res.render("notes", jobInfo);
    // });

    // scrape route loads the jobs view w/ the data from the server 
  
//   //   users are able to signup for app
//     app.get("/signup", function(req, res) {
//       res.sendFile(path.join(__dirname, "../public/signup.html"));
//     });
  
//     // users dashboard is loaded
//     app.get("/dashboard", function(req, res) {
//       res.sendFile(path.join(__dirname, "../public/dashboard.html"));
//     });
  
//   // user wants to attend a meetup
//     app.get("/singleEvent/:id?", function(req, res) {
//       res.sendFile(path.join(__dirname, "../public/singleEvent.html"));
//     });
  
  };