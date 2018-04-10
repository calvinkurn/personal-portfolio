import React from "react";
import style from "./About.css";
import ImgParticle from "Component/ImgParticle/ImgParticle.js";
import img from "haunter_bold.png";

class About extends React.Component {
	constructor(props) {
		super();
		this.state = { imageParticle: false };
	}
	imgParticleHandler = () => {
		this.setState({ imageParticle: true });
	};
	render() {
		return (
			<React.Fragment>
				<div
					className={style.button__call__part}
					onClick={this.imgParticleHandler}
				>
					<img src={img} alt="Haunter" />
				</div>
				<div
					ref={ref => {
						this.canvasParent = ref;
					}}
					className={style.about_wrapper}
				>
					<div className={style.about_content}>
						lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem
						loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem
						loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem
						lorem
					</div>
				</div>
				{this.state.imageParticle && <ImgParticle />}
			</React.Fragment>
		);
	}
}

export default About;
