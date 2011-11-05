# Using CoffeeScript
require "coffee-script"

# Modules
express = require "express"
app     = express.createServer()
twig    = require "twigjs"
stylus  = require "stylus"

# Express configurations
app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "html"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use require("stylus").middleware(src: __dirname + "/public")
  app.use app.router
  app.use express.static(__dirname +	"/public")

app.configure "development", ->
  app.use express.errorHandler
    dumpExceptions: true
    showStack: true

app.configure "production", ->
  app.use express.errorHandler()

# TwigJS template engine
app.register "html", twig

# Route: "/index"
app.get "/", (req, res) ->
  res.render "index", 
  	title	 : "My Resume"
  	layout : false
  	name   : "Fadrizul Hasani"

app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
