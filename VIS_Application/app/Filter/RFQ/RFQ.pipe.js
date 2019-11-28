"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RFQFilterPipe = (function () {
    function RFQFilterPipe() {
    }
    RFQFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.Status != null && app.Status.toLocaleLowerCase().indexOf(filter) != -1
                || app.EstimateBy != null && app.EstimateBy.toLocaleLowerCase().indexOf(filter) != -1
                || app.Title != null && app.Title.toLocaleLowerCase().indexOf(filter) != -1
                || app.InitiatedBy != null && app.InitiatedBy.toLocaleLowerCase().indexOf(filter) != -1
                || app.LastResponseBy != null && app.LastResponseBy.toLocaleLowerCase().indexOf(filter) != -1
                || app.Status != null && app.Status.toLocaleLowerCase().indexOf(filter) != -1
                || app.rfqStatus != null && app.rfqStatus.toLocaleLowerCase().indexOf(filter) != -1
                || app.OtherComments != null && app.OtherComments.toLocaleLowerCase().indexOf(filter) != -1
                || app.ActionRequestedBy != null && app.ActionRequestedBy.toLocaleLowerCase().indexOf(filter) != -1;
        }) : value;
    };
    RFQFilterPipe = __decorate([
        core_1.Pipe({
            name: 'RFQFilter'
        })
    ], RFQFilterPipe);
    return RFQFilterPipe;
}());
exports.RFQFilterPipe = RFQFilterPipe;
