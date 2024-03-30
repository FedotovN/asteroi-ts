import Agent, { AgentProperties } from "../Agent";
import GameObject, { GameObjectOptions } from "@/engine/models/GameObject";
import Shape from "@/engine/models/Shape";
import Mesh from "@/engine/models/components/Mesh";
import degreesToRad from "@/engine/utils/degreesToRad";
import Rigidbody from "@/engine/models/components/Rigidbody";
import Vector from "@/engine/models/Vector";
import Collider from "@/engine/models/components/Collider";
import PlayerProjectile from "@/game/models/other/PlayerProjectile";

export default class Player extends Agent {
    private _fireRate: number = 15;
    private _lastTimeShot: number = 0;

    constructor(props: AgentProperties & GameObjectOptions) {
        super(props);
        this.id = 'player';
        const shape = new Shape({
            points: [
                new Vector(0, -6),
                new Vector(20, 0),
                new Vector(0, 6),
                new Vector(5, 0),
            ],
        });
        const collider = new Collider({ shape });
        const mesh = new Mesh({ shape,});
        const rigidbody = new Rigidbody({});

        this.setComponent(collider);
        this.setComponent(mesh);
        this.setComponent(rigidbody);

        collider.onCollision((c, point) => {
           const go = c.getGameObject();
           if (go.name === 'asteroid') {
               const rb = go.getComponent('rigibody') as Rigidbody
               rigidbody.push((
                   this.position.x - (this.position.x + point.x)) * rb.velocity.getLength(),
                   (this.position.y - (this.position.y + point.y)) * rb.velocity.getLength()
               );
           }
        });
    }
    shoot(): GameObject | null {
        if ((Date.now() - this._lastTimeShot) >= 1000 / this._fireRate) {
            const position = new Vector(
                this.position.x + Math.cos(degreesToRad(this.rotation)) * 40,
                this.position.y + Math.sin(degreesToRad(this.rotation)) * 40
            );
            const projectile = new PlayerProjectile({
                position,
                rotation: this.rotation
            })
            projectile.instantiate();
            setTimeout(() => projectile.destroy(), 5000);
            this._lastTimeShot = Date.now();
        }
        return null;
    }
}
