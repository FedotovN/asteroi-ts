import "../styles.css";
import EngineManager from "./engine/EngineManager";
import GameManager from "@/game/GameManager";
const e = new EngineManager({
    uiRootSelector: '#ui',
});
const {
    userInterfaceService: uiService,
} = e;
const gm = new GameManager();

gm.start({
    uiService,
    height: window.innerHeight,
    width: window.innerWidth,
    canvasSelector: '#root',
    uiRootSelector: '#ui'
});
e.start();

