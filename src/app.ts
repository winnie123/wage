import { BasicBiz } from './biz/basic';
import { AnnualbonusBiz } from './biz/annualbonus';
let main = (basicAmount: number, insuranceAmount: number, annualbonusAmount: number) => {
    let basic = new BasicBiz(basicAmount, insuranceAmount, undefined);
    basic.calculateAmount();
    basic.showDetail();

    let annualbonus = new AnnualbonusBiz(annualbonusAmount, undefined);
    annualbonus.calculateAmount();
    annualbonus.showDetail();

    let amount = basic.result * 12 + annualbonus.result;
    console.log(`总收入：${amount}`);
};

main(400000 * 0.7 / 12, undefined, 400000 * 0.3);