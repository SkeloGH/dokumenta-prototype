var DocumentsController = Class('DocumentsController').inherits(RestfulController)({
  beforeActions : [
    {
      before : function(req, res, next) {
        Document.query().where({id : req.params.id})
          .then(function(result) {
            if (result.length === 0) {
              return next(new NotFoundError('Document not found'));
            }

            res.locals.currentDocument = result[0];

            return next();
          })
          .catch(next);
      },
      actions : ['update', 'destroy']
    }
  ],
  prototype : {
    index : function(req, res, next) {
      Document.query().where({ user_id : req.params.user_id })
        .then(function(documents) {
          res.json(documents);
        })
        .catch(next);
    },

    create : function(req, res, next) {
      var document = new Document(req.body);

      document.save()
        .then(function() {
          res.json(document);
        })
        .catch(function(err) {
          res.status(400).json(err);
        });
    },

    update : function(req, res, next) {
      var document = res.locals.currentDocument;

      document.updateAttributes(req.body);

      document.save()
        .then(function() {
          res.json(document)
        })
        .catch(function(err) {
          res.status(400).json(err);
        });
    },

    destroy : function(req, res, next) {
      var document = res.locals.currentDocument;

      document.destroy()
        .then(function(id) {
          res.json(id[0]);
        })
        .catch(next);
    }
  }
});

module.exports = new DocumentsController();
