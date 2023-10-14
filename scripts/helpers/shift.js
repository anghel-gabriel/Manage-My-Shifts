import {getLocalStorageItem} from './get-local-storage.js';

export class Shift {
    constructor(id, startTime, endTime, hourlyWage, workplace, comments) {
        this.worker = getLocalStorageItem('loggedUser').username;
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hourlyWage = hourlyWage;
        this.workplace = workplace;
        this.comments = comments;
    }
}