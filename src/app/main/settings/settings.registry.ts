import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsRegistry
{
    // Private
    private _registry: { [key: string]: any } = {};

    public editor: BehaviorSubject<any>;
    public editable = new BehaviorSubject(false);

    /**
     * Constructor
     */
    constructor()
    {

    }

    /**
     * Add or update the value to the registry
     *
     * @param key
     * @param value
     */
    registerOrUpdate(key, value): void
    {
        // Add/update to the registry
        this._registry[key] = value;
    }

    /**
     * Add the value to the registry
     *
     * @param key
     * @param value
     */
    register(key, value): void
    {
        // Check if the key already being used
        if ( this._registry[key] )
        {
            console.error(`The key '${key}' already exists. Either unregister it first or use a unique key.`);

            return;
        }

        // Add to the registry
        this._registry[key] = value;
        switch(key) {
            case 'editor':
                this.editor = new BehaviorSubject(value);
        }
    }

    /**
     * Remove the value from the registry
     *
     * @param key
     */
    unregister(key): void
    {
        // Check if the key exists
        if ( !this._registry[key] )
        {
            console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
        }

        delete this._registry[key];
    }

    /**
     * Return the sidebar with the given key
     *
     * @param key
     * @returns any
     */
    getValue(key): any
    {
        // Check existence
        if ( !this._registry[key] )
        {
            console.warn(`The key '${key}' doesn't exist in the registry.`);

            return;
        }

        // Return the value
        return this._registry[key];
    }

    setEditable(editable: boolean = false) {
        this.editable.next(editable)
    }
}
