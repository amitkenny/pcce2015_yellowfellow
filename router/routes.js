



Router.configure({
  layoutTemplate : 'basiclayout'
})

Router.onBeforeAction(function(){
if(!Meteor.userId()){
  this.next();
}
else{
  this.redirect('/')
}

},{
  only : ['register']
});

Router.onBeforeAction(function(){
  if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(),'admin')){
    this.next();
  }
  else {
    this.redirect('/')
  }

},{
  only : ['admin']
})


Router.onBeforeAction(function(){

  if(!Meteor.userId()){
    this.layout('startlayout');
    this.render('login',{to : 'cardcontent'})
  }
  else {
    this.next();
  }
},{
  except : ['about','register','admin']
})
Router.route('/',function(){

  this.render('wallarea',{to : 'maincontent'});
})

Router.route('/about',function(){
  this.render('aboutus',{to : 'maincontent'})
})


Router.route('/myyells',function(){
  this.render('myyells',{to : 'maincontent'});
})


Router.route('/register',function(){
  this.layout('startlayout');
  this.render('register',{to : 'cardcontent'});
})

Router.route('/admin',function(){
  this.render('admin',{to : 'maincontent'});
})
