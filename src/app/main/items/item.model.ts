import * as moment from 'moment';
import { FuseUtils } from '@fuse/utils';

export class Item
{
    // id: string;
    // code: string;
    // name: string;
    // description: string;
    // active: boolean;
    // subtotal: string;
    // tax: string;
    // discount: string;
    // total: string;
    // createdOn: any;
    // updatedOn: any;

    // constructor(item?)
    // {
    //     item = item || {};

    //     this.id = item.id || FuseUtils.generateGUID();
    //     this.code = item.code || '';
    //     this.name = item.name || '';
    //     this.description = item.description || '';
    //     this.active = item.active || true;
    //     this.subtotal = item.subtotal || 0;
    //     this.tax = item.tax || 0;
    //     this.discount = item.discount || 0;
    //     this.total = item.total || 0;
    //     this.createdOn = moment(item.createdOn) || moment();
    //     this.updatedOn = moment(item.updatedOn) || moment();

    // }
      id: string;
      category: string;
      name: string;
      type: string;
      minumumStoc: string;
      warranty: string;
      specialDiscount: string;
      maximumDiscount: string;
      primaryUm: string;
      netWeight: string;
      grossWeight: string;
      width: string;
      height: string;
      depth: string;
      um: string;
      supDiscount: string;
      transport: string;
      customs: string;
      directCosts: string;
      salePrice: string;
      currency: string;
      description: string;
      image: string;
      createdOn: any;
      updatedOn: any;

        constructor(item?)    
        {
            item = item || {};
            this.id = item.id || FuseUtils.generateGUID();
            this.category = item.category || '';
            this.name = item.name || '';
            this.type = item.type || '';
            this.minumumStoc = item.minumumStoc || '';
            this.warranty = item.warranty || '';
            this.specialDiscount = item.specialDiscount || '';
            this.maximumDiscount = item.maximumDiscount || '';
            this.primaryUm = item.primaryUm || '';
            this.netWeight = item.netWeight|| '';
            this.grossWeight = item.grossWeight|| '';
            this.width = item.width|| '';
            this.height = item.height|| '';
            this.depth = item.depth|| '';
            this.um = item.um|| '';
            this.supDiscount = item.supDiscount|| '';
            this.transport = item.transport|| '';
            this.customs = item.customs|| '';
            this.directCosts = item.directCosts|| '';
            this.salePrice = item.salePrice|| '';
            this.currency= item.currency|| '';
            this.description = item.description || '';
            this.image = item.image || '';
            this.createdOn = moment(item.createdOn) || moment();
            this.updatedOn = moment(item.updatedOn) || moment();

        }
}
