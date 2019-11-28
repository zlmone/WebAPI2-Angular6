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
var EmployeeList_service_1 = require("../../../Service/HumanResource/EmployeeManagement/EmployeeList.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var EmployeeListComponent = (function () {
    function EmployeeListComponent(fb, _EmployeeListService, pagerService, router) {
        this.fb = fb;
        this._EmployeeListService = _EmployeeListService;
        this.pagerService = pagerService;
        this.router = router;
        this.indLoading = false;
        this.isDesc = false;
        this.column = '';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
        this.ShowHideSearchNew = false;
        //declare id 
        this.tempUserId = 21;
        this.tempUSertype = "Admin";
        this.Status = "Active";
        this.someValue = "hey";
    }
    EmployeeListComponent.prototype.ngOnInit = function () {
        this.EmployeeListFrm = this.fb.group({
            CompanyId: [''],
            UserId: [''],
            Usertype: [''],
            Id: [''],
            EmployeeCode: [''],
            CompanyName: [''],
            Employee_Name: [''],
            Email: [''],
            Department: [''],
            TotalExp: [''],
            JoiningDate: [''],
            RelevingDate: [''],
            Grace: [''],
            SL_CL: [''],
        });
        this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, "%");
    };
    EmployeeListComponent.prototype.SaveEmployee = function () {
        alert('Fristtab');
    };
    EmployeeListComponent.prototype.EmployeeListFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.EmployeeListFilter = value;
    };
    EmployeeListComponent.prototype.EmployeeListSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    EmployeeListComponent.prototype.LoadValue = function (event) {
        debugger;
        var x = ($('input[name="Status"]:checked').val());
        if (x == "InActive") {
            if (event.target.value == "E%") {
                this.LoadEmployeeModeInActive(this.tempUSertype, this.tempUserId);
            }
            else {
                this.LoadEmployeeListInActive(this.tempUSertype, this.tempUserId, event.target.value);
            }
        }
        else if (x == "ALL") {
            if (event.target.value == "E%") {
                this.LoadEmployeeModeAll(this.tempUSertype, this.tempUserId);
            }
            else {
                this.LoadEmployeeListAll(this.tempUSertype, this.tempUserId, event.target.value);
            }
        }
        else {
            if (event.target.value == "E%") {
                this.LoadEmployeeModeActive(this.tempUSertype, this.tempUserId);
            }
            else {
                this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, event.target.value);
            }
        }
    };
    EmployeeListComponent.prototype.FilterByStatus = function (event) {
        if (event.target.value == "InActive") {
            this.LoadEmployeeListInActive(this.tempUSertype, this.tempUserId, "%");
        }
        if (event.target.value == "ALL") {
            this.LoadEmployeeListAll(this.tempUSertype, this.tempUserId, "%");
        }
        else {
            this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, "%");
        }
    };
    EmployeeListComponent.prototype.LoadEmployeelistActive = function (Usertype, UserId, EmployeeCode) {
        var _this = this;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeListActive(global_1.Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId, EmployeeCode)
            .subscribe(function (EmployeeLists) {
            _this.EmployeeLists = EmployeeLists;
            if (_this.ShowHideSearch) {
                _this.searchID = document.getElementById("searchID").value;
                if (_this.searchID != '') {
                    _this.searchID = _this.searchID.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(_this.searchID) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchCompanyName = document.getElementById("searchCompanyName").value;
                if (_this.searchCompanyName != '') {
                    _this.searchCompanyName = _this.searchCompanyName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(_this.searchCompanyName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmail = document.getElementById("searchEmail").value;
                if (_this.searchEmail != '') {
                    _this.searchEmail = _this.searchEmail.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Email != null && x.Email.toLocaleLowerCase().indexOf(_this.searchEmail) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchDepartment = document.getElementById("searchDepartment").value;
                if (_this.searchDepartment != '') {
                    _this.searchDepartment = _this.searchDepartment.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Department != null && x.Department.toLocaleLowerCase().indexOf(_this.searchDepartment) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.searchTotalExp = document.getElementById("searchTotalExp").value;
                    if (_this.searchTotalExp != '') {
                        _this.searchTotalExp = _this.searchTotalExp.toLocaleLowerCase();
                        _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(_this.searchTotalExp) != -1; });
                    }
                }
            }
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    EmployeeListComponent.prototype.LoadEmployeeListAll = function (Usertype, UserId, EmployeeCode) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeListAll(global_1.Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId, EmployeeCode)
            .subscribe(function (EmployeeLists) {
            _this.EmployeeLists = EmployeeLists;
            console.log(_this.EmployeeLists);
            if (_this.ShowHideSearch) {
                _this.searchID = document.getElementById("searchID").value;
                if (_this.searchID != '') {
                    _this.searchID = _this.searchID.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(_this.searchID) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchCompanyName = document.getElementById("searchCompanyName").value;
                if (_this.searchCompanyName != '') {
                    _this.searchCompanyName = _this.searchCompanyName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(_this.searchCompanyName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmail = document.getElementById("searchEmail").value;
                if (_this.searchEmail != '') {
                    _this.searchEmail = _this.searchEmail.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Email != null && x.Email.toLocaleLowerCase().indexOf(_this.searchEmail) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchDepartment = document.getElementById("searchDepartment").value;
                if (_this.searchDepartment != '') {
                    _this.searchDepartment = _this.searchDepartment.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Department != null && x.Department.toLocaleLowerCase().indexOf(_this.searchDepartment) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.searchTotalExp = document.getElementById("searchTotalExp").value;
                    if (_this.searchTotalExp != '') {
                        _this.searchTotalExp = _this.searchTotalExp.toLocaleLowerCase();
                        _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(_this.searchTotalExp) != -1; });
                    }
                }
            }
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    EmployeeListComponent.prototype.LoadEmployeeListInActive = function (Usertype, UserId, EmployeeCode) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeListInActive(global_1.Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId, EmployeeCode)
            .subscribe(function (EmployeeLists) {
            _this.EmployeeLists = EmployeeLists;
            console.log(_this.EmployeeLists);
            if (_this.ShowHideSearch) {
                _this.searchID = document.getElementById("searchID").value;
                if (_this.searchID != '') {
                    _this.searchID = _this.searchID.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(_this.searchID) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchCompanyName = document.getElementById("searchCompanyName").value;
                if (_this.searchCompanyName != '') {
                    _this.searchCompanyName = _this.searchCompanyName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(_this.searchCompanyName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmail = document.getElementById("searchEmail").value;
                if (_this.searchEmail != '') {
                    _this.searchEmail = _this.searchEmail.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Email != null && x.Email.toLocaleLowerCase().indexOf(_this.searchEmail) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchDepartment = document.getElementById("searchDepartment").value;
                if (_this.searchDepartment != '') {
                    _this.searchDepartment = _this.searchDepartment.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Department != null && x.Department.toLocaleLowerCase().indexOf(_this.searchDepartment) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.searchTotalExp = document.getElementById("searchTotalExp").value;
                    if (_this.searchTotalExp != '') {
                        _this.searchTotalExp = _this.searchTotalExp.toLocaleLowerCase();
                        _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(_this.searchTotalExp) != -1; });
                    }
                }
            }
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    EmployeeListComponent.prototype.LoadEmployeeModeActive = function (Usertype, UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeModeActive(global_1.Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId)
            .subscribe(function (EmployeeLists) {
            _this.EmployeeLists = EmployeeLists;
            console.log(_this.EmployeeLists);
            if (_this.ShowHideSearch) {
                _this.searchID = document.getElementById("searchID").value;
                if (_this.searchID != '') {
                    _this.searchID = _this.searchID.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(_this.searchID) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchCompanyName = document.getElementById("searchCompanyName").value;
                if (_this.searchCompanyName != '') {
                    _this.searchCompanyName = _this.searchCompanyName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(_this.searchCompanyName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmail = document.getElementById("searchEmail").value;
                if (_this.searchEmail != '') {
                    _this.searchEmail = _this.searchEmail.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Email != null && x.Email.toLocaleLowerCase().indexOf(_this.searchEmail) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchDepartment = document.getElementById("searchDepartment").value;
                if (_this.searchDepartment != '') {
                    _this.searchDepartment = _this.searchDepartment.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Department != null && x.Department.toLocaleLowerCase().indexOf(_this.searchDepartment) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.searchTotalExp = document.getElementById("searchTotalExp").value;
                    if (_this.searchTotalExp != '') {
                        _this.searchTotalExp = _this.searchTotalExp.toLocaleLowerCase();
                        _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(_this.searchTotalExp) != -1; });
                    }
                }
            }
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    EmployeeListComponent.prototype.LoadEmployeeModeAll = function (Usertype, UserId) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeModeAll(global_1.Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId)
            .subscribe(function (EmployeeLists) {
            _this.EmployeeLists = EmployeeLists;
            console.log(_this.EmployeeLists);
            if (_this.ShowHideSearch) {
                _this.searchID = document.getElementById("searchID").value;
                if (_this.searchID != '') {
                    _this.searchID = _this.searchID.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(_this.searchID) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchCompanyName = document.getElementById("searchCompanyName").value;
                if (_this.searchCompanyName != '') {
                    _this.searchCompanyName = _this.searchCompanyName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(_this.searchCompanyName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmail = document.getElementById("searchEmail").value;
                if (_this.searchEmail != '') {
                    _this.searchEmail = _this.searchEmail.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Email != null && x.Email.toLocaleLowerCase().indexOf(_this.searchEmail) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchDepartment = document.getElementById("searchDepartment").value;
                if (_this.searchDepartment != '') {
                    _this.searchDepartment = _this.searchDepartment.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Department != null && x.Department.toLocaleLowerCase().indexOf(_this.searchDepartment) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.searchTotalExp = document.getElementById("searchTotalExp").value;
                    if (_this.searchTotalExp != '') {
                        _this.searchTotalExp = _this.searchTotalExp.toLocaleLowerCase();
                        _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(_this.searchTotalExp) != -1; });
                    }
                }
            }
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    EmployeeListComponent.prototype.LoadEmployeeModeInActive = function (Usertype, UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeModeInActive(global_1.Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId)
            .subscribe(function (EmployeeLists) {
            _this.EmployeeLists = EmployeeLists;
            console.log(_this.EmployeeLists);
            if (_this.ShowHideSearch) {
                _this.searchID = document.getElementById("searchID").value;
                if (_this.searchID != '') {
                    _this.searchID = _this.searchID.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(_this.searchID) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchCompanyName = document.getElementById("searchCompanyName").value;
                if (_this.searchCompanyName != '') {
                    _this.searchCompanyName = _this.searchCompanyName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(_this.searchCompanyName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmail = document.getElementById("searchEmail").value;
                if (_this.searchEmail != '') {
                    _this.searchEmail = _this.searchEmail.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Email != null && x.Email.toLocaleLowerCase().indexOf(_this.searchEmail) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchDepartment = document.getElementById("searchDepartment").value;
                if (_this.searchDepartment != '') {
                    _this.searchDepartment = _this.searchDepartment.toLocaleLowerCase();
                    _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.Department != null && x.Department.toLocaleLowerCase().indexOf(_this.searchDepartment) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.searchTotalExp = document.getElementById("searchTotalExp").value;
                    if (_this.searchTotalExp != '') {
                        _this.searchTotalExp = _this.searchTotalExp.toLocaleLowerCase();
                        _this.EmployeeLists = _this.EmployeeLists.filter(function (x) { return x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(_this.searchTotalExp) != -1; });
                    }
                }
            }
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    EmployeeListComponent.prototype.addEmployeeList = function () {
        this.router.navigate(['/EmpInfoTabular']);
        // this.SetControlsState(true);
        this.modalTitle = "Add New EmployeeList";
        this.modalBtnTitle = "Add";
    };
    EmployeeListComponent.prototype.editEmployeeList = function (id) {
        debugger;
        //  this.EmployeeList = this.EmployeeLists.filter(x => x.Id == id)[0];
        this.router.navigate(['/EmpInfoTabular'], { queryParams: { UserId: id, mode: "e" } });
    };
    EmployeeListComponent.prototype.deleteEmployee = function (id) {
        var msg1 = "Are you sure you want to Delete this Employee?";
        if (confirm(msg1) == true) {
            this.deleteEmployeeId(id);
        }
        else {
            this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, "%");
        }
    };
    EmployeeListComponent.prototype.deleteEmployeeId = function (id) {
        var _this = this;
        this.indLoading = true;
        this._EmployeeListService.delete(global_1.Global.BASE_EmployeeList_ENDPOINT, id)
            .subscribe(function (Data) {
            if (Data.startsWith("Success: ")) {
                _this.msg = Data;
                _this.LoadEmployeelistActive(_this.tempUSertype, _this.tempUserId, "%");
            }
            else {
                alert(Data);
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    EmployeeListComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.EmployeeListFrm.enable() : this.EmployeeListFrm.disable();
    };
    EmployeeListComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    EmployeeListComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeLists);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    EmployeeListComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    EmployeeListComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._EmployeeListService.post(global_1.Global.BASE_EmployeeList_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
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
                debugger;
                this._EmployeeListService.put(global_1.Global.BASE_EmployeeList_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
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
                this._EmployeeListService.delete(global_1.Global.BASE_EmployeeList_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EmployeeListComponent.prototype, "modal", void 0);
    EmployeeListComponent = __decorate([
        core_1.Component({
            providers: [EmployeeList_service_1.EmployeeListService],
            templateUrl: 'app/Components/HumanResource/EmployeeManagement/EmployeeList.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, EmployeeList_service_1.EmployeeListService, pager_index_1.PagerService, router_1.Router])
    ], EmployeeListComponent);
    return EmployeeListComponent;
}());
exports.EmployeeListComponent = EmployeeListComponent;
