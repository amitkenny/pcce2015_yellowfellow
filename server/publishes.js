Meteor.publish('allyells',function(){


  if(this.userId){
    return Yells.find({});
  }
    return Yells.find({},{sort: {createdAt : -1}, fields : {yell:1}});

})
