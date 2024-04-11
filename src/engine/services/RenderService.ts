import Camera from "@/engine/models/Camera";
import Vector from "@/engine/models/Vector";

type RenderManagerOptions = {
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    backgroundColor?: string,
    entitiesColor?: string,
}
export default class RenderService {

    private _backgroundColor;
    private _entitiesColor;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;
    camera: Camera;
    constructor({ context, canvas, backgroundColor, entitiesColor }: RenderManagerOptions) {
        this._context = context;
        this._canvas = canvas;
        this._backgroundColor = backgroundColor || 'rgba(30, 30, 30, .55)';
        this._entitiesColor = entitiesColor || '#EEEEEE';
    }
    addCamera() {
        this.camera = new Camera({
            context: this._context,
            canvas: this._canvas,
            name: 'camera',
        })
    }
    render() {
        this._clearCanvas();
        if (this.camera) {
            this.camera.render();
        }
    }
    private _clearCanvas() {
        this._context.fillStyle = this._backgroundColor;
        this._context.fillRect(0, 0, innerWidth, innerHeight);
        this._context.fillStyle = this._entitiesColor;
        this._context.strokeStyle = 'black';
    }
}
