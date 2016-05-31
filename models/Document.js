var Document = Class('Document').inherits(Krypton.Model)({
  tableName : 'Documents',
  attributes : ['id', 'userId', 'title', 'blocks', 'createdAt', 'updatedAt'],

  validations : {
    userId : [
      'required'
    ],
    title : [
      'required'
    ]
  }
});

module.exports = Document;
