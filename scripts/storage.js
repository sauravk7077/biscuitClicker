"use strict";
class DataStorage {
    constructor(name) {
        this.name = name;
    }
    set(ob) {
        const convertedObject = btoa(JSON.stringify(ob));
        localStorage.setItem(this.name, convertedObject);
    }
    get() {
        const stringOb = localStorage.getItem(this.name);
        if (stringOb)
            return JSON.parse(atob(stringOb));
        else
            return null;
    }
}
