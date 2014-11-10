Teams = new Mongo.Collection('teams');

Meteor.methods({
  createTeam: function (teamName, teamEmail, teamEvent, teamPitch) {
    Teams.insert({
      name: teamName,
      eventName: teamEvent,
      pitch: teamPitch
    });

    if (Meteor.isServer) {
      _.each(CHECKLIST, function (task, index) {
        Tasks.insert({
          position: index,
          team: teamName,
          text: task.text,
          hasCounter: task.hasCounter
        });
      });

      // create a user for the team
      var userId = Accounts.createUser({
        username: teamName,
        email: teamEmail,
        profile: {isTeam: true}
      });
      Accounts.sendEnrollmentEmail(userId);
    }
  }
});