import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UnitsService implements Resolve<any>
{
    items: any[];
    onItemsChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient
    )
    {
        this.onItemsChanged = new BehaviorSubject({});
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getItems()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getItems(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/units')
                .subscribe((response: any) => {
                    this.items = response;
                    this.onItemsChanged.next(this.items);
                    resolve(response);
                }, reject);
        });
    }
}
