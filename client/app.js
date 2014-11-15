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
        teamCity = $(template.find('[name=teamCity]')).val(),
        teamPitch = $(template.find('[name=teamPitch]')).val();

    event.preventDefault();

    Meteor.call('createTeam', teamName, teamEmail, teamCity, teamPitch);
  }
});

Template.tasks.helpers({
  progress: function () {
    var teamId = this.team._id;

    var completed = Tasks.find({team: teamId, checked: true}).count();
    var total = Tasks.find({team: teamId}).count();

    return (completed / total) * 100;
  }
});

Template.task.events({
  'click .toggle-checked': function () {
    Meteor.call('toggleTask', this);
  }
});

Template.cityPage.rendered = function () {
  var self = this;

  var teams = Teams.find({citySlug: 'palmas'}).fetch();
  var fD = teams.map(function (team) {
    var teamId = team._id;

    var completed = Tasks.find({team: teamId, checked: true}).count();
    var total = Tasks.find({team: teamId}).count();

    return [team.name, (completed / total) * 100];
  });

  var id = "#dashboard";
  var barColor = 'steelblue';

  var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
  hGDim.w = 100 * fD.length - hGDim.l - hGDim.r, 
  hGDim.h = 300 - hGDim.t - hGDim.b;

  //create svg for histogram.
  var hGsvg = self.find('svg') || d3.select(id).append("svg")
      .attr("width", hGDim.w + hGDim.l + hGDim.r)
      .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
      .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

  // create function for x-axis mapping.
  var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.2)
          .domain(fD.map(function(d) { return d[0]; }));

  // Add x-axis to the histogram svg.
  hGsvg.append("g").attr("class", "x axis")
      .attr("transform", "translate(0," + hGDim.h + ")")
      .call(d3.svg.axis().scale(x).orient("bottom"));

  // Create function for y-axis map.
  var y = d3.scale.linear().range([hGDim.h, 0])
          .domain([0, 100]);

  // Create bars for histogram to contain rectangles and freq labels.
  var bars = hGsvg.selectAll(".bar").data(fD).enter()
          .append("g").attr("class", "bar");
  
  //create the rectangles.
  bars.append("rect")
      .attr("x", function(d) { return x(d[0]); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return hGDim.h - y(d[1]); })
      .attr('fill',barColor);// mouseout is defined below.
      
  //Create the frequency labels above the rectangles.
  bars.append("text").text(function(d){ return d3.format(",")(d[1])})
      .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
      .attr("y", function(d) { return y(d[1])-5; })
      .attr("text-anchor", "middle");
  
  // create function to update the bars. This will be used by pie-chart.
  var updateHistogram = function (nD, color) {
      // Attach the new data to the bars.
      var bars = hGsvg.selectAll(".bar").data(nD);
      
      // transition the height and color of rectangles.
      bars.select("rect").transition().duration(500)
          .attr("y", function(d) {return y(d[1]); })
          .attr("height", function(d) { return hGDim.h - y(d[1]); })
          .attr("fill", color);

      // transition the frequency labels location and change value.
      bars.select("text").transition().duration(500)
          .text(function(d){ return d3.format(",")(d[1])})
          .attr("y", function(d) {return y(d[1])-5; });            
  }

  Deps.autorun(function () {
    teams = Teams.find({citySlug: 'palmas'}).fetch();
    freqData = teams.map(function (team) {
      var teamId = team._id;

      var completed = Tasks.find({team: teamId, checked: true}).count();
      var total = Tasks.find({team: teamId}).count();

      return [team.name, (completed / total) * 100];
    });

    updateHistogram(freqData, 'steelBlue');
  });
};