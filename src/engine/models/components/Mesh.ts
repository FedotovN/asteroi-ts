import GameObjectComponent, { GameObjectComponentOptions } from "../GameObjectComponent";
import Shape from "@/engine/models/Shape";

type MeshOptions = {
    shape?: Shape
}
type DrawOptions = {
    context: CanvasRenderingContext2D,
}
export default class Mesh extends GameObjectComponent {
    shape: Shape;
    constructor(props: GameObjectComponentOptions & MeshOptions) {
        super(props);
        this.name = 'mesh';
        if(props.shape) this.shape = props.shape;
        this._gameObject = props.gameObject;
    }
    draw({ context }: DrawOptions) {
        if (!this.shape) return;
        context.beginPath()
        const { position, rotation } = this._gameObject;
        this.shape.getPointsPosition(position, rotation).forEach(p => {
            const { x, y } = p;
            context.lineTo(x, y);
        });
        context.closePath();
        context.stroke();
        context.fill();
    }
}
