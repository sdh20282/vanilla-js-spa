import AbstractPage from "../../classes/AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async render() {
    return `
		<h1>Welcome!</h1>
		<p>This is Dashboard page.</p>
		<a href="/posts" data-link>
			View recent posts
		</a>
	`
  }
}