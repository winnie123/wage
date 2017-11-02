import { ITax } from '../interface/tax';
import { Area } from '../common/enum';
import * as Constant from '../common/constant';
import { TaxModel } from '../model/tax';

export class AnnualbonusBiz implements ITax {
    public amount: number;
    public area: string;
    public rates: TaxModel[];
    public taxAmount : number;
    public result : number;

    constructor(amount: number, area: string) {
        this.amount = amount;
        this.area = area || Area.Shanghai;
        this.rates = Constant.taxRates[this.area];
        this.taxAmount = 0;
        this.result = 0;
    }

    public calculateAmount(): void {
        this.taxAmount = this.calculateTax(this.amount-Constant.minAmount, this.rates);
        this.result = this.amount - this.taxAmount;
    }

    public calculateTax(amount: number, rates: TaxModel[]): number {
        let monthAmount: number = amount / 12;
        let tax: TaxModel = this.getTax(monthAmount, rates);
        if (!tax) {
            throw new Error('');
        }
        let result: number = amount * tax.rate - tax.buffer;
        return result;
    }

    public showDetail(){
        console.log(`年终奖：${this.amount}`);
        console.log(`交税额度：${this.taxAmount}`);
        console.log(`税后收入：${this.result}`);
    }

    private getTax(amount: number, rates: TaxModel[]): TaxModel {
        return rates.filter((item: TaxModel) => {
            return (amount >= item.minAmount && amount <= item.maxAmount)
                || (amount >= item.minAmount && !item.maxAmount);
        })[0];
    }
}