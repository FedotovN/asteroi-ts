import GameObjectComponent, { GameObjectComponentOptions } from "../../GameObjectComponent";
import Particle from "@/engine/models/components/ParticleSystem/Particle";
import PolygonMesh from "@/engine/models/Mesh/PolygonMesh";
import Vector from "../../Vector";
import { minRandom } from "@/engine/utils/random";
import SquareMesh from "@/engine/models/Mesh/SquareMesh";

type ParticleSystemOptions = {
    interval?: number,
    amount?: number,
    maxParticlesAmount?: number,
    lifetime?: number | [number, number],
    speed?: number | [number, number],
    meshFunction?: (() => PolygonMesh),
    movementFunction?: (() => Vector),
    scale?: number | [number, number],

} & GameObjectComponentOptions
export default class ParticleSystem extends GameObjectComponent {
    interval: number = 1000;
    amount: number = 1;
    maxParticlesAmount: number = 20;
    lifetime: number | [number, number] = 1000;
    scale: number | [number, number] = 1;
    speed: number | [number, number] = 1;
    meshFunction: Function;
    movementFunction = () => Vector.zero();
    private _intervalId: NodeJS.Timeout;
    private _particles: Particle[] = [];
    get particlesAmount() { return this._particles.length }
    constructor(props?: ParticleSystemOptions) {
        super(props);
        if (props) {
            this.interval = props.interval ?? this.interval;
            this.maxParticlesAmount = props.maxParticlesAmount ?? this.maxParticlesAmount;
            this.lifetime = props.lifetime ?? this.lifetime;
            this.amount = props.amount ?? this.amount;
            this.scale = props.scale ?? this.scale;
            this.speed = props.speed ?? this.speed;
            this.meshFunction = props.meshFunction ?? this.meshFunction;
            this.movementFunction = props.movementFunction ?? this.movementFunction;
        }
    }
    start() {
        this._intervalId = setInterval(() => this.emit(), this.interval);
    }
    stop() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
        }
    }
    emit() {
        if (this.maxParticlesAmount <= this.particlesAmount + this.amount) return;
        for (let i = 0; i < this.amount; i++) {
            const particle = this._createParticle();
            particle.translate.position = this._gameObject.translate.position.copy();
            setTimeout(() => {
                particle.remove();
            }, particle.lifetime);
        }
    }
    private _createParticle() {
        const p = new Particle({ drawable: this._getMesh(), speed: this.speed });
        p.movement = this.movementFunction();
        p.scale = this.scale;
        p.lifetime = this._getLifetime();
        return p;
    }
    private _getLifetime() {
        if (typeof this.lifetime === 'number') {
            return this.lifetime
        } return minRandom(this.lifetime[0], this.lifetime[1]);
    }
    private _getMesh() {
        if (this.meshFunction) return this.meshFunction();
        return this._getDefaultMesh();
    }
    private _getDefaultMesh() {
        return new SquareMesh({});
    }
    cleanup() {
        super.cleanup();
        this.stop();
    }
}
