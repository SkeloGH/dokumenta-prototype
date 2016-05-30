Mailers.User = Class(Mailers, 'User').inherits(Mailers.BaseMailer)({
  prototype : {
    sendActivationLink : function(user) {
      var that = this;

      var templateOptions = {
        user: user
      };

      var options = {
        from: 'documenta@example.com',
        to: user.email,
        subject: 'Documenta: Activate your account.',
        html: this._compileTemplate(path.join(process.cwd(), 'views', 'mailers', 'user', 'activationLink.html'), templateOptions)
      };

      return this._send(options);
    }
  }
})
