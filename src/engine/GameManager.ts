import RenderService from "./services/RenderService";
import InputService from "./services/InputService";
import GameObjectsService from "./services/GameObjectsService";
import TickService from "./services/TickService";
import PhysicsService from "./services/PhysicsService";
import Player from "@/game/models/entities/Player";

import Mesh from "@/engine/models/components/Mesh";
import Collider from "@/engine/models/components/Collider";
import Rigidbody from "@/engine/models/components/Rigidbody";
import Shape from "@/engine/models/Shape";
import degreesToRad from "@/engine/utils/degreesToRad";
import GameObject from "@/engine/models/GameObject";
import Vector from "@/engine/models/Vector";

type GameOptions = {
    rootSelector: string,
    height: number,
    width: number,
}
export default class GameManager {
    private readonly _tickManager: TickService;
    private readonly _inputManager: InputService;
    private readonly _gameObjectsManager: GameObjectsService;
    private _renderManager: RenderService;
    private _physicsManager: PhysicsService;
    private _height: number;
    private _width: number;
    private _player: Player;
    constructor(options: GameOptions) {
        const { rootSelector, height, width } = options;
        const canvas = document.querySelector(rootSelector) as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        this._height = height;
        this._width = width
        canvas.height = this._height;
        canvas.width = this._width;

        this._tickManager = new TickService();
        this._inputManager = new InputService(this._tickManager);
        this._gameObjectsManager = new GameObjectsService();
        this._physicsManager = new PhysicsService(this._gameObjectsManager);
        this._renderManager = new RenderService({
            context,
            gameObjectManager: this._gameObjectsManager
        });

        this._tickManager.onUpdate(({ deltaTime }: { deltaTime: number }) => this._onTick(deltaTime));
    }
    start() {
        this._addPlayer();
        this._initControls();
        (this._addObstacle({ x: 300, y: 300}).getComponent('rigibody') as Rigidbody).push(5, 5);
        (this._addObstacle({ x: 400, y: 300}).getComponent('rigibody') as Rigidbody).push(2, -5);
        (this._addObstacle({ x: 500, y: 300}).getComponent('rigibody') as Rigidbody).push(-5, 20);
        (this._addObstacle({ x: 600, y: 300}).getComponent('rigibody') as Rigidbody).push(22, -1);
        (this._addObstacle({ x: 700, y: 300}).getComponent('rigibody') as Rigidbody).push(-.5, 15);
        (this._addObstacle({ x: 800, y: 300}).getComponent('rigibody') as Rigidbody).push(35, -.5);
        (this._addObstacle({ x: 900, y: 300}).getComponent('rigibody') as Rigidbody).push(5, 5);
        (this._addObstacle({ x: 1000, y: 300}).getComponent('rigibody') as Rigidbody).push(5, 5);
        (this._addObstacle({ x: 1100, y: 300}).getComponent('rigibody') as Rigidbody).push(5, 5);
        (this._addObstacle({ x: 1200, y: 300}).getComponent('rigibody') as Rigidbody).push(5, 5);
        (this._addObstacle({ x: 100, y: 300}).getComponent('rigibody') as Rigidbody).turn(250);

        this._tickManager.start();
    }
    freeze() {
        this._tickManager.freeze();
    }
    private _addPlayer() {
        const position = {
            x: 300,
            y: 300,
        };
        const shape = new Shape({
            points: [
                { x: -10, y: -10 },
                { x: 10, y: -10 },
                { x: 10, y: 10 },
                { x: -10, y: 10 },
            ],
        });
        const collider = new Collider({ shape });
        const mesh = new Mesh({ shape });
        const rigidbody = new Rigidbody({});

        const player = new Player({
            maxHealth: 10,
            rotation: 0,
            position
        });

        player.setComponent(collider);
        player.setComponent(mesh);
        player.setComponent(rigidbody);

        this._player = player;

        this._gameObjectsManager.instantiate(player);
    }
    private _addObstacle(position: Vector) {
        const shape = new Shape({
            points: [
                { x: -40, y: -40 },
                { x: 40, y: -40 },
                { x: 40, y: 40 },
                { x: -40, y: 40 },
            ]
        });
        const collider = new Collider({ shape });
        const mesh = new Mesh({ shape });
        const rb = new Rigidbody({});
        const obstacle = new GameObject({
            position,
            rotation: 0
        });

        obstacle.setComponent(mesh);
        obstacle.setComponent(collider);
        obstacle.setComponent(rb);

        this._gameObjectsManager.instantiate(obstacle);
        return obstacle;
    }
    private _initControls() {
        const rb = this._player.getComponent('rigibody') as Rigidbody;
        this._inputManager.setListener({
            keyCode: 'KeyW',
            onDown: () => {
                const x = Math.cos(degreesToRad(this._player.rotation + rb.rotationVelocity)) / 8;
                const y = Math.sin(degreesToRad(this._player.rotation + rb.rotationVelocity)) / 8;
                rb.push(x, y);
            }
        });
        this._inputManager.setListener({
            keyCode: 'KeyD',
            onDown: () => {
                rb.turn(0.1);
            }
        });
        this._inputManager.setListener({
            keyCode: 'KeyA',
            onDown: () => {
                rb.turn(-0.1);
            }
        });
        this._inputManager.setListener({
            keyCode: 'Space',
            onDown: () => {
                this._player.shoot();
            },
            once: true,
        });
    }
    private _onTick(deltaTime: number) {
        document.querySelector('#player-pos').innerHTML = `Player pos - x: ${this._player.position.x}; y: ${this._player.position.y}`;


        const { gameObjects } = this._gameObjectsManager;
        // const c = (this._player.getComponent('collider') as Collider);
        gameObjects.forEach(x => {
            const cx = x.getComponent('collider') as Collider;
            gameObjects.forEach(y => {
                cx.collidesWith(y.getComponent('collider') as Collider);
            })
        })

        this._physicsManager.move(deltaTime);
        this._renderManager.rerender();
    }
}
