
// Make sure the DOM is fully loaded before we load the functions for the buttons
$(function () {


    $(".save-job").on("click", function(event) {
        event.preventDefault();
        
        
        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);

        var jobData = grabJobDetails(button);

        $.post("/api/savejob", jobData)
        	.then(function(data) {
                
                if (data === "Success" || data === "Duplicate") {

                    if (data === "Duplicate") {
                        alert("This job is already saved");
                    }
                    
                    button.hide();
                }
                else {
                    alert("Error saving job details.  Please try again.");
                }

        }); // end post route for /api/savejob
        
    }); // end on click method for save job buttons


    $(".delete-job").on("click", function(event) {
        event.preventDefault();
        
        // grab id from delete button to update database
        var id = $(this).attr("id");
        
        $.ajax({
            method: "DELETE",
            url: "/api/jobs/" + id
          }).then( function(data) {

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
        
        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);
        var id = button.attr("id").split("-");

        toggleNoteView(id[0], button, true);

    }); // end on click method for add note buttons

    $(".show-comments").on("click", function(event) {
        event.preventDefault();
        
        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);
        var id = button.attr("data-show-id");

        toggleCommentsView(id, button);

    }); // end on click method for add note buttons

    $(".note-delete").on("click", function(event) {
        event.preventDefault();
        
        // saving the button element in a variable
        // to allow access in the post.then method below
        var button = $(this);
        var id = button.attr("id");

        $.ajax({
            method: "DELETE",
            url: "/api/deletenote/" + id
          }).then( function(data) {

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
        
        var button = $(this);
        var id = button.attr("data-id");

        var noteData = {
            id: id,
            note: $("#" + id + "-note").val(),
            name: $("#" + id + "-name").val().trim(),
        }

        $.post("/addnote/", noteData)
          .then(function(data) {
 
            noteData.noteID = data._id;
            noteData.createDate = data.createDate;

        }); // end post route for /addnote


        // clear out input fields
        $("#" + id + "-note").val("");
        $("#" + id + "-name").val("");

        var button = $("#" + id + "-add-btn");
        
        toggleNoteView(id, button, true);

        location.reload();

    }); // end on click for add-job-note


});  // end of document on ready function call



function grabJobDetails(button) {

    var htmlJobDetails = button.siblings();

    var title = htmlJobDetails.children().children(".job-title").text();
    var link = htmlJobDetails.children().children(".job-title").attr("href");
    var summary = button.siblings().children(".job-summary").text();
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

function addNewNotetoView(noteInfo, addArea) {

    var noteElement = `
    <div class="level less-padding">
        <div class="level-left">
          <div class="level-item">
            <p>
              ${noteInfo.note}
              <br>
              <span class="note-name">${noteInfo.name}</span><span class="note-date has-text-grey-light is-size-7">${noteInfo.createDate}</span>
            </p>
          </div>
        </div>
        <div class="level-right">
          <button id=${noteInfo.noteID} class="delete note-delete"></button>
        </div>
      </div>`
    
    addArea.prepend(noteElement);
    
};