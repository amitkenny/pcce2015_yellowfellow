Meteor.methods({
  'updateYell': function(id, newYellValue) {

      if(this.isSimulation){

          Yells.update({_id : id},{$set : {yell : 'updating'}});

      }

    if (this.userId) {
      if (id.length > 0 && _.isString(id)) {
        if (Yells.findOne({
            _id: id
          })) {

            var yell = Yells.findOne({
                _id: id
              });

          if(yell.user === this.userId){

                if(_.isString(newYellValue)){
                    if( newYellValue.length >= 5 && newYellValue.length<140 ){

                          return Yells.update({_id : id},{$set : {yell : newYellValue.trim()}});
                    }
                    else {
                        throw new Meteor.Error('invalidyell', 'Your yell must be between 5 and 140 characters only.');
                    }
                }
                else {
                    throw new Meteor.Error('invalidyell', 'Yell must be a string');
                }
          }
          else {
            throw new Meteor.Error('accessdenied', 'Access Denied. You can only update you own yell.');
          }



        } else {
          throw new Meteor.Error('invalidYellErr', 'The Yell you are trying to update does not exist!')

        }
      } else {
        throw new Meteor.Error('invalidYellErr', 'The Yell you are trying to update does not exist!')

      }
    } else {

        throw new Meteor.Error('accessdenied', 'Access Denied. You have to login to update the Yell');
    }



  }
})
