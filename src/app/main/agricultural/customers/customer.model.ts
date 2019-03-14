import * as moment from 'moment';
import { FuseUtils } from '@fuse/utils';

export class Customer
{
    id: string;
    code: string;
    name: string;
    description: string;
    active: boolean;
    recordOnly: boolean;
    //General
    detDescription: string;
    address: string;
    postalCode: number;
    country: string;
    contactPerson: string;
    phone:string;
    email:string;
    taxNumber:string;
    otherInfo:string;
    //Contract Prices
    item: string;
    price: number;
    currency: string;
    discount: number;
    //Meta
    createdOn: any;
    updatedOn: any;

    constructor(item?)
    {
        item = item || {};

        this.id = item.id || FuseUtils.generateGUID();
        this.code= item.code || '';
        this.name= item.name || '';
        this.description= item.description || '';
        this.active= item.active || '';
        this.recordOnly= item.recordOnly || '';
        //General
        this.detDescription= item.detDescription || '';
        this.address= item.address || '';
        this.postalCode= item.postalCode || 0;
        this.country= item.country || '';
        this.contactPerson= item.contactPerson || '';
        this.phone= item.phone || '';
        this.email= item.email || '';
        this.taxNumber= item.taxNumber || '';
        this.otherInfo= item.otherInfo || '';
        //Contract Prices
        this.item= item.item || '';
        this.price= item.price || 0;
        this.currency= item.currency || '';
        this.discount= item.discount || 0;
          //Meta    
        this.createdOn = moment(item.createdOn) || moment();
        this.updatedOn = moment(item.updatedOn) || moment();

    }
}
