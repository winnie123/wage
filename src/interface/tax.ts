import { TaxType } from '../common/enum';
import { TaxModel } from '../model/tax';

export interface ITax {
    calculateTax(amount: number,rates : TaxModel[]): number;
}