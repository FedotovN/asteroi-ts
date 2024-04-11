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
    renderService
} = e;
const gm = new GameManager();
renderService.addCamera();

gm.start({ height, width, uiService: userInterfaceService, renderService });
e.start();

