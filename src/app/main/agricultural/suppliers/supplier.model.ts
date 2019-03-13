import * as moment from 'moment';
import { FuseUtils } from '@fuse/utils';

export class Item
{
    id: string;
    // ...
    createdOn: any;
    updatedOn: any;

    constructor(item?)
    {
        item = item || {};

        this.id = item.id || FuseUtils.generateGUID();
        // ...
        this.createdOn = moment(item.createdOn) || moment();
        this.updatedOn = moment(item.updatedOn) || moment();

    }
}
