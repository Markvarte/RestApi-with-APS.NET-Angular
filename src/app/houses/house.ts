export interface House {
  id: number;
  num: number;
  street: string;
  sity: string;
  country: string;
  postCode: string;
}
export class DefaultHouse implements House {
  id: number= null;
  num: number = 0;
  street: string = '';
  sity: string = '';
  country: string = '';
  postCode: string = '';
}