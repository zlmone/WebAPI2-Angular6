"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MyTeamFilterPipe = (function () {
    function MyTeamFilterPipe() {
    }
    MyTeamFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1;
        }) : value;
    };
    MyTeamFilterPipe = __decorate([
        core_1.Pipe({
            name: 'MyTeamFilter'
        })
    ], MyTeamFilterPipe);
    return MyTeamFilterPipe;
}());
exports.MyTeamFilterPipe = MyTeamFilterPipe;
