export class Transplants {
  constructor (props = {}) {
    this._props = props;
    this._formEl = document.querySelector(props.selector);
    this._transplantAllEl = this._formEl.querySelector('[name=transplant_all]');
    this._inputCollection = Array.from(
      this._formEl.querySelectorAll('.transplant__checkbox:not([name=transplant_all])')
    );
    this._transplants = this.getCheckedTransplants();

    this._formEl.addEventListener('change', this.changeTransplants.bind(this));
  }

  setCheckedForAll (checked) {
    this._inputCollection.forEach(input => { input.checked = checked; });
  }

  changeTransplants (event) {
    const { target } = event;

    if (target === this._transplantAllEl) {
      this.setCheckedForAll(target.checked);
      this._transplants = this.getCheckedTransplants();
    } else {
      this._transplants = this.getCheckedTransplants();

      if (this._transplants.length === this._inputCollection.length) {
        this._transplantAllEl.checked = true;
      } else {
        this._transplantAllEl.checked = false;
      }
    }

    this._props.onChangeTransplants();
  }

  getTransplants () {
    return [...this._transplants];
  }

  getCheckedTransplants () {
    // console.log(this._inputCollection.map(input => ({
    //   // value: input.getAttribute('data-value')
    //   value: +input.dataset.value,
    //   checked: input.checked
    // })));

    return this._inputCollection
      .map(input => input.checked ? +input.dataset.value : null)
      .filter(value => value !== null);
  }
}
