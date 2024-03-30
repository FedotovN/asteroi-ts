import GameObject, { GameObjectOptions } from "@/engine/models/GameObject";
export type AgentProperties = {
    health?: number,
    maxHealth: number,
} & GameObjectOptions
export default class Agent extends GameObject {
    health: number;
    maxHealth: number;
    constructor({ position, rotation, maxHealth, health }: AgentProperties) {
        super({ position, rotation });
        this.maxHealth = maxHealth;
        this.health = health || maxHealth;
    }
    makeDamage(damage: number) {}
}
