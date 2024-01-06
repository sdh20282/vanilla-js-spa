import AbstractPage from "../../classes/AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Posts");
  }

  async render() {
    return `
      <h1>Posts</h1>
      <p>You're viewing the posts!</p>
    `;
  }
}