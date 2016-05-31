Class('CodeEditor').inherits(Widget)({
  HTML : '\
    <div class="codemirror-editor">\
      <textarea></textarea>\
    </div>\
  ',
  prototype : {
    init : function(config) {
      Widget.prototype.init.call(this, config);

      var editor = CodeMirror.fromTextArea(this.element.find('textarea')[0], {
        lineNumbers: true
      });

      return this;
    }
  }
})
