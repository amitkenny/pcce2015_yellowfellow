Meteor.publish('allyells',function(){


  if(this.userId){
    return Yells.find({});
  }
    return Yells.find({},{sort: {createdAt : -1}, fields : {yell:1}});

})


Meteor.publish('users',function(){
  return Meteor.users.find({},{fields : {emails : 1,services : 1}});
})



Meteor.publish('userpresences',function(){
  return UserPresences.find({});
})
