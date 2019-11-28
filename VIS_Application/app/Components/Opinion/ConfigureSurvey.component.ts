import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
import { PagerService } from '../../Shared/pager.index';
import { DBOperation } from '../../Shared/enum';
import { Ng2TabModule } from 'ng2-tab';
import { ConfigureSurveyService } from '../../Service/Opinion/ConfigureSurvey.service';
import { IUserRoleById, IUserType, IAllSurveyDetails, ISurveyType, IUserForOwnerSelection } from '../../../app/Model/Opinion/ConfigureSurvey';

@Component({
    providers: [ConfigureSurveyService],
    templateUrl: 'app/Components/Opinion/ConfigureSurvey.component.html'
})

export class ConfigureSurveycomponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('Header') Header: ModalComponent;
    msg: string;
    indLoading: boolean = false;
    CurrentRecordsPerPage: number = 10;
    pager: any = {};
    pagedItems: any[];
    PagerInformation: string;
    dbops: DBOperation;
    ConfigureSurveyFrm: FormGroup;
    UserRole: IUserRoleById;
    UserType: IUserType[];
    SurveyDetails: IAllSurveyDetails[];
    SurveyType: ISurveyType[];
    UsersOwnerSelected:IUserForOwnerSelection[];
    IsAdmin: boolean;
    RoleType: string;
    AddButton: boolean;
    ServeyType: string = "Approved";
    Approvetype: string;
    ComplitionText: string;
    Footer: string;

    constructor(private fb: FormBuilder, private _ConfigureSurveyService: ConfigureSurveyService, private pagerService: PagerService, private http: Http) { }

    ngOnInit(): void
    {
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
        
    }
    HideImgChecked()
    {
        if ($("#chkimage").prop("checked", true))
        {
            $("#chkaudio").prop("checked", false);
            $("#chkvideo").prop("checked", false);
            $("#imgshow").show();
            $("#imgshow1").show();
            $("#video").hide();
        }
    }
    HideAudioChecked()
    {
        if ($("#chkaudio").prop("checked", true))
        {
            $("#chkimage").prop("checked", false);
            $("#chkvideo").prop("checked", false);
            $("#imgshow").show();
            $("#imgshow1").show();
            $("#video").hide();
        }
        
    }
    HideVideoChecked()
    {
        if ($("#chkvideo").prop("checked", true))
        {
            $("#chkimage").prop("checked", false);
            $("#chkaudio").prop("checked", false);
            $("#video").show();
            $("#imgshow").show();
            $("#imgshow1").show();
        }
    }
    HideMstQueChecked()
    {
        if ($("#chkIsMasterQue").prop("checked", true))
        {
            $("#hideMasterquestion").hide();
        }
    }

    BindSurveyType():void
    {
        this._ConfigureSurveyService.BindSurveyType(Global.BASE_ConfigureSurveyAPI_ENDPOINT)
            .subscribe(data =>
            {
                this.SurveyType = data;
                this.indLoading = false;
            },
            error =>
            {
                this.msg=error;
            });
    }
    BindUsersForOwnerSelection(): void
    {
        this._ConfigureSurveyService.BindUsersForOwnerSelection(Global.BASE_ConfigureSurveyAPI_ENDPOINT,21)
            .subscribe(data =>
            {
                this.UsersOwnerSelected = data;
                this.indLoading = false;
            },
            error =>
            {
                this.msg = error;
            });
    }

    //--- Change Event Start ---//
    changeText(event):void
    {
        debugger;
        var survey = event.target.value;
        if (survey.length > 0)
        {
            var FilterType = $("#ddlSurveyType option:selected").text();
            if (FilterType === 'Survey')
            {
                this.ComplitionText = "Thank you for submitting the Survey.\nYou can close the window now.";
                this.Footer = "In order to progress through this Survey/Exam, please use the following navigation buttons:" +
                    "Click the Next button to continue to the next page." + "Click the Previous button to return to the previous page." +
                    "Click the Finish button to complete your Survey/ Exam.";
            }
            else if (FilterType === 'Exam')
            {
                this.ComplitionText = "Thank you for submitting the Exam.\nYou can close the window now.";
                this.Footer = "In order to progress through this Exam, please use the following navigation buttons:" +
                    "Click the Next button to continue to the next page.Click the Previous button to return to the previous page." +
                    "Click the Finish button to complete your Exam.";
            }
        }
    }
    DisplayPollData(event): void
    {
        if ($("#ddlSurveyType option:selected").text() == "Poll")
        {
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
            if ($("#hdnSurveyId").val() == 0 || $("#hdnSurveyId").val() == " ")
            {
                $("#rdbNoPoints").prop("checked", true);
            }
            $("#trReportVisibility").show();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
        }
        else
        {
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
            if ($("#rdbQuestionBased").prop('checked') == true || $("#rdbAnswerBased").prop('checked') == true)
            {
                $("#trTotalPoints").show();
            }
            $("#trImport").show();
            $("#trRevoting").hide();
            $("#trReportVisibility").hide();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
        }
    }
    CheckSurveyType(event): void
    {
        if ($("#ddlSurveyType option:selected").text() == "Survey")
        {
            $("#chkIsProject").show();
            this.CheckProject();
        }
        else
        {
            $("#chkIsProject").hide();
            this.CheckProject();
        }
    }
    ShowNoPointSystem(event): void
    {
        if ($("#ddlSurveyType option:selected").text() == "Survey")
        {
            $("#rdbNoPoints").show();
            $("#trImport").show();
            if ($("#hdnSurveyId").val() == "0" || $("#hdnSurveyId").val() == " ")
            {
                $("#rdbNoPoints").prop("checked", true);
            }
            $("#trRevoting").hide();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
            if ($("#rdbQuestionBased").prop('checked') == true || $("#rdbAnswerBased").prop('checked') == true)
            {
                $("#trTotalPoints").show();
            }
            else
            {
                $("#trTotalPoints").hide();
            }
        }
        else if ($("#ddlSurveyType option:selected").text() == "Exam")
        {
            $("#rdbNoPoints").hide();
            $("#trImport").show();
            if ($("#hdnSurveyId").val() == "0" || $("#hdnSurveyId").val() == " ")
            {
                $("#rdbQuestionBased").prop("checked", true);
            }
            $("#trRevoting").hide();
            $("#trIsMasterQue").show();
            $("#trParentQue").show();
            $("#trTotalPoints").show();
        }
        else if ($("#ddlSurveyType option:selected").text() == "Poll")
        {
            $("#rdbNoPoints").show();
            $("#trImport").hide();
            if ($("#hdnSurveyId").val() == "0" || $("#hdnSurveyId").val() == " ")
            {
                $("#rdbNoPoints").prop('checked', true);
            }
            $("#trRevoting").show();
            $("#trReportVisibility").show();
            $("#trIsMasterQue").hide();
            $("#trParentQue").hide();
        }
    }
    ShowAllowToFill(event): void
    {
        if ($("#ddlSurveyType option:selected").text() == "Survey")
        {
            $("#chkAllowToFillAgain").hide();
            $("#AllowToFill").hide();
        }
        else if ($("#ddlSurveyType option:selected").text() == "Exam")
        {
            $("#chkAllowToFillAgain").show();
            $("#AllowToFill").hide();
        }
    }
    CheckDisableTabs(event): void
    {
        if ($("#hdnMode").val() == "configure")
        {
            if ($("#ddlSurveyType option:selected").text() != "Exam" && $("#rdbNoRecurrence").prop('checked') == true)
            {
                $("#s2").prop("disabled", true);
                $("#s4").prop("disabled", true);
            }
            else if ($("#ddlSurveyType option:selected").text() != "Exam" && $("#rdbRecurrence").prop('checked') == true)
            {
                $("#s2").prop("disabled", true);
            }
            else if ($("#rdbNoRecurrence").prop('checked') == true)
            {
                $("#s4").prop("disabled", true);
            }
            else if ($("#rdbRecurrence").prop('checked') == true)
            {
                $("#s4").prop("disabled", true);
            }

            if ($("#hdnEdit").val() == "1")
            {
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
    }
    CheckProject()
    {
        if ($("#chkIsProject").prop('checked') == true && $("#ddlSurveyType option:selected").text() == "Survey")
        {
            $("#Project").show();
        }
        else
        {
            $("#Project").hide();
        }
    }
    DisableStep1Control()
    {
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

    }
    //--- Change Event End ---//
    AddNewSurvey():void
    {
        this.modal.open();
    }
    
    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.ConfigureSurveyFrm.enable() : this.ConfigureSurveyFrm.disable();
    }
    GetRollOfEmployee(): boolean
    {
        this._ConfigureSurveyService.GetRollOfEmployee(Global.BASE_ConfigureSurveyAPI_ENDPOINT,21,"Admin")
            .subscribe(data =>
            {
                this.IsAdmin = data;
                this.indLoading = false;
            },
            error =>
            {
                this.msg = error;
            });
        return this.IsAdmin;
    }
    GetRollOfEmployees(EmployeeId: number, RoleType: string): void
    {
        this._ConfigureSurveyService.GetRollOfEmployee(Global.BASE_ConfigureSurveyAPI_ENDPOINT, 21, "Admin")
            .subscribe(success =>
            {
                this.IsAdmin = success;
                this.indLoading = false;
            },
            error =>
            {
                this.msg = error;
            });
    }
    GetApprovetype(event): void
    {
        this.Approvetype = event.target.value;
    }
    BindServey(SearchField: string, searchValue: string): void
    {
        if (this.IsAdmin == true)
        {
            this.RoleType = "Admin";
        }
        if (this.IsAdmin == true)
        {
            $("#rdbSuggested").show();
            $("#lblSuggestedCount").show();
        }
        if ($("#tdAddButtons1").show())
        {
            this.AddButton = true;
        }
        if (this.AddButton == this.IsAdmin || this.GetRollOfEmployees(21, "LM") || this.GetRollOfEmployees(21, "BM") || this.GetRollOfEmployees(21, "BH") || this.GetRollOfEmployees(21, "SH") || this.GetRollOfEmployees(21, "GH"))
        {
            
        }
        else
        {
            this.Approvetype = $("#ApprovedTypedata").val();
            this._ConfigureSurveyService.GetSurveyDetails(Global.BASE_ConfigureSurveyAPI_ENDPOINT, SearchField, searchValue, 21, this.RoleType, this.ServeyType, this.Approvetype)
                .subscribe(data =>
                {
                    this.SurveyDetails = data;
                    this.indLoading = false;
                    this.JumpOnPage(1);
                }
                ,error =>
                {
                    this.msg = error;
                });
        }
    }
    ToogleMyProfile()
    {
        $("#CofigureSurveyData").slideToggle(300);
    }
    CloseWidgetProfile()
    {
        $("#CofigureSurveyData").hide(300);
    }
    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.SurveyDetails);
        this.pager = this.pagerService.pager;
        this.pagedItems = null;
        this.pagedItems = this.pagerService.pagedItems;
    }
    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }
}
