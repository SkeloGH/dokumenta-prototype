Class('CodeEditor').inherits(Widget)({
  HTML : '\
    <div class="codemirror-editor py1">\
      <textarea></textarea>\
    </div>\
  ',
  prototype : {
    editor : null,
    type : 'code',

    init : function(config) {
      Widget.prototype.init.call(this, config);

      this.editor = CodeMirror.fromTextArea(this.element.find('textarea')[0], {
        lineNumbers: true
      });

      return this;
    },

    content : function() {
      return this.editor.getValue();
    }
  }
})
