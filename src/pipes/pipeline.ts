
import IPipe from ".";
import { ref, Ref } from "../components";

export default class Pipeline
{
    result_value: Ref;
    
    constructor() {}
    
    public pass(value: any): this {
        this.result_value = ref(value);
        return this;
    }
    
    public through(pipes: IPipe[]): this {
        return this;
    }
}