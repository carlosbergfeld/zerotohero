Teams = new Mongo.Collection('teams');

Meteor.methods({
  createTeam: function (teamName, teamEmail, teamCity, teamPitch) {
    var teamId = Teams.insert({
      name: teamName,
      nameSlug: teamName.replace(/ /g,'').toLowerCase(),
      city: teamCity,
      citySlug: teamCity.replace(/ /g,'').toLowerCase(),
      pitch: teamPitch
    });

    if (Meteor.isServer) {
      _.each(CHECKLIST, function (task, index) {
        Tasks.insert({
          position: index,
          team: teamId,
          text: task.text,
          hasCounter: task.hasCounter
        });
      });

      // create a user for the team
      var userId = Accounts.createUser({
        username: teamCity.toLowerCase() + teamName.toLowerCase(),
        email: teamEmail,
        profile: {
          team: teamId
        }
      });
      Accounts.sendEnrollmentEmail(userId);
    }
  }
});