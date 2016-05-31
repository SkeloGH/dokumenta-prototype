Class('TextEditor').inherits(Widget)({
  HTML :  '\
    <div class="prosemirror-editor">\
      <div class="content"></div>\
    </div>\
  ',

  prototype : {
    editor : null,
    type: 'text',

    init : function(config) {
      Widget.prototype.init.call(this, config);

      this.editor = new prosemirror.ProseMirror({
        place: this.element.find('.content')[0],
        doc: '<p>Edit...</p>',
        docFormat : 'html'
      });

      return this;
    },

    content : function() {
      return this.editor.getContent('html');
    }
  }
})
