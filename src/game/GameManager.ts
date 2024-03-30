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
type GameManagerOptions = {
    width: number,
    height: number,
    inputService: InputService,
    uiService: UserInterfaceService,
}
export default class GameManager {
    private _currAsteroidInterval: NodeJS.Timeout;
    private _player: Player;
    start(options: GameManagerOptions) {
        const { height, width, uiService, inputService } = options;
        this._spawnPlayer(new Vector(width / 2, height / 2))
        this._initControls(inputService);
        this._initUI(uiService, width, height);
        this._startAsteroidInterval(width, height);
    }
    stop() {
        this._removeAllAsteroids();
        this._stopAsteroidInterval()
    }
    private _initControls(inputService: InputService) {
        const rb = this._player.getComponent('rigibody') as Rigidbody;
        inputService.setListener({
            keyCode: 'KeyW',
            onDown: () => {
                const x = Math.cos(degreesToRad(this._player.rotation + rb.rotationVelocity)) / 8;
                const y = Math.sin(degreesToRad(this._player.rotation + rb.rotationVelocity)) / 8;
                rb.push(x, y);
            }
        });
        inputService.setListener({
            keyCode: 'KeyD',
            onDown: () => {
                rb.turn(0.1);
            }
        });
        inputService.setListener({
            keyCode: 'KeyA',
            onDown: () => {
                rb.turn(-0.1);
            }
        });
        inputService.setListener({
            keyCode: 'Space',
            onDown: () => {
                this._player.shoot();
            },
        });
    }
    private _initUI(uiService: UserInterfaceService, width: number, height: number) {
        const healthBlock = new TextUIElement({
            position: new Vector(15, 15),
            height: 100,
            width: 400,
            content: ``
        });
        uiService.addUIBlock(healthBlock);
        const positionBlock = new TextUIElement({
            position: new Vector(width - 350, height - 50),
            height: 50,
            width: 350,
            content: ``
        })
        uiService.addUIBlock(positionBlock);
        const objectsCount = new TextUIElement({
            position: new Vector(width - 350, 15),
            height: 50,
            width: 350,
            content: ``
        })
        uiService.addUIBlock(objectsCount);

        TickService.onUpdate(() => {
            positionBlock.setContent(`Player position: x - ${this._player.position.x.toFixed(1)}; y - ${this._player.position.y.toFixed(1)}`);
            healthBlock.setContent(`Health left - ${this._player.health} / ${this._player.maxHealth}`);
            objectsCount.setContent(`There's ${GameObjectsService.gameObjects.size} game object(s) on the map`);
        })

        return { healthBlock, positionBlock, objectsCount };
    }
    private _spawnPlayer(position: Vector) {
        this._player = new Player({
            position,
            rotation: -90,
            health: 10,
            maxHealth: 10
        });
        GameObjectsService.instantiate(this._player);
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
            top: (): Vector => new Vector(Math.random() * width, (Math.random() * -80 + 60) - 60),
            left: (): Vector => new Vector((Math.random() * -80 + 60) - 60, (Math.random() * height)),
            right: (): Vector => new Vector((Math.random() * 80 - 60) + 60 + width, (Math.random() * height)),
            bottom: (): Vector => new Vector(Math.random() * width, (Math.random() * 80 - 60) + 60 + height),
        };
        this._currAsteroidInterval = setInterval(() => {
            const keys = Object.keys(getAsteroidPosition);
            const side = keys[Math.floor(Math.random() * keys.length)] as keyof typeof getAsteroidPosition;
            const positionFunction = getAsteroidPosition[side];
            const asteroid = new Asteroid({
                position: positionFunction(),
                maxHealth: 20,
                name: 'asteroid',
            });
            const rb = asteroid.getComponent('rigibody') as Rigidbody
            asteroid.instantiate();
            rb.push((this._player.position.x - asteroid.position.x) * .002, (this._player.position.y - asteroid.position.y) * .002);
            rb.turn(5 * Math.random());
        }, 3000);
    }
}
