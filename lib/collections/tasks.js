Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  toggleTask: function (task) {
    Tasks.update(task._id, {$set: {checked: ! task.checked}});
  }
});