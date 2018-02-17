

  // Routes
  module.exports = function(app) {
  
  
    // default route loads index w/ form to submit job search info into the template main page
    app.get("/", function(req, res) {

        res.render("index");
    });
  
  };