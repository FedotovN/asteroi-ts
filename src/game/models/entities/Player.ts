import Agent, { AgentProperties } from "../Agent";
import GameObject, { GameObjectOptions } from "@/engine/models/GameObject";
import PolygonShape from "@/engine/models/Shape/PolygonShape";
import PolygonMesh from "@/engine/models/Mesh/PolygonMesh";
import degreesToRad from "@/engine/utils/degreesToRad";
import Rigidbody from "@/engine/models/components/Rigidbody";
import Vector from "@/engine/models/Vector";
import Collider from "@/engine/models/components/Collider";
import PlayerProjectile from "@/game/models/other/PlayerProjectile";
import AudioService from "@/engine/services/AudioService";
import { sleep } from "@/engine/utils/sleep";
import MeshRenderer from "@/engine/models/components/MeshRenderer";

export default class Player extends Agent {
    private _fireRate: number = 6;
    private _accuracy: number = 2;
    private _lastTimeShot: number = 0;
    private _isInvincible: boolean = false;
    private _invincibleTime: number = 3;
    score: number = 0;
    constructor(props: AgentProperties & GameObjectOptions) {
        super(props);
        this.id = 'player';
        const shape = new PolygonShape({
            points: [
                new Vector(0, -4),
                new Vector(15, 0),
                new Vector(0, 4),
                new Vector(3, 0),
            ],
            scale: .9,
        });
        const collider = new Collider({ shape });
        const mr = new MeshRenderer();
        mr.mesh = new PolygonMesh({ shape });
        const rigidbody = new Rigidbody({ });

        this.setComponent(collider);
        this.setComponent(mr);
        this.setComponent(rigidbody);

        collider.onCollision((c, point) => {
            const go = c.getGameObject();
           if (go.name === 'asteroid') {
               const rb = go.getComponent('rigibody') as Rigidbody
               rigidbody.push((
                   this.translate.position.x - (this.translate.position.x + point.x)) * rb.velocity.getLength(),
                   (this.translate.position.y - (this.translate.position.y + point.y)) * rb.velocity.getLength()
               );
               this.makeDamage(1);
           }
        });
        // @ts-ignore
        import('@/game/assets/PlayerShoot.wav').then(res => {
            AudioService.add({ name: 'player-shoot', resolvedSrc: res.default });
        })
        // @ts-ignore
        import('@/game/assets/PlayerHurt.wav').then(res => {
            AudioService.add({ name: 'player-hurt', resolvedSrc: res.default });
        })
        this._addInvincibleBlink()
    }
    private _addInvincibleBlink() {
        const mr = this.getComponent('meshRenderer') as MeshRenderer;
        const mesh = mr.mesh;
        const initialFillStyle = mesh.fillStyle;
        setInterval(() => {
            if (!this._isInvincible) return;
            mesh.fillStyle = 'rgba(255, 255, 255, .3)';
            sleep(100).then(() => {
                mesh.fillStyle = initialFillStyle;
            });
        }, 200);
    }
    makeDamage(damage: number) {
        if (this._isInvincible) return;
        this._isInvincible = true;

        this.health -= damage;
        AudioService.addPosition('player-hurt', this.translate.position);
        AudioService.play('player-hurt');
        setTimeout(() => {
            this._isInvincible = false;
        }, this._invincibleTime * 1000);
    }

    shoot(): GameObject | null {
        if ((Date.now() - this._lastTimeShot) >= 1000 / this._fireRate) {
            const position = new Vector(
                this.translate.position.x + Math.cos(degreesToRad(this.translate.rotation)) * 25,
                this.translate.position.y + Math.sin(degreesToRad(this.translate.rotation)) * 25
            );
            console.log(position);
            const projectile = new PlayerProjectile()
            projectile.translate.position = position;
            projectile.translate.rotation = this.translate.rotation + (Math.random()) * this._accuracy - (Math.random()) * this._accuracy
            projectile.instantiate();
            AudioService.addPosition('player-shoot', this.translate.position);
            AudioService.stopAndPlay('player-shoot');
            setTimeout(() => projectile.destroy(), 2000);
            this._lastTimeShot = Date.now();
        }
        return null;
    }
}
