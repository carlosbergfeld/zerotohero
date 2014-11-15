Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () {
    return Meteor.subscribe('allTeams');
  }
});

Router.route('/', function () {
  this.render('landingPage');
});

Router.route('/:cityName', {
  waitOn: function () {
    return Meteor.subscribe('allTasks');
  },
  data: function () {
    var teamsPercentages = {};

    var teams = Teams.find({citySlug: this.params.cityName.toLowerCase()});
    teams.forEach(function (team) {
      var teamId = team._id;

      var completed = Tasks.find({team: teamId, checked: true}).count();
      var total = Tasks.find({team: teamId}).count();

      teamsPercentages[team.name] = (completed / total) * 100;
    });

    return {
      teamsPercentages: teamsPercentages
    };
  },
  action: function () {
    this.render('cityPage');
  }
});

Router.route('/:cityName/:teamName', {
  waitOn: function () {
    return Meteor.subscribe(
      'teamTasks',
      this.params.cityName.toLowerCase(),
      this.params.teamName.toLowerCase()
    );
  },
  data: function () {
    return {
      team: Teams.findOne({
        citySlug: this.params.cityName.toLowerCase(),
        nameSlug: this.params.teamName.toLowerCase()
      }),
      tasks: Tasks.find({}, {sort: {position: 1}})
    };
  },
  action: function () {
    this.render('tasks');
  }
});

Router.route('/admin', function () {
  this.render('adminPage');
});

/*
/palmas/vigilantes
/sw/palmas/vigilantes
/city/palmas/vigilantes
/event/palmas/vigilantes
*/

// Tasks.findOne({city: 'Palmas', team: 'Vigilantes'});
// stripe@stripejfdslkj.com

// username: teamCity + teamName,
// email: teamEmail,
// profile: {isTeam: true}

/*
var user,
    team;

if (this.userId) {
  user = Meteor.users.findOne({_id: this.userId});
  team = Meteor.teams.findOne({_id: user.profile.team});
  console.dir(user);
  console.dir(team);
  return Tasks.find({team: team._id}, {sort: {position: 1}});

 */