import { InMemoryDbService } from 'angular-in-memory-web-api';

import { HoldingDetailsDb } from './holding-details';
import { CompanyDetailsFDb } from './company-details';
import { UserDb } from './user';
import { ItemsFDb } from './items';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            'holding': HoldingDetailsDb.data,
            'company': CompanyDetailsFDb.data,
            'user': UserDb.data,
            'items' : ItemsFDb.items,
        };
    }
}

