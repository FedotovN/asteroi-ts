import Agent, { AgentProperties } from "../Agent";
import GameObject, { GameObjectOptions } from "@/engine/models/GameObject";
import Shape from "@/engine/models/Shape";
import Mesh from "@/engine/models/components/Mesh";
import degreesToRad from "@/engine/utils/degreesToRad";
import Rigidbody from "@/engine/models/components/Rigidbody";
import Vector from "@/engine/models/Vector";
import Collider from "@/engine/models/components/Collider";
import PlayerProjectile from "@/game/models/other/PlayerProjectile";
import TickService from "@/engine/services/TickService";
import AudioService from "@/engine/services/AudioService";
import { sleep } from "@/engine/utils/sleep";
import { negativeRandom } from "@/engine/utils/random";
import GameObjectsService from "@/engine/services/GameObjectsService";

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
        const shape = new Shape({
            points: [
                new Vector(0, -4),
                new Vector(15, 0),
                new Vector(0, 4),
                new Vector(3, 0),
            ],
            scale: .9,
        });
        const collider = new Collider({ shape });
        const mesh = new Mesh({ shape,});
        const rigidbody = new Rigidbody({ });

        this.setComponent(collider);
        this.setComponent(mesh);
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
        this._addMovementParticles();
        this._addInvincibleBlink()
    }
    private _addInvincibleBlink() {
        const mesh = this.getComponent('mesh') as Mesh;
        const initialFillStyle = mesh.fillStyle;
        setInterval(() => {
            if (!this._isInvincible) return;
            mesh.fillStyle = 'rgba(255, 255, 255, .3)';
            sleep(100).then(() => {
                mesh.fillStyle = initialFillStyle;
            });
        }, 200);
    }
    private _addMovementParticles() {
        const rb = this.getComponent('rigibody') as Rigidbody
        setInterval(() => {
            if (rb.velocity.getLength() <= 5.5) return;
            const shape = new Shape({
                points: [
                    new Vector(0, -4),
                    new Vector(15, 0),
                    new Vector(0, 4),
                    new Vector(3, 0),
                ],
            });
            const position = new Vector(
                this.translate.position.x + Math.cos(degreesToRad(this.translate.rotation)),
                this.translate.position.y + Math.sin(degreesToRad(this.translate.rotation))
            );
            const fireParticle = new GameObject();
            fireParticle.translate.position = position;
            fireParticle.translate.rotation = this.translate.rotation;
            let opacity = .5;
            const pMesh = new Mesh({ shape, strokeStyle: `rgba(255, 255, 255, ${opacity})`, fillStyle: 'transparent' });
            fireParticle.setComponent(pMesh);
            fireParticle.instantiate()
            let unsub = TickService.onUpdate(({ deltaTime }: { deltaTime: number }) => {
                opacity -= deltaTime * .01;
                shape.scale -= deltaTime * .005;
                pMesh.strokeStyle = `rgba(120, 120, 120, ${opacity})`
            })
            setTimeout(() => {
                fireParticle.destroy();
                unsub();
            }, 2000)
        }, 150);
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
            AudioService.addGain('player-shoot', negativeRandom(-.5, 3));
            AudioService.stopAndPlay('player-shoot');
            setTimeout(() => projectile.destroy(), 2000);
            this._lastTimeShot = Date.now();
        }
        return null;
    }
}
