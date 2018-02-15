
// Make sure the DOM is fully loaded before we load the functions for the buttons
$(function () {


    $(".save-job").on("click", function(event) {
        event.preventDefault();
        
        console.log("click for save job recognized");
        
        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);

        var jobData = grabJobDetails(button);

        console.log(jobData);

        $.post("/api/savejob", jobData)
        	.then(function(data) {
                
                console.log("post /api/savejob route completed on server side");
        		console.log(data);
                
                if (data === "Success" || data === "Duplicate") {

                    if (data === "Duplicate") {
                        console.log("duplicate job ... already in db");
                        alert("This job is already saved");
                    }
                    
                    console.log("hiding the button now");
                    button.hide();
                }
                else {
                    alert("Error saving job details.  Please try again.");
                }

        }); // end post route for /api/savejob
        
    }); // end on click method for save job buttons


    $(".delete-job").on("click", function(event) {
        event.preventDefault();
        
        console.log("click for delete job recognized");
        
        // grab id from delete button to update database
        var id = $(this).attr("id");
        console.log(`id = ${id}`);

        $.ajax({
            method: "DELETE",
            url: "/api/jobs/" + id
          }).then( function(data) {

            console.log("data from server");
            console.log(data);

            // check data back from the server
            if (data.message === "Success") {
                location.reload();
            }
            else {
                alert("Error deleting job. Please try again");
            }
        }); // end delete job ajax request

    }); // end on click method for delete job buttons


    $(".add-note").on("click", function(event) {
        event.preventDefault();
        
        console.log("click for add note recognized");

        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);
        var id = button.attr("id").split("-");

        toggleNoteView(id[0], button, true);

    }); // end on click method for add note buttons

    $(".show-comments").on("click", function(event) {
        event.preventDefault();
        
        console.log("click for show comments recognized");

        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);
        var id = button.attr("data-show-id");

        console.log(`id = ${id}`);

        toggleCommentsView(id, button);

    }); // end on click method for add note buttons

    $(".note-delete").on("click", function(event) {
        event.preventDefault();
        
        console.log("click for delete comment recognized");

        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);
        var id = button.attr("id");

        console.log(`id = ${id}`);

        $.ajax({
            method: "DELETE",
            url: "/api/deletenote/" + id
          }).then( function(data) {

            console.log("data from server");
            console.log(data);

            // check data back from the server
            if (data.message === "Success") {
                location.reload();
            }
            else {
                alert("Error deleting note. Please try again");
            }
        }); // end delete job ajax request

    }); // end on click method for add note buttons


    // on click method for add-job-note details button
    $(".add-job-note").on("click", function(event) {
        event.preventDefault();
        
        console.log("click for add note to db recognized");
        
        var button = $(this);
        var id = button.attr("data-id");
        console.log(id);

        var noteData = {
            id: id,
            note: $("#" + id + "-note").val(),
            name: $("#" + id + "-name").val().trim(),
        }

        console.log("data being sent to server side w/ route");
        

        $.post("/addnote/", noteData)
          .then(function(data) {
 
            console.log("did this work?");
    
            console.log(data);
        }); // end post route for /addnote


        // clear out input fields
        $("#" + id + "-note").val("");
        $("#" + id + "-name").val("");

        // trigger click event to collapse or expand note section?
        // $(".add-note").trigger("click"); // doesn't work ... triggers all sections to collapse / expand on the page

        var button = $("#" + id + "-add-btn");
        console.log("this is the current text on the button");
        console.log(button.text());

        toggleNoteView(id, button, true);

    }); // end on click for add-job-note


});  // end of document on ready function call



function grabJobDetails(button) {

    var htmlJobDetails = button.siblings();

    console.log(htmlJobDetails);

    var title = htmlJobDetails.children().children(".job-title").text();
    var link = htmlJobDetails.children().children(".job-title").attr("href");
    var summary = button.siblings(".job-summary").text();
    var company = htmlJobDetails.children(".job-company").text();
    var companyLink = htmlJobDetails.children(".job-company").attr("href");
    var location = htmlJobDetails.children(".job-location").text();

    // create JSON object to send to the db for post
    var jobData = { 
        title: title,
        link: link,
        summary: summary,
        company: company,
        companyLink: companyLink,
        location: location
    };

    return jobData;

};

function toggleCommentsView(id, button) {

    // grab the section / div for the note button that was clicked
    var commentsDiv = $("#"+id+"-comment-div");

    // check if Note Section collapsed or expanded
    if (commentsDiv.attr("data-tag") === "collapsed") {

        // change to expanded
        commentsDiv.attr("data-tag", "expanded");
        // change height to 100% and add padding
        commentsDiv.css("height", "100%");
        // commentsDiv.css("padding", "20px");
        // change div to visible
        commentsDiv.removeClass("is-invisible");

        console.log(`button text = ${button.text()}`);
        
        // if (changeButtonText) {
            if (button.text() === "Show Comments") {
                // change button to close section
                button.html('Hide Comments<span class="carat-icon fas fa-angle-up"></span>');
            }
        // }
    }
    else {
        // change to collapsed
        commentsDiv.attr("data-tag", "collapsed");
        // change height to 0px and remove padding
        commentsDiv.css("height", "0px");
        // commentsDiv.css("padding", "10px 0px");
        // change div to visible
        commentsDiv.addClass("is-invisible");
        // if (changeButtonText) {
            if (button.text() === "Hide Comments") {
                // change button to open section
                button.html('Show Comments<span class="carat-icon fas fa-angle-down"></span>');
            }
        // }
    }

};


function toggleNoteView(id, button, changeButtonText) {

    // grab the section / div for the note button that was clicked
    var noteFormSection = $("#"+id+"-section");
    var noteFormDiv = $("#"+id+"-div");

    // check if Note Section collapsed or expanded
    if (noteFormSection.attr("data-tag") === "collapsed") {

        // change to expanded
        noteFormSection.attr("data-tag", "expanded");
        // change height to 100% and add padding
        noteFormSection.css("height", "100%");
        noteFormSection.css("padding-top", "20px");
        // change div to visible
        noteFormDiv.removeClass("is-invisible");
        
        if (changeButtonText) {
            if (button.text() === "Add Note") {
                // change text on button to close section
                button.text("Close Note Section");
            }
        }
    }
    else {
        // change to collapsed
        noteFormSection.attr("data-tag", "collapsed");
        // change height to 0px and remove padding
        noteFormSection.css("height", "0px");
        noteFormSection.css("padding-top", "0px");
        // change div to visible
        noteFormDiv.addClass("is-invisible");
        if (changeButtonText) {
            if (button.text() === "Close Note Section") {
                // change text on button to Add Note
                button.text("Add Note");
            }
        }
    }

};