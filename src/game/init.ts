import Vector from "../engine/models/Vector";
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
