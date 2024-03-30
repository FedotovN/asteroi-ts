import GameObjectsService from "./GameObjectsService";
import Mesh from "@/engine/models/components/Mesh";

type RenderManagerOptions = {
    context: CanvasRenderingContext2D,
    backgroundColor?: string,
    entitiesColor?: string,
}
export default class RenderService {

    private _backgroundColor;
    private _entitiesColor;
    private readonly _context: CanvasRenderingContext2D;
    constructor({ context, backgroundColor, entitiesColor }: RenderManagerOptions) {
        this._context = context;
        this._backgroundColor = backgroundColor || '#222831';
        this._entitiesColor = entitiesColor || '#EEEEEE';
    }
    rerender() {
        this._clearCanvas();
        GameObjectsService.gameObjects.forEach(go => {
            const mesh = go.getComponent('mesh') as Mesh;
            if (!mesh) return;
            mesh.draw({
                context: this._context
            });
        });
    }
    private _clearCanvas() {
        this._context.fillStyle = this._backgroundColor;
        this._context.fillRect(0, 0, innerWidth, innerHeight);
        this._context.fillStyle = this._entitiesColor;
        this._context.strokeStyle = 'black';
    }
}
