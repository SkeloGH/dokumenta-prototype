Class('CreateNewDocumentButton').inherits(Widget)({
  prototype: {
    init: function(config) {
      Widget.prototype.init.call(this, config);
      this._bindEvents();
    },

    _bindEvents: function() {
      this._clickHandlerRef = this._clickHandler.bind(this);
      this.element.on('click', this._clickHandlerRef);
    },

    _clickHandler: function(ev) {
      var doku = new Dokument();
      doku.render($('.document'));
    },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      this.element.off('click', this._clickHandlerRef);
      this._clickHandlerRef = null;
    }
  }
});
