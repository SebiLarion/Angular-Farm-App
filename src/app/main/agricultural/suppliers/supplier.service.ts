import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SupplierService implements Resolve<any>
{
    routeParams: any;
    item: any;
    onItemChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onItemChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getItem()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getItem(): Promise<any>
    {
        return new Promise((resolve, reject) => {

            if ( this.routeParams.id === 'new' )
            {
                this.onItemChanged.next(false);
                resolve(false);
            } else {

                this._httpClient.get('api/suppliers/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        console.log('UserService:', response);
                        this.item = response;
                        this.onItemChanged.next(this.item);
                        resolve(response);
                    }, reject);
            }

        });
    }

    saveItem(item): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/suppliers/' + item.id, item)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addItem(item): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/suppliers/', item)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
