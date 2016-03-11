#!/bin/bash

npm run build
git branch -D gh-pages
git checkout --orphan gh-pages
rm -rf src
rm -rf templates
rm build.js && rm README.md && rm package.json
mv blog/* ./
rm -rf blog
git add .
git commit -m 'Automated deployment.'
