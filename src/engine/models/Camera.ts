import GameObject, { GameObjectOptions } from "./GameObject";
import Vector from "./Vector";
import GameObjectsService from "@/engine/services/GameObjectsService";
import Mesh from "@/engine/models/components/Mesh";
import { clamp, lerp } from "@/engine/utils/easing";
import { makeLogger } from "ts-loader/dist/logger";
type ScreenBorders = {
    left: number,
    right: number,
    top: number,
    bottom: number;
}
type CameraOptions = {
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    backgroundColor?: string,
    meshColor?: string,
    borders?: ScreenBorders;
} & GameObjectOptions
 export default class Camera extends GameObject {
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _height: number;
    private readonly _width: number;

    target: GameObject;
    zoom: number = 1;
    backgroundColor: string = 'rgba(30, 30, 30, .55)';
    meshColor: string = 'white';
    lerp: number = 1;
    deadZoneX: number = 60;
    deadZoneY: number = 60;
    borders: ScreenBorders = {
        top: -Infinity,
        right: Infinity,
        bottom: Infinity,
        left: -Infinity
    };


    private _lastZoom: number = this.zoom;
     constructor({ context, canvas, backgroundColor, meshColor, borders, name, id }: CameraOptions) {
        super({ name, id});

        if (backgroundColor) this.backgroundColor = backgroundColor;
        if (meshColor) this.meshColor = meshColor;
        if (borders) this.borders = borders;

        this._context = context;
        this._canvas = canvas;

        const { height, width } = this._canvas;

        this._height = height;
        this._width = width;
        this._context.scale(this.zoom, this.zoom);
    }
    worldToCameraPosition(point: Vector) {
        return new Vector(this.translate.position.x - point.x, this.translate.position.y - point.y);
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
    setZoom(zoom: number) {
        if (zoom < 1) zoom = 1;
        this.zoom = zoom;
        this._context.scale(this.zoom / this._lastZoom, this.zoom / this._lastZoom);
        this._lastZoom = this.zoom;
    }
    _getScreenCenter(): Vector {
         return new Vector((this._width / 2) / this.zoom, (this._height / 2) / this.zoom)
    }
    follow() {
        this._context.save();
        const { x, y } = this.target.translate.position;

        if (this.translate.position.x - x > this.deadZoneX) {
            this.translate.position.x = lerp(this.translate.position.x, x + this.deadZoneX, this.lerp);
        } else if (this.translate.position.x - x < -this.deadZoneX) {
            this.translate.position.x = lerp(this.translate.position.x, x - this.deadZoneX, this.lerp);
        }
        if (this.translate.position.y - y > this.deadZoneY) {
            this.translate.position.y = lerp(this.translate.position.y, y + this.deadZoneY, this.lerp);
        } else if (this.translate.position.y - y < -this.deadZoneY) {
            this.translate.position.y = lerp(this.translate.position.y, y - this.deadZoneY, this.lerp);
        }
        const center = this._getScreenCenter();

        this.translate.position.x = clamp(this.translate.position.x, this.borders.left + center.x - 20, this.borders.right - center.x + 20);
        this.translate.position.y = clamp(this.translate.position.y, this.borders.top + center.y - 20 * this.zoom, this.borders.bottom - center.y + 20);

        const ctxTranslateX = this.translate.position.x - center.x;
        const ctxTranslateY = this.translate.position.y - center.y;

        this._context.translate(-ctxTranslateX, -ctxTranslateY);
    }
    isInCamera(point: Vector) {
        const pos = this.worldToCameraPosition(point);
        return pos.x >= 0 && pos.x <= this._width && pos.y >= 0 && pos.y <= this._height;
    }
     private _clearCanvas() {
         this._context.fillStyle = this.backgroundColor;
         this._context.fillRect(0, 0, innerWidth, innerHeight);
         this._context.fillStyle = this.meshColor;
         this._context.strokeStyle = 'black';
     }
}
