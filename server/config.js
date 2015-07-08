ServiceConfiguration.configurations.remove({service : 'google'});
ServiceConfiguration.configurations.upsert(

  { service: "google" },
  { $set: { clientId: "475892695130-taamnrlu1ubbfnm2r2tl5j7kc7tmqtd0.apps.googleusercontent.com", loginStyle: "redirect",secret: "lsJhjG-F8vSwZd9VrMeS_cHN" } }
);



Meteor.startup(function(){
  Roles.createRole('admin');
  Roles.createRole('normal');

  if(Meteor.users.find({}).count() == 0){

       var admin = {
         email : 'admin@yellowfellow.com',
         password : 'taamnrlu1ubbfnm2r2tl5j7kc7tmqtd0'
       }

       var userid = Accounts.createUser(admin)
       Roles.setUserRoles(userid,'admin');
  }
});
