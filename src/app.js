"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./biz/basic");
const annualbonus_1 = require("./biz/annualbonus");
let main = (basicAmount, insuranceAmount, annualbonusAmount) => {
    let basic = new basic_1.BasicBiz(basicAmount, insuranceAmount, undefined);
    basic.calculateAmount();
    basic.showDetail();
    let annualbonus = new annualbonus_1.AnnualbonusBiz(annualbonusAmount, undefined);
    annualbonus.calculateAmount();
    annualbonus.showDetail();
    let amount = basic.result * 12 + annualbonus.result;
    console.log(`总收入：${amount}`);
};
main(400000 * 0.7 / 12, undefined, 400000 * 0.3);
