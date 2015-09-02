---
title: Eliminating Code Smell With Grunt
publishDate: 2013-12-12
modifiedDate: 2013-12-12
template: post.jade
collection: posts
tags: grunt, javascript
---

## Intro

I *love* clean code. There, I said it. I pride myself on passing strict linting standards and keeping my code easy to read. It's not just a personal proclivity, but a choice I hope benefits other developers.

My general experience with teams has been that code style is something people care about and have strong personal preferences. Typically, at some point people get tired of dealing with inconsistency and a standardization meeting is called. This is, of course, an important discussion to have. The problem that tends to occur is either lack of documentation or lack of enforcement of the agreed upon style. Additionally, new team members or contributors may not have access to a clear set of rules.

Beyond the challenge of defining rules lies the supreme annoyance of enforcing them. Code reviews become cluttered with nits to be picked. Time is wasted. The solution I settled on was simply automating the conformance process.

I set forth to solve this problem:

**Establish coding standards that are clearly defined and automatically verifiable.**

## Defining the Rules

Probably the most difficult part of crafting a style guide is agreeing on what standards to use. In all likelihood there will be some standards in place already. It's likely (at least I hope) that your team at least has an indentation standard. This is a holy war for some, but hopefully you've already reached a consensus.

Coding standards are like pizza toppings; it's difficult for people to agree on them. However, most can agree that no matter what, consistency is a desirable goal.

In order to automate style, you need to pick tools to perform static analysis of your code. Since the bulk of our code in the [Webmaker](http://webmaker.org) ecosystem is JavaScript I decided to use two tools: [JSHint](http://jshint.com/) and [JSBeautify](https://github.com/einars/js-beautify). Both are configurable with JSON files that are easily added to a project's root directory: `.jshintrc` and `.jsbeautifyrc` respectively.

### Fig. 1 - .jshintrc from webmaker.org

```json
{
  "globals": {
    "module": true,
    "define": true,
    "requirejs": true,
    "require": true
  },
  "browser": true,
  "bitwise": true,
  "curly": true,
  "eqeqeq": true,
  "freeze": true,
  "immed": true,
  "indent": 2,
  "latedef": true,
  "newcap": true,
  "noempty": true,
  "nonew": true,
  "trailing": true,
  "undef": true
}
```

### Fig. 2 - .jsbeautifyrc from webmaker.org

```json
{
  "indent_size": 2,
  "indent_char": " ",
  "indent_level": 0,
  "indent_with_tabs": false,
  "preserve_newlines": true,
  "max_preserve_newlines": 2,
  "jslint_happy": true,
  "brace_style": "collapse",
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "space_before_conditional": true,
  "break_chained_methods": false,
  "eval_code": false,
  "unescape_strings": false,
  "wrap_line_length": 0
}
```

## Automating with Grunt

Once your choices have been established, you need to document them. Your project should have a `CONTRIBUTING.md` if you're using GitHub, which is a fine place to start. Of course, simply relying on documentation is prone to error and will inevitably result in nitpicky code reviews. To solve the automation component of my challenge, I decided to use the fantastic [Grunt](http://gruntjs.com/) task runner.

(I will assume you have a working knowledge of Grunt, but if not, [here's a good starting point](http://www.youtube.com/watch?v=q3Sqljpr-Vc).)

Since Grunt's core function is automation it felt like a perfect choice. We had already been using it [for other purposes](https://github.com/mozilla/webmaker-profile/blob/master/Gruntfile.js), so I only needed to bring in a few plugins to work with the tools and config files already established. I chose to use [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) and [grunt-jsbeautifier](https://github.com/vkadam/grunt-jsbeautifier).

After installing and loading the NPM tasks in our Gruntfile, I needed to define two configurations.

For **JSHint**, the configuration is very simple. Target files are defined and we pull in our previously defined rules from the `.jshintrc` file to set the linter's rules.

```js
jshint: {
  all: ['Gruntfile.js', '_fe/js/*.js'],
  options: {
    jshintrc: '.jshintrc'
  }
}
```

For **JSBeautifier** the config is slightly more complex. Since this tool typically auto-formats our code I created an additional sub task for verification only. This allows us to test that code has been formatted without actually modifying it.

```js
jsbeautifier: {
  modify: {
    src: ['Gruntfile.js', '_fe/js/**/*.js'],
    options: {
      config: '.jsbeautifyrc'
    }
  },
  verify: {
    src: ['Gruntfile.js', '_fe/js/**/*.js'],
    options: {
      mode: 'VERIFY_ONLY',
      config: '.jsbeautifyrc'
    }
  }
}
```

My final step to configure Grunt was to add two tasks.

1. `grunt clean` to auto-format and ensure JSHint compliance:

  ```js
  grunt.registerTask('clean', [
    'jsbeautifier:modify',
    'jshint'
  ]);
  ```

2. `grunt verify` to check that code is formatted and passes JSHint:

  ```js
  grunt.registerTask('verify', [
    'jsbeautifier:verify',
    'jshint'
  ]);
  ```

## Workflow

In the spirit of keeping things simple, a developer only has to run and pass `grunt clean` before pushing code. JSHint will alert the user to any violations, which must be cleaned up manually. JSBeautifier will just do its thing with no further typing required.

## Enforcement

To take things a little further, I decided to integrate our verification task with [Travis](https://travis-ci.org/). Since you'll already have a `package.json` from working with Grunt, you can just add a NPM test to your `scripts` property like so:

```js
"scripts": {
  "test": "grunt verify --verbose"
}
```

This will result in your build failing if `grunt verify` doesn't pass. As a bonus, you'll get this lovely banner on your validated pull requests:

![Light is green. Trap is clean.](/img/eliminating-code-smell/travis.png)

*"Light is green. Trap is clean."*

## Conclusion

Overall, I found that putting this solution in place has improved not only the readability and consistency of our code, but also reduced potential errors via static analysis with JSHint. On the projects that I've integrated so far, I've noticed that more focus is given to *what the code is actually doing* in reviews. Also, with open source projects it's a wonderful way to ensure contributors maintain consistency with their patches. There may be a gentle reminder to run `grunt clean` now and then, but extensive nit picking is no longer required from reviewers.

---
### Bonus Materials

#### Sublime Text Packages

These packages can read options directly from your local `.*rc` files

- [HTML-CSS-JS Prettify](https://github.com/victorporof/Sublime-HTMLPrettify)
- [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter)

#### Further Reading

- [Static Code Analysis](http://www.altdevblogaday.com/2011/12/24/static-code-analysis/) by John Carmack
- [The Art of Readable Code](http://shop.oreilly.com/product/9780596802301.do) by Dustin Boswell, Trevor Foucher

#### Additional Tools

- [jscs](https://github.com/mdevils/node-jscs)
