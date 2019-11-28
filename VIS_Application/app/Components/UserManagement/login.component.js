"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("../../Service/UserManagement/login.service");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("../../app.component");
var sharedcontents_1 = require("../../Shared/sharedcontents");
var login_1 = require("../../Model/UserManagement/login");
var global_1 = require("../../../app/Shared/global");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var LoginComponent = (function () {
    function LoginComponent(LoginService, _fb, http, router, AppComponent, service) {
        this.LoginService = LoginService;
        this._fb = _fb;
        this.http = http;
        this.router = router;
        this.AppComponent = AppComponent;
        this.service = service;
        this.submitted = false;
        this.logged = false;
        this.LoginObj = new login_1.LoginData();
        this.service.setData('page-wrapper', false);
    }
    LoginComponent.prototype.GetRandomImagePath = function () {
        var _this = this;
        this.LoginService.GetActivateImagePath().subscribe(function (data) {
            _this.RandomImagePath = '../../../Upload/HomePageImage/' + data;
        });
    };
    LoginComponent.prototype.DynamicHomePageStyle = function () {
        var styles = {
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
            'background-repeat': 'no-repeat'
        };
        return styles;
    };
    LoginComponent.prototype.Login = function () {
        var _this = this;
        if (this.LoginObj.VISUsername == null || this.LoginObj.VISPassword == null) {
            //this.toasterService.pop('info', 'Please Input User Id', 'Please Input Password')
        }
        else {
            this.UserData = null;
            this.LoginService.doLogin(this.LoginObj).subscribe(function (data) {
                _this.UserData = data;
                if (_this.UserData.Id > 0) {
                    _this.UserData.ArrayUserType = _this.UserData.UserRoleTypeName.split(',');
                    var tempDepartmentId = _this.UserData.DepartmentId.split(',');
                    _this.UserData.ArrayDepartmentId = [];
                    for (var _i = 0, tempDepartmentId_1 = tempDepartmentId; _i < tempDepartmentId_1.length; _i++) {
                        var item = tempDepartmentId_1[_i];
                        _this.UserData.ArrayDepartmentId.push(Number(item));
                    }
                    _this.service.setData('page-wrapper', true);
                    sessionStorage.setItem('VISUsername', _this.UserData.VISUsername);
                    sessionStorage.setItem('VISPassword', _this.UserData.VISPassword);
                    sessionStorage.setItem('UserFullName', _this.UserData.UserFullName);
                    sessionStorage.setItem('LastName', _this.UserData.LastName);
                    sessionStorage.setItem('Id', _this.UserData.Id.toString());
                    sessionStorage.setItem('Email', _this.UserData.Email);
                    sessionStorage.setItem('UserType', _this.UserData.UserType);
                    sessionStorage.setItem('UserRoleTypeName', _this.UserData.UserRoleTypeName);
                    sessionStorage.setItem('IsAdmin', JSON.stringify(_this.UserData.IsAdmin));
                    sessionStorage.setItem('IsLineManager', JSON.stringify(_this.UserData.IsLineManager));
                    sessionStorage.setItem('DepartmentId', _this.UserData.DepartmentId.toString());
                    sessionStorage.setItem('IsOnStypend', JSON.stringify(_this.UserData.IsOnStypend));
                    sessionStorage.setItem('IsFormerEmployee', JSON.stringify(_this.UserData.IsFormerEmployee));
                    sessionStorage.setItem('IsWebAccess', JSON.stringify(_this.UserData.IsWebAccess));
                    sessionStorage.setItem('validForLogin', JSON.stringify(_this.UserData.validForLogin));
                    sessionStorage.setItem('WebAccessURL', _this.UserData.WebAccessURL);
                    sessionStorage.setItem('ArrayUserType', JSON.stringify(_this.UserData.ArrayUserType));
                    sessionStorage.setItem('ArrayDepartmentId', JSON.stringify(_this.UserData.ArrayDepartmentId));
                    _this.AppComponent.objLoginData = _this.UserData;
                    _this.AppComponent.ngOnInit();
                    _this.router.navigate(['/dashboard']);
                }
                else {
                    alert('Authentication failed.');
                }
            });
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.GetRandomImagePath();
        this.UserData = null;
        this.LoginForm = this._fb.group({
            VISUsername: ['', forms_1.Validators.required],
            VISPassword: ['', forms_1.Validators.required],
        });
    };
    LoginComponent.prototype.ForgotPassword = function (name) {
        this.modal.open();
    };
    LoginComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.LoginService.ForgotPassword(global_1.Global.BASE_FORGOTPASSWORD_ENDPOINT, formData._value).subscribe(function (data) {
            //this.UserData = data;
            //formData._value.VISUsername == "sa";
            _this.msg = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], LoginComponent.prototype, "modal", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: 'app/Components/UserManagement/login.component.html',
            providers: [login_service_1.LoginService]
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService, forms_1.FormBuilder, http_1.Http, router_1.Router, app_component_1.AppComponent, sharedcontents_1.SharedContents])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
