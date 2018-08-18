import SoundManager from '_managers/SoundManager'
import CanvasManager from '_managers/CanvasManager'
import EntitiesManager from '_managers/EntitiesManager'
import PhysicsManager from '_managers/PhysicsManager'
import store from "_redux/Store";

export default class Orchestrator {

	constructor(canvas) {

		this.framerate = 2	

		this.soundManager = new SoundManager()
		this.canvasManager = new CanvasManager(canvas)
		this.entitiesManager = new EntitiesManager()
		this.physicsManager = new PhysicsManager()

		this.loop = this.loop.bind(this)


		store.subscribe(() => {
			this.framerate = store.getState().framerate;
		});

	}

	start() {
		this.loop()
	}

	configure() {
		this.canvasManager.refresh()
	}
	
	loop() {
		this.entitiesManager.update()

		this.updatePhysics()
		this.updateSound()
		this.updateGraphics()

		const frameTime = (1 / this.framerate) * 1000

		console.log("frame time " + frameTime)

		setTimeout(this.loop, frameTime)
	}

	updatePhysics() {
		const entities = this.entitiesManager.getEntities()
		this.physicsManager.updateWithEntities(entities)
	}

	updateSound() {
		const metrics = this.entitiesManager.getSoundMetrics()
		this.soundManager.updateWithMetrics(metrics)
	}

	updateGraphics() {
		const entities = this.entitiesManager.getEntities()
		this.canvasManager.updateGraphicsWithEntities(entities)
	}
}