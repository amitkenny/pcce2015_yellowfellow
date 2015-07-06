Template.userpanel.onRendered(function(){
  this.subscribe('users');
  this.subscribe('userpresences');
})

Template.userpanel.helpers({
  userlist : function(){
    return Meteor.users.find({});
  },

  isUserOnline : function(id){

    return  UserPresences.findOne({userId : id}).state === "online";
  }
})
