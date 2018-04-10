import React from "react";
import About from "Component/About/About";
import Home from "Component/Home/Home";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			layer: 1
		};

		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(layer) {
		setTimeout(
			function() {
				this.setState({
					layer: layer
				});
			}.bind(this),
			2000
		);
	}
	render() {
		switch (this.state.layer) {
			case 1:
				return <Home clickHandler={this.clickHandler} />;
			case 2:
				return <About />;
			default:
				return <div>state layer not found, what are you doing?</div>;
		}
	}
}

