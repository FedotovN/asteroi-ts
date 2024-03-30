import Vector from "./Vector";
import degreesToRad from "@/engine/utils/degreesToRad";

type ShapeOptions = {
    points: Vector[],
}

export default class Shape {
    points: Vector[];
    constructor({ points }: ShapeOptions) {
        this.points = points;
    }
    getPointsPosition(origin: Vector, rotation: number): Vector[] {
        return this.points.map(p => {
           const { x, y } = p;
           const { x: ox, y: oy } = origin;
           return this._rotatePoint(x + ox, y + oy, rotation, origin);
        });
    }
    private _rotatePoint(x: number, y: number, rotation: number, origin: Vector): Vector {
        const rad = degreesToRad(rotation);
        const rotCos = Math.cos(rad);
        const rotSin = Math.sin(rad);
        const { x: ox, y: oy } = origin;
        const newX = (ox + (x - ox) * rotCos - (y - oy) * rotSin);
        const newY = oy + (x - ox) * rotSin + (y - oy) * rotCos;
        return new Vector(newX, newY);
    }

}
