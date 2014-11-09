Meteor.startup(function () {
  if (typeof CHECKLIST === 'undefined') {
    CHECKLIST = {
      'problemaDefinido': {
        text: 'Problema definido',
        hasCounter: true
      },
      'problemaValidado': {
        text: 'Problema validado',
        hasCounter: true
      },
      'solucaoDefinida': {
        text: 'Solução definida',
        hasCounter: true
      },
      'solucaoValidada': {
        text: 'Solução validada',
        hasCounter: true
      },
      'pitchPronto': {
        text: 'Pitch pronto',
        hasCounter: true
      }
    };
  }

  if (Teams.find().count() === 0) {
    Teams.insert({name: 'Stripe', logo: 'logo'});
  }

  if (Tasks.find().count() === 0) {
    _.each(CHECKLIST, function (task) {
      Tasks.insert({text: task.text});
    });
  }
});