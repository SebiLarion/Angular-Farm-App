import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'settings',
        title    : 'Settings',
        translate: 'NAV.SETTINGS.TITLE',
        type     : 'item',
        icon     : 'settings',
        url      : '/settings'
    },
    {
        id       : 'items',
        title    : 'Livestock',
        translate: 'NAV.LIVESTOCK',
        type     : 'item',
        icon     : 'drag_indicator',
        url      : '/items-settings'
    }
    // {
    //     id       : 'items',
    //     title    : 'Items',
    //     translate: 'NAV.ITEMS',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'item-settings',
    //             title    : 'Item Settings',
    //             translate: 'NAV.ITEMS_SETTINGS.TITLE',
    //             type     : 'item',
    //             icon     : 'drag_indicator',
    //             url      : '/items-settings',
    //             badge    : {
    //                 title    : '125',
    //                 translate: '125',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // },
    // {
    //     id       : 'machinery',
    //     title    : 'Machinery',
    //     translate: 'NAV.MACHINERY',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'machinery-settings',
    //             title    : 'Machinery Settings',
    //             translate: 'NAV.MACHINERY_SETTINGS.TITLE',
    //             type     : 'item',
    //             icon     : 'event_seat',
    //             url      : '/machinery-settings',
    //             badge    : {
    //                 title    : '25',
    //                 translate: 'NAV.SAMPLE.BADGE',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // },
    // {
    //     id       : 'procurement',
    //     title    : 'Procurement',
    //     translate: 'NAV.PROCUREMENT',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'procurement-add-order',
    //             title    : 'Add Order',
    //             translate: 'NAV.PROCUREMENT_ADD_ORDER.TITLE',
    //             type     : 'item',
    //             icon     : 'add',
    //             url      : '/add-order'
    //         },
    //         {
    //             id       : 'procurement-orders',
    //             title    : 'Orders',
    //             translate: 'NAV.PROCUREMENT_ORDERS.TITLE',
    //             type     : 'item',
    //             icon     : 'view_list',
    //             url      : '/procurement-orders',
    //             badge    : {
    //                 title    : '58',
    //                 translate: '58',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // },
    // {
    //     id       : 'inventory',
    //     title    : 'Inventory',
    //     translate: 'NAV.INVENTORY',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'inventories',
    //             title    : 'Inventories',
    //             translate: 'NAV.INVENTORIES.TITLE',
    //             type     : 'item',
    //             icon     : 'view_list',
    //             url      : '/inventories'
    //         },
    //         {
    //             id       : 'stock',
    //             title    : 'Stock',
    //             translate: 'NAV.STOCK.TITLE',
    //             type     : 'item',
    //             icon     : 'view_list',
    //             url      : '/stocks'
    //         },
    //         {
    //             id       : 'receiving',
    //             title    : 'Receiving',
    //             translate: 'NAV.RECEIVING.TITLE',
    //             type     : 'item',
    //             icon     : 'view_list',
    //             url      : '/receiving'
    //         }
    //     ]
    // }
];
