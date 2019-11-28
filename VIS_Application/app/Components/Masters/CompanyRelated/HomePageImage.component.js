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
var HomePageImage_service_1 = require("../../../service/Masters/CompanyRelated/HomePageImage.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var http_1 = require("@angular/http");
var HomePageImageComponent = (function () {
    function HomePageImageComponent(fb, _HomePageImageService, pagerService, http, _CommonHelperService) {
        this.fb = fb;
        this._HomePageImageService = _HomePageImageService;
        this.pagerService = pagerService;
        this.http = http;
        this._CommonHelperService = _CommonHelperService;
        this.ShowHideSearch = false;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'ImagePath';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    HomePageImageComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.homepageimage =
            ({
                Id: 0,
                ImagePath: '',
                Active: false,
                IsActive: false,
                CreatedOn: null,
                UpdatedOn: null,
                CreatedBy: 0,
                UpdatedBy: 0
            });
        this.GetAllImage();
        this.GetActiveImage();
    };
    HomePageImageComponent.prototype.AddHomePageImage = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Home Page Image";
        this.modalBtnTitle = "Upload Image";
        //this.homepageimage.ImagePath = this.homepageimage.ImagePath;
        this.ngOnInit();
        this.modal.open();
    };
    HomePageImageComponent.prototype.EditHomePageImage = function (id) {
        debugger;
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Home Page Image";
        this.modalBtnTitle = "Update";
        this.homepageimage = this.homepageimages.filter(function (x) { return x.Id == id; })[0];
        this.modal.open();
    };
    HomePageImageComponent.prototype.DeleteHomePageImage = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.homepageimage = this.homepageimages.filter(function (x) { return x.Id == id; })[0];
        this.homepageimage.ImagePath = this.homepageimage.ImagePath;
        this.modal.open();
    };
    HomePageImageComponent.prototype.GetAllImage = function () {
        var _this = this;
        this.indLoading = true;
        this._HomePageImageService.get(global_1.Global.BASE_HOMEPAGEIMAGE_ENDPOINT)
            .subscribe(function (data) {
            _this.homepageimages = data;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchImageName = document.getElementById("searchImageName").value;
                if (_this.strSearchImageName != '') {
                    _this.strSearchImageName = _this.strSearchImageName.toLocaleLowerCase();
                    _this.homepageimages = _this.homepageimages.filter(function (x) { return x.ImagePath != null && x.ImagePath.toLocaleLowerCase().indexOf(_this.strSearchImageName) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    HomePageImageComponent.prototype.GetActiveImage = function () {
        var _this = this;
        this.indLoading = true;
        this._HomePageImageService.getactiveimage(global_1.Global.BASE_HOMEPAGEIMAGE_ENDPOINT)
            .subscribe(function (activeimages) {
            _this.activeimages = activeimages;
            _this.indLoading = false;
        });
    };
    HomePageImageComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.HomePageImageFrm.enable() : this.HomePageImageFrm.disable();
    };
    HomePageImageComponent.prototype.HomePageImageSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    HomePageImageComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.homepageimages);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    HomePageImageComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    HomePageImageComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                if (this.fileList1 != null) {
                    formData.ImagePath = this.fileList1.item(0).name;
                    this._HomePageImageService.post(global_1.Global.BASE_HOMEPAGEIMAGE_ENDPOINT, formData).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.fileList1.item(0).name;
                            var file = _this.fileList1[0];
                            var formData_1 = new FormData();
                            formData_1.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl = "/api/HomePageImageAPI/UploadJsonFile";
                            _this.http.post(apiUrl, formData_1, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                            _this.msg = data;
                            _this.GetAllImage();
                            _this.GetActiveImage();
                            _this.fileList1 = null;
                            _this.msg2 = '';
                            _this.modal.dismiss();
                        }
                        else {
                            alert(data);
                            _this.fileList1 = null;
                        }
                    }, function (error) {
                        _this.msg = error;
                    });
                }
                else {
                    this.msg2 = "Please Choose Image";
                }
                break;
            case enum_1.DBOperation.update:
                this._HomePageImageService.put(global_1.Global.BASE_HOMEPAGEIMAGE_ENDPOINT, formData.Id, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.GetAllImage();
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                    _this.GetActiveImage();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._HomePageImageService.delete(global_1.Global.BASE_HOMEPAGEIMAGE_ENDPOINT, formData.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Home Page Image status changed successfully.";
                        _this.GetAllImage();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing Home Page Image!";
                    }
                    _this.modal.dismiss();
                    _this.GetActiveImage();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    HomePageImageComponent.prototype.fileChange = function (event) {
        this.fileList1 = event.target.files;
    };
    HomePageImageComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    HomePageImageComponent.prototype.ViewImage = function (id) {
        this.modalTitle = "Preview Home Page Image";
        this.homepageimage = this.homepageimages.filter(function (x) { return x.Id == id; })[0];
        this.imgpathshow = this.homepageimage.ImagePath;
        this.modal2.open();
    };
    HomePageImageComponent.prototype.CancelPopup = function () {
        this.modal.dismiss();
        this.msg2 = '';
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], HomePageImageComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modal2'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], HomePageImageComponent.prototype, "modal2", void 0);
    HomePageImageComponent = __decorate([
        core_1.Component({
            providers: [HomePageImage_service_1.HomePageImageService],
            templateUrl: 'app/Components/Masters/CompanyRelated/HomePageImage.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, HomePageImage_service_1.HomePageImageService, pager_index_1.PagerService, http_1.Http, CommonHelper_service_1.CommonHelperService])
    ], HomePageImageComponent);
    return HomePageImageComponent;
}());
exports.HomePageImageComponent = HomePageImageComponent;
