import GameObject, { GameObjectOptions } from "./GameObject";
import Vector from "./Vector";
import GameObjectsService from "@/engine/services/GameObjectsService";
import Mesh from "@/engine/models/components/Mesh";
import { lerp } from "@/engine/utils/easing";

type CameraOptions = {
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
} & GameObjectOptions
 export default class Camera extends GameObject {
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _height: number;
    private readonly _width: number;
    target: GameObject;
    zoom: number = 1;
    rotation: number;
    private _lastZoom: number = this.zoom;
     constructor({ context, canvas, rotation, position, name, id }: CameraOptions) {
        super({rotation, position, name, id});
        this._context = context;
        this._canvas = canvas;
        const { height, width } = this._canvas;
        this._height = height;
        this._width = width;
        this._context.scale(this.zoom, this.zoom);
    }
    worldToCameraPosition(point: Vector) {
        return new Vector(this.position.x - point.x, this.position.y - point.y);
    }
    render() {
        this.follow();
        GameObjectsService.gameObjects.forEach(go => {
            const mesh = go.getComponent('mesh') as Mesh;
            if (!mesh) return;
            mesh.draw({
                context: this._context
            });
        });
        this._context.restore();
    }
    setTarget(go: GameObject) {
        this.target = go;
    }
    setZoom(zoom: number) {
        if (zoom < 1) zoom = 1;
        this.zoom = zoom;
        this._context.scale(this.zoom / this._lastZoom, this.zoom / this._lastZoom);
        this._lastZoom = this.zoom;
    }
    follow() {
        this._context.save();
        const { x, y } = this.target.position;
        this.position.x = lerp(this.position.x, x, .05);
        this.position.y = lerp(this.position.y, y, .05);

        const ctxTranslateX = this.position.x - (this._width / 2) / this.zoom;
        const ctxTranslateY = this.position.y - (this._height / 2) / this.zoom;

        this._context.translate(-ctxTranslateX, -ctxTranslateY);
    }
    isInCamera(point: Vector) {
        const pos = this.worldToCameraPosition(point);
        return pos.x >= 0 && pos.x <= this._width && pos.y >= 0 && pos.y <= this._height;
    }
}
