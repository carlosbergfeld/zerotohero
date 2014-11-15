Meteor.publish('teamTasks', function (teamCity, teamName) {
  var team = Teams.findOne({
    citySlug: teamCity,
    nameSlug: teamName
  });
  return Tasks.find({team: team._id});
});

Meteor.publish('allTasks', function () {
  return Tasks.find();
});

Meteor.publish('allTeams', function () {
  return Teams.find();
});