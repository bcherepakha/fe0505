function Tasks (tasks = []) {
  // this = {}

  this._tasks = [];

  if (Array.isArray(tasks)) {
    this._tasks = this._tasks.concat(tasks);
  }

  this.getAllTasks = function () {
    return [...this._tasks]; // [].concat(this._tasks)
  };

  this.getCompletedTasks = function () {
    return this._tasks.filter(
      function ({completed}) { // completed = arguments[0].completed
        return completed;
      }
    );
  };

  this.getActiveTasks = function () {
    return this._tasks.filter(
      function ({completed}) { // completed = arguments[0].completed
        return !completed;
      }
    );
  };

  this.getTaskById = function (id) {
    return this._tasks.find(function (task) {
      return task.id === id;
    });
  };

  this.addTask = function (task) {
    if (!task.title || !task.id) {
      return {
        result: false,
        error: 'wrong task'
      };
    }

    if (this.getTaskById(task.id)) {
      return {
        result: false,
        error: 'dublicate id'
      };
    }

    this._tasks.push(task);

    return {
      result: true
    };
  };

  // return this;
}
