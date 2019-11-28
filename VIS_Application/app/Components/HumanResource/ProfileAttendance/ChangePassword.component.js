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
var ChangePassword_service_1 = require("../../../Service/HumanResource/ProfileAttendance/ChangePassword.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(fb, _ChangePSWService, http, router, pagerService) {
        this.fb = fb;
        this._ChangePSWService = _ChangePSWService;
        this.http = http;
        this.router = router;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        // pager object
        this.pager = {};
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.ChangePSWFRM = this.fb.group({
            Id: [''],
            VISUserName: [''],
            VISPassword: [''],
            NewPassword: [''],
            ConfirmNewPassword: ['']
            //IsNew: [''],
            //CreatedOn: [''],
            //CreatedBy: [''],
            //UpdatedOn: [''],
            //UpdatedBy: [''],
            //IsActive: [''],
            //EntityMessage: ['']
        });
        //this.LoadChangePsw()
    };
    ChangePasswordComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        if (formData._value.ConfirmNewPassword == formData._value.NewPassword) {
            this.dbops = enum_1.DBOperation.update;
            this.msg = "";
            switch (this.dbops) {
                case enum_1.DBOperation.update:
                    this._ChangePSWService.ChangePassword(global_1.Global.BASE_ChhangePassword_ENDPOINT, 2, formData._value).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = "Password Changed successfully ...";
                            _this.ngOnInit();
                        }
                        else {
                            _this.msg = "Error has occurred while modifying existing ChangePassword!";
                        }
                        //this.modal.dismiss();
                    }, function (error) {
                        _this.msg = error;
                    });
                    break;
            }
        }
        else {
            this.msg = "Password does not match !!!";
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ChangePasswordComponent.prototype, "modal", void 0);
    ChangePasswordComponent = __decorate([
        core_1.Component({
            providers: [ChangePassword_service_1.ChangePSWService],
            templateUrl: 'app/Components/HumanResource/ProfileAttendance/ChangePassword.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ChangePassword_service_1.ChangePSWService, http_1.Http, router_1.Router, pager_index_1.PagerService])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
