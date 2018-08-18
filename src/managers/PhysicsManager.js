import { computeDistance, ease } from '_src/Math/Math'

export default class PhysicsManager {
	

	updateWithEntities(entities) {
		entities.forEach(entity => {
			entity.position.x += entity.velocity.x;
			entity.position.y += entity.velocity.y;

			if (entity.position.x > 1) {
				entity.velocity.x = -Math.abs(entity.velocity.x);
			} else if (entity.position.x < 0) {
				entity.velocity.x = Math.abs(entity.velocity.x);
			}

			if (entity.position.y > 1) {
				entity.velocity.y =
					-Math.abs(entity.velocity.y) * Math.random() * 2;
			} else if (entity.position.y < 0) {
				entity.velocity.y = Math.abs(entity.velocity.y);
			}

			entity.neighbor = null;
			var runningDistance = 10000000; // high num

			entities.forEach(entity2 => {
				if (entity2 === entity) {
					return;
				}

				const distance = computeDistance(
					entity.position,
					entity2.position
				);

				if (distance < runningDistance) {
					runningDistance = distance;
					entity.neighbor = entity2;
					entity.distance = distance;
				}

				entity.proximity = ease(entity.distance);
			});
		});
	}
}
