import GameObject, { GameObjectOptions } from "../../../engine/models/GameObject";
import Vector from "@/engine/models/Vector";
import degreesToRad from "@/engine/utils/degreesToRad";
import Shape from "@/engine/models/Shape";
import Mesh from "@/engine/models/components/Mesh";
import Rigidbody from "@/engine/models/components/Rigidbody";
import Collider from "@/engine/models/components/Collider";
import Asteroid from "@/game/models/entities/Asteroid";

export default class PlayerProjectile extends GameObject{
    private _projectileSpeed = 20;
    constructor(props: GameObjectOptions) {
        super(props);

        const shape = new Shape({
            points: [
                new Vector(-25, 0),
                new Vector(0, 2),
                new Vector(25, 0),
                new Vector(0, -2),
                new Vector(-25,  0),
            ]
        });
        const mesh = new Mesh({ shape: shape, fillStyle: '#ECEE81', strokeStyle: '#5B9A8B', lineWidth: 0 });
        const rb = new Rigidbody({});
        const collider = new Collider({ shape });

        this.setComponent(mesh);
        this.setComponent(rb);
        this.setComponent(collider);

        collider.onCollision((c) => {
            const go = c.getGameObject();
            if (go.name === 'asteroid') {
                (go as Asteroid).makeDamage(1);
                this.destroy();
            }
        });

        rb.friction = 0;
        rb.velocity = new Vector(
            Math.cos(degreesToRad(this.rotation + rb.rotationVelocity)) * this._projectileSpeed,
            Math.sin(degreesToRad(this.rotation + rb.rotationVelocity)) * this._projectileSpeed
        );

    }
}
