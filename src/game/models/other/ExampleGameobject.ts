import GameObject, { GameObjectOptions } from "../../../engine/models/GameObject";
import Mesh from "../../../engine/models/components/Mesh";
import Shape from "../../../engine/models/Shape";
import Collider from "../../../engine/models/components/Collider";
import Vector from "../../../engine/models/Vector";

export default class ExampleGameobject extends GameObject {
    constructor(props?: GameObjectOptions) {
        super(props);
        const shape = new Shape({
            points: [
                new Vector(-5, 0),
                new Vector(0, 2),
                new Vector(5, 0),
                new Vector(0, -2),
                new Vector(-5,  0),
            ],
        })
        const mesh = new Mesh({ shape });
        const collider = new Collider({ shape });

        this.setComponent(mesh);
        this.setComponent(collider);
    }
}
