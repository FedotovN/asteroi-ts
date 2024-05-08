import GameObject, { GameObjectOptions } from "../../../engine/models/GameObject";
import Vector from "@/engine/models/Vector";
import degreesToRad from "@/engine/utils/degreesToRad";
import PolygonShape from "@/engine/models/Shape/PolygonShape";
import Rigidbody from "@/engine/models/components/Rigidbody";
import Collider from "@/engine/models/components/Collider";
import Asteroid from "@/game/models/entities/Asteroid";
import { minRandom, negativeRandom } from "@/engine/utils/random";
import MeshRenderer from "@/engine/models/components/MeshRenderer";
import PolygonMesh from "@/engine/models/Mesh/PolygonMesh";

export default class PlayerProjectile extends GameObject {
    private _projectileSpeed = 40;
    constructor(props?: GameObjectOptions) {
        super(props);
        this.name = 'PlayerProjectile';
        const shape = new PolygonShape({
            points: [
                new Vector(-25, 0),
                new Vector(0, 2),
                new Vector(25, 0),
                new Vector(0, -2),
                new Vector(-25,  0),
            ]
        });
        const mr = new MeshRenderer();
        mr.mesh = new PolygonMesh({ shape, fillStyle: '#ECEE81', strokeStyle: '#5B9A8B', lineWidth: 0, glow: 100, glowColor: '#ECEE8166' });
        const rb = new Rigidbody({});
        const collider = new Collider({ shape });

        this.setComponent(mr);
        this.setComponent(rb);
        this.setComponent(collider);

        collider.onCollision(async (c) => {
            const go = c.getGameObject();
            if (go.name === 'asteroid') {
                (go as Asteroid).makeDamage(1);
                this.destroy();
            }
        });

    }
    onInstantiate() {
        const rb = this.getComponent('rigibody') as Rigidbody;
        rb.friction = 0;
        rb.velocity = new Vector(
            Math.cos(degreesToRad(this.translate.rotation + rb.rotationVelocity)) * this._projectileSpeed,
            Math.sin(degreesToRad(this.translate.rotation + rb.rotationVelocity)) * this._projectileSpeed
        );
    }
}
