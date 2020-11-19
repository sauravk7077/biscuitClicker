"use strict";
var DataStorage = /** @class */ (function () {
    function DataStorage(name) {
        this.name = name;
    }
    DataStorage.prototype.set = function (ob) {
        var convertedObject = btoa(JSON.stringify(ob));
        localStorage.setItem(this.name, convertedObject);
    };
    DataStorage.prototype.get = function () {
        var stringOb = localStorage.getItem(this.name);
        if (stringOb)
            return JSON.parse(atob(stringOb));
        else
            return null;
    };
    return DataStorage;
}());
