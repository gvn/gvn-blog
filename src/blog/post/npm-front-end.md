---
title: npm for Front-end Libraries
publishDate: 2016-03-11
modifiedDate: 2016-10-25
template: post.jade
collection: posts
tags: npm, code
thumbnail: npm-front-end/npmlogo.jpg
---

**Problem:**

It's often useful to include compiled front-end code in npm modules (*eg: CSS transpiled from SCSS*). However, it's suboptimal to commit compiled code to your repository because you end up with bloated diffs in your commit history and a higher chance of merge conflicts. You'll also end up with a much larger overall filesize for your repo, which will slow down pushes and pulls.

**Antipattern:**

Commit compiled code – often to a folder such as `dist`.

**A Better Solution:**

Only include compiled code in the bundle you publish to npm. In this manner, consumers get your compiled code while library co-developers do not.

## Basics

In order for this all to work properly you'll need to do a few things:

First, add the folder(s) containing your compiled files to `.gitignore`. This will ensure no one accidentally commits compiled code.

Second, add a `.npmignore` file that contains the same excluded files as `.gitignore`, but *does not include references to your compiled files*. `.npmignore` takes complete precedence over `.gitignore`, and you *want* npm to include your compiled files.

If you can get by with only a few directories in your bundle, you can take a less repetitive approach by ignoring a wildcard patttern (`/*`) and overriding with just the files and folders you *do* want included by prepending them with a `!` (see example below).

**Example: A more D.R.Y. `.npmignore` :**

```
/*
!dest/
!src/
```

## Level Up With Versioning Hooks

Running [`npm version`](https://docs.npmjs.com/cli/version) is a convenient way to bump your module's version number (assuming you use [semver](http://semver.org/) – which you should!). It also creates an associated tag and commit. Additionally, `npm version` can trigger three specially named npm scripts: `preversion`, `version`, and `postversion` during its execution.

*Excerpt from npm's [version](https://docs.npmjs.com/cli/version) command documentation:*

> If `preversion`, `version`, or `postversion` are in the scripts property of the package.json, they will be executed as part of running `npm version`.
> The exact order of execution is as follows:
> 1. Check to make sure the git working directory is clean before we get started. Your scripts may add files to the commit in future steps. This step is skipped if the `--force` flag is set.
> 2. Run the `preversion` script. These scripts have access to the old version in `package.json`. A typical use would be running your full test suite before deploying. Any files you want added to the commit should be explicitly added using `git add`.
> 3. Bump version in `package.json` as requested (`patch`, `minor`, `major`, etc).
> 4. Run the `version` script. These scripts have access to the new version in `package.json` (so they can incorporate it into file headers in generated files for example). Again, scripts should explicitly add generated files to the commit using `git add`.
> 5. Commit and tag.
> 6. Run the `postversion` script. Use it to clean up the file system or automatically push the commit and/or tag.

**Example:**

All scripts from `package.json` :

`"preversion": "git checkout master && git pull origin master && npm test"`

This will ensure you're on the correct branch for creating your tag (probably `master`), check that you have the latest code, and finally that all tests pass as expected.

`"version": "npm run build"`

Run a local build (assuming you have a npm script called `build`), which might for example create a `dist` folder containing compiled code. Since this step runs before your npm package is assembled you will end up with your compiled code available for bundling.

`"postversion": "npm publish && git push origin master --tags"`

Publish your new version to npm, push the bumped `package.json` to `master`, and push the newly created tag to the `origin` remote.

## Testing

While you're setting up your new workflow, it's nice to be able to see what will end up in your bundled package without actually publishing it. Currently, there's a [ticket](https://github.com/npm/npm/issues/6351) open for adding a dry run option to `npm publish`, but for now: `tar -tf $(npm pack)` will list out files that will be published given your current configuration. *Note that you'll end up with a `tgz` file in the root of your local repository, so be sure to delete it afterward!*

## Conclusion

Once you're all set up you can pat yourself on the back for leaving out a bunch of extraneous noise in your repo's history. You can also rest easy knowing that consumers of your library have the option to either compile it themselves, or be acceptably lazy and use precompiled (and consistently generated!) code.
