Meteor.startup(function () {
  if (typeof CHECKLIST === 'undefined') {
    CHECKLIST = [
      {
        text: 'Problema definido'
      },
      {
        text: 'Problema validado',
        hasCounter: true
      },
      {
        text: 'Solução definida'
      },
      {
        text: 'Solução validada',
        hasCounter: true
      },
      {
        text: 'Pitch pronto'
      }
    ];
  }

  // create first admin user, if none
  if (Meteor.users.find({'profile.role': 'admin'}).count() === 0) {
    var userId = Accounts.createUser({
      username: 'admin',
      email: 'carlos.bergfeld@gmail.com',
      profile: {role: 'admin'}
    });
    Accounts.sendEnrollmentEmail(userId);
  }

});