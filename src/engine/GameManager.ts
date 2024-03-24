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
        this._spawnAsteroids();
        this._initControls();

        this._tickManager.start();
    }
    freeze() {
        this._tickManager.freeze();
    }
    private _addPlayer() {
        const position = {
            x: this._width / 2,
            y: this._height / 2,
        };
        const shape = new Shape({
            points: [
                { x: 0, y: -6 },
                { x: 20, y: 0 },
                { x: 0, y: 6 },
            ],
        });
        const collider = new Collider({ shape });
        const mesh = new Mesh({ shape });
        const rigidbody = new Rigidbody({});

        const player = new Player({
            maxHealth: 10,
            rotation: -90,
            position
        });

        player.setComponent(collider);
        player.setComponent(mesh);
        player.setComponent(rigidbody);

        collider.onCollision(() => {
            this._player.health -= 1;
            console.log('hp left:', this._player.health);
        });

        this._player = player;

        this._gameObjectsManager.instantiate(player);
    }
    private _spawnAsteroids() {
        setInterval(() => {
            const roid = this._addAsteroid();
            const rb = roid.getComponent('rigibody') as Rigidbody;
            rb.push(Math.random() * 10, Math.random() * 10);
            rb.turn(Math.random() * 20);
        }, 2000);
    }
    private _addAsteroid() {
        const position = { x: Math.random() * this._width, y: Math.random() * this._height };
        const shape = new Shape({
            points: [
                { x: -50, y: -30 },
                { x: -15, y: -25 },
                { x: -10, y: -27 },
                { x: -5, y: -15 },
                { x: 0, y: 10 },
                { x: 0, y: 15 },
                { x: -5, y: 20 },
                { x: -10, y: 25 },
                { x: -45, y: 50 },
                { x: -60, y: 25 },
                { x: -55, y: 15 },
                { x: -65, y: 5 },
                { x: -70, y: -35 },
            ]
        });

        const asteroid = new GameObject({ position, rotation: 0 });

        const mesh = new Mesh({ shape });
        const collider = new Collider({ shape });
        const rb = new Rigidbody({});

        asteroid.setComponent(mesh);
        asteroid.setComponent(collider);
        asteroid.setComponent(rb);

        this._gameObjectsManager.instantiate(asteroid);

        return asteroid;
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
        document.querySelector('#objects-amount').innerHTML = `Objects amount: ${this._gameObjectsManager.gameObjects.length}`;


        const { gameObjects } = this._gameObjectsManager;
        // const c = (this._player.getComponent('collider') as Collider);
        gameObjects.forEach(x => {
            const cx = x.getComponent('collider') as Collider;
            if (!cx) return;
            gameObjects.forEach(y => {
                const cy = y.getComponent('collider') as Collider;
                if (!cy) return;
                cx.collidesWith(cy);
            })
        })

        this._physicsManager.move(deltaTime);
        this._renderManager.rerender();
    }
}
