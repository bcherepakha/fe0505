const calculator = {
    enter: '',
    _actions: ['-', '+'],
    addNumber( num ) {
        this.enter += num;

        this.render();
    },
    addAction( actionName ) {
        this.enter += ' ';
        this.enter += actionName;
        this.enter += ' ';

        this.render();
    },
    findFirstActionInString( enter ) {
        const positions = this._actions
            .map(
                function(actionName) {
                    return {
                        actionName,
                        position: enter.indexOf(actionName)
                    }
                }
            )
            .filter(
                function(actionData) { return actionData.position > -1; }
            )
            .sort(
                function(actionData1, actionData2) {
                    return actionData1.position - actionData2.position;
                }
            )
            .map(
                function(actionData, idx, data) {
                    const nextData = idx < data.length - 1
                        ? data[idx + 1]
                        : null;
                    const endPosition = nextData
                        ? nextData.position - 1
                        : enter.length;

                    // console.log( {actionData, idx, data, nextData, endPosition} );
                    return {
                        ...actionData,
                        before: enter.slice(0, actionData.position - 1),
                        after: enter.slice(actionData.position + actionData.actionName.length + 1, endPosition)
                    }
                }
            );

        return positions;
    },
    eval() {
        this.enter = this.calculate(this.enter);

        this.render();
    },
    calculate(enter) {
        // console.log( 'enter', enter );
        // console.log( 'ActionInString', this.findFirstActionInString(enter) );

        const actions = this.findFirstActionInString(enter);

        if (!actions.length) {
            return parseFloat(enter);
        }

        for (let i=0; i<actions.length; i++) {
            // const before = actions[i].before;
            // const after = actions[i].after;
            // const actionName = actions[i].actionName;
            const {before, after, actionName} = actions[i];
            const actionsAfter = this.findFirstActionInString(after);

            if (actionsAfter.length === 0) {
                // считаем дальше
                return this.doAction(actionName, before, after);
            } else {
                // считать не можем
                const calculatedValue = this.doAction(actionName, before, actionsAfter[0].before);
                const nextAction = actionsAfter[0].actionName;
                const after = actionsAfter[0].after;

                return this.calculate( `${calculatedValue} ${nextAction} + ${after}` );
            }
        }
    },
    doAction(actionName, before, after) {
        // console.log( {actionName, before, after} );
        switch(actionName) {
            case '+':
                return parseFloat(before) + parseFloat(after);
            case '-':
                return parseFloat(before) - parseFloat(after);
        }
    },
    render() {
        console.log(this.enter);
    }
};

calculator.addNumber(1);
calculator.addNumber(2);
calculator.addAction('+');
calculator.addNumber(2);
calculator.addNumber(3);
calculator.addAction('-');
calculator.addNumber(5);
calculator.addAction('+');
calculator.addNumber(9);
calculator.eval();
