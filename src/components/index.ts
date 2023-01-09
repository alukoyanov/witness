export class Ref {
    constructor(public value: any) {}
}

export function ref(value: any) {
    return new Ref(value);
}