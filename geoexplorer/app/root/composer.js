var {Application} = require("stick");

var app = exports.app = Application();
app.configure("render", "route");
app.render.base = module.resolve("../templates");
app.render.master = "base.html";

var auth = require("../auth");

app.get("/", function(request) {
    var status = auth.getStatus(request);
    var response = app.render("composer.html", {
        status: status || 404
    });
    // Reset GeoServer session, because we set JSESSIONID on '/' rather than '/geoserver'
    response.headers['Set-Cookie'] = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/geoserver";
    return response;
});
