import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CompanyService implements Resolve<any>
{
    onCompanyDetailsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onCompanyDetailsChanged = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCompanyDetails()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get company details
     *
     * @returns {Promise<any>}
     */
    getCompanyDetails(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/company')
                .subscribe((response: any) => {
                    this.onCompanyDetailsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Update company data
     *
     * @param companyData
     * @returns {Promise<any>}
     */
    updateCompany(companyData): any 
    {
        // companyData.id = (new Date()).valueOf();
        return new Promise((resolve, reject) => {
            
            this._httpClient.post('api/company/' + companyData.id, {...companyData})
                .subscribe(response => {
                    this.getCompanyDetails().then(company => {
                        console.log('Post', companyData, response, company);

                        resolve(company);

                    }, reject);
                });
        });
    }

}
