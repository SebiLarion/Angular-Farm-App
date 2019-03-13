import { InMemoryDbService } from 'angular-in-memory-web-api';

import { HoldingsDb } from './holdings';
import { HoldingDetailsDb } from './holding-details';
import { CompaniesDb } from './companies';
import { FarmsDb } from './farms';
import { CompanyDetailsFDb } from './company-details';
import { UsersDb } from './users';
import { ItemsFDb } from './items';
import { ItemCategoriesFDb } from './itemcategories';
import { ItemTypesFDb } from './itemtypes';
import { UnitsFDb } from './units';
import { CustomersFDb } from './customers';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            'holdings': HoldingsDb.data,
            'holding': HoldingDetailsDb.data,
            'company': CompanyDetailsFDb.data,
            'users': UsersDb.data,
            'companies': CompaniesDb.data,
            'farms': FarmsDb.data,
            'items' : ItemsFDb.items,
            'categories' : ItemCategoriesFDb.data,
            'types' : ItemTypesFDb.data,
            'units' : UnitsFDb.items,
            'customers' : CustomersFDb.data
        };
    }
}

