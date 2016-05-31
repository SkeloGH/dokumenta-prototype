require('neon');
require('neon/stdlib');

var jQuery = require('./vendor/jquery-2.0.3.js');
window.jQuery = jQuery;
window.$ = jQuery;

require('./vendor/Widget.js');

require('bootstrap/dist/js/bootstrap.js');

require('bootstrap/dist/css/bootstrap.css');

// require('./../css/style.css');


// Widgets
require('./widgets/SignupForm.js');

require('codemirror/lib/codemirror.css');
require('codemirror/theme/railscasts.css');
global.CodeMirror = require('codemirror/lib/codemirror.js');
require('codemirror/mode/javascript/javascript.js');

global.prosemirror = require("prosemirror")

require('./widgets/Dokument.js')
