export type TaxModel = {
    minAmount : number;// 金额下限
    maxAmount : number;// 金额上限
    rate : number;// 税率
    buffer : number;// 速扣金额
}

export type TaxDetailModel = {
    month : string;
    amount : number;
    tax : number;
    desc : string;
    other : InsuranceModel;
}

export type InsuranceModel = {
    name : string;
    amount : number;
    rate : number;
    max : number;
}