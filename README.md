Mini-Spotify
============

Install Node
------------

MacOS

https://nodejs.org/dist/v10.15.3/node-v10.15.3.pkg

Debian

    $ sudo apt-get install curl software-properties-common
    $ curl -sL https://deb.nodesource.com/setup_11.x | sudo bash -
    $ sudo apt-get install nodejs

Install dependencies
--------------------

    $ npm init
    $ npm install express bcrypt-nodejs body-parser connect-multiparty jwt-simple moment mongoose mongoose-pagination --save
    $ npm install nodemon  --save-dev

The previous commands will create a package.json file.

Once the file package.json has been create and contains the dependencies, these can be installed with the following command:

    $ npm install

Robomongo
---------

https://robomongo.org/download

MongoDB Server
--------------

    $ brew install mongodb

To have launchd start mongodb now and restart at login:

    $ brew services start mongodb

Or, if you don't want/need a background service you can just run:

    $ mongod --config /usr/local/etc/mongod.conf

    $ mongo localhost:27017
    > use mini_spotify;
    > db.artists.save(name: '', description: '', image: 'null');
    > db.artists.find();
    > show dbs;

Start app
---------

    $ npm start

    > mini-spotify@1.0.0 start /Users/isaac/workspace/mini-spotify
    > nodemon index.js

    [nodemon] 1.18.10
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node index.js`
    (node:35829) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
    Database connection is running ok...
    API REST Server listening in http://localhost:3977

Postman
-------

https://dl.pstmn.io/download/latest/osx

Angular CLI
-----------

    $ npm install -g angular-cli
    $ ng new client
    $ cd client/
    $ npm start

Bootstrap
---------

    $ wget https://github.com/twbs/bootstrap/releases/download/v3.3.6/bootstrap-3.3.6-dist.zip

Decompress zip file and copy folders inside to path mini-spotify/client/src/assets/bootstrap

JQuery
------

    https://code.jquery.com

    Go jquery 1.x minified:

    <script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
        crossorigin="anonymous">
    </script>

Download file to mini-spotify/client/src/assets/js/jquery.min.js