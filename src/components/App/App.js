import React from "react";
import Styles from "./App.css";
import Controls from "_components/Controls/Controls";
import Stage from "_components/Stage/Stage";

import ABSlider from 'ab-slider'

var Slider = ABSlider.default



const App = () => {
	return (
		<div className={Styles.Main}>
		
 <Controls/>
 		 <Stage />			
			
		</div>
	);
};

export default App;


