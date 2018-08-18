const GAIN_SCALE_FACTOR = 0.1

import { interval } from '_redux/Store'
import store from '_redux/Store'

export default class SoundManager {

	constructor() {
		this.audioCtx = new AudioContext();
		this.nodes = []

		this.interval = store.getState().interval

		let sub = store.subscribe(() => {
			let state = store.getState()
			this.interval = state.interval	
		})
	}

	addNode(id) {		
		var oscillator = this.audioCtx.createOscillator();
		oscillator.type = 'sine';
		
		const gainNode = this.audioCtx.createGain()
		gainNode.gain.value = 0
		oscillator.connect(gainNode);
		gainNode.connect(this.audioCtx.destination)

		oscillator.start()

		const audioNode = {oscNode: oscillator, gainNode: gainNode, id: id}
		
		this.nodes.push(audioNode)
		return audioNode
	}


	updateNodeWithMetric(node, metric) {

		node.oscNode.frequency.value = ((1 - metric.size) * this.interval) + 50
		node.gainNode.gain.value = metric.proximity * GAIN_SCALE_FACTOR
	}

	updateWithMetrics(metrics) {

		var nodesToDelete = []
		var metricsToAdd = []
		
		// find nodes to delete
		this.nodes.forEach(node => {
			const metric = metrics.find(metric => metric.id == node.id)
			if (!metric) {
				nodesToDelete.push(node)
			}
		})

		// find nodes to add
		metrics.forEach(metric => {
			const node = this.nodes.find(node => node.id == metric.id)
			if (!node) {
				metricsToAdd.push(metric)
			}
		})

		// ad nodes
		metricsToAdd.forEach(metric => {
			this.addNode(metric.id)
		})

		// removes nodes
		nodesToDelete.forEach(nodeToDelete => {
			nodeToDelete.gainNode.disconnect()
			nodeToDelete.oscNode.disconnect()
			this.nodes = this.nodes.filter(node => node.id != nodeToDelete.id)
		})

		// update remaining nodes
		this.nodes.forEach(node => {
			const metric = metrics.find(metric => metric.id == node.id)
			this.updateNodeWithMetric(node, metric)
		})
	}
}






