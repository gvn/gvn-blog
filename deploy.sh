#!/bin/bash

git checkout master
npm run build
git branch -D gh-pages
git checkout --orphan gh-pages
rm -rf src
rm -rf templates
rm build.js && rm README.md && rm package.json && rm deploy.sh
mv build/* ./
rm -rf build
git add .
git commit -m 'Automated deployment.'
git push origin gh-pages -f
git checkout master
echo 'Deployment finished!'
