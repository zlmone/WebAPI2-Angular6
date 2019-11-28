import { Component, OnInit, Pipe, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { LoginService } from '../../Service/UserManagement/login.service';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpModule, Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { routing } from '../../app.routing';
import { AppComponent } from '../../app.component';
import { SharedContents } from '../../Shared/sharedcontents';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginData } from '../../Model/UserManagement/login';
import { Global } from '../../../app/Shared/global';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'login-page',
    templateUrl: 'app/Components/UserManagement/login.component.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    msg: string;
    public UserData: LoginData;
    public LoginObj: LoginData;
    public LoginForm: FormGroup;

    submitted = false;
    Empls: any;
    aValue: any;
    valAdm: any;
    logged: boolean = false;

    RandomImagePath: string;

    constructor(public LoginService: LoginService, private _fb: FormBuilder, public http: Http, private router: Router, private AppComponent: AppComponent, private service: SharedContents)
    {
        this.LoginObj = new LoginData();
        this.service.setData('page-wrapper', false);
    }

    GetRandomImagePath()
    {
        this.LoginService.GetActivateImagePath().subscribe(
            data =>
            {
                this.RandomImagePath = '../../../Upload/HomePageImage/' + data;
            }
        );
    }

    DynamicHomePageStyle()
    {
        let styles =
            {
                'background': 'url(' + this.RandomImagePath + ')',
                'background-size': 'cover',
                'width': 'auto',
                'height': 'auto',
                'position': 'fixed',
                'top': '0',
                'right': '0',
                'bottom': '0',
                'left': '0',
                'margin': '0',
                'background-repeat' : 'no-repeat'
            };

        return styles;
    }

    Login()
    {
        if (this.LoginObj.VISUsername == null || this.LoginObj.VISPassword == null)
        {
            //this.toasterService.pop('info', 'Please Input User Id', 'Please Input Password')
        }
        else
        {
            this.UserData = null;
            this.LoginService.doLogin(this.LoginObj).subscribe(
                data =>
                {
                    this.UserData = data;

                    if (this.UserData.Id > 0)
                    {
                        this.UserData.ArrayUserType = this.UserData.UserRoleTypeName.split(',');
                        var tempDepartmentId = this.UserData.DepartmentId.split(',');

                        this.UserData.ArrayDepartmentId = [];
                        for (let item of tempDepartmentId)
                        {
                            this.UserData.ArrayDepartmentId.push(Number(item));
                        }

                        this.service.setData('page-wrapper', true);
                        sessionStorage.setItem('VISUsername', this.UserData.VISUsername);
                        sessionStorage.setItem('VISPassword', this.UserData.VISPassword);
                        sessionStorage.setItem('UserFullName', this.UserData.UserFullName);
                        sessionStorage.setItem('LastName', this.UserData.LastName);
                        sessionStorage.setItem('Id', this.UserData.Id.toString());
                        sessionStorage.setItem('Email', this.UserData.Email);
                        sessionStorage.setItem('UserType', this.UserData.UserType);
                        sessionStorage.setItem('UserRoleTypeName', this.UserData.UserRoleTypeName);
                        sessionStorage.setItem('IsAdmin', JSON.stringify(this.UserData.IsAdmin));
                        sessionStorage.setItem('IsLineManager', JSON.stringify(this.UserData.IsLineManager));
                        sessionStorage.setItem('DepartmentId', this.UserData.DepartmentId.toString());
                        sessionStorage.setItem('IsOnStypend', JSON.stringify(this.UserData.IsOnStypend));
                        sessionStorage.setItem('IsFormerEmployee', JSON.stringify(this.UserData.IsFormerEmployee));
                        sessionStorage.setItem('IsWebAccess', JSON.stringify(this.UserData.IsWebAccess));
                        sessionStorage.setItem('validForLogin', JSON.stringify(this.UserData.validForLogin));
                        sessionStorage.setItem('WebAccessURL', this.UserData.WebAccessURL);
                        sessionStorage.setItem('ArrayUserType', JSON.stringify(this.UserData.ArrayUserType));
                        sessionStorage.setItem('ArrayDepartmentId', JSON.stringify(this.UserData.ArrayDepartmentId));

                        this.AppComponent.objLoginData = this.UserData;
                        this.AppComponent.ngOnInit();
                        this.router.navigate(['/dashboard']);
                        
                    }
                    else
                    {
                        alert('Authentication failed.');
                    }
                });
        }
    }

    ngOnInit()
    {
        this.GetRandomImagePath();
        this.UserData = null;
        this.LoginForm = this._fb.group({
            VISUsername: ['', Validators.required],
            VISPassword: ['', Validators.required],
        });
    }

    ForgotPassword(name: any)
    {
        this.modal.open();
    }

    onSubmit(formData: any)
    {

        this.LoginService.ForgotPassword(Global.BASE_FORGOTPASSWORD_ENDPOINT, formData._value).subscribe(
            data => {
                //this.UserData = data;
                //formData._value.VISUsername == "sa";
                this.msg = data;
            },
            error => {
                this.msg = error;
            }

        );
    }

}


