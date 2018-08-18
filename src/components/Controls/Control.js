import React from "react";
import Styles from "./Control.css";

import ABSlider from "ab-slider";
var Slider = ABSlider.default;

const Control = ({ name, action, initialValue }) => {

	console.log(initialValue)
	return (
		<div className={Styles.Main}>
			<div className={Styles.Name}>{name || "N/A"}</div>
			<Slider valueChanged={action} initialValue={initialValue} />
		</div>
	);
};

export default Control;
