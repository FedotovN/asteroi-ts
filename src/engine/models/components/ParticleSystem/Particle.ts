import PolygonMesh from "@/engine/models/Mesh/PolygonMesh";
import Vector from "../../Vector";
import Translate from "../../Translate";
import TickService from "../../../services/TickService";
import { minRandom } from "@/engine/utils/random";
import RenderService from "@/engine/services/RenderService";
import SquareMesh from "@/engine/models/Mesh/SquareMesh";
import DrawableEntity from "@/engine/models/shared/DrawableEntity";
import Mesh from "@/engine/models/Mesh/Mesh";

type ParticleOptions = {
    drawable: PolygonMesh,
    speed?: number | [number, number],
    lifetime?: number,
    scale?: number,
    movement?: Vector,
}
export default class Particle {
    drawable: DrawableEntity = new SquareMesh({ size: 5 });
    lifetime: number = 1000;
    speed: number = 1;
    movement: Vector = Vector.zero();
    rotation: number = 0;
    scale: number | [number, number] = 1;
    translate: Translate = new Translate();

    private readonly _movementTickSubscribtion: Function;
    constructor(props: ParticleOptions) {
        const { drawable, lifetime, scale, speed, movement } = props;
        this.drawable = drawable;
        this.speed = this._getSpeed();
        this.lifetime = lifetime ?? this.lifetime;
        this.movement = movement ?? this.movement;
        this.scale = scale ?? this.scale;

        if (this.drawable instanceof PolygonMesh) {
            if (typeof this.scale === "number") {
                this.drawable.shape.scale = this.scale;
            } else {
                this.drawable.shape.scale = this.scale[0];
            }
        }
        RenderService.drawables.add(this.drawable);
        this.drawable.translate = this.translate;
        this._movementTickSubscribtion = TickService.onUpdate(({ deltaTime }: { deltaTime: number }) => this.move(deltaTime));
    }
    move(deltaTime: number) {
        this.translate.position.x += this.movement.x * deltaTime * this._getSpeed();
        this.translate.position.y += this.movement.y * deltaTime * this._getSpeed();

        this.translate.rotation += this.rotation * deltaTime;
    }
    remove() {
        if (this._movementTickSubscribtion) {
            RenderService.drawables.delete(this.drawable);
            this._movementTickSubscribtion();
        }
    }
    private _getSpeed() {
        if (typeof this.speed === 'number') return this.speed;
        return minRandom(this.speed[0], this.speed[1]);
    }
}
