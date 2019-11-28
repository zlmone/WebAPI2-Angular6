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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var pager_index_1 = require("../Shared/pager.index");
var entityService = (function () {
    function entityService(_http, fb, pagerService) {
        this._http = _http;
        this.fb = fb;
        this.pagerService = pagerService;
        this.isDesc = false;
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    entityService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    entityService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    entityService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    entityService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    entityService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    entityService.prototype.ngOnInit = function () {
        this.entityObjectFrm = this.fb.group(this.entityEmptyObjectForView);
    };
    entityService.prototype.entityFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.entityFilter = value;
    };
    entityService.prototype.entitySort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    entityService.prototype.addentity = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New entity";
        this.modalBtnTitle = "Add";
        this.entityObjectFrm.reset();
        this.modal.open();
    };
    entityService.prototype.editentity = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit entity";
        this.modalBtnTitle = "Update";
        this.entityObject = this.entityCollection.filter(function (x) { return x.Id == id; })[0];
        this.entityObjectFrm.setValue(this.entityObject);
        this.modal.open();
    };
    entityService.prototype.deleteentity = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.entityObject = this.entityCollection.filter(function (x) { return x.Id == id; })[0];
        this.entityObjectFrm.setValue(this.entityObject);
        this.modal.open();
    };
    entityService.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.entityObjectFrm.enable() : this.entityObjectFrm.disable();
    };
    entityService.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    entityService.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.entityCollection);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    entityService.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    entityService.prototype.onSubmit = function (formData) {
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this.post(this.GetURL, formData._value);
                break;
            case enum_1.DBOperation.update:
                this.put(this.GetURL, formData._value.Id, formData._value);
                break;
            case enum_1.DBOperation.delete:
                this.delete(this.GetURL, formData._value.Id);
                break;
        }
    };
    __decorate([
        core_2.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], entityService.prototype, "modal", void 0);
    entityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder, pager_index_1.PagerService])
    ], entityService);
    return entityService;
}());
exports.entityService = entityService;
