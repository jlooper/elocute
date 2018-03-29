
var path = require("path");
var fs = require("fs");

module.exports = function() {

    var sourceGoogleJson = path.join(__dirname, "..", "..", "app", "App_Resources", "Android", "google-services.json");
    var destinationGoogleJson = path.join(__dirname, "..", "..", "platforms", "android", "google-services.json");
    if (fs.existsSync(sourceGoogleJson) && fs.existsSync(path.dirname(destinationGoogleJson))) {
        console.log("Copy " + sourceGoogleJson + " to " + destinationGoogleJson + ".");
        fs.writeFileSync(destinationGoogleJson, fs.readFileSync(sourceGoogleJson));
    }
};
