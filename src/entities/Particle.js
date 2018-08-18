// construct particles

export default class Particle {

	constructor(id, posX, posY, velX, velY, size) {


		this.id = id
		this.position = { x: posX, y: posY }
		this.velocity = { x: velX, y: velY }
		this.size = size
		this.neighbor = null
		
		this.distance = 0
		this.proximity = 0

	}
}
