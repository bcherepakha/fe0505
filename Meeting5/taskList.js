function TaskList() {
    // this = {}

    this._el = document.querySelector('.todo-list');

    this.render = function(tasks) {
        const tasksCollection = tasks.map( renderTask );

        console.log( 'tasks', tasks );
        console.log( 'tasksCollection', tasksCollection );

        this._el.innerText = '';
        this._el.append(...tasksCollection);
    }

    function renderTask(task) {
        const {id, title, completed} = task;
        const li = document.createElement('li'),
            view = document.createElement('div'),
            form = document.createElement('form'),
            toggleEl = document.createElement('input'),
            titleEl = document.createElement('span'),
            destroyBtn = document.createElement('button'),
            editEl = document.createElement('input'),
            submitEl = document.createElement('button');

        li.append(view, form);
        view.append(toggleEl, titleEl, destroyBtn);
        form.append(editEl, submitEl);

        li.dataset.id = id;
        view.classList.add('view');
        toggleEl.classList.add('toggle');
        toggleEl.setAttribute('type', 'checkbox');
        toggleEl.checked = completed;
        titleEl.innerText = title;
        destroyBtn.classList.add('destroy');
        editEl.classList.add('edit');
        editEl.value = title;
        submitEl.classList.add('visually-hidden');
        submitEl.type = 'submit';

        return li;
    }

    // return this;
}
