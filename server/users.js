Meteor.methods({
  'registerUser' : function(name,email,password){
  
      var userId = Accounts.createUser({email : email,password: password, profile : {name : name}})
      Roles.setUserRoles(userId,'normal');

  }
})
