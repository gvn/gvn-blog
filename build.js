var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var drafts = require('metalsmith-drafts');

var metalsmith = Metalsmith(__dirname)
  .destination('./build')
  .metadata({
    global: {
      title: 'Gavin Lazar Suntop',
      author: 'Gavin Lazar Suntop',
      description: 'More Posts About Food and Revolutionary Art'
    }
  })
  .use(drafts())
  .use(markdown())
  .use(permalinks())
  .use(collections({
    posts: {
      sortBy: 'date',
      reverse: false
    }
  }))
  .use(templates('jade'))
  .build(function(err){
    if (err) throw err;
  });
