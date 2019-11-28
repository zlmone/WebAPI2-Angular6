"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EmployeeListFilterPipe = (function () {
    function EmployeeListFilterPipe() {
    }
    EmployeeListFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.EmployeeCode != null && app.EmployeeCode.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.CompanyName != null && app.CompanyName.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Employee_Name != null && app.Employee_Name.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Email != null && app.Email.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Department != null && app.Department.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.TotalExp != null && app.TotalExp.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.SL_CL != null && app.SL_CL.toLocaleLowerCase().indexOf(filter) != -1;
        }) : value;
    };
    EmployeeListFilterPipe = __decorate([
        core_1.Pipe({
            name: 'EmployeeListFilter'
        })
    ], EmployeeListFilterPipe);
    return EmployeeListFilterPipe;
}());
exports.EmployeeListFilterPipe = EmployeeListFilterPipe;
