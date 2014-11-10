Meteor.subscribe('allTeams')
Meteor.subscribe('teamTasks');

Template.body.helpers({
  userIsAdmin: function () {
    if (Meteor.user().profile.role === "admin") {
      return true;
    }
  }
});

Template.adminPage.helpers({
  allTeams: Teams.find()
});

Template.adminPage.events({
  'click .add-team': function (event, template) {
    var teamName = $(template.find('[name=teamName]')).val(),
        teamEmail = $(template.find('[name=teamEmail]')).val(),
        teamEvent = $(template.find('[name=teamEvent]')).val(),
        teamPitch = $(template.find('[name=teamPitch]')).val();

    event.preventDefault();

    Meteor.call('createTeam', teamName, teamEmail, teamEvent, teamPitch);
  }
});

Template.tasks.helpers({
  team: function () {
    return Teams.findOne({name: Meteor.user().username});
  },
  tasks: function () {
    return Tasks.find({team: Meteor.user().profile.team});
  }
});

Template.task.events({
  'click .toggle-checked': function () {
    Meteor.call('toggleTask', this);
  }
});