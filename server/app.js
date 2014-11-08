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
});