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
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var ProductivityTrackerReport_service_1 = require("../../../Service/Report/Attendance/ProductivityTrackerReport.service");
var ProductivityTrackerReportcomponent = (function () {
    function ProductivityTrackerReportcomponent(fb, router, pagerService, _ProductivityTrackerReportService) {
        this.fb = fb;
        this.router = router;
        this.pagerService = pagerService;
        this._ProductivityTrackerReportService = _ProductivityTrackerReportService;
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    ProductivityTrackerReportcomponent.prototype.ngOnInit = function () {
        $("#radEmployee").prop("checked", true);
        $("#radDate").prop("checked", true);
        $("#radAll").prop("checked", true);
        $("#raddetail").prop("checked", true);
        $("#radsortname").prop("checked", true);
        this.HideLMDPOA();
        this.showfromtoDate();
        this.TypeAll();
        this.ViewDetailed();
        this.FillEmployee();
        this.FillDepartment();
        this.FillLineManager();
        this.FillLookup();
        this.FillOverall();
        this.FillYear();
    };
    ProductivityTrackerReportcomponent.prototype.HideLMDPOA = function () {
        if ($("#radEmployee").prop("checked", true)) {
            $('#emp').show();
            $('#empAll').show();
            $('#LineManager').hide();
            $('#Department').hide();
        }
    };
    ProductivityTrackerReportcomponent.prototype.HideDPOAEM = function () {
        $('#emp').hide();
        $('#empAll').hide();
        $('#Department').hide();
        $('#LineManager').show();
    };
    ProductivityTrackerReportcomponent.prototype.HideOAEMLM = function () {
        $('#LineManager').hide();
        $('#emp').hide();
        $('#empAll').hide();
        $('#Department').show();
    };
    ProductivityTrackerReportcomponent.prototype.HideEMLMDP = function () {
        $('#Department').hide();
        $('#LineManager').hide();
        $('#emp').hide();
        $('#empAll').hide();
    };
    ProductivityTrackerReportcomponent.prototype.showfromtoDate = function () {
        if ($("#radDate").prop("checked", true)) {
            $('#date').show();
            $('#month').hide();
            //var Mon = new Date().getMonth();
            //var Year = new Date().getFullYear();
            //this.FromDate = new Date(Year, Mon, 1).toString();
            //this.ToDate = new Date(Year, Mon + 1,0).toString();
        }
    };
    ProductivityTrackerReportcomponent.prototype.ShowMonthYear = function () {
        $('#date').hide();
        $('#month').show();
    };
    ProductivityTrackerReportcomponent.prototype.ShowPreviousWorkday = function () {
        if ($("#radPrevious").prop("checked")) {
            $('#date').show();
            $('#month').hide();
            //var day = new Date().getDate() - 1;
            //var Mon = new Date().getMonth();
            //var Year = new Date().getFullYear();
            //this.FromDate = new Date(Year, Mon, day).toString();
            //this.ToDate = new Date(Year, Mon, day).toString();
        }
    };
    ProductivityTrackerReportcomponent.prototype.ShowToday = function () {
        if ($("#radToday").prop("checked", true)) {
            $('#date').show();
            $('#month').hide();
            //this.FromDate = new Date().toString();
            //this.ToDate = new Date().toString();
        }
    };
    ProductivityTrackerReportcomponent.prototype.TypeAll = function () {
        if ($("#radAll").prop("checked", true)) {
            $("#chkall").prop("checked", true);
            $("#chkall").prop("disabled", true);
            $("#chkouttype").prop("disabled", true);
            //$('#chkall').prop('disabled', true);
            //$('#chklunch').prop('disabled', true);
            //$('#chkother').prop('disabled', true);
            //$('#chkmeeting').prop('disabled', true);
            //$('#chkofficial').prop('disabled', true);
            //$('#chkidle').prop('disabled', true);
        }
    };
    ProductivityTrackerReportcomponent.prototype.TypeOther = function () {
        $("#chkall").prop("checked", false);
        $("#chkall").prop("disabled", true);
        $("#chkouttype").prop("disabled", false);
        //$("#chkall").prop("checked", false);
        //$('#chkall').prop('disabled', true);
        //$('#chklunch').prop('disabled', false);
        //$('#chkother').prop('disabled', false);
        //$('#chkmeeting').prop('disabled', false);
        //$('#chkofficial').prop('disabled', false);
        //$('#chkidle').prop('disabled', false);
    };
    ProductivityTrackerReportcomponent.prototype.ViewDetailed = function () {
        if ($("#raddetail").prop("checked", true)) {
            $('#radnoneview').empty();
            $('#radnameview').empty();
            $('#radtypeview').empty();
            $('#radDateview').empty();
            $('#viewDetails').hide();
        }
    };
    ProductivityTrackerReportcomponent.prototype.ViewConsolidated = function () {
        if ($("#radconsolidated").prop("checked", true)) {
            $('#viewDetails').show();
            $("#radnoneview").prop("checked", true);
        }
    };
    //-------------------- Change Event---------------------//
    ProductivityTrackerReportcomponent.prototype.AllEmployee = function (event) {
        var _this = this;
        if ($("#chkInActive").prop("checked", true)) {
            this._ProductivityTrackerReportService.FillAllEmployees(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, true)
                .subscribe(function (data) {
                _this.Employees = data;
                _this.InLoading = false;
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    //-------------------- Change Event---------------------//
    ProductivityTrackerReportcomponent.prototype.FillEmployee = function () {
        var _this = this;
        if (this.InActiveEmp == null) {
            this.InActiveEmp = true;
        }
        this.UserType = "admin";
        if (this.UserType.toLowerCase() == "gh" || this.UserType.toLowerCase() == "admin" || this.UserType.toLowerCase() == "hr" || this.UserType.toLowerCase() == "payroll") {
            this._ProductivityTrackerReportService.FillEmployee(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "allemp", this.InActiveEmp)
                .subscribe(function (data) {
                _this.Employees = data;
                _this.InLoading = false;
            }, function (error) {
                _this.msg = error;
            });
        }
        else if (this.UserType.toLowerCase() == "bh" || this.UserType.toLowerCase() == "dh") {
            this._ProductivityTrackerReportService.FillEmployee(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "self", true)
                .subscribe(function (data) {
                _this.Employees = data;
                _this.InLoading = false;
            }, function (error) {
                _this.msg = error;
            });
        }
        else if (this.UserType.toLowerCase() == "PMRole") {
            this._ProductivityTrackerReportService.FillEmployee(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "pmemp", true)
                .subscribe(function (data) {
                _this.Employees = data;
                _this.InLoading = false;
            }, function (error) {
                _this.msg = error;
            });
        }
        else {
            this._ProductivityTrackerReportService.FillEmployee(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "self", true)
                .subscribe(function (data) {
                _this.Employees = data;
                _this.InLoading = false;
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    ProductivityTrackerReportcomponent.prototype.FillLineManager = function () {
        var _this = this;
        this._ProductivityTrackerReportService.FillLineManager(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, true) // True Get From Employee_ModuleAccess -> ViewCompEvent value(In Old VIS Store in Session).
            .subscribe(function (data) {
            _this.LineManager = data;
            _this.InLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    ProductivityTrackerReportcomponent.prototype.FillDepartment = function () {
        var _this = this;
        this._ProductivityTrackerReportService.FillDepartment(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(function (data) {
            _this.Department = data;
            _this.InLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    ProductivityTrackerReportcomponent.prototype.FillOverall = function () {
        var _this = this;
        this._ProductivityTrackerReportService.FillOverall(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(function (data) {
            _this.Department = data;
            _this.InLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    ProductivityTrackerReportcomponent.prototype.FillLookup = function () {
        var _this = this;
        this._ProductivityTrackerReportService.FillLookup(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(function (data) {
            _this.Lookup = data;
            _this.InLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    ProductivityTrackerReportcomponent.prototype.FillYear = function () {
        var _this = this;
        this._ProductivityTrackerReportService.FillLookup(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(function (data) {
            _this.Lookup = data;
            _this.InLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    ProductivityTrackerReportcomponent.prototype.ToogleMyProfile = function () {
        $("#ProductivityTrackerReport").slideToggle(300);
    };
    ProductivityTrackerReportcomponent.prototype.CloseWidgetProfile = function () {
        $("#ProductivityTrackerReport").hide(300);
    };
    ProductivityTrackerReportcomponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.ProductivityTracker);
        this.pager = this.pagerService.pager;
        this.pagedItems = null;
        this.pagedItems = this.pagerService.pagedItems;
    };
    ProductivityTrackerReportcomponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    ProductivityTrackerReportcomponent.prototype.GetoutId = function () {
        this.OutIds = '';
        for (var i = 0; i < this.Lookup.length; i++) {
            this.OutIds += this.Lookup[i].Id + ',';
        }
        this.OutIds = this.OutIds.substring(1, this.OutIds.lastIndexOf(","));
    };
    ProductivityTrackerReportcomponent.prototype.validateDate = function () {
        if ($("#txtdatefrom").val() != '') {
            if ($("#txtdateto").val() != '') {
                if ($("txtdatefrom").val() > $("#txtdateto").val()) {
                    alert("Select Proper Dates");
                }
                else {
                    alert("Please select To dates");
                }
            }
        }
    };
    ProductivityTrackerReportcomponent.prototype.onSubmit = function (formData) {
        var _this = this;
        var str;
        var chk;
        if (formData.Employee > 0) {
            str = formData.Employee;
        }
        if ($("#raddetail").val() == 'Detailed') {
            this.Mode = "Detail";
        }
        else if ($("#radconsolidated").val() == 'Consolidated') {
            this.Mode = "consolidate";
        }
        if ($("#chkall").prop("checked", true)) {
            chk = "0";
        }
        else if ($("#chkouttype").prop("checked", true)) {
            chk = "1";
        }
        if (!this.validateDate()) {
            if ($("#radDate").prop("checked", true)) {
                this.GetoutId();
                this._ProductivityTrackerReportService.GetProductivity(global_1.Global.BASE_ProductivityTrackerAPI_ENDPOINT, formData.sort, formData.fromDate, formData.ToDate, str, this.Mode, this.OutIds, formData.Consolidatedview, chk)
                    .subscribe(function (data) {
                    _this.ProductivityTracker = data;
                    _this.JumpOnPage(1);
                    _this.InLoading = false;
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
    };
    ProductivityTrackerReportcomponent = __decorate([
        core_1.Component({
            providers: [ProductivityTrackerReport_service_1.ProductivityTrackerReportService],
            templateUrl: 'app/Components/Report/Attendance/ProductivityTrackerReport.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, pager_index_1.PagerService, ProductivityTrackerReport_service_1.ProductivityTrackerReportService])
    ], ProductivityTrackerReportcomponent);
    return ProductivityTrackerReportcomponent;
}());
exports.ProductivityTrackerReportcomponent = ProductivityTrackerReportcomponent;
