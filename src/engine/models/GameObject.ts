import GameObjectComponent from "@/engine/models/GameObjectComponent";
import Vector from "@/engine/models/Vector";
import GameObjectComponentName from "@/engine/types/GameObjectComponentName";
import GameObjectsService from "@/engine/services/GameObjectsService";
export type GameObjectOptions = {
    position?: Vector,
    rotation?: number,
    name?: string,
    id?: string,
}

export default class GameObject {
    position: Vector = Vector.zero();
    rotation: number = 0;
    name: string;
    id: string;
    private _components: { [key in GameObjectComponentName | string]: GameObjectComponent } = {};
    constructor({ position, rotation, name, id }: GameObjectOptions) {
        if (position) this.position = position;
        if (rotation) this.rotation = rotation;
        if (name) this.name = name;
        if (id) this.id = id;
    }
    setComponent(component: GameObjectComponent) {
        this._components[component.name] = component;
        component.setGameObject(this);
    }
    getComponent(name: GameObjectComponentName) {
        return this._components[name];
    }
    onUpdate(deltaTime: number) {}
    instantiate() {
        GameObjectsService.instantiate(this);
    }
    destroy() {
        GameObjectsService.destroy(this);
    }
}
