var Document = Class('Document').inherits(Krypton.Model)({
  tableName : 'Documents',
  attributes : ['id', 'userId', 'blocks', 'createdAt', 'updatedAt'],

  validations : {
    userId : [
      'required'
    ]
  }
});

module.exports = Document;
