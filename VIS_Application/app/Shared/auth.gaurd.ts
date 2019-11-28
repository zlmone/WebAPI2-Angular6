import { LoginService } from '../service/UserManagement/login.Service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Global } from '../Shared/global';
import { SharedContents } from './sharedcontents'
import { Injector } from '@angular/core';

@Injectable()
    
export class AuthGuard implements CanActivate
{
    constructor(private router: Router)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        if (sessionStorage.getItem('VISUsername'))
        {
            return true;
            // logged in so return true
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }

   
}
