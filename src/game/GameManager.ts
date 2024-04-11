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
import { clamp, lerp } from "@/engine/utils/easing";
import { negativeRandom, minRandom } from "@/engine/utils/random";
import AudioService from "@/engine/services/AudioService";
import ExampleGameobject from "@/game/models/other/ExampleGameobject";
// import AudioService from "@/engine/services/AudioService";

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

    private _mapWidth = 6000;
    private _mapHeight = 6000;
    velocityZoomUnsub: Function;
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
            this._player.translate.position.x = clamp(this._player.translate.position.x, 0, this._mapWidth);
            this._player.translate.position.y = clamp(this._player.translate.position.y, 0, this._mapHeight);
        })
    }
    restart(height: number, width: number) {
        this._spawnPlayer(new Vector(this._mapWidth / 2, this._mapHeight / 2))
        this._startAsteroidInterval(width, height);
        this._initControls();
        this._initUI(width, height);

        this._renderService.camera.translate.position = new Vector(this._player.translate.position.x, this._player.translate.position.y);
        this._renderService.camera.target = this._player;
        this._renderService.camera.borders = {
            top: 0,
            left: 0,
            right: this._mapWidth,
            bottom: this._mapHeight,
        };

        AudioService.listenerPosition = this._renderService.camera.translate.position;

        let zoom = 5;
        let unsub: Function;

        unsub = TickService.onUpdate(({ deltaTime }: { deltaTime: number }) => {
            if (zoom > 1.6) {
                zoom -= deltaTime * .1;
                this._renderService.camera.setZoom(zoom);
            }
            if (zoom <= 1.6) {
                zoom = 1.6;
                this._renderService.camera.setZoom(zoom);
                unsub();
            }
        });
    }
    stop() {
        this._player.destroy();
        this.velocityZoomUnsub();
        this._removeAllAsteroids();
        this._stopAsteroidInterval()
    }
    private _initControls() {
        const rb = this._player.getComponent('rigibody') as Rigidbody;
        InputService.setListener({
            keyCode: 'KeyW',
            onDown: () => {
                const x = Math.cos(degreesToRad(this._player.translate.rotation + rb.rotationVelocity)) / 6;
                const y = Math.sin(degreesToRad(this._player.translate.rotation + rb.rotationVelocity)) / 6;
                rb.push(x, y);
            }
        });
        InputService.setListener({
            keyCode: 'KeyD',
            onDown: () => {
                rb.turn(0.2);
            }
        });
        InputService.setListener({
            keyCode: 'KeyA',
            onDown: () => {
                rb.turn(-0.2);
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
            positionBlock.setContent(`Player position: x - ${this._player.translate.position.x.toFixed(1)}; y - ${this._player.translate.position.y.toFixed(1)}`);
            healthBlock.setContent(`Health left - ${this._player.health} / ${this._player.maxHealth}`);
            objectsCount.setContent(`There's ${GameObjectsService.gameObjects.size} game object(s) on the map`);
            scoreCount.setContent(`Score: ${this._player.score}`);
        })

        return { healthBlock, positionBlock, objectsCount };
    }
    private _spawnPlayer(position: Vector) {
        this._player = new Player({
            maxHealth: 6,
        });
        this._player.translate.position = position;

        GameObjectsService.instantiate(this._player);
        const shipPart = new ExampleGameobject();
        shipPart.translate.localPosition = new Vector(-0,0);
        shipPart.translate.localRotation = 0;

        this._player.addChild(shipPart);
        shipPart.instantiate();
        const rb = this._player.getComponent('rigibody') as Rigidbody;
        this.velocityZoomUnsub = TickService.onUpdate(() => {
            this._renderService.camera.setZoom(lerp(this._renderService.camera.zoom, 1.6 - rb.velocity.getLength() / 10, .02));
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
        //@ts-ignore
        import('../game/assets/AsteroidExplode.wav').then(res => {
            AudioService.add({ name: 'asteroid-explode', resolvedSrc: res.default });
        });
        //@ts-ignore
        import('../game/assets/AsteroidHurt.wav').then(res => {
            AudioService.add({ name: 'asteroid-hurt', resolvedSrc: res.default });
        });


        const spawnZoneWidth = 600;
        const minSpawnZoneDist = 200

        const horRand = () => negativeRandom(width / -2, width / 2);
        const verRand = () => negativeRandom(height / -2, height / 2);
        const spawnZoneRand = () => minRandom(minSpawnZoneDist, spawnZoneWidth);
        const getAsteroidPosition = {
            top: (x: number, y: number): Vector => new Vector(x + horRand(), (y - height / 2) - spawnZoneRand()),
            left: (x: number, y: number): Vector => new Vector((x - width / 2) - spawnZoneRand(), y + verRand()),
            right: (x: number, y: number): Vector => new Vector((x + width / 2) + spawnZoneRand() * Math.random(), y + verRand()),
            bottom: (x: number, y: number): Vector => new Vector(x + horRand(), (y + height / 2) + spawnZoneRand()),
        };
        this._currAsteroidInterval = setInterval(() => {
            const { x, y } = this._player.translate.position;
            const keys = Object.keys(getAsteroidPosition);
            const side = keys[Math.floor(Math.random() * keys.length)] as keyof typeof getAsteroidPosition;
            const positionFunction = getAsteroidPosition[side];
            const position = positionFunction(x, y);
            const asteroid = new Asteroid({
                maxHealth: 6,
                name: 'asteroid',
                player: this._player,
            });
            asteroid.translate.position = position;

            const rb = asteroid.getComponent('rigibody') as Rigidbody
            asteroid.instantiate();
            rb.push((this._player.translate.position.x - asteroid.translate.position.x) * .003, (this._player.translate.position.y - asteroid.translate.position.y) * .003);
            rb.turn(5 * Math.random());
        }, 800);
    }
}
