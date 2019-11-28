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
var DocumentTemplateService = (function () {
    function DocumentTemplateService(_http) {
        this._http = _http;
    }
    // step1 related services
    DocumentTemplateService.prototype.getapprovedrecord = function (url, EmployeeId, EmployeeRole, ApprovedStatus) {
        return this._http.get(url + 'GetAllApprovedRecord?EmployeeId=' + EmployeeId + '&EmployeeRole=' + EmployeeRole + '&ApprovedStatus=' + ApprovedStatus + '').map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.getallmodule = function (url) {
        return this._http.get(url + 'GetAllModule').map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.getbyid = function (url, id) {
        return this._http.get(url + 'GetById?Id=' + id).map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.addnewdocument = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + "AddNewDocumentTemplate", body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DocumentTemplateService.prototype.updatedocument = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + "UpdateDocumentTemplate", body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DocumentTemplateService.prototype.deletedocument = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + "DeleteDocumentTemplate?Id=" + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // step2 related services
    DocumentTemplateService.prototype.addnewdocumentfield = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + "AddDocumentField", body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DocumentTemplateService.prototype.updatedocumentfield = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + "UpdateDocumentField", body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DocumentTemplateService.prototype.deletedocumentfield = function (url, Id, UpdatedBy) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteDocumentField?Id=' + Id + '&UpdatedBy=' + UpdatedBy + '', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DocumentTemplateService.prototype.getbydoctempid = function (url, id) {
        return this._http.get(url + 'GetAllDocumenetFieldByDocId?DocTempId=' + id).map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.getalldocumentfieldbyid = function (url, id) {
        return this._http.get(url + 'GetAllDocumenetFieldById?Id=' + id).map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.getmaxid = function (url) {
        return this._http.get(url + 'GetDocTemplateMaxId').map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.bindtablefielddropdown = function (url, TableName) {
        return this._http.get(url + 'BindTableFieldDropDown?TableName=' + TableName).map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.bindcustomfielddropdown = function (url, DocTempId) {
        return this._http.get(url + 'BindCustomFieldDropDown?DocTempId=' + DocTempId).map(function (response) { return response.json(); });
    };
    // step 3 Service
    DocumentTemplateService.prototype.AddDocumentMasterField = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + "AddDocumentMasterField", body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DocumentTemplateService.prototype.AddDocumentContainerField = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + "AddDocumentContainerField", body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DocumentTemplateService.prototype.GetDocumentContainer = function (url, id) {
        return this._http.get(url + 'BindDocumentContainer?DocTempId=' + id).map(function (response) { return response.json(); });
    };
    DocumentTemplateService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    DocumentTemplateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DocumentTemplateService);
    return DocumentTemplateService;
}());
exports.DocumentTemplateService = DocumentTemplateService;
