var app, express, stylus, twig;
require("coffee-script");
express = require("express");
app = express.createServer();
twig = require("twigjs");
stylus = require("stylus");
app.configure(function() {
  app.set("views", __dirname + "/views");
  app.set("view engine", "html");
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require("stylus").middleware({
    src: __dirname + "/public"
  }));
  app.use(app.router);
  return app.use(express.static(__dirname + "/public"));
});
app.configure("development", function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});
app.configure("production", function() {
  return app.use(express.errorHandler());
});
app.register("html", twig);
app.get("/", function(req, res) {
  return res.render("index", {
    title: "My Resume",
    layout: false,
    name: "Fadrizul Hasani"
  });
});
app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);