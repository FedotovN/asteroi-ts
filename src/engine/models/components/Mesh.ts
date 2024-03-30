import GameObjectComponent, { GameObjectComponentOptions } from "../GameObjectComponent";
import Shape from "@/engine/models/Shape";

type MeshOptions = {
    shape?: Shape,
    strokeStyle?: string,
    fillStyle?: string,
    lineWidth?: number,
}
type DrawOptions = {
    context: CanvasRenderingContext2D,
}
export default class Mesh extends GameObjectComponent {
    shape: Shape;
    strokeStyle: string;
    fillStyle: string;
    lineWidth: number;
    constructor(props: GameObjectComponentOptions & MeshOptions) {
        super(props);
        this.name = 'mesh';
        if(props.shape) this.shape = props.shape;
        this._gameObject = props.gameObject;
        this.fillStyle = props.fillStyle;
        this.strokeStyle = props.strokeStyle;
        this.lineWidth = props.lineWidth;
    }
    draw({ context }: DrawOptions) {
        if (!this.shape) return;
        const { strokeStyle, fillStyle, lineWidth } = context;
        context.beginPath()
        const { position, rotation } = this._gameObject;
        this.shape.getPointsPosition(position, rotation).forEach(p => {
            const { x, y } = p;
            context.lineTo(x, y);
        });
        context.strokeStyle = this.strokeStyle || strokeStyle;
        context.fillStyle = this.fillStyle || fillStyle;
        context.lineWidth = this.lineWidth || lineWidth;
        context.closePath();
        context.stroke();
        context.fill();
        context.strokeStyle = strokeStyle;
        context.fillStyle = fillStyle;
        context.lineWidth = lineWidth;
    }
}
