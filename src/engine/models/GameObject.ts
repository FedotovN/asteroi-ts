import GameObjectComponent from "@/engine/models/GameObjectComponent";
import Vector from "@/engine/models/Vector";
import GameObjectComponentName from "@/engine/types/GameObjectComponentName";
import GameObjectsService from "@/engine/services/GameObjectsService";
import Shape from "@/engine/models/Shape";
class Translate {
    position: Vector = Vector.zero()
    rotation: number = 0;
    parentTranslate: Translate;

    children: Set<Translate> = new Set();
    getActualPosition(): Vector {
        if (!this.parentTranslate) return this.position;
        const { rotation, position } = this.parentTranslate;
        console.log(position);
        const { x, y } = this.position;
        const { x: px, y: py } = position;
        const biasedPos = new Vector(x + px, y + py);
        return Shape.rotatePoint(biasedPos.x, biasedPos.y, rotation, position);
    }
    getActionRotation() {
        if (this.parentTranslate)
            return this.parentTranslate.rotation + this.rotation;
        return this.rotation;
    }
    setPosition(position: Vector) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    setRotation(rotation: number) {
        this.rotation = rotation;
    }
    addChild(child: Translate) {
        this.children.add(child);
        child.parentTranslate = this;
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
        console.log(this._children);
        this.translate.addChild(child.translate);
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
