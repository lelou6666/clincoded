========================
ClinGen Curation Database and Interface
========================
DEV
***
.. image:: https://travis-ci.org/ClinGen/clincoded.svg?branch=dev
    :target: https://travis-ci.org/ClinGen/clincoded

PROD
*******
.. image:: https://travis-ci.org/ClinGen/clincoded.svg?branch=master
    :target: https://travis-ci.org/ClinGen/clincoded

This software creates an object store and user interface for the collection of mappings between human diseases and genetic variation as input by the ClinGen curation staff.

Baseline Dependendencies
=========================

Mac OSX
--------
Step 1a: Verify that homebrew is working properly::

    $ brew doctor


Step 2a: Install or update dependencies::

<<<<<<< HEAD
    $ brew install libevent libmagic libxml2 libxslt elasticsearch openssl postgresql graphviz nginx python3
    $ brew install freetype libjpeg libtiff littlecms webp  # Required by Pillow

Install Node 0.10 from homebrew/versions::
=======
    $ brew install libevent libmagic libxml2 libxslt elasticsearch openssl postgresql graphviz
    $ brew install freetype libjpeg libtiff littlecms webp chromedriver # Required by Pillow

Note: For Mac < 10.9, the system python doesn't work. You should install Python with Homebrew::

    $ brew install python3

Install Node v5  (check version: `node --version`)

  * via homebrew (homebrew will indicate if you need to unlink a prior version of node)::

    $ brew install node

  * or via nvm::

    $ npm install -g nvm
    $ nvm install 5.0
    $ nvm use 5.0

Insure you are using npm 3 (check version: `npm --version`), if necessary update npm to npm 3::

    $ npm install npm -g
>>>>>>> refs/remotes/ClinGen/dev


If you need to update dependencies::

    $ brew update
    $ brew upgrade
    $ make clean

You can also use the Makefile to set up for a clean buildout::

    $ make clean

Then proceed to step 1b.

Linux
-----

See cloud-config.yml in this repository.  Use apt-get or yum or other package manager to install everything under packages.   The rest of the install instructions assume you have python3.4 in your path.

Install python, node and ruby dependencies
==========================================

Note: These will all be installed locally for the application and should never conflict with other system packages

Step 1b: Run buildout::

    $ python3.4 bootstrap.py -v 2.3.1 --setuptools-version 15.2
    $ bin/buildout -c buildout-dev.cfg


Start the application locally
================================

In one terminal startup the database servers and nginx proxy with::

    $ bin/dev-servers development.ini --app-name app --clear --init --load

<<<<<<< HEAD
This will first clear any existing data in /tmp/encoded.
Then postgres and elasticsearch servers will be initiated within /tmp/encoded.
An nginx proxy running on port 8000 will be started.
=======
This will first clear any existing data in /tmp/clincoded.
Then postgres and elasticsearch servers will be initiated within /tmp/clincoded.
>>>>>>> refs/remotes/ClinGen/dev
The servers are started, and finally the test set will be loaded.

In a second terminal, run the app with::

    $ bin/pserve development.ini

Indexing will then proceed in a background thread similar to the production setup.

Browse to the interface at http://localhost:8000/.


<<<<<<< HEAD
Running tests
=============
=======
Run the tests locally  (tests also run on travis-ci with every push)
========================
>>>>>>> refs/remotes/ClinGen/dev

To run specific tests locally::

    $ bin/test -k test_name

To run with a debugger::

    $ bin/test --pdb

Specific tests to run locally for schema changes::

    $ bin/test -k test_load_workbook

Run the Pyramid tests with::

    $ bin/test -m "not bdd"

Run the Browser tests with::

    $ bin/test -m bdd -v -v

Run the Javascript tests with::

    $ npm test

Or if you need to supply command line arguments::

    $ ./node_modules/.bin/jest

<<<<<<< HEAD
=======
Notes on modifying the local (Postgres) database
=====================================

Note:  The below is generally superceeded by the dev-servers command which creates a temporary PG db, then throws it away.  But this might be useful for some deep debugging.

If you wish a clean db wipe for DEVELOPMENT::

    $ dropdb clincoded
    ...
    $ createdb clincoded
    $ pg_ctl -D /usr/local/var/postgres -l pg.log start

Database setup on VMs::

    # service postgresql-9.4 initdb
    # service postgresql-9.4 start
    # sudo -u postgres createuser --createdb clincoded

Then as the clincoded user::

    $ createdb clincoded

To dump a postgres database:
    pg_dump -Fc clincoded > FILE_NAME  (as user clincoded on demo vm)
    (FILE_NAME for production is ~/clincoded/archive/clincoded-YYYYMMDD.dump)

To restore a postgres database:
    pg_restore -d clincoded FILE_NAME (as user clincoded on demo vm)

Notes on manually creation of ElasticSearch mapping
--------------------------------------
    $ bin/create-mapping production.ini
>>>>>>> refs/remotes/ClinGen/dev

Notes on SASS/Compass
=====================

We use the `SASS <http://sass-lang.com/>`_ and `Compass <http://compass-style.org/>`_ CSS preprocessors.
The buildout installs the SASS and Compass utilities and compiles the CSS.
When changing the SCSS source files you must recompile the CSS using one of the following methods:

Compiling "on the fly"
----------------------

Compass can watch for any changes made to .scss files and instantly compile them to .css.
To start this, from the root of the project (where config.rb is) do::

    $ bin/compass watch

You can specify whether the compiled CSS is minified or not in config.rb. (Currently, it is set to minify.)

Force compiling
---------------

<<<<<<< HEAD
::

    $ bin/compass compile
=======
    $ compass compile
>>>>>>> refs/remotes/ClinGen/dev

Again, you can specify whether the compiled CSS is minified or not in config.rb.

Also see the `Compass Command Line Documentation <http://compass-style.org/help/tutorials/command-line/>`_ and the `Configuration Reference <http://compass-style.org/help/tutorials/configuration-reference/>`_.

And of course::

    $ bin/compass help


Notes on SublimeLinter
=============

To setup SublimeLinter with Sublime Text 3, first install the linters::

    $ easy_install-2.7 flake8
    $ npm install -g eslint
    $ npm install -g eslint-plugin-react

After first setting up `Package Control`_ (follow install and usage instructions on site), use it to install the following packages in Sublime Text 3:

    * sublimelinter
    * sublimelinter-flake8
    * SublimeLinter-contrib-eslint (`instructions <https://github.com/roadhump/SublimeLinter-eslint#plugin-installation>`_)
    * babel (`instructions <https://github.com/babel/babel-sublime#setting-as-the-default-syntax>`_)

.. _`Package Control`: https://sublime.wbond.net/
