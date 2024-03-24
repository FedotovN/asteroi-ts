import "../styles.css";
import GameManager from "./engine/GameManager";
new GameManager({
    rootSelector: '#root',
    width: window.innerWidth,
    height: window.innerHeight,
}).start();
