import { ITax } from '../interface/tax';
import { Area } from '../common/enum';
import * as Constant from '../common/constant';
import { TaxModel, InsuranceModel } from '../model/tax';

export class BasicBiz implements ITax {
    public area: string;
    public rates: TaxModel[];
    public amount: number;
    public taxAmount: number;
    public insuranceAmount: number;
    public insuranceDetail: InsuranceModel[];
    public result: number;

    constructor(amount: number, insuranceAmount: number, area: string) {
        this.area = area || Area.Shanghai;
        this.rates = Constant.taxRates[this.area];
        this.amount = amount;
        this.insuranceAmount = insuranceAmount || 0;
        this.taxAmount = 0;
        this.insuranceDetail = [];
        this.result = 0;
    }

    public calculateAmount(): void {
        this.insuranceAmount = this.getInsurance(this.insuranceAmount);
        this.taxAmount = this.calculateTax(this.amount - this.insuranceAmount - Constant.minAmount, this.rates);
        this.result = this.amount - this.taxAmount - this.insuranceAmount;
    }

    public calculateTax(amount: number, rates: TaxModel[]): number {
        let sum: number = 0;
        // rates.forEach((item: TaxModel) => {
        //     sum += this.getTax(amount, item);
        // });
        let tax: TaxModel = this.getTax(amount, rates);
        sum = amount * tax.rate - tax.buffer;
        return sum;
    }

    public showDetail() {
        console.log(`税前基本工资：${this.amount}`);
        console.log(`交金额度：${this.insuranceAmount}`);
        console.log(`交金明细：`);
        this.insuranceDetail.forEach((item: InsuranceModel) => {
            console.log(`${item.name}(${item.rate}):${item.amount}`);
        });
        console.log(`税后收入：${this.result}`);
    }

    private getTax(amount: number, rates: TaxModel[]): TaxModel {
        return rates.filter((item: TaxModel) => {
            return (amount >= item.minAmount && amount <= item.maxAmount)
                || (amount >= item.minAmount && !item.maxAmount);
        })[0];
    }

    // private getTax(amount: number, item: TaxModel): number {
    //     let result = 0;
    //     if (amount >= item.minAmount) {
    //         result = amount >= item.maxAmount ? (item.maxAmount - item.minAmount) : (amount - item.minAmount);
    //         result = result * item.rate - item.buffer;
    //     }
    //     return result;
    // }

    private getInsurance(insuranceAmount: number): number {
        if (insuranceAmount) {
            return insuranceAmount;
        }

        let result: number = 0;
        let amount: number = this.amount >= Constant.maxInsuranceAmount ? Constant.maxInsuranceAmount : this.amount;
        for (let insurance in Constant.insurances) {
            if (Constant.insurances.hasOwnProperty(insurance)) {
                let item: InsuranceModel = Constant.insurances[insurance];
                let value = amount * item.rate
                if (item.max && value > item.max) {
                    value = item.max;
                }
                result += value;
                this.insuranceDetail.push({
                    name: item.name,
                    amount: value,
                    rate: item.rate,
                    max: item.max
                })
            }
        }
        return result;
    }
}