//Meteor.subscribe('allyells');

Template.wallarea.onRendered(function(){
  this.subscribe('allyells');
  Session.set('limit',5);
  Session.set('yellvalue','');
  Session.set('yellToEdit',false);
  Session.set('yellLength',140);
})


Template.wallarea.helpers({
  yells : function(){
    if(Meteor.userId()){
      return Yells.find({},{sort : {createdAt : -1},limit: Session.get('limit'),fields : {yell: 1,createdAt : 1, user: 1}});
    }
    return Yells.find({},{limit: Session.get('limit'),fields : {yell: 1,createdAt : 1, user: 1}});

  },
  yellcount : function(){
    return Yells.find({}).count();
  },
  isYellCountGreaterThan5  :function(){
    return Yells.find({}).count() > 5;
  },
  yellarray : function(){
    return Yells.find({}).fetch();
  },
  yellvalue : function(){
    return Session.get('yellvalue');
  },
  isItMe : function(id){
    return id === Meteor.userId();
  },
  yellLength : function(){
    return Session.get('yellLength');
  },
  ifYellLengthGreater140 : function(){
    return Session.get('yellLength') < 0;
  },
  ifYellLength0 : function(){
    return Session.get('yellLength') == 140;
  }
})


Template.wallarea.events({
'keyup #yelltext' : function(event,template){
  Session.set('yellvalue', event.currentTarget.value.trim());
  Session.set('yellLength',140 - event.currentTarget.value.length)
},

'submit #yellbox' : function(event,template){
  var yellvalue= Session.get('yellvalue');
  if(!Session.get('yellToEdit'))
  {
    if(Meteor.userId())
    {
      if(yellvalue.length > 5 && yellvalue.length<140){
        Yells.insert({yell : yellvalue,createdAt : new Date(), user : Meteor.userId()})
        Session.set('yellvalue','')
      }
    }
    else {
        Session.set('yellvalue','')
          Session.set('yellToEdit',false)
      Materialize.toast('Bro! You gotcha login.',4000);
    }
  }
  else {
    var item_id = Session.get('yellToEdit');
    if(Meteor.userId() === Yells.findOne({_id : item_id}).user)
    {
      Yells.update({_id : item_id},{$set : {yell : Session.get('yellvalue')}},function(err){
        if(err)
        {
          Materialize.toast(err.reason,4000);
        }
        else {
          Session.set('yellToEdit',false);
          Session.set('yellvalue','')
        }
      })
    }
    else {
      Session.set('yellvalue','')
        Session.set('yellToEdit',false)
      Materialize.toast('Dude! You dont own that yell!',4000);
    }

  }





  return false;
},

'click #loadmore' : function(event,template){

  var limit = Session.get('limit');
  Session.set('limit',5+limit);
},

'click .deleteItem' : function(event,template){
  var item_id = event.currentTarget.dataset.id;
  if(Meteor.userId() === Yells.findOne({_id : item_id}).user)
  {
    Yells.remove({_id : item_id},function(err){
      if(err)
      {
        Materialize.toast(err.reason,4000);
      }
    });
  }
  else {
    Session.set('yellvalue','')
      Session.set('yellToEdit',false)
    Materialize.toast('Dude!! Get a life! Go log in.',4000);
  }

  return false;
},

'click .editItem' :function(event,template){
  var item_id = event.currentTarget.dataset.id;
  Session.set('yellToEdit',item_id);
  Session.set('yellvalue',Yells.findOne({_id : item_id}).yell);
  return false;
}

})
