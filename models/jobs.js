var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var JobSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    trim: true,
    required: "Title is Required"
  },
  // `link` is required and of type String
  link: {
    type: String,
    trim: true,
    required: "Link is Required"
  },
  // `summary` job summary not required and type String
  summary: {
      type: String,
      trim: true,
  },
  //  `company` where the job posting is from
  company: {
      type: String,
      trim: true,
  },
  // `companyLink` link of the company's page from the job site
  companyLink: {
      type: String,
      trim: true,
  },
  // `location` where the job location is listed
  location: {
      type: String,
      trim: true,
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Job with an associated Note
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Job = mongoose.model("Job", JobSchema);

// Export the Article model
module.exports = Job;
