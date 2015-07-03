Yells.allow({
  insert : function(userId, doc){
      if(userId){
        if(_.isEmpty(doc)){
          return false;
        }
        else if(_.has(doc,'_id') || !_.has(doc,'yell') || !_.has(doc,'user') ||  !_.has(doc,'createdAt')){
          return false;
        }
        else if(doc.user !== userId){
          return false;
        }
        else if(doc.yell.length < 5){
          return false;
        }
        else if(!_.isDate(doc.createdAt)){
        return false;
        }
        return true;
      }

      return false;
  },

  remove : function(userId, doc){
    if(userId && doc.user === userId) {
      return true;
    }

    return false;
  },

  update : function(userId, doc, fieldNames, modifier){
    if(userId && doc.user === userId){

      if(_.contains(fieldNames,'createdAt')){
        return false;
      }
      else if(doc.yell.length < 5){
        return false;
      }
      else if(_.isEmpty(doc)){
          return false;
        }

      return true;
    }

    return false;
  }

})
