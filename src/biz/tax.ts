import {ITax} from '../interface/tax';
import {Area} from '../common/enum';
import * as Constant from '../common/constant';
import {TaxModel} from '../model/tax';

export class TaxBzi implements ITax{
    public area : string;
    public caculator(amount : number,area:string):number{
        let result : number = amount;
        this.area = area || Area.Shanghai;
        result = this.caculatorRate(amount);
        return result;
    }

    private caculatorRate(amount : number):number{
        let rate : TaxModel[] = Constant.taxRates[this.area];
        if(!rate){
            // return new Error('');
        }

        let sum : number = 0;
        rate.forEach((item : TaxModel) => {
            sum += this.getTax(amount,item);
        });
        return sum;
    }

    private getTax(amount : number,item:TaxModel):number{
        let result = 0;
        if(amount>=item.minAmount){
            result = amount >= item.maxAmount ? amount - item.maxAmount : item.maxAmount-amount;
            result = result * item.rate;
        }
        return result;
    }
}