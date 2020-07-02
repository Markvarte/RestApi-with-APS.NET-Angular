export interface Flat {

    id: number;
    num: string;
    floor: number;
    roomsCount: number;
    tenantsCount: number;
    totalArea: number;
    livingArea: number;
    houseId: number;
}
export class DefaultFlat implements Flat {
    id: number = null;
    num: string = '';
    floor: number = null;
    roomsCount: number = null;
    tenantsCount: number = null;
    totalArea: number = null;
    livingArea: number = null;
    houseId: number = null;
}