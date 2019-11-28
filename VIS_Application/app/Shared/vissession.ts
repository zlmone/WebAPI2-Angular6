import { Injectable } from '@angular/core'

@Injectable()
export class VISSession {
    private _IsLoggedIn: boolean;
    private _IsAdmin: boolean;
    private _IsLineManager: boolean;
    private _DepartmentId: number;
    private _IsFormerEmployee: number;
    private _Email: number;
    private _FirstName: string;
    private _LastName: string;
    constructor() {
        if (1 == 1) {
            this._IsLoggedIn = true;
        }
        console.log("New SessionService");
    }

    isLoggedIn() {
        return this._IsLoggedIn;
    }

    logOut() {
        this._IsLoggedIn = !this._IsLoggedIn;
    }
}