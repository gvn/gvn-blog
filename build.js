var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');

var metalsmith = Metalsmith(__dirname)
  .destination('./build')
  .metadata({
    global: {
      title: 'gvn.blog',
      author: 'Gavin Lazar Suntop',
      description: 'More posts about food and revolutionary art.'
    }
  })
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
