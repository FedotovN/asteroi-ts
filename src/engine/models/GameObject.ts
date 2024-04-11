import GameObjectComponent from "@/engine/models/GameObjectComponent";
import Vector from "@/engine/models/Vector";
import GameObjectComponentName from "@/engine/types/GameObjectComponentName";
import GameObjectsService from "@/engine/services/GameObjectsService";
class Translate {
    position: Vector = Vector.zero()
    localPosition: Vector = Vector.zero();
    parentPosition: Vector = Vector.zero();
    rotation: number = 0;
    localRotation: number = 0;
    parentRotation: number = 0;

    setParentPosition(position: Vector) {
        this.parentPosition = position;
    }
    setPosition(position: Vector) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    getLocalToWorldPosition() {
        return new Vector(this.localPosition.x + this.parentPosition.x,  this.localPosition.y + this.parentPosition.y);
    }
}
export type GameObjectOptions = {
    name?: string,
    id?: string,
}

export default class GameObject {
    translate: Translate = new Translate();
    name: string;
    id: string;
    private _children: Set<GameObject> = new Set<GameObject>();
    private _components: { [key in GameObjectComponentName | string]: GameObjectComponent } = {};
    constructor(props?: GameObjectOptions) {
        if (props) {
            const { name, id } = props;
            this.name = name;
            this.id = id;
        }
    }
    setComponent(component: GameObjectComponent) {
        this._components[component.name] = component;
        component.setGameObject(this);
    }
    getComponent(name: GameObjectComponentName) {
        return this._components[name];
    }
    addChild(child: GameObject) {
        this._children.add(child)
    }
    removeChild(childId: string): void;
    removeChild(child: GameObject | string) {
        if (typeof child === 'number') {
            const childToRemove = [...this._children].find((c) => c.id === child);
            this._children.delete(childToRemove);
            return;
        }
        if (child instanceof GameObject) {
            this._children.delete(child);
        }
    }
    onInstantiate() {}
    onUpdate(deltaTime: number) {}
    instantiate() {
        GameObjectsService.instantiate(this);
    }
    destroy() {
        this._children.forEach((child) => {
            GameObjectsService.destroy(child);
        });
        GameObjectsService.destroy(this);
    }
}
