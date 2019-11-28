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
var DocumentTemplate_service_1 = require("../../Service/DocCenter/DocumentTemplate.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../Shared/enum");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var CommonHelper_service_1 = require("../../Shared/CommonHelper.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var DocumentTemplateComponent = (function () {
    function DocumentTemplateComponent(fb, _DocumentTemplateService, pagerService, _CommonHelperService, http) {
        this.fb = fb;
        this._DocumentTemplateService = _DocumentTemplateService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.http = http;
        this.strImgpath = '../../../Upload/DocumentCenter/DocumentTemplateImages/';
        this.strTableField = '';
        this.string = '';
        this.IsStep1Completed = false;
        this.indLoading = false;
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.step2Option = 'Text';
        this.IsEditStep2 = false;
        this.lstContainerField = [];
        this.ShowHideSearch = false;
        this.isDesc = false;
        this.column = 'Employee_Name';
        this.DocTempId = 0;
        this.TodayDate = new Date();
        this.ResetModal();
    }
    // Step 1 & Step 2 Related Function
    DocumentTemplateComponent.prototype.ResetModal = function () {
        this.objIDocumentTemplateModel = ({
            AddRecurrenceType: false,
            AllowFooter: false,
            AllowHeader: false,
            ApprovedOn: null,
            ContributorsId: '',
            DateFormat: 'Date(dd/mm/yyyy)',
            DocRightsId: 0,
            DocTemplateId: 0,
            DocTemplateInProgressId: 0,
            EmployeeId: 0,
            EmployeeName: '',
            FooterContent: '',
            HeaderContent: '',
            IsApproved: false,
            IsBehalf: false,
            IsDMSPdf: false,
            IsDMSWord: false,
            IsDownloadPdf: false,
            IsDownloadWord: false,
            IsEmailPdf: false,
            IsEmailWord: false,
            IsFinalSubmited: false,
            IsPortrait: true,
            IsRecurrence: false,
            IsSelf: true,
            ModuleId: '',
            ModuleName: '',
            OwnerId: Number(sessionStorage.getItem('Id')),
            PublishDate: '',
            SharingVariableType: '',
            StartingVariableRole: '',
            stringDate: null,
            TemplateDescription: '',
            TemplateName: '',
            TemplateRightsData: '',
            CreatedBy: 0
        });
        this.objIDocMasterFieldDataContract = ({
            AttachmentList: '',
            CreatedBy: 0,
            CreatedOn: null,
            DataSourceColumn: '',
            DataSourceColumnForCustom: '',
            DataSourceTable: '',
            DocTemplateId: 0,
            FieldDescription: '',
            FieldId: '',
            FieldName: '',
            FieldType: 'Text',
            Id: 0,
            ImageName: '',
            ImageAlign: 'left',
            ImageHeight: 0,
            ImageWidth: 0,
            IsActive: false,
            IsCustomField: false,
            IsDelete: false,
            IsNew: false,
            ListType: '',
            PageContent: '',
            UpdatedBy: 0,
            UpdatedOn: null
        });
        this.listIListItem = null;
        this.listIListItemRole = null;
    };
    DocumentTemplateComponent.prototype.ngOnInit = function () {
        this.lstIDropdownTableField = [
            {
                FieldName: '',
                IsActive: false,
                ModuleId: 0,
                VariableId: 0,
                VarName: '',
                TableName: ''
            }
        ];
        this.lstIDropdownCustomField = [
            {
                MasterFieldId: 0,
                TokenName: '',
                TokenValue: ''
            }
        ];
        this._CommonHelperService.ToogleMenu();
        this.GetApprovedDocumentData();
    };
    DocumentTemplateComponent.prototype.BindTableFieldDropDown = function (TableName) {
        var _this = this;
        this._DocumentTemplateService.bindtablefielddropdown(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, TableName).
            subscribe(function (data) {
            _this.lstIDropdownTableField = data;
        });
    };
    DocumentTemplateComponent.prototype.BindCustomFieldDropDown = function (DocTempId) {
        var _this = this;
        this._DocumentTemplateService.bindcustomfielddropdown(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, DocTempId).
            subscribe(function (data) {
            _this.lstIDropdownCustomField = data;
        });
    };
    DocumentTemplateComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    DocumentTemplateComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.listIDocumentTemplateViewModel);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    DocumentTemplateComponent.prototype.DocumentTemplateSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    DocumentTemplateComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    DocumentTemplateComponent.prototype.GetApprovedDocumentData = function () {
        var _this = this;
        // get id
        this.EmployeeId = Number(sessionStorage.getItem('Id'));
        // get role
        if (JSON.parse(sessionStorage.getItem('IsAdmin'))) {
            this.EmployeeRole = 'Admin';
        }
        else if (JSON.parse(sessionStorage.getItem('IsLineManager')) && this.EmployeeRole != 'Admin') {
            this.EmployeeRole = 'LM';
        }
        // get status
        if ($("#rbtapproved").prop("checked")) {
            this.ApprovedStatus = 'Approved';
        }
        else if ($("#rbtpending").prop("checked")) {
            this.ApprovedStatus = 'Pending';
        }
        else if ($("#rbtreject").prop("checked")) {
            this.ApprovedStatus = 'Reject';
        }
        if (this.EmployeeRole == 'Admin' || this.EmployeeRole == 'LM') {
            this.strPageHeader = 'Document Template';
        }
        else {
            this.strPageHeader = 'My Suggestion';
        }
        this._DocumentTemplateService.getapprovedrecord(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, this.EmployeeId, this.EmployeeRole, this.ApprovedStatus).
            subscribe(function (data) {
            _this.indLoading = true;
            _this.listIDocumentTemplateViewModel = data;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strTemplateName = document.getElementById("searchTemplateName").value;
                if (_this.strTemplateName != '') {
                    _this.strTemplateName = _this.strTemplateName.toLocaleLowerCase();
                    _this.listIDocumentTemplateViewModel = _this.listIDocumentTemplateViewModel.filter(function (x) { return x.TemplateName != null && x.TemplateName.toLocaleLowerCase().indexOf(_this.strTemplateName) != -1; });
                }
                _this.strOwnerName = document.getElementById("searchOwnerName").value;
                if (_this.strOwnerName != '') {
                    _this.strOwnerName = _this.strOwnerName.toLocaleLowerCase();
                    _this.listIDocumentTemplateViewModel = _this.listIDocumentTemplateViewModel.filter(function (x) { return x.OwnerName != null && x.OwnerName.toLocaleLowerCase().indexOf(_this.strOwnerName) != -1; });
                }
                _this.strModuleName = document.getElementById("searchModuleName").value;
                if (_this.strModuleName != '') {
                    _this.strModuleName = _this.strModuleName.toLocaleLowerCase();
                    _this.listIDocumentTemplateViewModel = _this.listIDocumentTemplateViewModel.filter(function (x) { return x.ModuleName != null && x.ModuleName.toLocaleLowerCase().indexOf(_this.strModuleName) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    DocumentTemplateComponent.prototype.AddNewTemplate = function () {
        this.DisableAllSteps();
        this.BindModuleDropDown();
        this.modalTitle = 'Document Template';
        this.modalBtnTitle = 'Save & Next';
        this.dbops = enum_1.DBOperation.create;
        this.ResetModal();
        this.GetDocumentFieldByDocId(0);
        this.DocTempId = 0;
        this.IsStep1Completed = false;
        this.modal.open();
    };
    DocumentTemplateComponent.prototype.EditTempalte = function (id) {
        var _this = this;
        this.DisableAllSteps();
        this.BindModuleDropDown();
        this.modalTitle = 'Document Template';
        this.modalBtnTitle = 'Save & Next';
        this.dbops = enum_1.DBOperation.update;
        this._DocumentTemplateService.getbyid(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, id).
            subscribe(function (data) {
            _this.objentitybyid = data;
            _this.BindStartingVariableNameDropdown(_this.objentitybyid.ModuleId);
            _this.objIDocumentTemplateModel = _this.objentitybyid;
            _this.DocTempId = _this.objentitybyid.DocTemplateId;
            _this.GetDocumentFieldByDocId(_this.DocTempId);
            _this.BindContainerField();
            _this.BindMasterField();
            _this.IsStep1Completed = true;
        });
        this.modal.open();
    };
    DocumentTemplateComponent.prototype.DeleteTemplate = function (id, status) {
        this.objIDocumentTemplateModel.DocTemplateId = this.listIDocumentTemplateViewModel.filter(function (x) { return x.DocTemplateId == id; })[0].DocTemplateId;
        this.objIDocumentTemplateModel.TemplateName = this.listIDocumentTemplateViewModel.filter(function (x) { return x.DocTemplateId == id; })[0].TemplateName;
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.dbops = enum_1.DBOperation.delete;
        this.modaldelete.open();
    };
    DocumentTemplateComponent.prototype.CopyTemplate = function () {
    };
    DocumentTemplateComponent.prototype.ActivateDeactivateStatus = function (id) {
        alert(id);
    };
    DocumentTemplateComponent.prototype.EnableDisableApproveButton = function () {
        if (this.listIDocumentTemplateViewModel[0].ApprovedStatus == 'Approved') {
            var styles = {
                'filter': 'grayscale(100%)',
                'cursor': 'not-allowed'
            };
            $(".btnstatus").prop('disabled', true);
            return styles;
        }
        else {
            var styles = {
                'filter': 'grayscale(0%)',
                'cursor': 'allowed'
            };
            $(".btnstatus").prop('disabled', false);
            return styles;
        }
    };
    DocumentTemplateComponent.prototype.BindModuleDropDown = function () {
        var _this = this;
        this._DocumentTemplateService.getallmodule(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT).
            subscribe(function (data) {
            _this.listIDocTemplateModule = data;
        });
    };
    DocumentTemplateComponent.prototype.BindStartingVariableNameDropdown = function (modulevalue) {
        if (modulevalue == 'DocTemplateModuleVariables') {
            this.listIListItem =
                [{
                        text: 'Employee Name',
                        value: ''
                    },
                    {
                        text: 'Candidate Name',
                        value: 'interviewsheetmaster'
                    }];
            $("#rbtself").prop('disabled', false);
            $("#rbtself").prop('checked', true);
            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', false);
        }
        else if (modulevalue == 'Other') {
            this.listIListItem =
                [{
                        text: 'Employee Name',
                        value: 'Employee_Master'
                    },
                    {
                        text: 'Candidate Name',
                        value: 'interviewsheetmaster'
                    }];
            $("#rbtself").prop('disabled', false);
            $("#rbtself").prop('checked', false);
            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', true);
        }
        else if (modulevalue == "ProjectMaster") {
            this.listIListItem =
                [{
                        text: 'Project Name',
                        value: 'ProjectMaster'
                    }];
            $("#rbtself").prop('checked', false);
            $("#rbtself").prop('disabled', true);
            $("#rbtbehalf").prop('checked', true);
            $("#rbtbehalf").prop('disabled', false);
        }
        else if (modulevalue == "RFQ_Initial") {
            this.listIListItem =
                [{
                        text: 'RFQ Initial',
                        value: 'RFQ_Initial'
                    }];
            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', true);
            $("#rbtself").prop('checked', false);
            $("#rbtself").prop('disabled', true);
        }
        else if (modulevalue == "ManageProjectMaster") {
            this.listIListItem =
                [{
                        text: 'BD Project Name',
                        value: 'ManageProjectMaster'
                    }];
            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', true);
            $("#rbtself").prop('checked', false);
            $("#rbtself").prop('disabled', true);
        }
        this.objIDocumentTemplateModel.SharingVariableType = this.listIListItem[0].value;
        this.BindStartingVariableTypeDropdown(modulevalue);
    };
    DocumentTemplateComponent.prototype.BindStartingVariableTypeDropdown = function (modulevalue) {
        if (modulevalue == 'DocTemplateModuleVariables') {
            this.listIListItemRole =
                [{
                        text: 'None',
                        value: 'none'
                    },
                    {
                        text: 'Admin',
                        value: 'admin'
                    },
                    {
                        text: 'HR',
                        value: 'hr'
                    },
                    {
                        text: 'HRH',
                        value: 'hrh'
                    },
                    {
                        text: 'LM',
                        value: 'lm'
                    }];
        }
        else if (modulevalue == 'Other') {
            this.listIListItemRole =
                [{
                        text: 'None',
                        value: 'none'
                    },
                    {
                        text: 'Admin',
                        value: 'admin'
                    },
                    {
                        text: 'HR',
                        value: 'hr'
                    },
                    {
                        text: 'HRH',
                        value: 'hrh'
                    },
                    {
                        text: 'LM',
                        value: 'lm'
                    }];
        }
        else if (modulevalue == "ProjectMaster") {
            this.listIListItemRole =
                [{
                        text: 'None',
                        value: 'none'
                    },
                    {
                        text: 'Admin',
                        value: 'admin'
                    },
                    {
                        text: 'AManager',
                        value: 'amanager'
                    },
                    {
                        text: 'AMG',
                        value: 'amg'
                    },
                    {
                        text: 'BH',
                        value: 'bh'
                    },
                    {
                        text: 'BM',
                        value: 'bm'
                    },
                    {
                        text: 'DH',
                        value: 'dh'
                    },
                    {
                        text: 'PM',
                        value: 'pm'
                    },
                    {
                        text: 'RMG',
                        value: 'rmg'
                    },
                    {
                        text: 'SH',
                        value: 'sh'
                    }];
        }
        else if (modulevalue == "RFQ_Initial") {
            this.listIListItemRole =
                [{
                        text: 'None',
                        value: 'none'
                    },
                    {
                        text: 'Admin',
                        value: 'admin'
                    },
                    {
                        text: 'BH',
                        value: 'bh'
                    },
                    {
                        text: 'BM',
                        value: 'bm'
                    },
                    {
                        text: 'SH',
                        value: 'sh'
                    }];
        }
        else if (modulevalue == "ManageProjectMaster") {
            this.listIListItemRole =
                [{
                        text: 'None',
                        value: 'none'
                    },
                    {
                        text: 'Admin',
                        value: 'admin'
                    },
                    {
                        text: 'BH',
                        value: 'bh'
                    },
                    {
                        text: 'BM',
                        value: 'bm'
                    },
                    {
                        text: 'SH',
                        value: 'sh'
                    }];
        }
        this.objIDocumentTemplateModel.StartingVariableRole = this.listIListItemRole[0].value;
    };
    DocumentTemplateComponent.prototype.onSubmitStep1 = function (formData) {
        var _this = this;
        formData.OwnerId = Number(sessionStorage.getItem('Id'));
        formData.CreatedBy = Number(sessionStorage.getItem('Id'));
        if ($("#rbtself").prop("checked")) {
            formData.IsSelf = true;
            formData.IsBehalf = false;
        }
        else {
            formData.IsSelf = false;
            formData.IsBehalf = true;
        }
        if (JSON.parse(sessionStorage.getItem('IsAdmin')) || JSON.parse(sessionStorage.getItem('IsLineManager'))) {
            formData.ApprovedOn = new Date();
            formData.IsApproved = true;
            formData.IsFinalSubmited = true;
        }
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._DocumentTemplateService.addnewdocument(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        alert('Document Template Saved sucessfully...');
                        _this.ResetModal();
                        _this._DocumentTemplateService.getmaxid(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT).
                            subscribe(function (id) {
                            _this.DocTempId = id;
                            if (_this.DocTempId > 0) {
                                _this.IsStep1Completed = true;
                                _this.NextStep1();
                            }
                        });
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._DocumentTemplateService.updatedocument(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        alert('Document Template Saved sucessfully...');
                        _this.ResetModal();
                        _this.NextStep1();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._DocumentTemplateService.deletedocument(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, formData.DocTemplateId).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.GetApprovedDocumentData();
                        _this.modaldelete.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
        }
    };
    DocumentTemplateComponent.prototype.onSubmitStep2 = function (formData) {
        var _this = this;
        if (formData.DataSourceColumn == '' && formData.DataSourceColumnForCustom == '') {
            alert('Select Table Field or Custom Control Field');
        }
        else {
            if (formData.DataSourceColumn == '') {
                formData.DataSourceColumn = '0';
            }
            if (this.fileList1 != null) {
                if (this.fileList1.length > 0) {
                    formData.ImageName = this.fileList1.item(0).name;
                    formData.ImageHeight = 100;
                    formData.ImageWidth = 100;
                }
            }
            else {
                formData.ImageName = this.objIDocMasterFieldDataContract.ImageName;
            }
            if (this.IsEditStep2 == false) {
                formData.DocTemplateId = this.DocTempId;
                formData.CreatedBy = Number(sessionStorage.getItem('Id'));
                this._DocumentTemplateService.addnewdocumentfield(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        alert('Field saved Successfully...');
                        _this.GetDocumentFieldByDocId(_this.DocTempId);
                        _this.BindContainerField();
                        _this.BindMasterField();
                        _this.ResetModal();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
            else {
                formData.UpdatedBy = Number(sessionStorage.getItem('Id'));
                this._DocumentTemplateService.updatedocumentfield(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        alert('Field saved Successfully...');
                        _this.GetDocumentFieldByDocId(_this.DocTempId);
                        _this.BindContainerField();
                        _this.BindMasterField();
                        _this.ResetModal();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
    };
    DocumentTemplateComponent.prototype.CheckEnableDisableOption = function () {
        if ($("#rbtself").prop('checked')) {
            $("#SharingVariableType").prop('disabled', true);
            $("#StartingVariableRole").prop('disabled', true);
        }
        else {
            $("#SharingVariableType").prop('disabled', false);
            $("#StartingVariableRole").prop('disabled', false);
        }
    };
    DocumentTemplateComponent.prototype.EditField = function (id) {
        this.IsEditStep2 = true;
        this.objIDocMasterFieldDataContract = this.lstIDocMasterFieldDataContract.filter(function (x) { return x.Id == id; })[0];
        this.strImgpath = '../../../Upload/DocumentCenter/DocumentTemplateImages/' + this.objIDocMasterFieldDataContract.ImageName;
    };
    DocumentTemplateComponent.prototype.DeleteField = function (id) {
        var _this = this;
        var confirmation = confirm('Are you sure want to delete User Input?');
        if (confirmation == true) {
            this._DocumentTemplateService.deletedocumentfield(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, id, Number(sessionStorage.getItem('Id'))).subscribe(function (data) {
                if (data.startsWith("Success: ")) {
                    alert('Field deleted Successfully...');
                    _this.GetDocumentFieldByDocId(_this.DocTempId);
                    _this.ResetModal();
                }
                else {
                    alert(data);
                }
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    DocumentTemplateComponent.prototype.CopyField = function (id) {
        this.IsEditStep2 = false;
        this.objIDocMasterFieldDataContract = this.lstIDocMasterFieldDataContract.filter(function (x) { return x.Id == id; })[0];
        this.objIDocMasterFieldDataContract.FieldName = '';
    };
    DocumentTemplateComponent.prototype.GetDocumentFieldByDocId = function (doctempid) {
        var _this = this;
        this._DocumentTemplateService.getbydoctempid(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, doctempid).
            subscribe(function (data) {
            _this.lstIDocMasterFieldDataContract = data;
            _this.lstIDocMasterFieldDataContract = _this.lstIDocMasterFieldDataContract.filter(function (x) { return x.FieldType == 'Text' || x.FieldType == 'Image' || x.FieldType == 'TokenText'; });
        });
    };
    DocumentTemplateComponent.prototype.EnableDisableSteps = function () {
        if (this.IsStep1Completed == true) {
            var styles = {
                'pointer-events': 'auto',
                'color': '#337ab7'
            };
            return styles;
        }
        else {
            var styles = {
                'pointer-events': 'none',
                'color': '#dce2e8'
            };
            return styles;
        }
    };
    DocumentTemplateComponent.prototype.GetImageFile = function (event) {
        this.fileList1 = event.target.files;
    };
    DocumentTemplateComponent.prototype.UploadImage = function () {
        if (this.fileList1 != null) {
            if (this.fileList1.length > 0) {
                this.fileList1.item(0).name;
                var file = this.fileList1[0];
                var formData = new FormData();
                formData.append('uploadFile', file, file.name);
                var headers = new http_1.Headers();
                var options = new http_1.RequestOptions({ headers: headers });
                this.http.post(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT + 'UploadImage', formData, options)
                    .map(function (res) { return res.json(); })
                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                    .subscribe(function (data) {
                }, function (error) {
                    console.log(error);
                });
                this.strImgpath = '../../../Upload/DocumentCenter/DocumentTemplateImages/' + this.fileList1.item(0).name;
            }
        }
        else {
            alert('Please Select Image');
        }
    };
    DocumentTemplateComponent.prototype.BindDropDownTableField = function () {
        this.IsEditStep2 = false;
        this.objIDocMasterFieldDataContract.AttachmentList = '';
        this.objIDocMasterFieldDataContract.DataSourceColumn = '';
        this.objIDocMasterFieldDataContract.DataSourceColumnForCustom = '';
        this.objIDocMasterFieldDataContract.DataSourceTable = '';
        this.objIDocMasterFieldDataContract.FieldDescription = '';
        this.objIDocMasterFieldDataContract.FieldName = '';
        this.objIDocMasterFieldDataContract.ImageAlign = 'left';
        this.objIDocMasterFieldDataContract.ImageHeight = 0;
        this.objIDocMasterFieldDataContract.ImageWidth = 0;
        this.objIDocMasterFieldDataContract.PageContent = '';
        this.strImgpath = '';
        this.GetDocumentFieldByDocId(this.DocTempId);
        if (this.DocTempId > 0) {
            this.BindCustomFieldDropDown(this.DocTempId);
        }
        if (this.objIDocumentTemplateModel.ModuleName != '') {
            this.BindTableFieldDropDown(this.objIDocumentTemplateModel.ModuleId);
        }
    };
    DocumentTemplateComponent.prototype.ChangeTableFieldDropDown = function (value) {
        this.strTableField = '<p>' + value + '</p>';
    };
    DocumentTemplateComponent.prototype.AddTableFieldToTextEditor = function () {
        if (this.strTableField != '') {
            this.objIDocMasterFieldDataContract.PageContent += this.strTableField;
        }
        else {
            alert("Select Table Field.");
        }
    };
    DocumentTemplateComponent.prototype.AddCustomFieldToTextEditor = function (value) {
        if (value != '') {
            var todayDate = new Date(), day = todayDate.getDate(), month = todayDate.getMonth(), year = todayDate.getFullYear(), hour = todayDate.getHours(), minute = todayDate.getMinutes(), second = todayDate.getSeconds(), miSecond = todayDate.getMilliseconds();
            if (value == "{Textbox}") {
                value = "{Textbox_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{TextArea}") {
                value = "{TextArea_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{CKEditor}") {
                value = "{CKEditor_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{SingleDate}") {
                value = "{SingleDate_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{Time}") {
                value = "{Time_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{DateRange}") {
                value = "{DateRange_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "DropDownList") {
                value = "{DropDownList_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "ListBox") {
                value = "{ListBox_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "CheckBoxList") {
                value = "{CheckBoxList_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "RadioButtonList") {
                value = "{RadioButtonList_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            this.strCustomField = '<p>' + value + '</p>';
            this.objIDocMasterFieldDataContract.PageContent += this.strCustomField;
        }
        else {
            alert("Select Custom Field.");
        }
    };
    DocumentTemplateComponent.prototype.NextStep1 = function () {
        $("#Step1Content").hide();
        $("#Step2Content").show();
        $("#Step2Content").scrollTop(0);
    };
    DocumentTemplateComponent.prototype.CancelStep2 = function () {
        this.IsEditStep2 = false;
        this.strImgpath = '';
        this.strTableField = '';
        this.strCustomField = '';
        this.fileList1 = null;
        var FieldType = this.objIDocMasterFieldDataContract.FieldType;
        this.objIDocMasterFieldDataContract = ({
            AttachmentList: '',
            CreatedBy: 0,
            CreatedOn: null,
            DataSourceColumn: '',
            DataSourceColumnForCustom: '',
            DataSourceTable: '',
            DocTemplateId: 0,
            FieldDescription: '',
            FieldId: '',
            FieldName: '',
            FieldType: 'Text',
            Id: 0,
            ImageName: '',
            ImageAlign: 'left',
            ImageHeight: 0,
            ImageWidth: 0,
            IsActive: false,
            IsCustomField: false,
            IsDelete: false,
            IsNew: false,
            ListType: '',
            PageContent: '',
            UpdatedBy: 0,
            UpdatedOn: null
        });
        this.objIDocMasterFieldDataContract.FieldType = FieldType;
        $("#Step2Content").scrollTop(0);
    };
    DocumentTemplateComponent.prototype.PreviousStep2 = function () {
        $("#Step2Content").hide();
        $("#Step1Content").show();
        $("#Step1Content").scrollTop(0);
    };
    DocumentTemplateComponent.prototype.NextStep2 = function () {
        $("#Step2Content").hide();
        $("#Step3Content").show();
        $("#Step3Content").scrollTop(0);
    };
    DocumentTemplateComponent.prototype.DisableAllSteps = function () {
        $("#Step1Content").hide();
        $("#Step2Content").hide();
        $("#Step3Content").hide();
        $("#Step4Content").hide();
        $("#Step5Content").hide();
        $("#Step6Content").hide();
        $("#Step7Content").hide();
        $("#Step8Content").hide();
        $("#Step1Content").show();
        $("#Step1Content").scrollTop(0);
    };
    // Step 3 Related Function
    DocumentTemplateComponent.prototype.BindContainerField = function () {
        var _this = this;
        this._DocumentTemplateService.GetDocumentContainer(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, this.DocTempId).
            subscribe(function (data) {
            _this.lstContainerField = [];
            _this.lstContainerField = data;
        });
    };
    DocumentTemplateComponent.prototype.BindMasterField = function () {
        var _this = this;
        this._DocumentTemplateService.getbydoctempid(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, this.DocTempId).
            subscribe(function (data) {
            _this.lstMasterField = data;
        });
    };
    DocumentTemplateComponent.prototype.AddAllField = function () {
        if (this.lstMasterField.length > 0) {
            for (var _i = 0, _a = this.lstMasterField; _i < _a.length; _i++) {
                var item = _a[_i];
                this.lstContainerField.push(item);
            }
            this.lstMasterField = this.lstIDocMasterFieldDataContract.filter(function (x) { return x.FieldType == 'Text' || x.FieldType == 'Image'; });
        }
    };
    DocumentTemplateComponent.prototype.RemoveAllField = function () {
        if (this.lstContainerField.length > 0) {
            for (var _i = 0, _a = this.lstContainerField; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.FieldType != 'Text' && item.FieldType != 'Image') {
                    this.lstMasterField.push(item);
                }
            }
            this.lstContainerField = [];
        }
    };
    DocumentTemplateComponent.prototype.AddLineBreak = function () {
        this.objContainerField = ({
            AttachmentList: '',
            CreatedBy: Number(sessionStorage.getItem('Id')),
            CreatedOn: new Date(),
            DataSourceColumn: '',
            DataSourceColumnForCustom: '',
            DataSourceTable: '',
            DocTemplateId: this.DocTempId,
            FieldDescription: '',
            FieldId: '',
            FieldName: 'Line Break',
            FieldType: '<BR>',
            Id: 0,
            ImageName: '',
            ImageAlign: '',
            ImageHeight: 0,
            ImageWidth: 0,
            IsActive: false,
            IsCustomField: false,
            IsDelete: false,
            IsNew: false,
            ListType: '',
            PageContent: '',
            UpdatedBy: 0,
            UpdatedOn: null
        });
        this.lstContainerField.push(this.objContainerField);
    };
    DocumentTemplateComponent.prototype.AddPageBreak = function () {
        this.objContainerField = ({
            AttachmentList: '',
            CreatedBy: Number(sessionStorage.getItem('Id')),
            CreatedOn: new Date(),
            DataSourceColumn: '',
            DataSourceColumnForCustom: '',
            DataSourceTable: '',
            DocTemplateId: this.DocTempId,
            FieldDescription: '',
            FieldId: '',
            FieldName: 'Page Break',
            FieldType: '<PageBreak>',
            Id: 0,
            ImageName: '',
            ImageAlign: '',
            ImageHeight: 0,
            ImageWidth: 0,
            IsActive: false,
            IsCustomField: false,
            IsDelete: false,
            IsNew: false,
            ListType: '',
            PageContent: '',
            UpdatedBy: 0,
            UpdatedOn: null
        });
        this.lstContainerField.push(this.objContainerField);
        this.lstContainerField = this.lstContainerField;
    };
    DocumentTemplateComponent.prototype.NextStep3 = function () {
        $("#Step3Content").hide();
        $("#Step4Content").show();
        $("#Step4Content").scrollTop(0);
    };
    DocumentTemplateComponent.prototype.CancelStep3 = function () {
        this.BindContainerField();
        this.BindMasterField();
        $("#Step3Content").scrollTop(0);
        $(".contentscrollermasterfield").scrollTop(0);
    };
    DocumentTemplateComponent.prototype.PreviousStep3 = function () {
        $("#Step3Content").hide();
        $("#Step2Content").show();
        $("#Step2Content").scrollTop(0);
    };
    DocumentTemplateComponent.prototype.onSubmitStep3 = function () {
        var _this = this;
        if (this.lstContainerField.length == 0) {
            this.objContainerField = ({
                AttachmentList: '',
                CreatedBy: 0,
                CreatedOn: null,
                DataSourceColumn: '',
                DataSourceColumnForCustom: '',
                DataSourceTable: '',
                DocTemplateId: this.DocTempId,
                FieldDescription: '',
                FieldId: '',
                FieldName: '',
                FieldType: '',
                Id: 0,
                ImageName: '',
                ImageAlign: '',
                ImageHeight: 0,
                ImageWidth: 0,
                IsActive: false,
                IsCustomField: false,
                IsDelete: false,
                IsNew: false,
                ListType: '',
                PageContent: '',
                UpdatedBy: 0,
                UpdatedOn: null
            });
            this.lstContainerField.push(this.objContainerField);
        }
        this._DocumentTemplateService.AddDocumentContainerField(global_1.Global.BASE_DocumentTemplateAPI_ENDPOINT, this.lstContainerField).
            subscribe(function (data) {
            _this.BindContainerField();
            alert('My Document Container Saved Successfully...');
        });
    };
    DocumentTemplateComponent.prototype.RemoveLineBreakPageBreak = function (CreatedOn) {
        this.objContainerField = this.lstContainerField.filter(function (x) { return x.CreatedOn == CreatedOn; })[0];
        var index = this.lstContainerField.indexOf(this.objContainerField);
        if (index !== -1) {
            this.lstContainerField.splice(index, 1);
        }
    };
    DocumentTemplateComponent.prototype.RemoveLineBreakPageBreakMaster = function (CreatedOn) {
        this.objContainerField = this.lstMasterField.filter(function (x) { return x.CreatedOn == CreatedOn; })[0];
        var index = this.lstMasterField.indexOf(this.objContainerField);
        if (index !== -1) {
            this.lstMasterField.splice(index, 1);
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DocumentTemplateComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modaldelete'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DocumentTemplateComponent.prototype, "modaldelete", void 0);
    DocumentTemplateComponent = __decorate([
        core_1.Component({
            providers: [DocumentTemplate_service_1.DocumentTemplateService],
            templateUrl: 'app/Components/DocCenter/DocumentTemplate.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, DocumentTemplate_service_1.DocumentTemplateService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService, http_1.Http])
    ], DocumentTemplateComponent);
    return DocumentTemplateComponent;
}());
exports.DocumentTemplateComponent = DocumentTemplateComponent;
