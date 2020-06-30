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
    floor: number = 0;
    roomsCount: number = 0;
    tenantsCount: number = 0;
    totalArea: number = 0;
    livingArea: number = 0;
    houseId: number = null;
}