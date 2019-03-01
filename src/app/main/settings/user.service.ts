import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService implements Resolve<any>
{
    onUserDetailsChanged: BehaviorSubject<any>;

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
        this.onUserDetailsChanged = new BehaviorSubject({});
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
                this.getUserDetails()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get user details
     *
     * @returns {Promise<any>}
     */
    getUserDetails(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/user')
                .subscribe((response: any) => {
                    this.onUserDetailsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUser(userData): any 
    {
        // userData.id = (new Date()).valueOf();
        return new Promise((resolve, reject) => {
            
            this._httpClient.post('api/user/' + userData.id, {...userData})
                .subscribe(response => {
                    this.getUserDetails().then(user => {
                        console.log('Post', userData, response, user);

                        resolve(user);

                    }, reject);
                });
        });
    }

}
