import Component from "../../core/Component.js";

import Counter from "./Counter.js";

export default class Dashboard extends Component {
	constructor() {
		super().init();
	}

	components = {
		'child-component': Counter,
	};

	render() {
		return `
			<h1>Welcome! this is parent test</h1>
			<child-component title="this is child"></child-component>
		`
	};
}