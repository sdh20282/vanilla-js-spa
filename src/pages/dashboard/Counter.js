import Component from "../../core/Component.js";

export default class Counter extends Component {
  state = { count: 0 };

  constructor() {
    super().init();
  }

  increase() {
    this.state.count++;
  }

  decrease() {
    this.state.count--;
  }

  render() {
    return `
      <div>
        <p>${this.props.title}</p>
        <p>${this.state.count}</p>
        <p>${this.state.count * 2}</p>
        <button click="increase">increase</button>
        <button click="decrease">decrease</button>
      </div>
    `
  }
}