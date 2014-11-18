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


  // fixtures
  if (Teams.find().count() === 0) {
    Teams.insert({
      name: 'Vigilantes',
      nameSlug: 'vigilantes',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Vigie tudo ao seu redor'
    });
    Teams.insert({
      name: 'Twitter',
      nameSlug: 'twitter',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Conte e receba notícias do mundo inteiro'
    });
    Teams.insert({
      name: 'Stripe',
      nameSlug: 'stripe',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Pagaments para startups'
    });
    Teams.insert({
      name: 'Postmates',
      nameSlug: 'postmates',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Receba seus pratos favoritos de qualquer restaurante em sua casa'
    });
    Teams.insert({
      name: 'Slack',
      nameSlug: 'slack',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Comunicação de time, sem email'
    });
    Teams.insert({
      name: 'Uber',
      nameSlug: 'uber',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Um carro à sua disposição, com um toque no seu celular'
    });
    Teams.insert({
      name: 'Facebook',
      nameSlug: 'facebook',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Fofoque com todos seus amigos'
    });
    Teams.insert({
      name: 'Airbnb',
      nameSlug: 'airbnb',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Hospéde-se por um preço muito menor em lares em 190 países'
    });
    Teams.insert({
      name: 'Buffer',
      nameSlug: 'buffer',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'A forma mais fácil de publicar nas mídias sociais'
    });
    Teams.insert({
      name: 'ZeroToHero',
      nameSlug: 'zerotohero',
      city: 'Palmas',
      citySlug: 'palmas',
      pitch: 'Acompanhe o desempenho dos times do StartupWeekend'
    });

    var teams = Teams.find().fetch();
    _.each(teams, function (team) {
      _.each(CHECKLIST, function (task, index) {
        Tasks.insert({
          position: index,
          team: team._id,
          text: task.text,
          hasCounter: task.hasCounter
        });
      });
    });
  }

});