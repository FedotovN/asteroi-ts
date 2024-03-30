import "../styles.css";
import EngineManager from "./engine/EngineManager";
import GameManager from "@/game/GameManager";

const e = new EngineManager({
    canvasSelector: '#root',
    uiRootSelector: '#ui',
    width: window.innerWidth,
    height: window.innerHeight,
});
const {
    height,
    width,
    userInterfaceService,
    inputService,
} = e;

const gm = new GameManager();
gm.start({ height, width, inputService, uiService: userInterfaceService });
e.start();

