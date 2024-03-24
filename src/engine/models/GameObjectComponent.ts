import GameObject from "./GameObject";
import GameObjectComponentName from "@/engine/types/GameObjectComponentName";
export type GameObjectComponentOptions = {
    gameObject?: GameObject
}
export default class GameObjectComponent {
    name: GameObjectComponentName;
    protected _gameObject: GameObject
    constructor({ gameObject }: GameObjectComponentOptions) {
        if (gameObject) this._gameObject = gameObject;
    }
    setGameObject(go: GameObject) {
        this._gameObject = go;
    }
}
