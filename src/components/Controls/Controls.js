import React from "react";

import Styles from "./Controls.css";

import {
	setInterval,
	setEaseCurve,
	setResolution,
	setNumEntities,
	setFramerate
} from "_redux/Store";


import {
	selectEaseCurve,
	selectInterval,
	selectResolution,
	selectNumEntities,
	selectFramerate
} from '_redux/Store'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Control from "./Control";

import ABSlider from "ab-slider";

var Slider = ABSlider.default;

const Controls = (props) => {

	console.log(props)

	return (
		<div className={Styles.TopRight}>
			<div className={Styles.inner}>
				<Control name={"ease curve"} action={props.setEaseCurve} initialValue={props.easeCurve} />
				<Control name={"interval"} action={props.setInterval} initialValue={props.interval}/>
				<Control name={"resolution"} action={props.setResolution} initialValue={props.resolution} />
				<Control name={"number of entities"} action={props.setNumEntities}initialValue={props.numEntities} />
				<Control name={"framerate"} action={props.setFramerate} initialValue={props.framerate} />
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		easeCurve: selectEaseCurve(state),
		interval: selectInterval(state),
		resolution: selectResolution(state),
		numEntities: selectNumEntities(state),
		framerate: selectFramerate(state),
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ setInterval, setEaseCurve, setResolution, setNumEntities, setFramerate },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
