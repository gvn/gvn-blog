var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var metadata = require('metalsmith-metadata');

var metalsmith = Metalsmith(__dirname)
  .destination('./build')
  .metadata({
    title: 'gvn.blog',
    description: 'More posts about food and revolutionary art.'
  })
  .use(markdown())
  .use(permalinks())
  .use(collections({
    posts: {
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(templates('jade'))
  .build(function(err){
    if (err) throw err;
  });
