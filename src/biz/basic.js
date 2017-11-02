"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../common/enum");
const Constant = require("../common/constant");
class BasicBiz {
    constructor(amount, insuranceAmount, area) {
        this.area = area || enum_1.Area.Shanghai;
        this.rates = Constant.taxRates[this.area];
        this.amount = amount;
        this.insuranceAmount = insuranceAmount || 0;
        this.taxAmount = 0;
        this.insuranceDetail = [];
        this.result = 0;
    }
    calculateAmount() {
        this.insuranceAmount = this.getInsurance(this.insuranceAmount);
        this.taxAmount = this.calculateTax(this.amount - this.insuranceAmount - Constant.minAmount, this.rates);
        this.result = this.amount - this.taxAmount - this.insuranceAmount;
    }
    calculateTax(amount, rates) {
        let sum = 0;
        // rates.forEach((item: TaxModel) => {
        //     sum += this.getTax(amount, item);
        // });
        let tax = this.getTax(amount, rates);
        sum = amount * tax.rate - tax.buffer;
        return sum;
    }
    showDetail() {
        console.log(`税前基本工资：${this.amount}`);
        console.log(`交金额度：${this.insuranceAmount}`);
        console.log(`交金明细：`);
        this.insuranceDetail.forEach((item) => {
            console.log(`${item.name}(${item.rate}):${item.amount}`);
        });
        console.log(`税后收入：${this.result}`);
    }
    getTax(amount, rates) {
        return rates.filter((item) => {
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
    getInsurance(insuranceAmount) {
        if (insuranceAmount) {
            return insuranceAmount;
        }
        let result = 0;
        let amount = this.amount >= Constant.maxInsuranceAmount ? Constant.maxInsuranceAmount : this.amount;
        for (let insurance in Constant.insurances) {
            if (Constant.insurances.hasOwnProperty(insurance)) {
                let item = Constant.insurances[insurance];
                let value = amount * item.rate;
                if (item.max && value > item.max) {
                    value = item.max;
                }
                result += value;
                this.insuranceDetail.push({
                    name: item.name,
                    amount: value,
                    rate: item.rate,
                    max: item.max
                });
            }
        }
        return result;
    }
}
exports.BasicBiz = BasicBiz;
