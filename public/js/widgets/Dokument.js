require('./CodeEditor.js');
require('./TextEditor.js');

Class('Dokument').inherits(Widget)({
  HTML : '\
    <div class="main-document">\
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\
        <input class="title mdl-textfield__input" type="text" name="title"/>\
        <label class="mdl-textfield__label">Title</label>\
      </div>\
      <div class="container"></div>\
      <div class="relative">\
        <button id="reate-new-document-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">\
          <i class="material-icons">add</i>\
        </button>\
        <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" \
          data-mdl-for="reate-new-document-btn">\
          <li class="mdl-menu__item" data-type="code">Add Code Block</li>\
          <li class="mdl-menu__item" data-type="text">Add Text Block</li>\
        </ul>\
      </div>\
      <div class="mt2">\
        <button class="save-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" type="submit">Save</button>\
      </div>\
    </div>\
  ',

  prototype : {
    title : null,
    blocks : null,

    init : function(config) {
      Widget.prototype.init.call(this, config);

      this.blocks = [];

      this.input = this.element.find('.mdl-textfield');
      this.buttons = this.element.find('.mdl-button');
      this.list = this.element.find('.mdl-menu');
      this.options = this.element.find('.mdl-menu__item');
      this.saveButton = this.element.find('.save-button');

      this._bindEvents();
    },

    _bindEvents: function() {
      this._optionClickHandlerRef = this._optionClickHandler.bind(this);
      this.options.on('click', this._optionClickHandlerRef);

      this._clickHandlerRef = this._clickHandler.bind(this);
      this.saveButton.on('click', this._clickHandlerRef);
    },

    _optionClickHandler: function(ev) {
      var type = ev.currentTarget.dataset.type;
      this.addBlock(type);
    },

    _clickHandler: function() {
      this.save();
    },

    addBlock : function(type) {
      var editor;

      switch (type) {
        case 'code':
          editor = new CodeEditor({
            name : 'editor_' + this.children.length
          });

          editor.render(this.element.find('.container'));
          break;
        case 'text':
          editor = new TextEditor({
            name : 'editor_' + this.children.length
          });


          editor.render(this.element.find('.container'));
          break;
      }

      this.appendChild(editor);

      return this;
    },

    removeBlock : function(index) {
      this['editor_' + index].destroy();

      return this;
    },

    getTitle : function() {
      return this.element.find('input.title').val();
    },

    save : function() {
      var doku = this;

      this.children.forEach(function(editor) {
        var block = {
          type : editor.type,
          content : editor.content()
        };

        doku.blocks.push(block);
      });

      var data = {
        title : this.getTitle(),
        blocks : this.blocks,
        _csrf : $('meta[name="csrf-token"]').attr('content')
      };

      $.ajax({
        method : 'POST',
        url : '/Documents',
        data : data,
        dataType : 'json',
        success : doku.success,
        error : doku.error
      });

    },

    success: function(data) {
      console.log(data);
    },

    error : function(err) {
      console.error(err.responseJSON);
    },

    render: function(element, parentElement) {
      Widget.prototype.render.call(this, element, parentElement);

      componentHandler.upgradeElement(this.input[0]);
      componentHandler.upgradeElement(this.list[0]);

      this.buttons.map(function(index, el) {
        componentHandler.upgradeElement(el);
      });

      // componentHandler.upgradeElement(this.input[0]);
      // componentHandler.upgradeElement(this.button[0]);
    },

    // destroy: function() {
    //   Widget.prototype.destroy.call(this);

    //   this.element.off('submit', this._submitHandlerRef);
    //   this._submitHandlerRef = null;

    //   this.button.off('click', this._clickHandlerRef);
    //   this._clickHandlerRef = null;

    //   return null;
    // }
  }
});
