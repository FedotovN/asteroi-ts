import RenderService from "./services/RenderService";
import GameObjectsService from "./services/GameObjectsService";
import TickService from "./services/TickService";
import PhysicsService from "./services/PhysicsService";
import UserInterfaceService from "@/engine/services/UserInterfaceService";

type GameOptions = {
    canvasSelector: string,
    uiRootSelector: string,
    height: number,
    width: number,
}
export default class EngineManager {
    renderService: RenderService;
    private _physicsService: PhysicsService;
    height: number;
    width: number;

    userInterfaceService: UserInterfaceService;

    private _updateCallbacks: Set<(deltaTime: number) => void> = new Set();

    constructor(options: GameOptions) {
        const { canvasSelector, uiRootSelector, height, width } = options;
        const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        this.width = width;
        this.height = height;


        GameObjectsService.width = this.width;
        GameObjectsService.height = this.height;

        canvas.height = this.height;
        canvas.width = this.width;

        this._physicsService = new PhysicsService();
        this.renderService = new RenderService({ context, canvas });

        this.userInterfaceService = new UserInterfaceService(uiRootSelector);

        TickService.onUpdate(({ deltaTime }: { deltaTime: number }) => this._onTick(deltaTime));
    }
    start() {
        TickService.start();
    }
    onUpdate(callback: (deltaTime: number) => void) {
        this._updateCallbacks.add(callback);
    }
    private _onTick(deltaTime: number) {
        GameObjectsService.update(deltaTime);

        this._updateCallbacks.forEach(c => c(deltaTime));

        this._physicsService.collide();
        this._physicsService.move(deltaTime);

        this.renderService.render();
    }
}
