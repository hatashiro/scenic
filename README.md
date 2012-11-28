Scenic
======

See great pictures with your friends!

Scenic?
-------

Scenic is a Node.js based album app in which you can see great pictures with your friends in realtime.

How to Use?
-----------

Play with [demo page](http://noraesae.github.com/scenic/)!  
*Demo page is under development...*

Installation
------------

Assuming you already have node.js, npm and mongo run:

    $ git clone git://github.com/noraesae/scenic.git
    $ cd scenic
    $ npm install
    $ node scenic.js
    
Settings
--------

**settings.py** includes some settings you can change.
    
    var settings = module.exports = {
        port: 8000,
        mongo_uri: 'mongodb://localhost/scenic'
    };
    
You can change port to make Scenic run on.
You can also change mongodb's uri if mongo is not running on localhost.

Deployment
----------

I highly recommend to use [forever](https://github.com/nodejitsu/forever) for deployment.  
This is a simple use of forever to deploy Scenic.

    $ npm install forever -g
    $ forever start scenic.js
    
Browser Supports
----------------

Scenic is not well-tested with IE and can't assure to work well, but tested with the most of modern browsers. There are some features that don't work in IE(e.g. drag-and-drop upload).

If there's a browser problem using Scenic, please let me know! The way how you can contact me is described in **Helpdesk**.

License
-------

The MIT License (MIT) Copyright (c) 2012 HyeonJe Jun.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**It means, you can freely fork and modify this project for commercial or non-comercial use!**

Helpdesk
--------

If you have any idea to improve this project or any problems using this, please feel free to contact me.  
Email: noraesae@yuiazu.net

Scenic also has an IRC channel.  
IRC: #scenicproject

You can also post an issue : https://github.com/noraesae/scenic/issues
