const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // process.env.PORT is used dynamically by Heroku. 3000 is static - if I am using local host of Vijay's Mac.
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // setting the view engine to handlebars

app.use(function(request, response, next)
{
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', function(error)
  {
    if(error)
    {
      console.log('Unable to append to the file.');
    }
  });

  next();
});

// app.use(function(request, response, next)
// {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function()
{
  return new Date().getFullYear();
}); //Helpers are like Partials but they're usually just for FUNCTIONS,
   // not specific files of code!!

hbs.registerHelper('screamIt', function(text)
{
  return text.toUpperCase();
});

app.get('/', function(request, response)
{
  response.render('home.hbs', {
    pageTitle: 'Homepage',
    welcomeMessage: 'Welcome to my Homepage!',
  });
});

app.get('/about', function(request, response)
{
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', function(request, response)
{
  response.send({
    errorMessage: 'Unable to fulfil this request'
  })
})

app.listen(port, function()
{
  console.log(`Server is up on port ${port}.`);
});
