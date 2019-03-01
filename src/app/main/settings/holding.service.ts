import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HoldingService implements Resolve<any>
{
    onHoldingDetailsChanged: BehaviorSubject<any>;

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
        this.onHoldingDetailsChanged = new BehaviorSubject({});
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
                this.getHoldingDetails()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get holding details
     *
     * @returns {Promise<any>}
     */
    getHoldingDetails(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/holding')
                .subscribe((response: any) => {
                    this.onHoldingDetailsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Update holding data
     *
     * @param holdingData
     * @returns {Promise<any>}
     */
    updateHolding(holdingData): any 
    {
        // holdingData.id = (new Date()).valueOf();
        return new Promise((resolve, reject) => {
            
            this._httpClient.post('api/holding/' + holdingData.id, {...holdingData})
                .subscribe(response => {
                    this.getHoldingDetails().then(holding => {
                        console.log('Post', holdingData, response, holding);

                        resolve(holding);

                    }, reject);
                });
        });
    }

}
