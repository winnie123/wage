import {ITax} from '../interface/tax';


export class WageBiz implements ITax{
    public cash : number;
    public discount : number;

    constructor(cash : number){
        this.cash = cash;
        this.discount = 0.18;
    }

    public caculator(amount : number):number{
        let result = 0;
        return result;
    }
}