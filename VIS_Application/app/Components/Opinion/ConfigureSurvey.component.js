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
var http_1 = require("@angular/http");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var ConfigureSurvey_service_1 = require("../../Service/Opinion/ConfigureSurvey.service");
var ConfigureSurveycomponent = (function () {
    function ConfigureSurveycomponent(fb, _ConfigureSurveyService, pagerService, http) {
        this.fb = fb;
        this._ConfigureSurveyService = _ConfigureSurveyService;
        this.pagerService = pagerService;
        this.http = http;
        this.indLoading = false;
        this.CurrentRecordsPerPage = 10;
        this.pager = {};
        this.ServeyType = "Approved";
    }
    ConfigureSurveycomponent.prototype.ngOnInit = function () {
        $("#QueBased").prop("checked", true);
        $("#csdesign").prop("checked", true);
        $("#chkactive").prop("checked", true);
        $("#imgshow").hide();
        $("#imgshow1").hide();
        $("#video").hide();
        this.GetRollOfEmployee();
        this.BindServey("ALL", '');
        this.BindSurveyType();
        this.BindUsersForOwnerSelection();
    };
    ConfigureSurveycomponent.prototype.HideImgChecked = function () {
        if ($("#chkimage").prop("checked", true)) {
            $("#chkaudio").prop("checked", false);
            $("#chkvideo").prop("checked", false);
            $("#imgshow").show();
            $("#imgshow1").show();
            $("#video").hide();
        }
    };
    ConfigureSurveycomponent.prototype.HideAudioChecked = function () {
        if ($("#chkaudio").prop("checked", true)) {
            $("#chkimage").prop("checked", false);
            $("#chkvideo").prop("checked", false);
            $("#imgshow").show();
            $("#imgshow1").show();
            $("#video").hide();
        }
    };
    ConfigureSurveycomponent.prototype.HideVideoChecked = function () {
        if ($("#chkvideo").prop("checked", true)) {
            $("#chkimage").prop("checked", false);
            $("#chkaudio").prop("checked", false);
            $("#video").show();
            $("#imgshow").show();
            $("#imgshow1").show();
        }
    };
    ConfigureSurveycomponent.prototype.HideMstQueChecked = function () {
        if ($("#chkIsMasterQue").prop("checked", true)) {
            $("#hideMasterquestion").hide();
        }
    };
    ConfigureSurveycomponent.prototype.BindSurveyType = function () {
        var _this = this;
        this._ConfigureSurveyService.BindSurveyType(global_1.Global.BASE_ConfigureSurveyAPI_ENDPOINT)
            .subscribe(function (data) {
            _this.SurveyType = data;
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    ConfigureSurveycomponent.prototype.BindUsersForOwnerSelection = function () {
        var _this = this;
        this._ConfigureSurveyService.BindUsersForOwnerSelection(global_1.Global.BASE_ConfigureSurveyAPI_ENDPOINT, 21)
            .subscribe(function (data) {
            _this.UsersOwnerSelected = data;
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    //--- Change Event Start ---//
    ConfigureSurveycomponent.prototype.changeText = function (event) {
        debugger;
        var survey = event.target.value;
        if (survey.length > 0) {
            var FilterType = $("#ddlSurveyType option:selected").text();
            if (FilterType === 'Survey') {
                this.ComplitionText = "Thank you for submitting the Survey.\nYou can close the window now.";
                this.Footer = "In order to progress through this Survey/Exam, please use the following navigation buttons:" +
                    "Click the Next button to continue to the next page." + "Click the Previous button to return to the previous page." +
                    "Click the Finish button to complete your Survey/ Exam.";
            }
            else if (FilterType === 'Exam') {
                this.ComplitionText = "Thank you for submitting the Exam.\nYou can close the window now.";
                this.Footer = "In order to progress through this Exam, please use the following navigation buttons:" +
                    "Click the Next button to continue to the next page.Click the Previous button to return to the previous page." +
                    "Click the Finish button to complete your Exam.";
            }
        }
    };
    ConfigureSurveycomponent.prototype.DisplayPollData = function (event) {
        if ($("#ddlSurveyType option:selected").text() == "Poll") {
            $("#chkSaveasTemplate").hide();
            $("#chkReview").hide();
            $("#chkTimeBased").hide();
            $("#rdbCustomDesign").prop("disabled", true);
            $("#rdbNonRandom").prop("disabled", true);
            $("#rdbRandom").prop("disabled", true);
            $("#rdbNonRandom").prop('checked', true);
            $("#PageSetting").hide();
            $("#divTotalQue").hide();
            $("#trCompletionText").hide();
            $("#trHeaderFooter").hide();
            $("#txtQuePerPage").prop("disabled", true);
            $("#txtQuePerPage").val('1');
            $("#trSaveAsTemplate").hide();
            $("#trTimeBased").hide();
            $("#trTotalPoints").hide();
            $("#trImport").hide();
            $("#trRevoting").show();
            if ($("#hdnSurveyId").val() == 0 || $("#hdnSurveyId").val() == " ") {
                $("#rdbNoPoints").prop("checked", true);
            }
            $("#trReportVisibility").show();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
        }
        else {
            $("#chkSaveasTemplate").show();
            $("#chkAllowReview").show();
            $("#chkTimeBased").show();
            $("#chkAllowToFillAgain").show();
            $("#rdbCustomDesign").prop("disabled", false);
            $("#rdbNonRandom").prop("disabled", false);
            $("#rdbRandom").prop("disabled", false);
            $("#divTotalQue").hide();
            $("#trCompletionText").show();
            $("#trHeaderFooter").show();
            $("#txtQuePerPage").prop("disabled", false);
            $("#trSaveAsTemplate").show();
            $("#trTimeBased").show();
            $("#trTotalPoints").hide();
            if ($("#rdbQuestionBased").prop('checked') == true || $("#rdbAnswerBased").prop('checked') == true) {
                $("#trTotalPoints").show();
            }
            $("#trImport").show();
            $("#trRevoting").hide();
            $("#trReportVisibility").hide();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
        }
    };
    ConfigureSurveycomponent.prototype.CheckSurveyType = function (event) {
        if ($("#ddlSurveyType option:selected").text() == "Survey") {
            $("#chkIsProject").show();
            this.CheckProject();
        }
        else {
            $("#chkIsProject").hide();
            this.CheckProject();
        }
    };
    ConfigureSurveycomponent.prototype.ShowNoPointSystem = function (event) {
        if ($("#ddlSurveyType option:selected").text() == "Survey") {
            $("#rdbNoPoints").show();
            $("#trImport").show();
            if ($("#hdnSurveyId").val() == "0" || $("#hdnSurveyId").val() == " ") {
                $("#rdbNoPoints").prop("checked", true);
            }
            $("#trRevoting").hide();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
            if ($("#rdbQuestionBased").prop('checked') == true || $("#rdbAnswerBased").prop('checked') == true) {
                $("#trTotalPoints").show();
            }
            else {
                $("#trTotalPoints").hide();
            }
        }
        else if ($("#ddlSurveyType option:selected").text() == "Exam") {
            $("#rdbNoPoints").hide();
            $("#trImport").show();
            if ($("#hdnSurveyId").val() == "0" || $("#hdnSurveyId").val() == " ") {
                $("#rdbQuestionBased").prop("checked", true);
            }
            $("#trRevoting").hide();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
            $("#trTotalPoints").show();
        }
        else if ($("#ddlSurveyType option:selected").text() == "Poll") {
            $("#rdbNoPoints").show();
            $("#trImport").hide();
            if ($("#hdnSurveyId").val() == "0" || $("#hdnSurveyId").val() == " ") {
                $("#rdbNoPoints").prop('checked', true);
            }
            $("#trRevoting").show();
            $("#trReportVisibility").show();
            $("#trIsMasterQue").hide();
            $("#trParentQue").hide();
        }
    };
    ConfigureSurveycomponent.prototype.ShowAllowToFill = function (event) {
        if ($("#ddlSurveyType option:selected").text() == "Survey") {
            $("#chkAllowToFillAgain").hide();
            $("#AllowToFill").hide();
        }
        else if ($("#ddlSurveyType option:selected").text() == "Exam") {
            $("#chkAllowToFillAgain").show();
            $("#AllowToFill").hide();
        }
    };
    ConfigureSurveycomponent.prototype.CheckDisableTabs = function (event) {
        if ($("#hdnMode").val() == "configure") {
            if ($("#ddlSurveyType option:selected").text() != "Exam" && $("#rdbNoRecurrence").prop('checked') == true) {
                $("#s2").prop("disabled", true);
                $("#s4").prop("disabled", true);
            }
            else if ($("#ddlSurveyType option:selected").text() != "Exam" && $("#rdbRecurrence").prop('checked') == true) {
                $("#s2").prop("disabled", true);
            }
            else if ($("#rdbNoRecurrence").prop('checked') == true) {
                $("#s4").prop("disabled", true);
            }
            else if ($("#rdbRecurrence").prop('checked') == true) {
                $("#s4").prop("disabled", true);
            }
            if ($("#hdnEdit").val() == "1") {
                $("#s1").prop("disabled", true);
                $("#s2").prop("disabled", true);
                $("#s4").prop("disabled", true);
                this.DisableStep1Control();
            }
            //if (jQuery('[id$=hdnIsPublishAllow]').val() == "0")
            //{
            //    jQuery("#SurveyTabs").tabs("disable", 3);
            //    jQuery("#SurveyTabs").tabs("disable", 4);
            //}
        }
        //else if (jQuery('[id$=hdnMode]').val() == "suggestion" || jQuery('[id$=hdnMode]').val() == "template") {
        //    if (jQuery('[id$=ddlSurveyType] option:selected').text() == "Exam") {
        //        jQuery("#SurveyTabs").tabs("option", "disabled", [3, 4]);
        //    }
        //    else {
        //        jQuery("#SurveyTabs").tabs("option", "disabled", [2, 3, 4]);
        //    }
        //}
    };
    ConfigureSurveycomponent.prototype.CheckProject = function () {
        if ($("#chkIsProject").prop('checked') == true && $("#ddlSurveyType option:selected").text() == "Survey") {
            $("#Project").show();
        }
        else {
            $("#Project").hide();
        }
    };
    ConfigureSurveycomponent.prototype.DisableStep1Control = function () {
        $("#ddlSurveyType").prop("disabled", true);
        $("#chkIsProject").prop("disabled", true);
        $("#ddlProject").prop("disabled", true);
        $("#txtName").prop("disabled", true);
        $("#txtDesc").prop("disabled", true);
        $("#chkSaveasTemp").prop("disabled", true);
        $("#chkAllowReview").prop("disabled", true);
        $("#chkTimeBase").prop("disabled", true);
        $("#txtTime").prop("disabled", true);
        $("#chkAllowToFillAgain").prop("disabled", true);
        $("#txtAllowToFillAgain").prop("disabled", true);
        $("#rdbQuestionBased").prop("disabled", true);
        $("#rdbAnswerBased").prop("disabled", true);
        $("#rdbNoPoints").prop("disabled", true);
        $("#txtTotalPoints").prop("disabled", true);
        $("#txtMinimumPoints").prop("disabled", true);
        $("#rdbCustomDesign").prop("disabled", true);
        $("#rdbNonRandom").prop("disabled", true);
        $("#rdbRandom").prop("disabled", true);
        $("#txtQuePerPage").prop("disabled", true);
        $("#txtTotalQue").prop("disabled", true);
        $("#rdbIsShowReport").prop("disabled", true);
        $("#rdbAutoPublish").prop("disabled", true);
        $("#rdbIsDontShow").prop("disabled", true);
        $("#chkIsRevoting").prop("disabled", true);
        $("#chkMandatory").prop("disabled", true);
        $("#chkActive").prop("disabled", true);
        $("#txtcompletion").prop("disabled", true);
        $("#ckedit123").prop("disabled", true);
        $("#ckeditfooter").prop("disabled", true);
        $("#fuImportQuestion").prop("disabled", true);
        $("#imgbtnDownLoadSample").prop("disabled", true);
    };
    //--- Change Event End ---//
    ConfigureSurveycomponent.prototype.AddNewSurvey = function () {
        this.modal.open();
    };
    ConfigureSurveycomponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.ConfigureSurveyFrm.enable() : this.ConfigureSurveyFrm.disable();
    };
    ConfigureSurveycomponent.prototype.GetRollOfEmployee = function () {
        var _this = this;
        this._ConfigureSurveyService.GetRollOfEmployee(global_1.Global.BASE_ConfigureSurveyAPI_ENDPOINT, 21, "Admin")
            .subscribe(function (data) {
            _this.IsAdmin = data;
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
        return this.IsAdmin;
    };
    ConfigureSurveycomponent.prototype.GetRollOfEmployees = function (EmployeeId, RoleType) {
        var _this = this;
        this._ConfigureSurveyService.GetRollOfEmployee(global_1.Global.BASE_ConfigureSurveyAPI_ENDPOINT, 21, "Admin")
            .subscribe(function (success) {
            _this.IsAdmin = success;
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    ConfigureSurveycomponent.prototype.GetApprovetype = function (event) {
        this.Approvetype = event.target.value;
    };
    ConfigureSurveycomponent.prototype.BindServey = function (SearchField, searchValue) {
        var _this = this;
        if (this.IsAdmin == true) {
            this.RoleType = "Admin";
        }
        if (this.IsAdmin == true) {
            $("#rdbSuggested").show();
            $("#lblSuggestedCount").show();
        }
        if ($("#tdAddButtons1").show()) {
            this.AddButton = true;
        }
        if (this.AddButton == this.IsAdmin || this.GetRollOfEmployees(21, "LM") || this.GetRollOfEmployees(21, "BM") || this.GetRollOfEmployees(21, "BH") || this.GetRollOfEmployees(21, "SH") || this.GetRollOfEmployees(21, "GH")) {
        }
        else {
            this.Approvetype = $("#ApprovedTypedata").val();
            this._ConfigureSurveyService.GetSurveyDetails(global_1.Global.BASE_ConfigureSurveyAPI_ENDPOINT, SearchField, searchValue, 21, this.RoleType, this.ServeyType, this.Approvetype)
                .subscribe(function (data) {
                _this.SurveyDetails = data;
                _this.indLoading = false;
                _this.JumpOnPage(1);
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    ConfigureSurveycomponent.prototype.ToogleMyProfile = function () {
        $("#CofigureSurveyData").slideToggle(300);
    };
    ConfigureSurveycomponent.prototype.CloseWidgetProfile = function () {
        $("#CofigureSurveyData").hide(300);
    };
    ConfigureSurveycomponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.SurveyDetails);
        this.pager = this.pagerService.pager;
        this.pagedItems = null;
        this.pagedItems = this.pagerService.pagedItems;
    };
    ConfigureSurveycomponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ConfigureSurveycomponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('Header'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ConfigureSurveycomponent.prototype, "Header", void 0);
    ConfigureSurveycomponent = __decorate([
        core_1.Component({
            providers: [ConfigureSurvey_service_1.ConfigureSurveyService],
            templateUrl: 'app/Components/Opinion/ConfigureSurvey.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ConfigureSurvey_service_1.ConfigureSurveyService, pager_index_1.PagerService, http_1.Http])
    ], ConfigureSurveycomponent);
    return ConfigureSurveycomponent;
}());
exports.ConfigureSurveycomponent = ConfigureSurveycomponent;
