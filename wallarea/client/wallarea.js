Template.wallarea.onRendered(function(){

  Session.set('limit',5);
})


Template.wallarea.helpers({
  yells : function(){
    return Yells.find({},{sort: {yell : 1},limit: Session.get('limit'),fields : {yell: 1}});
  }
})


Template.wallarea.events({
'submit #yellbox' : function(event,template){
  var yellvalue= event.currentTarget.yelltext.value;
  Yells.insert({yell : yellvalue,date : new Date()})
  event.currentTarget.yelltext.value = '';
  return false;
},

'click #loadmore' : function(event,template){

  var limit = Session.get('limit');
  Session.set('limit',5+limit);
}
})
