import Player from "./models/entities/Player";
import Vector from "../engine/models/Vector";
import Asteroid from "./models/entities/Asteroid";
import Rigidbody from "../engine/models/components/Rigidbody";
import GameObjectsService from "../engine/services/GameObjectsService";
import TickService from "../engine/services/TickService";
import InputService from "../engine/services/InputService";
import degreesToRad from "../engine/utils/degreesToRad";
import TextUIElement from "../engine/models/UI/TextUIElement";
import UserInterfaceService from "../engine/services/UserInterfaceService";
import RenderService from "@/engine/services/RenderService";
import { lerp } from "@/engine/utils/easing";

type GameManagerOptions = {
    width: number,
    height: number,
    uiService: UserInterfaceService,
    renderService: RenderService
}
export default class GameManager {
    private _renderService: RenderService;
    private _uiService: UserInterfaceService;
    private _currAsteroidInterval: NodeJS.Timeout;
    private _player: Player;
    score: number;
    start(options: GameManagerOptions) {
        const { height, width, uiService, renderService } = options;
        this._renderService = renderService;
        this._uiService = uiService;
        this.restart(height, width);
        TickService.onUpdate(() => {
            if (this._player.health <= 0) {
                this.stop();
                this.restart(height, width);
            }
        })
    }
    restart(height: number, width: number) {
        this._spawnPlayer(new Vector(width / 2, height / 2))
        this._startAsteroidInterval(width, height);
        this._initControls();
        this._initUI(width, height);

        this._renderService.camera.position = this._player.position;
        this._renderService.camera.target = this._player;


        let zoom = 5;
        let unsub: Function;

        unsub = TickService.onUpdate(({ deltaTime }: { deltaTime: number }) => {
            if (zoom > 1.5) {
                zoom -= deltaTime * .1;
                this._renderService.camera.setZoom(zoom);
            }
            if (zoom <= 1.5) {
                zoom = 1.5;
                this._renderService.camera.setZoom(zoom);
                unsub();
            }
        });
    }
    stop() {
        this._player.destroy();
        this._removeAllAsteroids();
        this._stopAsteroidInterval()
    }
    private _initControls() {
        const rb = this._player.getComponent('rigibody') as Rigidbody;
        InputService.setListener({
            keyCode: 'KeyW',
            onDown: () => {
                const x = Math.cos(degreesToRad(this._player.rotation + rb.rotationVelocity)) / 7;
                const y = Math.sin(degreesToRad(this._player.rotation + rb.rotationVelocity)) / 7;
                rb.push(x, y);
            }
        });
        InputService.setListener({
            keyCode: 'KeyD',
            onDown: () => {
                rb.turn(0.12);
            }
        });
        InputService.setListener({
            keyCode: 'KeyA',
            onDown: () => {
                rb.turn(-0.12);
            }
        });
        InputService.setListener({
            keyCode: 'Space',
            onDown: () => {
                this._player.shoot();
            },
        });
    }
    private _initUI(width: number, height: number) {
        const healthBlock = new TextUIElement({
            position: new Vector(15, 15),
            height: 100,
            width: 400,
            content: ``
        });
        this._uiService.addUIBlock(healthBlock);
        const positionBlock = new TextUIElement({
            position: new Vector(width - 350, height - 50),
            height: 50,
            width: 350,
            content: ``
        })
        this._uiService.addUIBlock(positionBlock);
        const objectsCount = new TextUIElement({
            position: new Vector(width - 350, 15),
            height: 50,
            width: 350,
            content: ``
        })
        this._uiService.addUIBlock(objectsCount);
        const scoreCount = new TextUIElement({
            position: new Vector(350, 15),
            height: 50,
            width: 350,
            content: ``
        })
        this._uiService.addUIBlock(scoreCount);

        TickService.onUpdate(() => {
            positionBlock.setContent(`Player position: x - ${this._player.position.x.toFixed(1)}; y - ${this._player.position.y.toFixed(1)}`);
            healthBlock.setContent(`Health left - ${this._player.health} / ${this._player.maxHealth}`);
            objectsCount.setContent(`There's ${GameObjectsService.gameObjects.size} game object(s) on the map`);
            scoreCount.setContent(`Score: ${this._player.score}`);
        })

        return { healthBlock, positionBlock, objectsCount };
    }
    private _spawnPlayer(position: Vector) {
        this._player = new Player({
            position,
            rotation: -90,
            maxHealth: 6
        });
        GameObjectsService.instantiate(this._player);
        const rb = this._player.getComponent('rigibody') as Rigidbody;
        TickService.onUpdate(() => {
            this._renderService.camera.setZoom(lerp(this._renderService.camera.zoom, 1.5 - rb.velocity.getLength() / 10, .02));
        })
    }
    private _removeAllAsteroids() {
        GameObjectsService.gameObjects.forEach(go => {
           if (go.name === 'asteroid') go.destroy();
        });
    }
    private _stopAsteroidInterval() {
        clearInterval(this._currAsteroidInterval);
    }
    private _startAsteroidInterval(width: number, height: number) {
        const getAsteroidPosition = {
            top: (): Vector => new Vector((Math.random() * width) + this._player.position.x, (Math.random() * -80 + 100) - 100 + this._player.position.y),
            left: (): Vector => new Vector((Math.random() * -80 + 60) - 60 + this._player.position.x, (Math.random() * height) + this._player.position.y),
            right: (): Vector => new Vector((Math.random() * 80 - 60) + 60 + width + this._player.position.x, (Math.random() * height + this._player.position.y)),
            bottom: (): Vector => new Vector(Math.random() * width + this._player.position.x, (Math.random() * 80 - 100) + 100 + height + this._player.position.y),
        };
        this._currAsteroidInterval = setInterval(() => {
            const keys = Object.keys(getAsteroidPosition);
            const side = keys[Math.floor(Math.random() * keys.length)] as keyof typeof getAsteroidPosition;
            const positionFunction = getAsteroidPosition[side];
            const position = positionFunction();
            const aroundPlayer = new Vector(position.x, position.y);
            const asteroid = new Asteroid({
                position: aroundPlayer,
                maxHealth: 20,
                name: 'asteroid',
                player: this._player,
            });

            const rb = asteroid.getComponent('rigibody') as Rigidbody
            asteroid.instantiate();
            rb.push((this._player.position.x - asteroid.position.x) * .003, (this._player.position.y - asteroid.position.y) * .003);
            rb.turn(5 * Math.random());
        }, 800);
    }
}
