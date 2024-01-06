import AbstractPage from "../../classes/AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Settings");
  }

  async render() {
    return `
      <h1>Posts</h1>
      <p>You're viewing the Settings!</p>
    `;
  }
}