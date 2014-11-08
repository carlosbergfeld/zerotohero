Meteor.startup(function () {
  if (typeof CHECKLIST === 'undefined') {
    CHECKLIST = {
      'problemaDefinido': 'Problema definido',
      'problemaValidado': 'Problema validado',
      'solucaoDefinida': 'Solução definida',
      'solucaoValidada': 'Solução validada',
      'pitchPronto': 'Pitch pronto'
    };
  } 
});