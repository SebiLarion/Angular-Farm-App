import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CompanyDetailsFDb } from './company-details';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Company Details
            'company': CompanyDetailsFDb.companies,
        };
    }
}
