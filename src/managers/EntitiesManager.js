import Particle from '_entities/Particle/'
import store from '_redux/Store'

export default class EntitiesManager {

	constructor() {

		this.currentId = 0
		this.entities = []
		this.store = store
		this.numEntities = 0

		this.sub = this.store.subscribe(() => {
			let state = store.getState()
			this.numEntities = state.numEntities
		})
	}

	update() {

		if (this.entities.length != this.numEntities) {
			const deltaEntities = this.numEntities - this.entities.length

			if (deltaEntities > 0) {
				this.addEntities(deltaEntities, 'particle')
			} else {
				this.removeEntities(Math.abs(deltaEntities), 'particle')
			}
			
		}
	}

	genId() {
		const newId = this.currentId
		this.currentId++
		return newId
	}
	
	addEntity(type) {
		switch (type) {
			case "particle":
			this.addParticle();
			break;
		}
	}

	removeEntity(type) {
		switch (type) {
			case 'particle':
			this.removeParticle()
			break;
		}
	}

	removeParticle() {

		const particles = this.getEntities('particle')
		const index = Math.round(Math.random() * particles.length - 1)
		this.entities.splice(index, 1)
	}

	getEntities(type) {
		switch (type) {
			case 'particle':
			return this.entities
		}
	}

	addEntities(count, type) {

		for (let i = 0; i < count; i++) {
			this.addEntity(type)
		}
	}

	removeEntities(count, type) {

		for (let i = 0; i < count; i++) {
			this.removeEntity(type)
		}

	}

	getSoundMetrics() {

		return this.entities.map(entity => {
			return {
				size: entity.size,
				proximity: entity.proximity,
				shouldPlay: entity.neighbor != null,
				id: entity.id
			}
		})
	}

	getEntities() {
		return this.entities
	}

	addParticle() {
		var rand = (Math.random() - 0.5) * 0.01
		var randPosX = Math.random()
		var randPosY = Math.random()
		var randSize = Math.random()

		const newId = this.genId()

		let newParticle = new Particle(
			newId,
			randPosX,
			randPosY,
			rand,
			rand,
			randSize,
			
			)

		this.entities.push(newParticle)
	}
}
