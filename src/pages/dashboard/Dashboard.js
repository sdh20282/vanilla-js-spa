import Component from "../../core/Component.js";

import Counter from "./Counter.js";

export default class Dashboard extends Component {
	components = {
		'child-component': Counter,
	};

	render() {
		return `
			<h1>Welcome! this is parent</h1>
			<child-component title="this is child"></child-component>
		`
	};
}