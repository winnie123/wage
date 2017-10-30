import { TaxType } from '../common/enum';

export interface ITax {
    caculator(amount: number): number;
}