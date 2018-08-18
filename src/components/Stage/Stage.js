import React from "react";
import Styles from "./Stage.css";

import Orchestrator from "_managers/Orchestrator";

export default class Stage extends React.Component {
	constructor(props) {
		super(props);

		this.orchestrator = null;
	}

	gotRef(ref) {

		this.orchestrator = new Orchestrator(ref);
		this.orchestrator.configure()
	}

	componentDidMount() {
		this.orchestrator.configure()
		this.orchestrator.start();
	}

	render() {
		return (
			<div className={Styles.CanvasContainer}>
				<canvas
					className={Styles.Canvas}
					width={0}
					height={0}
					ref={ref => {
						if (ref) {
							this.gotRef(ref);
						}
					}}
				/>
			</div>
		);
	}
}
