import Agent, { AgentProperties } from "../Agent";
import { GameObjectOptions } from "@/engine/models/GameObject";

export default class Player extends Agent {
    constructor(props: AgentProperties & GameObjectOptions) {
        super(props);
    }
    shoot() {
        console.log('shooting');
    }
}
