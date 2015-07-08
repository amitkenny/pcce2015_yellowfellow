Template.myyells.onRendered(function(){
  this.subscribe('allyells');
  this.subscribe('users');
  Session.set('limit',5);
});


Template.myyells.helpers({
  yells : function(){
    if(Meteor.userId()){
      return Yells.find({user : Meteor.userId()},{sort : {createdAt : -1},limit: Session.get('limit'),fields : {yell: 1,createdAt : 1, user: 1}});
    }


  },
  yellcount : function(){
    return Yells.find({}).count();
  },
  isYellCountGreaterThan5  :function(){
    return Yells.find({}).count() > 5;
  },
  yellarray : function(){
    return Yells.find({}).fetch();
  }

})
