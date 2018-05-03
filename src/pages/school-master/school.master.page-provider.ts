import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { School } from '../../components/models/school.model';
import { provideStorage } from '@ionic/storage/dist/storage';

const STORAGE_KEY = 'school_data';
@Injectable()
export class SchoolProvider {
    schools: School[] = [];
    constructor(public storage: Storage) {
        this.createDB();
    }

    private createDB() {
        this.storage.get(STORAGE_KEY).then(data => {
            if (!data) {
                this.storage.set(STORAGE_KEY, this.schools);
            }
        });
    }

    public getAllSchool() {
        return this.storage.get(STORAGE_KEY);
    }

    public getSchool(schoolId: number) {
        return new Promise<School>((resolve) => {
            this.storage.get(STORAGE_KEY).then(schools => {
                resolve(schools.find(item => item.schoolId === schoolId));
            });
        });
    }

    saveSchool(school: School) {
        return new Promise<number>((resolve) => {
            this.getAllSchool().then(data => {
                const schools: School[] = data;
                school.schoolId = schools.length + 1;
                schools.push(school);
                this.storage.set(STORAGE_KEY, schools);
                resolve(school.schoolId);
            });
        });
    }

    updateSchool(school: School) {
        return new Promise<number>((resolve) => {
            this.getAllSchool().then(data => {
                let schools: School[] = data;
                this.storage.remove(STORAGE_KEY);
                const index = schools.findIndex(item => item.schoolId === school.schoolId);
                if (index > -1) {
                    schools[index] = school;
                }
                this.storage.set(STORAGE_KEY, schools);
                resolve(school.schoolId);
            });
        });
    }
}

