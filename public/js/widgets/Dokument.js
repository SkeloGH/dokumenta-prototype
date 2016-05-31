require('./CodeEditor.js')

Class('Dokument').inherits(Widget)({
  HTML : '\
    <div class="main-document">\
    <div class="title"></div>\
    <div class="container">\
    </div>\
      <div class="add-document">\
        <div class="add-popover">\
          <div class="popover-item">Add Markdown Block</div>\
          <div class="popover-item">Add Code Block</div>\
          <div class="popover-item">Add Text Block</div>\
        </div>\
      </div>\
    </div>\
  ',

  prototype : {
    title : null,
    blocks : null,

    init : function(config) {
      Widget.prototype.init.call(this, config);
      var doku = this;

      this.blocks = [];

      var titleEditor = new prosemirror.ProseMirror({
        place: doku.element.find('.title')[0],
        doc: "Set a title",
        docFormat: "html"
      });

      return this;
    },

    addBlock : function(type) {
      var editor;

      switch (type) {
        case 'code':
          editor = new CodeEditor();
          editor.render(this.element.find('.container'));
          break;
        case 'text':
          editor = new prosemirror.ProseMirror({
            place: this.element.find('.content'),
            doc: 'Edit...',
            docFormat : 'html'
          });
        default:
          break;
      }
    },

    removeBlock : function(index) {

    }
  }
})
