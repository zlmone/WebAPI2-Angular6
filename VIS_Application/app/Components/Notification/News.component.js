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
var News_service_1 = require("../../service/Notification/News.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var NewsComponent = (function () {
    function NewsComponent(fb, _NewsService, pagerService) {
        this.fb = fb;
        this._NewsService = _NewsService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'News_Name';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    NewsComponent.prototype.ngOnInit = function () {
        this.NewsFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            News_Name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            Description: ['', forms_1.Validators.required],
            IsNew: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadNewss();
    };
    NewsComponent.prototype.NewsFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.NewsFilter = value;
    };
    NewsComponent.prototype.NewsSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    NewsComponent.prototype.LoadNewss = function () {
        var _this = this;
        this.indLoading = true;
        this._NewsService.get(global_1.Global.BASE_News_ENDPOINT)
            .subscribe(function (Newss) {
            _this.Newss = Newss;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchNews_Name = document.getElementById("searchNews_Name").value;
                if (_this.strSearchNews_Name != '') {
                    _this.strSearchNews_Name = _this.strSearchNews_Name.toLocaleLowerCase();
                    _this.Newss = _this.Newss.filter(function (x) { return x.News_Name != null && x.News_Name.toLocaleLowerCase().indexOf(_this.strSearchNews_Name) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    NewsComponent.prototype.addNews = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New News";
        this.modalBtnTitle = "Add";
        this.NewsFrm.reset();
        this.modal.open();
    };
    NewsComponent.prototype.editNews = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit News";
        this.modalBtnTitle = "Update";
        this.News = this.Newss.filter(function (x) { return x.Id == id; })[0];
        this.NewsFrm.setValue(this.News);
        this.modal.open();
    };
    NewsComponent.prototype.deleteNews = function (id, status) {
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
        this.News = this.Newss.filter(function (x) { return x.Id == id; })[0];
        this.NewsFrm.setValue(this.News);
        this.modal.open();
    };
    NewsComponent.prototype.ViewNews = function (id) {
        this.dbops = enum_1.DBOperation.View;
        this.SetControlsState(false);
        this.modalTitle = "View News";
        this.modalBtnTitle = "Back";
        this.News = this.Newss.filter(function (x) { return x.Id == id; })[0];
        this.NewsFrm.setValue(this.News);
        this.modal1.open();
        this.LoadViewNews(id);
    };
    NewsComponent.prototype.LoadViewNews = function (id) {
        var _this = this;
        this.indLoading = true;
        this._NewsService.getViewNews(global_1.Global.BASE_News_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.ViewNew = DATADP;
        });
    };
    NewsComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.NewsFrm.enable() : this.NewsFrm.disable();
    };
    NewsComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    NewsComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Newss);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    NewsComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    NewsComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._NewsService.post(global_1.Global.BASE_News_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadNewss();
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._NewsService.put(global_1.Global.BASE_News_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadNewss();
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
                this._NewsService.delete(global_1.Global.BASE_News_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "News status changed successfully.";
                        _this.LoadNewss();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing News!";
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
    ], NewsComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modal1'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], NewsComponent.prototype, "modal1", void 0);
    NewsComponent = __decorate([
        core_1.Component({
            providers: [News_service_1.NewsService],
            templateUrl: 'app/Components/Notification/News.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, News_service_1.NewsService, pager_index_1.PagerService])
    ], NewsComponent);
    return NewsComponent;
}());
exports.NewsComponent = NewsComponent;
