import GameObject, { GameObjectOptions } from "@/engine/models/GameObject";
export type AgentProperties = {
    health?: number,
    maxHealth: number,
}
export default class Agent extends GameObject {
    health: number;
    maxHealth: number;
    constructor({ position, rotation, maxHealth, health }: GameObjectOptions & AgentProperties) {
        super({ position, rotation });
        this.maxHealth = maxHealth;
        this.health = health || maxHealth;
    }
}
