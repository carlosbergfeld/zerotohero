Template.taskList.helpers({
  tasks: Tasks.find()
});

Template.task.events({
  'click .toggle-checked': function () {
    Tasks.update(this._id, {$set: {checked: ! this.checked}});
  }
});