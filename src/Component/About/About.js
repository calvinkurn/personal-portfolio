import React from "react";
import style from "./About.css";
import Type from "../Type/Type";
import ImgParticle from "Component/ImgParticle/ImgParticle.js";
import img from "haunter_bold.png";

const wordList = [
	"The difference between a dreamer and a visionary is that a dreamer has his eyes closed and a visionary has his eyes open - Martin Luther King Jr",
	"Time is the single most precious commodity in the universe — Jupiter Ascending"
];

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
						<div className={style.static_content}>
							<div className={style.section_name}>Calvin</div>
							<div className={style.section_summary}>Summary</div>
							<div className={style.section_skill}>
								<div>Skill</div>
								<ul style={{ columns: "2" }}>
									<li>HTML & HTML5</li>
									<li>CSS / CSS Pre-Processors</li>
									<li>JS</li>
									<li>React</li>
									<li>Web Programming (JSP & PHP)</li>
									<li>PHP Framework (Laravel & CodeIgniter)</li>
									<li>C</li>
									<li>C++</li>
									<li>C#</li>
									<li>Java</li>
									<li>Microsoft SQL Server & MySql</li>
									<li>
										Design (Adobe Photoshop, CorelDraw, Adobe After Effect,
										Adobe Premier)
									</li>
									<li>Visual Basic</li>
								</ul>
							</div>
							<div className={style.section_work}>
								<div>Work History</div>
								<table>
									<tbody>
										<tr>
											<td>04/2017 to now</td>
											<td>
												<div>Frontend Developer - Tokopedia</div>
												<div>Job Desk</div>
											</td>
										</tr>
										<tr>
											<td>02/2015 to 03/2017</td>
											<td>
												<div>
													Teaching Assistant - Bina Nusantara University
												</div>
												<div>Job Desk</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className={style.section_project}>
								<div>Project History</div>
								<table>
									<tbody>
										<tr>
											<td>02/2018 to 05/2018</td>
											<td>
												<div>Full stack Developer - Freelance</div>
												<div>
													Papoea by nature website (papoea-by-nature.com)
												</div>
											</td>
										</tr>
										<tr>
											<td>02/2017 to 03/2017</td>
											<td>
												<div>Frontend Developer - Freelance</div>
												<div>
													Hendithamrin personal website (hendithamrin.com)
												</div>
											</td>
										</tr>
										<tr>
											<td>05/2016 to 05/2016</td>
											<td>
												<div>Backend Developer - Freelance</div>
												<div>
													Talenta On-store website (talenta-onstore.co.id)
												</div>
											</td>
										</tr>
										<tr>
											<td>10/2015 to 10/2015</td>
											<td>
												<div>Frontend Developer - Freelance</div>
												<div>MvLydia boutique website (mvlydia.com)</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className={style.section_education}>
								<div>Education</div>
								<table>
									<tbody>
										<tr>
											<td>2017</td>
											<td>
												<div>Bina Nusantara University</div>
												<div>Bachelor's degree: Computer Science</div>
											</td>
										</tr>
										<tr>
											<td>2013</td>
											<td>
												<div>Bonavita Senior High School</div>
												<div>Multimedia class</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className={style.type_wrapper}>
							<Type word={wordList} waitingTime={7500} typoRate={0.05} />
						</div>
					</div>
				</div>
				{this.state.imageParticle && <ImgParticle />}
			</React.Fragment>
		);
	}
}

export default About;
