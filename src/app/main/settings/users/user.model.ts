import * as moment from 'moment';
import { FuseUtils } from '@fuse/utils';

export class Item
{
    id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    company: string;
    phone: string;
    holding_admin: boolean;
    role_admin: boolean;
    role_livestock: boolean;
    role_agriculture: boolean;
    createdOn: any;
    updatedOn: any;

    constructor(item?)
    {
        item = item || {};

        this.id = item.id || FuseUtils.generateGUID();
        this.email = item.email || '';
        this.password = item.password || '';
        this.firstname = item.firstname || '';
        this.lastname = item.lastname || '';
        this.company = item.company || '';
        this.phone = item.phone || '';

        this.holding_admin = item.holding_admin || false;
        this.role_admin = item.role_admin || false;
        this.role_livestock = item.role_livestock || false;
        this.role_agriculture = item.role_agriculture || false;
        this.createdOn = moment(item.createdOn) || moment();
        this.updatedOn = moment(item.updatedOn) || moment();

    }
}
