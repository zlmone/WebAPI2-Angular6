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
var forms_1 = require("@angular/forms");
var pager_service_1 = require("../../../../app/Shared/pager.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var SalaryGrievancePE_service_1 = require("../../../Service/HumanResource/Grievance/SalaryGrievancePE.service");
var SalaryGrievancePEComponent = (function () {
    function SalaryGrievancePEComponent(fb, _SalaryGrievancePEService, http, router, pagerService) {
        this.fb = fb;
        this._SalaryGrievancePEService = _SalaryGrievancePEService;
        this.http = http;
        this.router = router;
        this.pagerService = pagerService;
    }
    SalaryGrievancePEComponent.prototype.ngOnInit = function () { };
    SalaryGrievancePEComponent = __decorate([
        core_1.Component({
            providers: [SalaryGrievancePE_service_1.SalaryGrievancePEService],
            templateUrl: 'app/Components/HumanResource/Grievance/SalaryGrievancePE.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, SalaryGrievancePE_service_1.SalaryGrievancePEService, http_1.Http, router_1.Router, pager_service_1.PagerService])
    ], SalaryGrievancePEComponent);
    return SalaryGrievancePEComponent;
}());
exports.SalaryGrievancePEComponent = SalaryGrievancePEComponent;
