User.relations = {
  documents : {
    type : 'HasMany',
    relatedModel : Document,
    ownerCol : 'id',
    relatedCol : 'user_id'
  }
}
