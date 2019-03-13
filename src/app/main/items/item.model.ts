import * as moment from 'moment';
import { FuseUtils } from '@fuse/utils';

export class Item
{
    id: string;
    name: string;
    description: string;
    techDescription: string;
    supplier: string;
    externalId: number;
    active: boolean;

    recordOnly: boolean;
    // General
    category: string;
    warranty: number;
    sn: string;
    itemType: number;
    department: string;
    // General properties
    primaryUM: string;
    netWeight: number;
    grossWeight: number;
    width: number;
    height: number;
    depth: number;
    um: number;
    // Cost
    suppliersPrice: number;
    suppliersDiscount: number;
    transport: number;
    customs: number;
    vat: number;
    // Images
    imageUrl: string;
    // Meta
    createdOn: any;
    updatedOn: any;

    constructor(item?)
    {
        item = item || {};

        this.id= item.id || FuseUtils.generateGUID();
        this.name= item.name || '';
        this.description= item.description || '';
        this.techDescription= item.techDescription || '';
        this.supplier= item.supplier || '';
        this.externalId= item.externalId || 0;
        this.active= item.active || '';

        this.recordOnly= item.recordOnly || '';
        // General
        this.category= item.category || '';
        this.warranty= item.warranty || 3;
        this.sn= item.sn || '';
        this.itemType= item.itemType || 100;
        this.department= item.department || '';
        // General properties
        this.primaryUM= item.primaryUM || '';
        this.netWeight= item.netWeight || '';
        this.grossWeight= item.grossWeight || '';
        this.width= item.width || 0;
        this.height= item.height || 0;
        this.depth= item.depth || 0;
        this.um= item.um || 0;
        // Cost
        this.suppliersPrice= item.suppliersPrice || 0;
        this.suppliersDiscount= item.suppliersDiscount || 0;
        this.transport = item.transport || 0;
        this.customs= item.customs || 0;
        this.vat= item.vat || 0;
        // Images
        this.imageUrl= item.imageUrl || 'https://via.placeholder.com/468x480?text=No image uploaded';
        // Meta
        this.createdOn = moment(item.createdOn) || moment();
        this.updatedOn = moment(item.updatedOn) || moment();

    }
}
