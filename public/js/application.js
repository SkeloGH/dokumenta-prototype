require('neon');
require('neon/stdlib');

var jQuery = require('./vendor/jquery-2.0.3.js');
window.jQuery = jQuery;
window.$ = jQuery;

require('./vendor/Widget.js');

// require('bootstrap/dist/js/bootstrap.js');
// require('bootstrap/dist/css/bootstrap.css');

require('./../css/style.less');
require('../../node_modules/material-design-lite/material.min.js');

// Widgets

Class('SignupForm').inherits(Widget)({
  prototype : {
    init : function(config) {
      Widget.prototype.init.call(this, config);

      this._setup();
    },

    _setup : function() {
      var form = this;

      this.element.find('.btn').bind('click', function(e) {
        var email = form.element.find('input[type="email"]').val() || '';
        var password = form.element.find('input[type="password"]').val() || '';

        var data = {
          email : email,
          password : password,
          _csrf : $('meta[name="csrf-token"]').attr('content')
        }

        $.ajax({
          method : 'POST',
          url : form.element.attr('action'),
          data : data,
          dataType : 'json',

          success : form.success,

          error : form.error
        });

        e.preventDefault();
      })
    },

    success : function(data) {
      console.log(data);
    },

    error : function(err) {
      for (var key in err.responseJSON) {
        if (err.responseJSON.hasOwnProperty(key)) {
          alert(err.responseJSON[key]);
        }
      }
    }
  }
})
