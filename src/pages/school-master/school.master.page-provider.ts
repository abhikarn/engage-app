import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { School } from '../../components/models/school.model';
import { provideStorage } from '@ionic/storage/dist/storage';
import * as _ from 'lodash';
const STORAGE_KEY = 'school_data';
@Injectable()
export class SchoolProvider {
    private schools: School[] = [];
    constructor(public storage: Storage) {
    }

    public createDB() {
        this.storage.get(STORAGE_KEY).then(data => {
            if (!data) {
                this.storage.set(STORAGE_KEY, this.schools);
            }
        });
    }

    public updateDB(schools: School[]) {
        this.storage.remove(STORAGE_KEY);
        this.storage.set(STORAGE_KEY, schools);
    }

    public getAllSchool(): Promise<School[]> {
        return this.storage.get(STORAGE_KEY);
    }

    public getSchool(schoolTempId: number) {
        return new Promise<School>((resolve) => {
            this.storage.get(STORAGE_KEY).then(schools => {
                resolve(schools.find(item => item.schoolTempId === schoolTempId));
            });
        });
    }

    saveSchool(school: School) {
        return new Promise<number>((resolve) => {
            this.getAllSchool().then(data => {
                const schools: School[] = data;
                school.schoolTempId = _.random(1, 1000);
                schools.push(school);
                this.storage.set(STORAGE_KEY, schools);
                resolve(school.schoolTempId);
            });
        });
    }

    updateSchool(school: School) {
        return new Promise<number>((resolve) => {
            this.getAllSchool().then(data => {
                let schools: School[] = data;
                this.storage.remove(STORAGE_KEY);
                const index = schools.findIndex(item => item.schoolTempId === school.schoolTempId);
                if (index > -1) {
                    schools[index] = school;
                }
                this.storage.set(STORAGE_KEY, schools);
                resolve(school.schoolTempId);
            });
        });
    }

    removeSchool(schoolId: number) {
        return new Promise<number>((resolve) => {
            this.getAllSchool().then(data => {
                let schools: School[] = data;
                this.storage.remove(STORAGE_KEY);
                const schoolFilter = schools.filter(item => item.schoolTempId !== schoolId);
                this.storage.set(STORAGE_KEY, schoolFilter);
                resolve(schoolId);
            });
        });
    }

    removeBulkSchool(schoolsR: School[]) {
        return new Promise<boolean>((resolve) => {
            this.getAllSchool().then(data => {
                let schools: School[] = data;
                this.storage.remove(STORAGE_KEY);
                const schoolsUnique = _.uniqBy([...schools, ...schoolsR], 'schoolTempId');
                this.storage.set(STORAGE_KEY, schoolsUnique);
                resolve(true);
            });
        });
    }
}
