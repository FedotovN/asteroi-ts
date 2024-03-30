import GameObject from "../models/GameObject";
class GameObjectsService {
    gameObjects: Set<GameObject> = new Set();
    height: number;
    width: number;

    instantiate(go: GameObject) {
        this.gameObjects.add(go);
    }
    destroy(go: GameObject) {
        this.gameObjects.delete(go);
    }
    update(deltaTime: number) {
        this.gameObjects.forEach(go => go.onUpdate?.(deltaTime));
    }
}
export default new GameObjectsService();

