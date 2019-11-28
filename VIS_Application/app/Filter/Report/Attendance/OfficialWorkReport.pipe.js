"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OfficialWorkReporFilterPipe = (function () {
    function OfficialWorkReporFilterPipe() {
    }
    OfficialWorkReporFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.Employee_Name != null && app.Employee_Name.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Date != null && app.Date.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.OutTime != null && app.OutTime.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.InTime != null && app.InTime.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Total_Time != null && app.Total_Time.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Out_Remark != null && app.OutTime.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.In_Remark != null && app.In_Remark.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Line_Manager != null && app.Line_Manager.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.ApprovalSentTo != null && app.ApprovalSentTo.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Status != null && app.Status.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.ActionBy != null && app.ActionBy.toLocaleLowerCase().indexOf(filter) != -1 ||
                app.Action_DateTime != null && app.Action_DateTime.toString().indexOf(filter) != -1;
        }) : value;
    };
    OfficialWorkReporFilterPipe = __decorate([
        core_1.Pipe({
            name: 'officialworkreportFilter'
        })
    ], OfficialWorkReporFilterPipe);
    return OfficialWorkReporFilterPipe;
}());
exports.OfficialWorkReporFilterPipe = OfficialWorkReporFilterPipe;
