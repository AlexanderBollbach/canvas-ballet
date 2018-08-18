import { easePower } from '_redux/Store'
import store from '_redux/Store'

var easeCurve = 0

easeCurve = store.getState().easeCurve

let sub = store.subscribe(() => {

	let state = store.getState()
	easeCurve = state.easeCurve

})

export function computeDistance(position1, position2) {

	const deltaX = position2.x - position1.x
	const deltaY = position2.y - position1.y

	const xSquared = Math.pow(deltaX,2)
	const ySquared = Math.pow(deltaY,2)

	const distance = Math.sqrt(xSquared + ySquared)
	return distance
}

export function ease(distance) {

	const proximity = 1 - distance

	if (proximity <= 0) {
		return 0
	} else if (proximity >= 1) {
		return 1
	}

	const b =  (Math.pow(proximity, easeCurve)) / 1

	return b

}