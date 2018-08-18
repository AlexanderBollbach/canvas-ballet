import SoundManager from "./SoundManager.js";
import { resolutionScaleFactor, easePower } from "_redux/Store";
import store from "_redux/Store";

export default class CanvasManager {
	constructor(canvas) {
		this.store = store;
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.resolutionScaleFactor = 0

		this.store.subscribe(() => {
			this.resolutionScaleFactor = this.store.getState().resolution;
			this.refresh();
		});

		this.w = 0;
		this.h = 0;

		this.refresh();

		this.canvas.width =
			this.canvas.parentNode.clientWidth * this.resolutionScaleFactor;
		this.canvas.height =
			this.canvas.parentNode.clientHeight * this.resolutionScaleFactor;

		window.onresize = () => {
			this.refresh();
		};
	}

	refresh() {
		this.canvas.width =
			this.canvas.parentNode.clientWidth * this.resolutionScaleFactor;
		this.canvas.height =
			this.canvas.parentNode.clientHeight * this.resolutionScaleFactor;

		this.w = this.canvas.width;
		this.h = this.canvas.height;
	}

	updateGraphicsWithEntities(entities) {
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.updateBackground();
		this.drawEntities(entities);
		this.drawConnections(entities);
	}

	updateBackground() {
		
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.w, this.h);
	}

	drawEntities(entities) {
	
		entities.forEach(entity => {
			
			this.ctx.beginPath();
			
			this.ctx.arc(
				entity.position.x * this.w,
				entity.position.y * this.h,
				entity.size * 10,
				0,
				Math.PI * 2,
				true
			);

			this.ctx.closePath()

			// fill style
			const amount1 = entity.proximity + 0.3;
			const fillString = "rgba(230,0,220," + amount1 + ")";
			this.ctx.fillStyle = fillString;

			// stoke style
			this.ctx.strokeStyle = "white";
			this.ctx.lineWidth = entity.proximity * 10

			this.ctx.fill();
			this.ctx.stroke();
			
		});
	}

	drawConnections(entities) {
		
		entities.forEach(e => {

			if (!e.neighbor) {
				return 
			}
			this.ctx.beginPath();
			const alpha = e.proximity;
			this.ctx.strokeStyle = "rgba(255,255,255," + alpha + ")";
			this.ctx.lineWidth = e.proximity * 10;

			this.ctx.moveTo(e.position.x * this.w, e.position.y * this.h);

			this.ctx.lineTo(
				e.neighbor.position.x * this.w,
				e.neighbor.position.y * this.h
			);
			this.ctx.stroke();
			this.ctx.closePath()
		});
	}
}
