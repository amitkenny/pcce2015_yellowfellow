Template.login.onRendered(function(){
  this.$('#loginForm').parsley({trigger : 'change'});


})

Template.login.events({
  'submit #loginForm'  :function(event,template){
    var email = event.currentTarget.email.value;
    var password = event.currentTarget.password.value;

    Meteor.loginWithPassword(email,password,function(err){
      if(err){
        Materialize.toast(err.reason,4000);
      }
    });
    return false;
  },
  'click #register' : function(event,template){
    Router.go('/register');
  },
  'click #googlelogin' : function(event,template){


  Meteor.loginWithGoogle({requestPermissions  :['user']},function(err){
    if(err)
    {
      Materialize.toast(err,4000);
    }
  });

  }

})
