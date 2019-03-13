import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'agricultural',
        title    : 'Development',
        // translate: 'NAV.AGRICULTURAL.TITLE',
        type     : 'group',
        icon     : 'drag_indicator',
        // url      : '/items-settings'
        children : [ 
            {
                id       : 'suppliers',
                title    : 'Suppliers',
                translate: 'NAV.AGRICULTURAL.SUPPLIERS',
                type     : 'item',
                icon     : 'drag_indicator',
                url      : '/agricultural/suppliers',
            },
            {
                id       : 'customers',
                title    : 'Customers',
                translate: 'NAV.AGRICULTURAL.CUSTOMERS',
                type     : 'item',
                icon     : 'drag_indicator',
                url      : '/agricultural/customers',
            }
        ]
    },
    {
        id       : 'demo',
        title    : 'Demo Modules',
        // translate: 'NAV.AGRICULTURAL.TITLE',
        type     : 'group',
        icon     : 'drag_indicator',
        children : [ 
            {
                id       : 'items',
                title    : 'Items',
                translate: 'NAV.ITEMS',
                type     : 'item',
                icon     : 'drag_indicator',
                url      : '/items',
            },
            {
                id       : 'units',
                title    : 'Units',
                translate: 'NAV.UNITS',
                type     : 'item',
                icon     : 'drag_indicator',
                url      : '/units',
            },
            {
                id       : 'settings',
                title    : 'Users',
                // translate: 'NAV.SETTINGS.TITLE',
                type     : 'item',
                icon     : 'settings',
                url      : 'settings/list/users'
            }
        ]
    },

];
