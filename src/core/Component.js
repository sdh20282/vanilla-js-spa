import reactive from "./Reactivity.js";

export default class Component {
  state;
  target;

  constructor({ target }) {
    this.target = target;
    this.state = {};

    this.render();
  };

  initReactiveProxy() {
    this.state = reactive({ target: this.state, callback: this.render.bind(this) })
    this.render();
  }

  templete() { return `` };

  setEvent() { };

  render() {
    this.target.innerHTML = this.templete();

    this.setEvent();
  };
}