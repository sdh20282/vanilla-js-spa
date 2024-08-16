import Component from "../../core/Component.js";

export default class Setting extends Component {
  constructor() {
    super().init();
  }

  render() {
    return `
      <h1>Settings</h1>
      <p>You're viewing the Settings!</p>
    `;
  }
}