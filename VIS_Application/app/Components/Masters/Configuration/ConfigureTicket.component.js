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
var ConfigureTicket_service_1 = require("../../../service/Masters/Configuration/ConfigureTicket.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var ConfigureTicketComponent = (function () {
    function ConfigureTicketComponent(fb, _ConfigureTicketService, pagerService) {
        this.fb = fb;
        this._ConfigureTicketService = _ConfigureTicketService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'EventName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.toStr = JSON.stringify;
    }
    ConfigureTicketComponent.prototype.handleSelected = function (event) {
        var oopNodeController = this.treeComponent.getControllerByNodeId(2);
    };
    ConfigureTicketComponent.prototype.ngOnInit = function () {
        this.ticketseeperson =
            [({
                    Id: 0,
                    CreatedOn: null,
                    CreatedBy: '',
                    UpdatedOn: null,
                    UpdatedBy: '',
                    IsActive: false,
                    Parent_Id: 0,
                    User_Id: 0,
                    Department_Name: '',
                    Position_Id: 0,
                    IsActiveSuggestion: false,
                    SuggestionAlie: '',
                    Employee_Name: '',
                    Employee_Id: 0,
                    Flag: false,
                    Organization_Id: 0,
                    Suggestion_Dep_Emp_Id: 0
                })];
        this.configureticket = ({
            Id: 0,
            CreatedOn: null,
            CreatedBy: '',
            UpdatedOn: null,
            UpdatedBy: '',
            IsActive: false,
            Parent_Id: 0,
            User_Id: 0,
            Department_Name: '',
            Position_Id: 0,
            IsActiveSuggestion: false,
            SuggestionAlie: '',
            Employee_Name: '',
            Employee_Id: 0,
            Flag: false,
            Organization_Id: 0,
            Suggestion_Dep_Emp_Id: 0
        });
        this.parentgrouplists = [({
                CreatedBy: '',
                CreatedOn: null,
                Department_Name: '',
                Employee_Id: 0,
                Employee_Name: '',
                Flag: false,
                Id: 0,
                IsActive: false,
                IsActiveSuggestion: false,
                Organization_Id: 0,
                Parent_Id: 0,
                Position_Id: 0,
                SuggestionAlie: '',
                Suggestion_Dep_Emp_Id: 0,
                UpdatedBy: '',
                UpdatedOn: null,
                User_Id: 0
            })];
        this.LoadEmployeeHead();
        this.LoadParentGroup();
    };
    ConfigureTicketComponent.prototype.moveItems = function (origin, dest) {
        $(origin).find(':selected').appendTo(dest);
    };
    ConfigureTicketComponent.prototype.moveAllItems = function (origin, dest) {
        $(origin).children().appendTo(dest);
    };
    ConfigureTicketComponent.prototype.moveRightAll = function (origin, dest) {
        this.moveAllItems("#ddlticket1", "#ddlticket2");
    };
    ConfigureTicketComponent.prototype.moveLeftAll = function (origin, dest) {
        this.moveAllItems("#ddlticket2", "#ddlticket1");
    };
    ConfigureTicketComponent.prototype.moveRight = function (origin, dest) {
        this.moveItems("#ddlticket1", "#ddlticket2");
    };
    ConfigureTicketComponent.prototype.moveLeft = function (origin, dest) {
        this.moveItems("#ddlticket2", "#ddlticket1");
    };
    ConfigureTicketComponent.prototype.LoadChildGroup = function (event) {
        var _this = this;
        this.indLoading = true;
        this._ConfigureTicketService.getchildgroup(global_1.Global.BASE_CONFIGURETICKET_ENDPOINT, event.target.value)
            .subscribe(function (data) {
            _this.childgrouplist = data;
            _this.indLoading = false;
        });
    };
    ConfigureTicketComponent.prototype.TicketDetail = function (event) {
        var _this = this;
        this.configureticket = this.childgrouplist.filter(function (x) { return x.Id == event.target.value; })[0];
        this._ConfigureTicketService.getticketdisplay(global_1.Global.BASE_CONFIGURETICKET_ENDPOINT, event.target.value)
            .subscribe(function (data) {
            _this.ticketseeperson = data;
            _this.indLoading = false;
        });
    };
    ConfigureTicketComponent.prototype.LoadEmployeeHead = function () {
        var _this = this;
        this.indLoading = true;
        this._ConfigureTicketService.getemployeehead(global_1.Global.BASE_CONFIGURETICKET_ENDPOINT)
            .subscribe(function (data) {
            _this.employeeheadlist = data;
            _this.indLoading = false;
        });
    };
    ConfigureTicketComponent.prototype.LoadParentGroup = function () {
        var _this = this;
        this._ConfigureTicketService.getparantgroup(global_1.Global.BASE_CONFIGURETICKET_ENDPOINT)
            .subscribe(function (data) {
            _this.parentgrouplists = data;
            //Static Data
            _this.tree =
                {
                    value: 'Parent value',
                    children: [
                        {
                            value: 'Child value',
                            children: [
                                { value: 'child 1' },
                                { value: 'child 2' },
                                { value: 'child 3' }
                            ]
                        }
                    ]
                };
            // dynamic Data
            //debugger;
            //for (let item of this.parentgrouplists)
            //{
            //    for (let itemchild of this.parentgrouplists)
            //    {
            //        this.tree =
            //            {
            //                value: item.Department_Name,
            //                children:
            //                [{
            //                    value: this.parentgrouplists[0].Department_Name,
            //                    children:
            //                    [{
            //                            value: this.parentgrouplists[0].Department_Name
            //                    }]
            //                }]
            //            };
            //    }
            //}
        });
        return this.parentgrouplists;
    };
    ConfigureTicketComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.ConfigureTicketFrm.enable() : this.ConfigureTicketFrm.disable();
    };
    ConfigureTicketComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        var id = this.configureticket.Id;
        this.msg = "";
        this._ConfigureTicketService.put(global_1.Global.BASE_CONFIGURETICKET_ENDPOINT, id, formData).subscribe(function (data) {
            debugger;
            if (data.startsWith("Success: ")) {
                _this.msg = "Configure ticket details updated successfully.";
            }
            else {
                _this.msg = "Error has occurred while modifying existing Configure Ticket";
            }
        }, function (error) {
            _this.msg = error;
        });
        this._ConfigureTicketService.saveemployeeid(global_1.Global.BASE_CONFIGURETICKET_ENDPOINT, this.ticketseeperson).subscribe(function (data) {
            debugger;
            if (data.startsWith("Success: ")) {
                _this.msg = "Configure ticket saved successfully.";
            }
            else {
                _this.msg = "error has occurred while modifying existing configuration";
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    __decorate([
        core_1.ViewChild('treeComponent'),
        __metadata("design:type", Object)
    ], ConfigureTicketComponent.prototype, "treeComponent", void 0);
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ConfigureTicketComponent.prototype, "modal", void 0);
    ConfigureTicketComponent = __decorate([
        core_1.Component({
            providers: [ConfigureTicket_service_1.ConfigureTicketService],
            templateUrl: 'app/Components/Masters/Configuration/ConfigureTicket.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ConfigureTicket_service_1.ConfigureTicketService, pager_index_1.PagerService])
    ], ConfigureTicketComponent);
    return ConfigureTicketComponent;
}());
exports.ConfigureTicketComponent = ConfigureTicketComponent;
