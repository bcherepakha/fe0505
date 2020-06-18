class ConfirmMessage {
    constructor(props) {
        this._props = props;
        this._el = document.querySelector('.confirm');
        this._textEl = this._el.querySelector('.confirm__text');
        this._actions = Array.from(this._el.querySelectorAll('.confirm__action'));

        this._actions.forEach(actionBtn => {
            const actionName = actionBtn.dataset.action;

            this._actions[actionName] = actionBtn;
            actionBtn.addEventListener('click', this.doAction.bind(this, actionName));
        });
    }

    doAction(actionName) {
        if (this._props.onAction && this._props.onAction[actionName]) {
            this._props.onAction[actionName](); // this = this._props.onAction;
        }
    }

    show(message) {
        this._textEl.innerText = message;
        this._el.hidden = false;
    }

    hide() {
        this._el.hidden = true;
    }
}
