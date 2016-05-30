var bcrypt = require('bcrypt-node');
var path = require('path');

var mailer = new Mailers.User();


module.exports = Class('User').inherits(Krypton.Model)({
  tableName : 'Users',

  validations : {
    email : [
      'email',
      {
        rule : function(val) {
          var query = User.query()
            .where({
              email : val
            });

          if (this.target.id) {
            query.andWhere('id', '!=', this.target.id);
          }

          return query.then(function(result) {
            if (result.length > 0) {
              throw new Error('The email already exists.');
            }
          })
        },
        message : 'The email already exists.'
      },
      'required',
      'maxLength:255'
    ],

    password : [
      'minLength:8'
    ]
  },

  attributes : ['id', 'email', 'encryptedPassword', 'token', 'createdAt', 'updatedAt'],

  prototype : {
    init : function(config) {
      Krypton.Model.prototype.init.call(this, config);

      var model = this;

      // Encrypt 'password' and assign to model as encryptedPassword
      this.on('beforeSave', function(next) {
        if (model.password) {
          model.encryptedPassword = bcrypt.hashSync(model.password, bcrypt.genSaltSync(10), null);
        }

        next();
      });

      // Add token for confirmation
      this.on('beforeCreate', function(next) {
        model.token = bcrypt.hashSync(CONFIG[CONFIG.environment].sessions.secret + Date.now(), bcrypt.genSaltSync(12), null);

        next();
      });

      // Send activation email after create a record only if the environment is not "test"
      this.on('afterCreate', function(next) {
        mailer.sendActivationLink(model)
          .then(function () {
            next();
          })
          .catch(next);
      });

      return this;
    },

    activate : function() {
      // A null token means the account has been activated
      this.token = null;

      return this;
    }
  }
});
