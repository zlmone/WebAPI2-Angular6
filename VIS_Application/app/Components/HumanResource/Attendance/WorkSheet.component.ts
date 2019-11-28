import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkSheetService } from '../../../Service/HumanResource/Attendance/WorkSheet.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IWorkSheet } from '../../../Model/HumanResource/Attendance/WorkSheet';
import { IProject } from '../../../Model/HumanResource/Attendance/WorkSheet';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';
import { Ng2TabModule } from 'ng2-tab';


@Component({
    providers: [WorkSheetService],
    templateUrl: 'app/Components/HumanResource/Attendance/WorkSheet.component.html'
})


export class WorkSheetComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    WorkSheets: IWorkSheet[];
    WorkSheet: IWorkSheet;
    Date: IWorkSheet[];
    DefaulConfigure: IWorkSheet[];
    ProjectList: IProject[];
    ChildDropDown: IProject[];


    ViewEducation: IWorkSheet[];
    msg: string;
    indLoading: boolean = false;
    WorkSheetFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    isDesc: boolean = false;
    direction: number;
    CurrentRecordsPerPage: number = 10;

    tempUserId : number = 158;
    tempDate: string = '20150525';

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //other declartion
    objValue1: string;
    objValue2: string;
    objValue3: string;
    objValue4: string;


    toStr = JSON.stringify;
    constructor(private fb: FormBuilder, private _WorkSheetService: WorkSheetService, public http: Http, private router: Router, private pagerService: PagerService) {
        
    }

    ngOnInit(): void {
        debugger;
        this.WorkSheetFrm = this.fb.group({

            ActivityId: [''],
            ActivityName: [''],
            SubActivityId: [''],
            SubActivityName: [''],
            Date: [''],
            UserId: [''],
            ProjectID: [''],
            ProjectName: [''],
            TaskId: [''],
            Description: [''],
            Hours: [''],
            FillDate: [''],
            WorkSheetID: [''],
        });

        //this.WorkSheet =
        //    ({
        //        ActivityId:0,
        //        ActivityName: '',
        //        SubActivityId:0,
        //        SubActivityName: '',
        //        Date: '',
        //        UserId: 0,
        //        ProjectID:0,
        //        ProjectName: '',
        //        TaskId: 0,
        //        Description: '',
        //        Hours: '',
        //        FillDate: '',
        //        WorkSheetID: 0,
        //        TaskName:''

        //    });

        this.LoadDeafultConfigure();
        this.LoadDate();
        this.LoadProjectList(this.tempUserId, this.tempDate);


    }
    OpenSave() {
        this.SetControlsState(true);
        this.modalTitle = "Task List For Date ()";
        this.modalBtnTitle = "Save";
        this.modal.open();
    }
    SetControlsState(isEnable: boolean) {
        isEnable ? this.WorkSheetFrm.enable() : this.WorkSheetFrm.disable();
    }
    GetDate(event) {
        debugger;
        this.objValue1 = event.target.Date;



    }


    ToogleMyProfile() {
        $("#myprofiledata").slideToggle(300);
    }

    CloseWidgetProfile() {
        $("#adminProfile").hide(300);
    }



    createRange(number) {

        var items: number[] = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }



    LoadDeafultConfigure() {

        this.indLoading = true;
        this._WorkSheetService.GetDropDownList(Global.BASE_WorkSheet_ENDPOINT)
            .subscribe(data => {
                this.DefaulConfigure = data
                this.indLoading = false;

            }

            );
    }

     
    LoadProjectList(UserId: number, Date: string): void {
        debugger;
        this.indLoading = true;
        this._WorkSheetService.GetProjectList(Global.BASE_WorkSheet_ENDPOINT, UserId, Date)
            .subscribe(data => {
                this.ProjectList = data
                console.log(data);
                this.indLoading = false;
            }

            );
    }


    LoadChildTaskDroDown(event, UserId: number, Date: string): void {
        debugger;

        if (event == 0) {

            $("#taskid").prop("disabled", true);
        }
        else {

            $("#taskid").prop("disabled", false);
        }


        this.indLoading = true;
        this._WorkSheetService.GetChildTaskDropdown(Global.BASE_WorkSheet_ENDPOINT, event.target.value, this.tempUserId, this.tempDate)

            .subscribe(data => {
                this.ChildDropDown = data

                this.indLoading = false;
            }

            );

    }
    LoadDate() {
        debugger;

        this.indLoading = true;
        this._WorkSheetService.GetDate(Global.BASE_WorkSheet_ENDPOINT)
            .subscribe(data => {
                this.Date = data
                this.indLoading = false;
                this.printValues()


            }

            );
    }

    printValues(): void {

        console.log('objValue1', this.Date[0]);
        console.log('objValue2', this.Date[1]);
        console.log('objValue3', this.Date[2]);
        console.log('objValue4', this.Date[3]);
    }

    onSubmit(formData: any) {
        debugger;

        console.log(formData);

        this._WorkSheetService.Savepost(Global.BASE_WorkSheet_ENDPOINT, formData._value).subscribe(
            data => {
                if (data == "Success") {
                    this.msg = "Worksheet Save successfully.";
                }
                else {
                    this.msg = "Worksheet has occurred while modifying existing Ticket Configuration!"
                }

            },
            error => {
                this.msg = error;
            }
        );



        //this._WorkSheetService.Savepost(Global.BASE_WorkSheet_ENDPOINT, formData._value).subscribe(
        //    data => {
        //        if (data == "Success") {
        //            this.msg = "Worksheet Save successfully.";
        //        }
        //        else {
        //            this.msg = "Worksheet has occurred while modifying existing Ticket Configuration!"
        //        }

        //    },
        //    error => {
        //        this.msg = error;
        //    }
        //);
        // this.No++;
        ///}



    }
}