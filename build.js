var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var drafts = require('metalsmith-drafts');
var tags = require('metalsmith-tags');

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
  .use(tags({
      handle: 'tags',                  // yaml key for tag list in you pages
      path:'tags',                     // path for result pages
      template:'tagged-posts.jade',    // template to use for tag listing
      sortBy: 'date',                  // provide posts sorted by 'date' (optional)
      reverse: true                    // sort direction (optional)
  }))
  .use(templates('jade'))
  .build(function(err){
    if (err) throw err;
  });
