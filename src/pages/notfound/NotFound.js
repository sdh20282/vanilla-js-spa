import AbstractPage from "../../classes/AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Posts");
  }

  async render() {
    return `
   	 <p>404 Not Found!</p>
    `;
  }
}