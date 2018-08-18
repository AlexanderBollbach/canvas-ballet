import { createStore, combineReducers } from "redux";

const INITIAL_STATE = {
	resolution: 0.5,
	numParticles: 10,
	easeCurve: 15,
	interval: 280,
	numEntities: 0,
	framerate: 60
};
const rootReducer = function(state = INITIAL_STATE, action) {
	// assumed 0-1 input range from action object
	switch (action.type) {
		case "SET_INTERVAL":
			return {
				...state,
				interval: action.interval * 1000
			};
		case "SET_EASECURVE":
			return {
				...state,
				easeCurve: action.easeCurve * 80
			};

		case "SET_RESOLUTION":
			return {
				...state,
				resolution: action.resolution
			};
		case "SET_NUM_ENTITIES":
			return {
				...state,
				numEntities: Math.floor(action.numEntities * 25)
			};
		case "SET_FRAMERATE":
			return {
				...state,
				framerate: action.framerate * 60
			};
	}

	return state;
};

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

export const setInterval = interval => ({
	type: "SET_INTERVAL",
	interval
});
export const setEaseCurve = easeCurve => ({
	type: "SET_EASECURVE",
	easeCurve
});

export const setResolution = resolution => ({
	type: "SET_RESOLUTION",
	resolution
});

export const setNumEntities = numEntities => ({
	type: "SET_NUM_ENTITIES",
	numEntities
});


export const setFramerate = framerate => ({
	type: "SET_FRAMERATE",
	framerate
});


export const selectEaseCurve = state => {
	return state.easeCurve / 80;
}
export const selectFramerate = state => {
	return state.framerate / 60;
}
export const selectResolution = state => {
	return state.resolution / 1.0;
}
export const selectNumEntities = state => {
	return state.numEntities / 25;
}
export const selectInterval = state => {
	return state.interval / 1000;
}