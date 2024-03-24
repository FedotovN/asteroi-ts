export default class Vector {
    constructor(public x: number = 0, public y: number = 0) {}
    static zero(): Vector {
        return { x: 0, y: 0 }
    }
}
