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
var CompanyMaster_service_1 = require("../../../service/Masters/CompanyRelated/CompanyMaster.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var http_1 = require("@angular/http");
var CompanyMasterComponent = (function () {
    function CompanyMasterComponent(fb, _CompanyMasterService, pagerService, http) {
        this.fb = fb;
        this._CompanyMasterService = _CompanyMasterService;
        this.pagerService = pagerService;
        this.http = http;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Full_Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
        //
        //this.uploaderF1 = new FileUploader({
        //    url: 'http://localhost:53349/api/CompanyMasterAPI/FileUpload', disableMultipart: false, maxFileSize: 50000000
        //});
    }
    //file upload event  
    CompanyMasterComponent.prototype.fileChange1 = function (event) {
        this.fileList1 = event.target.files;
    };
    CompanyMasterComponent.prototype.fileChange2 = function (event) {
        this.fileList2 = event.target.files;
        //  this.CompanyMaster.Signature = this.fileList2.item(0).name;
    };
    CompanyMasterComponent.prototype.fileChange3 = function (event) {
        this.fileList3 = event.target.files;
        // this.CompanyMaster.SignatureOther = this.fileList3.item(0).name;
    };
    CompanyMasterComponent.prototype.ngOnInit = function () {
        this.CompanyMasterFrm = this.fb.group({
            Id: [''],
            CompanyName: ['', forms_1.Validators.required],
            City: [''],
            ZipCode: [''],
            State: [''],
            Country: [''],
            CountryName: [''],
            ContactNo: ['', forms_1.Validators.required],
            E_mail: ['', forms_1.Validators.required],
            Fax: [''],
            CompanyURL: [''],
            Address: ['', forms_1.Validators.required],
            CompanyLogo: [''],
            AccountHead: [''],
            Designation: [''],
            Signature: [''],
            CompanyShortCode: ['', forms_1.Validators.required],
            Address2: [''],
            StartSeries: [''],
            FinancialYear: ['', forms_1.Validators.required],
            AccountHeadOther: [''],
            DesignationOther: [''],
            SignatureOther: [''],
            FinancialYeardll: [''],
            PositionName: [''],
            Employee_Name: [''],
            //SignatureOtherUpload: [''],
            //SignatureUpload: [''],
            //CompanyLogoUpload:[''],
            CompanyId: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        if (!this.CompanyMasterForImg) {
            this.ImgShowHide == false;
        }
        this.ImgShowHide = false;
        this.LoadCompanyMasters();
        this.LoadFY();
        this.LoadCountry();
        this.LoadDesignation();
        this.LoadHead();
        //else { this.ImgShowHide = true; }
    };
    CompanyMasterComponent.prototype.LoadFY = function () {
        var _this = this;
        this.indLoading = true;
        this._CompanyMasterService.getFY(global_1.Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(function (DATAFY) {
            _this.FinancialYear = DATAFY;
        }
        //,error => this.msg = <any>error
        );
    };
    CompanyMasterComponent.prototype.LoadCountry = function () {
        var _this = this;
        this.indLoading = true;
        this._CompanyMasterService.getCountry(global_1.Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(function (DATACOUNTRY) {
            _this.Countries = DATACOUNTRY;
        }
        //,error => this.msg = <any>error
        );
    };
    CompanyMasterComponent.prototype.LoadDesignation = function () {
        var _this = this;
        this.indLoading = true;
        this._CompanyMasterService.getDesignation(global_1.Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(function (DATAposition) {
            _this.Designation = DATAposition;
        }
        //,error => this.msg = <any>error
        );
    };
    CompanyMasterComponent.prototype.LoadHead = function () {
        var _this = this;
        this.indLoading = true;
        this._CompanyMasterService.getHead(global_1.Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(function (DATAHead) {
            _this.ForHeaddl = DATAHead;
        }
        //,error => this.msg = <any>error
        );
    };
    CompanyMasterComponent.prototype.CompanyMasterFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.CompanyMasterFilter = value;
    };
    CompanyMasterComponent.prototype.CompanyMasterSort = function (property) {
        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };
    ;
    CompanyMasterComponent.prototype.LoadCompanyMasters = function () {
        var _this = this;
        this.indLoading = true;
        this._CompanyMasterService.get(global_1.Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(function (CompanyMasters) {
            _this.CompanyMasters = CompanyMasters;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strsearchCompanyName = document.getElementById("searchCompanyName").value;
                if (_this.strsearchCompanyName != '') {
                    _this.strsearchCompanyName = _this.strsearchCompanyName.toLocaleLowerCase();
                    _this.CompanyMasters = _this.CompanyMasters.filter(function (x) { return x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(_this.strsearchCompanyName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchCity = document.getElementById("searchCity").value;
                if (_this.strSearchCity != '') {
                    _this.strSearchCity = _this.strSearchCity.toLocaleLowerCase();
                    _this.CompanyMasters = _this.CompanyMasters.filter(function (x) { return x.City != null && x.City.toLocaleLowerCase().indexOf(_this.strSearchCity) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchState = document.getElementById("searchState").value;
                if (_this.strSearchState != '') {
                    _this.strSearchState = _this.strSearchState.toLocaleLowerCase();
                    _this.CompanyMasters = _this.CompanyMasters.filter(function (x) { return x.State != null && x.State.toLocaleLowerCase().indexOf(_this.strSearchState) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchCountry = document.getElementById("searchCountry").value;
                if (_this.strSearchCountry != '') {
                    _this.strSearchCountry = _this.strSearchCountry.toLocaleLowerCase();
                    _this.CompanyMasters = _this.CompanyMasters.filter(function (x) { return x.Country != null && x.Country.toLocaleLowerCase().indexOf(_this.strSearchCountry) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchEmail = document.getElementById("searchE-mail").value;
                if (_this.strSearchEmail != '') {
                    _this.strSearchEmail = _this.strSearchEmail.toLocaleLowerCase();
                    _this.CompanyMasters = _this.CompanyMasters.filter(function (x) { return x.E_mail != null && x.E_mail.toLocaleLowerCase().indexOf(_this.strSearchEmail) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchCompanyURL = document.getElementById("searchCompanyURL").value;
                if (_this.strSearchCompanyURL != '') {
                    _this.strSearchCompanyURL = _this.strSearchCompanyURL.toLocaleLowerCase();
                    _this.CompanyMasters = _this.CompanyMasters.filter(function (x) { return x.CompanyURL != null && x.CompanyURL.toLocaleLowerCase().indexOf(_this.strSearchCompanyURL) != -1; });
                }
            }
            //if (this.ShowHideSearch) {
            //    this.strSearchE_mail = (<HTMLInputElement>document.getElementById("E_mail")).value;
            //    if (this.strSearchE_mail != '') {
            //        this.strSearchE_mail = this.strSearchE_mail.toLocaleLowerCase();
            //        this.CompanyMasters = this.CompanyMasters.filter(
            //            x => x.E_mail != null && x.E_mail.toLocaleLowerCase().indexOf(this.strSearchE_mail) != -1);
            //    }
            //}
            //if (this.ShowHideSearch) {
            //    this.strSearchCompanyURL = (<HTMLInputElement>document.getElementById("CompanyURL")).value;
            //    if (this.strSearchCompanyURL != '') {
            //        this.strSearchCompanyURL = this.strSearchCompanyURL.toLocaleLowerCase();
            //        this.CompanyMasters = this.CompanyMasters.filter(
            //            x => x.CompanyURL != null && x.CompanyURL.toLocaleLowerCase().indexOf(this.strSearchCompanyURL) != -1);
            //    }
            //}
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    CompanyMasterComponent.prototype.addCompanyMaster = function () {
        this.imagePathCompanyLogo = null;
        this.imagePathSignature = null;
        this.imagePathSignatureOther = null;
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Company";
        this.modalBtnTitle = "Add";
        this.CompanyMasterFrm.reset();
        this.modal.open();
    };
    CompanyMasterComponent.prototype.editCompanyMaster = function (id) {
        this.ImgGlobalPath = global_1.Global.WebAccessURL;
        this.ImgShowHide = true;
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Company";
        this.modalBtnTitle = "Update";
        this.CompanyMaster = this.CompanyMasters.filter(function (x) { return x.Id == id; })[0];
        this.CompanyMasterForImg = this.CompanyMaster;
        this.imagePathCompanyLogo = this.CompanyMaster.CompanyLogo;
        this.imagePathSignature = this.CompanyMaster.Signature;
        this.imagePathSignatureOther = this.CompanyMaster.SignatureOther;
        this.CompanyMaster.PositionName = null;
        this.CompanyMaster.FinancialYeardll = null;
        this.CompanyMaster.Employee_Name = null;
        this.CompanyMaster.CompanyLogo = null;
        this.CompanyMaster.Signature = null;
        this.CompanyMaster.SignatureOther = null;
        this.CompanyMasterFrm.setValue(this.CompanyMaster);
        //this.CompanyMaster["CompanyLogo"] = null;
        //this.CompanyMaster["Signature"] = null;
        //this.CompanyMaster["SignatureOther"] = null;
        this.modal.open();
    };
    CompanyMasterComponent.prototype.deleteCompanyMaster = function (id, status) {
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
        this.CompanyMaster = this.CompanyMasters.filter(function (x) { return x.Id == id; })[0];
        this.CompanyMaster.PositionName = null;
        this.CompanyMaster.FinancialYeardll = null;
        this.CompanyMaster.Employee_Name = null;
        this.CompanyMaster.CompanyLogo = null;
        this.CompanyMaster.Signature = null;
        this.CompanyMaster.SignatureOther = null;
        this.CompanyMasterFrm.setValue(this.CompanyMaster);
        this.modal.open();
    };
    CompanyMasterComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.CompanyMasterFrm.enable() : this.CompanyMasterFrm.disable();
    };
    CompanyMasterComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    CompanyMasterComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.CompanyMasters);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    CompanyMasterComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    CompanyMasterComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                if (this.fileList1 != null) {
                    formData._value.CompanyLogo = "/Upload/CompanyMaster/" + this.fileList1.item(0).name;
                }
                else {
                    formData._value.CompanyLogo = null;
                }
                if (this.fileList1 != null) {
                    formData._value.Signature = "/Upload/CompanyMaster/" + this.fileList2.item(0).name;
                }
                else {
                    formData._value.Signature = null;
                }
                if (this.fileList1 != null) {
                    formData._value.SignatureOther = "/Upload/CompanyMaster/" + this.fileList3.item(0).name;
                }
                else {
                    formData._value.SignatureOther = null;
                }
                this._CompanyMasterService.post(global_1.Global.BASE_COMPANYMASTER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        if (_this.fileList1 != null) {
                            if (_this.fileList1.length > 0) {
                                _this.fileList1.item(0).name;
                                var file = _this.fileList1[0];
                                var formData_1 = new FormData();
                                formData_1.append('uploadFile', file, file.name);
                                var headers = new http_1.Headers();
                                var options = new http_1.RequestOptions({ headers: headers });
                                var apiUrl1 = "/api/CompanyMasterAPI/UploadJsonFile";
                                _this.http.post(apiUrl1, formData_1, options)
                                    .map(function (res) { return res.json(); })
                                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                                    .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                                _this.fileList1 = null;
                            }
                        }
                        if (_this.fileList2 != null) {
                            if (_this.fileList2.length > 0) {
                                var file = _this.fileList2[0];
                                var formData_2 = new FormData();
                                formData_2.append('uploadFile', file, file.name);
                                var headers = new http_1.Headers();
                                var options = new http_1.RequestOptions({ headers: headers });
                                var apiUrl1 = "/api/CompanyMasterAPI/UploadJsonFile";
                                _this.http.post(apiUrl1, formData_2, options)
                                    .map(function (res) { return res.json(); })
                                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                                    .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                                _this.fileList2 = null;
                            }
                        }
                        if (_this.fileList3 != null) {
                            if (_this.fileList3.length > 0) {
                                var file = _this.fileList3[0];
                                var formData_3 = new FormData();
                                formData_3.append('uploadFile', file, file.name);
                                var headers = new http_1.Headers();
                                var options = new http_1.RequestOptions({ headers: headers });
                                var apiUrl1 = "/api/CompanyMasterAPI/UploadJsonFile";
                                _this.http.post(apiUrl1, formData_3, options)
                                    .map(function (res) { return res.json(); })
                                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                                    .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                                _this.fileList3 = null;
                            }
                        }
                        _this.msg = data;
                        _this.LoadCompanyMasters();
                    }
                    else {
                        alert(data);
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._CompanyMasterService.put(global_1.Global.BASE_COMPANYMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadCompanyMasters();
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._CompanyMasterService.delete(global_1.Global.BASE_COMPANYMASTER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Company status changed successfully.";
                        _this.LoadCompanyMasters();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing CompanyMaster!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], CompanyMasterComponent.prototype, "modal", void 0);
    CompanyMasterComponent = __decorate([
        core_1.Component({
            providers: [CompanyMaster_service_1.CompanyMasterService],
            templateUrl: 'app/Components/Masters/CompanyRelated/CompanyMaster.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, CompanyMaster_service_1.CompanyMasterService, pager_index_1.PagerService, http_1.Http])
    ], CompanyMasterComponent);
    return CompanyMasterComponent;
}());
exports.CompanyMasterComponent = CompanyMasterComponent;
