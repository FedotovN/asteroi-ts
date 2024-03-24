import GameObjectsService from "./GameObjectsService";
import Mesh from "@/engine/models/components/Mesh";

type RenderManagerOptions = {
    gameObjectManager: GameObjectsService,
    context: CanvasRenderingContext2D,
    backgroundColor?: string,
    entitiesColor?: string,
}
export default class RenderService {

    private _gameObjectService: GameObjectsService;
    private _backgroundColor;
    private _entitiesColor;
    private readonly _context: CanvasRenderingContext2D;
    constructor({ gameObjectManager, context, backgroundColor, entitiesColor }: RenderManagerOptions) {
        this._gameObjectService = gameObjectManager;
        this._context = context;
        this._backgroundColor = backgroundColor || '#1B2430';
        this._entitiesColor = entitiesColor || 'white';
    }
    rerender() {
        this._clearCanvas();
        this._gameObjectService.gameObjects.forEach(go => {
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
    }
}
