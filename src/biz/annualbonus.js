"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../common/enum");
const Constant = require("../common/constant");
class AnnualbonusBiz {
    constructor(amount, area) {
        this.amount = amount;
        this.area = area || enum_1.Area.Shanghai;
        this.rates = Constant.taxRates[this.area];
        this.taxAmount = 0;
        this.result = 0;
    }
    calculateAmount() {
        this.taxAmount = this.calculateTax(this.amount - Constant.minAmount, this.rates);
        this.result = this.amount - this.taxAmount;
    }
    calculateTax(amount, rates) {
        let monthAmount = amount / 12;
        let tax = this.getTax(monthAmount, rates);
        if (!tax) {
            throw new Error('');
        }
        let result = amount * tax.rate - tax.buffer;
        return result;
    }
    showDetail() {
        console.log(`年终奖：${this.amount}`);
        console.log(`交税额度：${this.taxAmount}`);
        console.log(`税后收入：${this.result}`);
    }
    getTax(amount, rates) {
        return rates.filter((item) => {
            return (amount >= item.minAmount && amount <= item.maxAmount)
                || (amount >= item.minAmount && !item.maxAmount);
        })[0];
    }
}
exports.AnnualbonusBiz = AnnualbonusBiz;
