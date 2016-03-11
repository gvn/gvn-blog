---
title: NPM for Front-end Libraries
publishDate: 2016-03-11
modifiedDate: 2016-03-11
template: post.jade
collection: posts
tags: npm, code
thumbnail: npm-front-end/npmlogo.jpg
---

**Problem:**

It's often useful to include compiled front-end code in npm modules (*eg: CSS transpiled from SCSS*). However, it's pretty gross to put compiled code into your development branches because you end up with bloated diffs in your commit history.

**Antipattern:**

Commit compiled code – often to a folder such as `dest`.

**A Better Solution:**

Commit compiled code to your tags as they are published to npm. In this manner, consumers get your compiled code while library co-developers do not.

## Enter NPM

Running [`npm version`](https://docs.npmjs.com/cli/version) is a very convenient way to bump your module's version number (assuming you use [semver](http://semver.org/), which you should!) as well as creating an associated tag. It also turns out that the command can trigger three specially named npm scripts: `preversion`, `version`, and `postversion` during its runtime.

*Excerpt from npm's [version](https://docs.npmjs.com/cli/version) documentation:*

> If `preversion`, `version`, or `postversion` are in the scripts property of the package.json, they will be executed as part of running `npm version`.
> The exact order of execution is as follows:
> 1. Check to make sure the git working directory is clean before we get started. Your scripts may add files to the commit in future steps. This step is skipped if the `--force` flag is set.
> 2. Run the `preversion` script. These scripts have access to the old version in `package.json`. A typical use would be running your full test suite before deploying. Any files you want added to the commit should be explicitly added using `git add`.
> 3. Bump version in `package.json` as requested (`patch`, `minor`, `major`, etc).
> 4. Run the `version` script. These scripts have access to the new version in `package.json` (so they can incorporate it into file headers in generated files for example). Again, scripts should explicitly add generated files to the commit using `git add`.
> 5. Commit and tag.
> 6. Run the `postversion` script. Use it to clean up the file system or automatically push the commit and/or tag.

Given these triggers, one can add corresponding tasks to commit compiled code only to the published tag and then subsequently remove it.

**Example:**

All scripts from `package.json` :

`"preversion": "git checkout master && git pull mozilla master && npm test"`

This will ensure you're on the correct branch for creating your tag (probably `master`), check that you have the latest code, and finally that all tests pass as expected.

`"version": "npm run build && git add -f dest"`

Run a build, which in this example creates a `dest` folder containing compiled assets. After the build is successfully completed, it will be staged in git (note that `-f` allows it to be staged despite the fact that it is .gitignore'd).

`"postversion": "npm publish && git push mozilla --tags && git rm -r dest && git commit --amend --no-edit && git push mozilla master"`

Publish to npm, push the tag to the `mozilla` remote, remove the compiled folder, amend the previous commit to eliminate the compiled code, and finally push the commit to master.

## Gotchas

In order for this to work well you'll need to do a few things:

1. Add your compiled files to `.gitignore`. This will ensure no one accidentally commits them.
2. Add a `.npmignore` file that contains the same excluded files as `.gitignore`, but **does not include references to your compiled files**. `.npmignore` takes precedence over `.gitignore`, and you *want* npm to include your compiled files as a convenience for library users.

## Conclusion

This all might feel a tad convoluted, and admittedly it is a bit. However, you can *set it and forget it*. Once you're all set up you can pat yourself on the back for leaving out a bunch of extra garbage in your source code. You can also rest easy knowing that consumers of your library have the option to compile it themselves or be acceptably lazy and use precompiled (and predictably generated!) code.
