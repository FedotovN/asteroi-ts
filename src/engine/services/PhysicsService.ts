import GameObjectsService from "./GameObjectsService";
import Rigidbody from "@/engine/models/components/Rigidbody";
export default class PhysicsService {
    constructor(private _gameObjectsManager: GameObjectsService) {}
    move(deltaTime: number) {
        this._gameObjectsManager.gameObjects.forEach(go => {
           const rb = go.getComponent('rigibody') as Rigidbody;
           if (rb) {
               rb.move(deltaTime);
           }
        });
    }

}
