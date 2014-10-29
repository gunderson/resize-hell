var fs = require("fs");
var _ = require("underscore");
var uglify = require("uglifyjs");

var input = fs.readFileSync("src/resize-hell.js", "utf-8");
var output = uglify.minify(input, {fromString: true}).code;

fs.writeFileSync("build/bookmarklet.min.js", output);

outputClickable = output.split('"').join('&quot;');

var outputClickable = "javascript:" + outputClickable + ";";

fs.writeFileSync("build/bookmarklet.min.clickable.js", outputClickable);

var clickableTestTemplate = fs.readFileSync("src/clickableTestTemplate.html", "utf-8");
clickableTestTemplate = _.template(clickableTestTemplate)({bookmarklet: outputClickable});

fs.writeFileSync("test/clickable.html", clickableTestTemplate);
