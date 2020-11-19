class DataStorage{
    name: string;
    constructor(name:string) {
        this.name = name;
    }

    set(ob:Object) {
        const convertedObject = btoa(JSON.stringify(ob));
        localStorage.setItem(this.name, convertedObject);
    }

    get() {
        const stringOb = localStorage.getItem(this.name);
        if(stringOb)
            return JSON.parse(atob(stringOb));
        else
            return null;
    }
}