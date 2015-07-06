Template.login.onRendered(function(){
  this.$('#loginForm').parsley({trigger : 'change'});
})

Template.login.events({
  'submit #loginForm'  :function(event,template){
    var email = event.currentTarget.email.value;
    var password = event.currentTarget.password.value;

    Meteor.loginWithPassword(email,password);
    return false;
  }
})
