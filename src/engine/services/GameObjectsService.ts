import GameObject from "../models/GameObject";
export default class GameObjectsService {
    public gameObjects: GameObject[] = [];
    instantiate(go: GameObject) {
        this.gameObjects.push(go);
    }
}

