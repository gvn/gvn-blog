var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var drafts = require('metalsmith-drafts');
var tags = require('metalsmith-tags');
var dateFormatter = require('metalsmith-date-formatter');

var metalsmith = Metalsmith(__dirname)
  .destination('./build')
  .metadata({
    global: {
      root: '/blog/',
      title: 'Gavin Lazar Suntop',
      author: 'Gavin Lazar Suntop',
      description: 'More Posts About Food and Revolutionary Art',
      baseURL: 'http://gsuntop.com'
    }
  })
  .use(dateFormatter({
    key: 'publishDate',
    format: 'MMMM Do, YYYY' // Moment.js syntax
  }))
  .use(drafts())
  .use(markdown())
  .use(collections({
    posts: {
      sortBy: 'publishDate',
      reverse: true
    }
  }))
  .use(permalinks())
  .use(tags({
      handle: 'tags',
      path:'blog/tag/:tag/index.html',
      template:'tagged-posts.jade',
      sortBy: 'publishDate',
      reverse: true
  }))
  .use(templates('jade'))
  .build(function(err){
    if (err) throw err;
  });
