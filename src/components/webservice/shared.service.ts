import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

    doSubscribe: boolean;

    constructor() {
        this.doSubscribe = true;
    }

    setSubscribe(sourceName) {
        this.doSubscribe = sourceName;
    }

    getSubscribe() {
        return this.doSubscribe;
    }
}