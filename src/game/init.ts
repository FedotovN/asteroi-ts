import Shape from "../engine/models/Shape";
import Collider from "../engine/models/components/Collider";
import Mesh from "../engine/models/components/Mesh";
import Rigidbody from "../engine/models/components/Rigidbody";
import Player from "./models/entities/Player";
import Vector from "../engine/models/Vector";
import InputService from "@/engine/services/InputService";
import degreesToRad from "@/engine/utils/degreesToRad";
import TextUIElement from "@/engine/models/UI/TextUIElement";
import UserInterfaceService from "@/engine/services/UserInterfaceService";


export function initUI(userInterfaceService: UserInterfaceService, width: number, height: number) {
    const healthBlock = new TextUIElement({
        position: new Vector(15, 15),
        height: 100,
        width: 400,
        content: ``
    });
    userInterfaceService.addUIBlock(healthBlock);
    const positionBlock = new TextUIElement({
        position: new Vector(width - 350, height - 50),
        height: 50,
        width: 350,
        content: ``
    })
    userInterfaceService.addUIBlock(positionBlock);

    const objectsCount = new TextUIElement({
        position: new Vector(width - 350, 15),
        height: 50,
        width: 350,
        content: ``
    })
    userInterfaceService.addUIBlock(objectsCount);

    return { healthBlock, positionBlock, objectsCount };
}
