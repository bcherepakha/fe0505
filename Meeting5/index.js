const addForm = new AddForm({
    onAddTask
});

const tasks = new Tasks([
    {
        id: 1,
        title: 'Task 1',
        completed: false
    },
    {
        id: 2,
        title: 'Task 2',
        completed: true
    }
]);
const taskList = new TaskList();

console.log( taskList );

taskList.render( tasks.getAllTasks() );

function onAddTask(task) {
    const {result, error} = tasks.addTask(task);

    if (result) {
        console.log('task added', tasks.getAllTasks());

        taskList.render( tasks.getAllTasks() );
    } else {
        console.error('task not added', error, tasks.getAllTasks(), task);
    }
}
