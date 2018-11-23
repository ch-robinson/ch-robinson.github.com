# C.H. Robinson Engineering Blog

### Installation

1. Install ruby (2.4.2 or newer)
2. Install `bundler` (1.14 or newer) and dependencies

```sh
gem install bundler
bundle install
```

3. Run Jekyll

```sh
bundle exec jekyll serve
# include --livereload to re-build and refresh on changes
bundle exec jekyll serve --livereload
```

The site will now be served from `http://localhost:4000`

### Bundling JavaScript Files

When the site is build by Jekyll, only `js/main.js` is actually loaded into
the browser. Grunt bundles and minifies all of the scripts and outputs them
into `js/main.js`. This site supports IE10-11, and script code should be kept
to a minimum, so scripts must be ECMAScript 5.1 compliant.

If you are modifying any JavaScript files, you must install node to be able
to bundle and minify the scripts. To install the dependencies, run

```sh
npm install
```

Then, to build, run

```sh
# rebuild the scripts and refresh the page on save
npm run start
# build the scripts and exit
npm run build
```
