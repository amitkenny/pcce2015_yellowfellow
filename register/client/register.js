Template.register.onRendered(function(){
  this.$('#registerForm').parsley({trigger : 'change'});


})

Template.register.events({
  'submit #registerForm' : function(event,template){
    Meteor.call('registerUser',event.currentTarget.name.value,event.currentTarget.email.value,function(err,res){
      if(err)
      {
        Materialize.toast(err.reason,4000);
      }
    })
    return false;
  }
})
