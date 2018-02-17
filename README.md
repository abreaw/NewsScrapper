# NewsScrapper
Web App that allows users to view and leave comments about jobs from a keyword and location search criteria that the user inputs.

## Screenshots

Home Page / Default Route
![Home Page / Default Route](https://github.com/abreaw/NewsScrapper/blob/master/docs/images/AddNoteView.JPG)

Search Jobs Page
![Search Jobs Page](https://github.com/abreaw/NewsScrapper/blob/master/docs/images/SearchedJobsView-IndeedSiteResults.JPG)

Saved Jobs Page
![Saved Jobs Page](https://github.com/abreaw/NewsScrapper/blob/master/docs/images/SearchedJobsView-IndeedSiteResults.JPG)

Add a Note to a Job
![Add a Note View](https://github.com/abreaw/NewsScrapper/blob/master/docs/images/AddNoteView.JPG)

See Comments / Notes
![Notes - Comments View](https://github.com/abreaw/NewsScrapper/blob/master/docs/images/ShowCommentsView.JPG)

## Tech/frameworks used
<b>Built with</b>
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Handlebars](http://handlebarsjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongojs](https://www.npmjs.com/package/mongojs)
- [Mongoose](http://mongoosejs.com/)
- [Cheerio](https://cheerio.js.org/)
- [Bulma](https://bulma.io/)

## Features
Allows a user to enter search keyword and a location.  The application then goes and grabs the current data from Indeed.com and displays it back to the user.  The user is then able to make notes on any saved jobs in the database.

## Installation (Run Locally)

1. You will need to pull down the available code from the github repo.
1. In your local folder run `npm install` to download the required NPM modules.
1. You will also need to install mongodb.  Once that is installed you will need to run `mongod` in a separate terminal / git bash window.
1. Install node.js to be able to run the application locally.
1. Open a new terminal / git bash window and navigate to the main folder where you pulled down the code from github.
    1. Type `node server.js`.
    1. Open a browser window and type `localhost:3000` into the URL bar and the home page for the app will load.

## Instructions on How to use the App
The NewsScrapper app can be used to search for jobs with keyword and location input.

1. At the home page the user can type in their choice of keywords in the **"Keyword"** input box.  The user should then type in a location in the **""Location"** input box.  Once the information is filled in the user should click on the  **"Get Jobs"** button under the location input field on the home page.
1. Once the available jobs are returned the user will have a list of jobs that can be saved by clicking on the **"Keep"** button below the specific job they would like to save.
    1. The job is then saved and the **"Keep"** button will disappear.  The user can go through and save any of the jobs that were returned from their search.
    1. If the job has already been saved, an alert will come up letting the user know and the **"Keep"** button will still disappear.
1. The user can then navigate to see their saved job postings by clicking on the **"View Saved Jobs"** button in the top part of the page.
1. Once the user clicks to go to the saved jobs page, the list of jobs that have been saved to the database will be displayed.
1. From here, the user can see comments that have been made for that specific job by clicking on the **"Show Comments"** button under the job details for that listing.
    1. If the user wants to delete a comment they can click on the **"X"** button that corresponds with the comment and it will be deleted from the database.
    1. To collapse the comments view for that job the user should click on the **"Hide Comments"** button and the comments area for that job will be hidden again.
    1. If there is no **"Show Comments"** button for the job, that means there have been no comments / notes left for that job yet.
1. The user can also add a comment / note to the specific job by clicking on the **"Add Note"** button.
    1. The user will enter the note information into the **"text area"** field that is displayed below the job.
    1. The user will also need to enter their name into the **"Name:"** field that is displayed in the form view.
    1. Once the user completes the note information, they should click on the **"Add Note"** button below the input fields for that job to save the note they have created for that job to the database.
    1. The user will then be able to click on the **"Show Comments"** button to see the note they just added and any others that are available.
1. The user can also delete any of the jobs that are shown on the page by clicking the **"Delete"** button that corresponds to the job they would no longer like to see.  This will delete the job details from the database as well as all the notes associated with the job.

You can also access this app hosted on Heroku 
[https://quiet-badlands-57786.herokuapp.com/](https://quiet-badlands-57786.herokuapp.com/)


