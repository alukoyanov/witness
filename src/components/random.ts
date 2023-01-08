import { match } from "ts-pattern";

interface IRandomVariant
{ choise(): any; }

class RandomVariant
{    
    public choise(): any {throw 'not implemented'}
    
    public equals(value: any): boolean
    {
        return value == this.choise();
    }
}

class RandomRange extends RandomVariant implements IRandomVariant
{    
    constructor(
        private min: number,
        private max: number,
    ) {super()}
    
    public choise(): any
    {
        return (Math.random() * (this.max - this.min) + this.min);
    }
}

class RandomStore extends RandomVariant implements IRandomVariant
{
    constructor(private items: any[])
    {super()}
    
    public choise(): any
    {
        return this.items[Math.floor((new RandomRange(0, this.items.length-1)).choise())];
    }
}

export function range(min: number, max: number) {
    return new RandomRange(min, max);
}
    
export function of(items: any[]) {
    return new RandomStore(items);
}

export function choise(...args) {
    if (args.length === 2
        && typeof args[0] == 'number'
        && typeof args[1] == 'number'
    ) {
        return range(args[0], args[1]).choise();
    } else if (Array.isArray(args[0])) {
        return of(args[0]).choise();
    }
}