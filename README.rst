===================
Build a web-project
===================
The main information about the packages in use are here:
    * Npm — https://www.npmjs.com/
    * Gulp — http://gulpjs.com/
    * Bower — http://bower.io/

To install all npm dependencies run in the root project directory::

    npm install


To install all js dependencies run in the root project directory::

    bower install


===========
Using bower
===========
To add a new js to the project add a name of the library to ``bower.json`` and
then run::

    bower install


You can find packages on http://bower.io/search/ or just use a github link. Other examples
are here http://bower.io/#install-packages

More help http://bower.io/#getting-started


==========
Using gulp
==========
Available commands:
    * ``build:html`` — build only html files
    * ``build:styles`` — build only style files
    * ``build:js`` — build only js files
    * ``build:media`` — process media files (e.g. optimize images) and copy them to the build directory
    * ``build:fonts`` — copy fonts from the fonts directory
    * ``build`` — ``build:html`` + ``build:styles`` + ``build:js`` + ``build:images`` + ``build:fonts``
    * ``clean`` — clean the build directory
    * ``connect`` — build the project and run a simple server (now only localhost:9000)
    * ``watch`` — run a simple watcher which will rebuild the project after any changes

Without any commands gulp calls the ``clean+build`` command.

All files which start with ``_`` are not copied to the build directory (but included with the ``//=`` directive).

Images which needn't to be optimized are marked with the ``_ignore`` suffix. In the build directory they are copied
without the suffix. Ex.: in the src: ``background_ignore.jpg``, in the build: ``background.jpg``.
