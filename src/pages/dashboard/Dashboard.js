import Component from "../../core/Component.js";

export default class extends Component {
  templete() {
    return `
		<h1>Welcome!</h1>
		<p>This is Dashboard page.</p>
		<a href="/posts" data-link>
			View recent posts
		</a>
	`
  }
}