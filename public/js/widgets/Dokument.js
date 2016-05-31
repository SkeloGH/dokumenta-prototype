require('./CodeEditor.js');
require('./TextEditor.js');

Class('Dokument').inherits(Widget)({
  HTML : '\
    <div class="main-document">\
    <input type="text" class="title">Title</input>\
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

      return this;
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
        default:
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
        }

        doku.blocks.push(block);
      });

      var data = {
        title : this.getTitle(),
        blocks : this.blocks,
        _csrf : $('meta[name="csrf-token"]').attr('content')
      }

      $.ajax({
        method : 'POST',
        url : window.location + '/documents',
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
      console.error(err);
    }
  }
})
