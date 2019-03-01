import * as moment from 'moment';
import { FuseUtils } from '@fuse/utils';

export class Item
{
    id: string;
    code: string;
    name: string;
    description: string;
    active: boolean;
    subtotal: string;
    tax: string;
    discount: string;
    total: string;
    createdOn: any;
    updatedOn: any;

    constructor(item?)
    {
        item = item || {};

        this.id = item.id || FuseUtils.generateGUID();
        this.code = item.code || '';
        this.name = item.name || '';
        this.description = item.description || '';
        this.active = item.active || true;
        this.subtotal = item.subtotal || 0;
        this.tax = item.tax || 0;
        this.discount = item.discount || 0;
        this.total = item.total || 0;
        this.createdOn = moment(item.createdOn) || moment();
        this.updatedOn = moment(item.updatedOn) || moment();

    }
}
