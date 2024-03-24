import GameObjectComponent from "@/engine/models/GameObjectComponent";
import Vector from "@/engine/models/Vector";
import GameObjectComponentName from "@/engine/types/GameObjectComponentName";

export type GameObjectOptions = {
    position?: Vector,
    rotation?: number,
}

export default class GameObject {
    position: Vector = { x: 0, y: 0 };
    rotation: number = 0;
    private _components: { [key in GameObjectComponentName | string]: GameObjectComponent } = {};
    constructor({ position, rotation }: GameObjectOptions) {
        if (position) this.position = position;
        if (rotation) this.rotation = rotation;
    }
    setComponent(component: GameObjectComponent) {
        this._components[component.name] = component;
        component.setGameObject(this);
    }
    getComponent(name: GameObjectComponentName) {
        return this._components[name];
    }
}
