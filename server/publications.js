Meteor.publish('teamTasks', function () {
  var user;
  if (this.userId) {
    user = Meteor.users.findOne({_id: this.userId});
    return Tasks.find({team: user.profile.team}, {sort: {position: 1}});
  } else {
    this.ready();
  }
});

Meteor.publish('allTeams', function () {
  return Teams.find();
});