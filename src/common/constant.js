"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let taxRates = {
    'shanghai': [
        {
            'minAmount': 0,
            'maxAmount': 1500,
            'rate': 0.03,
            'buffer': 0
        },
        {
            'minAmount': 1501,
            'maxAmount': 4500,
            'rate': 0.1,
            'buffer': 105
        },
        {
            'minAmount': 4501,
            'maxAmount': 9000,
            'rate': 0.2,
            'buffer': 555
        },
        {
            'minAmount': 9001,
            'maxAmount': 35000,
            'rate': 0.25,
            'buffer': 1005
        },
        {
            'minAmount': 35001,
            'maxAmount': 55000,
            'rate': 0.3,
            'buffer': 2775
        },
        {
            'minAmount': 55001,
            'maxAmount': 80000,
            'rate': 0.35,
            'buffer': 5505
        },
        {
            'minAmount': 80001,
            'maxAmount': undefined,
            'rate': 0.45,
            'buffer': 13505
        },
    ]
};
exports.taxRates = taxRates;
let insurances = {
    'pension': {
        name: '养老保险',
        rate: 0.08,
    },
    'medical': {
        name: '医疗保险',
        rate: 0.02
    },
    'unemployment': {
        name: '失业保险',
        rate: 0.005
    },
    'house': {
        name: '住房公积金',
        rate: 0.07,
        max: 2732
    }
};
exports.insurances = insurances;
let minAmount = 3500;
exports.minAmount = minAmount;
let maxInsuranceAmount = 19512;
exports.maxInsuranceAmount = maxInsuranceAmount;
