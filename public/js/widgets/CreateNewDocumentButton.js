Class('CreateNewDocumentButton').inherits(Widget)({
  prototype: {
    init: function(config) {
      Widget.prototype.init.call(this, config);
      // this.options = this.element.find('.mdl-menu__item');
      this._bindEvents();
    },

    _bindEvents: function() {
      this._clickHandlerRef = this._clickHandler.bind(this);
      this.element.on('click', this._clickHandlerRef);
    //   this.options.on('click', this._clickHandlerRef);
    },

    _clickHandler: function(ev) {
    //   var type = ev.currentTarget.dataset.type;
      var doku = new Dokument();
      doku.render($('.document'));
    //   doku.addBlock(type);
    },

    // destroy: function destroy() {
    //   Widget.prototype.destroy.call(this);
    //   this.options.off('click', this._clickHandlerRef);
    //   this._clickHandlerRef = null;
    // }
  }
});
