export interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    personalCode: string;
    dateOfBirst: string;
    phoneNumber: string;
    eMail: string;
    flatId: number;
}
export class DefaultTenant implements Tenant {
    id: number = null;
    firstName: string = '';
    lastName: string = '';
    personalCode: string = '';
    dateOfBirst: string = '';
    phoneNumber: string = '';
    eMail: string = '';
    flatId: number = null;
}