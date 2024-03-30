import Agent, { AgentProperties } from "../Agent";
import Vector from "@/engine/models/Vector";
import Shape from "@/engine/models/Shape";
import Mesh from "@/engine/models/components/Mesh";
import Rigidbody from "@/engine/models/components/Rigidbody";
import Collider from "@/engine/models/components/Collider";
import GameObjectsService from "@/engine/services/GameObjectsService";

export default class Asteroid extends Agent {
    private _isBlinking: boolean;
    private _maxRadius = 100;
    private _minRadius = 50;
    private _asteroidDefaultColor = 'rgb(23, 86, 118)'

    radius: number;
    constructor(props: AgentProperties) {
        super(props);

        this.name = 'asteroid';

        this.radius = ((this._maxRadius - this._minRadius) * Math.random()) + this._minRadius;
        const difference = this.radius / 2;
        const vertexAmount = Math.floor(Math.random() * 2) + 5;
        const vertexArr = [];

        for (let i = 0; i < vertexAmount; i++) {
            const radians = ((360 * (i / vertexAmount) * Math.PI) / 180);

            const randX = Math.cos(radians) * ((this.radius - Math.random() * difference) + Math.random() * difference);
            const randY = Math.sin(radians) * ((this.radius - Math.random() * difference) + Math.random() * difference);

            vertexArr.push(new Vector(randX, randY));
        }
        const shape = new Shape({ points: vertexArr });
        const mesh = new Mesh({ shape, fillStyle: this._asteroidDefaultColor, strokeStyle: '#4BA3C3', lineWidth: 10 });
        const rb = new Rigidbody({});
        const collider = new Collider({ shape })

        rb.rotationFriction = 0;
        rb.friction = 0;

        this.setComponent(mesh);
        this.setComponent(rb);
        this.setComponent(collider);
    }
    onUpdate() {
        if (this.health <= 0) {
            this.destroy();
        }
        if (this.position.x < -150 ||
            this.position.x > GameObjectsService.width + 150 ||
            this.position.y < -150 ||
            this.position.y > GameObjectsService.height + 150
        ) {
            this.destroy();
        }
    }
    _meshBlink() {
        if (this._isBlinking) return;
        this._isBlinking = true;
        const m = this.getComponent('mesh') as Mesh
        const { fillStyle } = m;
        m.fillStyle = 'white'
        setTimeout(() => {
            m.fillStyle = fillStyle;
            this._isBlinking = false;
        }, 100);
    }
    _fillRgb(red: number, green: number, blue: number) {
        const m = this.getComponent('mesh') as Mesh;
        m.fillStyle = `rgb(${red},${green},${blue})`
    }
    makeDamage(damage: number) {
        this.health -= damage;
        const m = this.getComponent('mesh') as Mesh;
        const healthPercentage = (this.health / this.maxHealth) * 100;
        m.lineWidth = (healthPercentage / 100) * m.lineWidth;
        this._fillRgb((100 - healthPercentage) * 1.75, 86, 118);
        this._meshBlink();
    }
}
