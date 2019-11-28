import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeFeedbackService } from '../../../Service/HumanResource/Attendance/EmployeeFeedback.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IEmployeeFeedback } from '../../../Model/HumanResource/Attendance/EmployeeFeedback';
import { IEmployee } from '../../../Model/HumanResource/Attendance/EmployeeFeedback';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';


@Component({
    providers: [EmployeeFeedbackService],
    templateUrl: 'app/Components/HumanResource/Attendance/EmployeeFeedback.component.html'
})

export class EmployeeFeedbackComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;

    EmployeeFeedbacks: IEmployeeFeedback[];
    EmployeeFeedback: IEmployeeFeedback;

    MyTeamFeedbacks: IEmployeeFeedback[];
    MyTeamFeedback: IEmployeeFeedback;
    employeelist: IEmployee[];

    msg: string;
    indLoading: boolean = false;
    EmployeeFeedbackFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    EmployeeFeedbackFilter: string;
    isDesc: boolean = false;
    column: any = '';
    direction: number;
    CurrentRecordsPerPage: number = 10;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    PagerInformation: string;
    Status: string;
    //Variables for Filter
    ShowHideSearch: boolean = false;
    ShowHideSearchNew: boolean = false;


    //second table
    searchRemarks: string;
    searchEmployeeName: string;
    searchSenderName: string;

    constructor(private fb: FormBuilder, private _EmployeeFeedbackService: EmployeeFeedbackService, private pagerService: PagerService)
    {
        
        this.Status = "MyFeedback"
     

    }

    ngOnInit(): void {
        this.EmployeeFeedbackFrm = this.fb.group({
            CompanyId: [''],
            Id:[''],
            mode: [''],
            UserID: [''],
            Remarks: [''],
            IsLike:[''],
            CreatedOn: [''],
            EmployeeName: [''],
            EmployeeId: [''],
            SenderName: [''],
            Employee_Name: [''],
            TeamEmployeeId:[''],
     

        });
        this.LoadEmployeeFeedbacks(21);

    



    }


   
    clearSearch() {
        this.EmployeeFeedbacks = null;
    }


    FilterByStatus(event) {
       
        if (event.target.value == "MyTeam") {

            $("#MyFeedback").hide();
            $("#MyTeam").show();
            $("#TeamMember").show();
            $("#MYPending").hide();
            this.clearSearch();
            this.LoadEmployeeteamWise(21);
            this.LoadEmployeeList(21);

        }
        else if (event.target.value == "Pending") {

            $("#MyFeedback").hide();
            $("#MyTeam").hide();
            $("#TeamMember").hide();
            $("#MYPending").show();
            this.clearSearch();
            this.LoadEmployeependingList(21);
        }
        else
        {
            $("#MyFeedback").show();
            $("#MyTeam").hide();
            $("#TeamMember").hide();
            $("#MYPending").hide();
            this.clearSearch();
            this.LoadEmployeeFeedbacks(21);
        }


    }

    LoadEmployeeList(UserId :number) {

        this.indLoading = true;
        this._EmployeeFeedbackService.getEmployeeList(Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(data => {
                this.employeelist = data

                this.indLoading = false;
            }

            );
    }


    EmployeeFeedbackFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.EmployeeFeedbackFilter = value;
    }


    EmployeeFeedbackSort(property: any) {
      
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }
    
 
    LoadEmployeeteamwisedata(event, UserId: number): void {
        debugger;
        this.indLoading = true;
        this._EmployeeFeedbackService.GetEmployeewiseSelect(Global.BASE_EmployeeFeedback_ENDPOINT, event.target.value, 21)
            .subscribe(EmployeeFeedbacks => {
                this.EmployeeFeedbacks = EmployeeFeedbacks;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.searchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
                    if (this.searchRemarks != '') {
                        this.searchRemarks = this.searchRemarks.toLocaleLowerCase();
                        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.searchRemarks) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                            x => x.EmployeeName != null && x.EmployeeName.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }

                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }


  

    LoadEmployeeFeedbacks(UserId: number): void {
        $("#MyFeedback").show();
        $("#MyTeam").hide();
        $("#TeamMember").hide();
        $("#MYPending").hide();
        this.indLoading = true;
        this._EmployeeFeedbackService.GetEmployeeFeedback(Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(EmployeeFeedbacks => {
                this.EmployeeFeedbacks = EmployeeFeedbacks;
          
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.searchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
                    if (this.searchRemarks != '') {
                        this.searchRemarks = this.searchRemarks.toLocaleLowerCase();
                        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.searchRemarks) != -1);
                    }
                }


                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    LoadEmployeeteamWise(UserId: number): void {
    
        this.indLoading = true;
        this._EmployeeFeedbackService.GetMyTeam(Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(EmployeeFeedbacks => {
                this.EmployeeFeedbacks = EmployeeFeedbacks;
          
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.searchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
                    if (this.searchRemarks != '') {
                        this.searchRemarks = this.searchRemarks.toLocaleLowerCase();
                        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.searchRemarks) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                            x => x.EmployeeName != null && x.EmployeeName.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }

                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    LoadEmployeependingList(UserId: number): void {
    
       
        this.indLoading = true;
        this._EmployeeFeedbackService.GetPendingListEmployee(Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(EmployeeFeedbacks => {
                this.EmployeeFeedbacks = EmployeeFeedbacks;

                //Logic for searching - start
                //if (this.ShowHideSearch) {
                //    this.searchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
                //    if (this.searchRemarks != '') {
                //        this.searchRemarks = this.searchRemarks.toLocaleLowerCase();
                //        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                //            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.searchRemarks) != -1);
                //    }
             
                //    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                //    if (this.searchEmployeeName != '') {
                //        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                //        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                //            x => x.EmployeeName != null && x.EmployeeName.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                //    }
                //    this.searchSenderName = (<HTMLInputElement>document.getElementById("searchSenderName")).value;
                //    if (this.searchSenderName != '') {
                //        this.searchSenderName = this.searchSenderName.toLocaleLowerCase();
                //        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
                //            x => x.SenderName != null && x.SenderName.toLocaleLowerCase().indexOf(this.searchSenderName) != -1);
                //    }

                //}

                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }
    addEmployeeFeedback() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New EmployeeFeedback";
        this.modalBtnTitle = "Add";
        this.EmployeeFeedbackFrm.reset();
        this.modal.open();

    }

    editEmployeeFeedback(Id: number) {
        debugger;
     
        var msg1 = "Are you sure you want to approve this feedback?";


        if (confirm(msg1) == true) {

            this.getupdateEmplyeeFedback(Id);
            this.LoadEmployeependingList(21);
            
        }

        else
        {
       
            this.LoadEmployeependingList(21);
        }
     //   this.getupdateEmplyeeFedback(id);
       
      

    }
    RejectEmployeeFeedback(Id: number) {
        debugger;

        var msg1 = "Are you sure you want to reject this feedback?";


        if (confirm(msg1) == true) {

            this.getrejectEmplyeeFedback(Id);
            this.indLoading = true;
            this.LoadEmployeependingList(21);
        }

        else {
            this.indLoading = true;
            this.LoadEmployeependingList(21);
        }
        //   this.getupdateEmplyeeFedback(id);



    }
    getrejectEmplyeeFedback(Id: number): void {
        debugger;
        this.indLoading = true;
        this._EmployeeFeedbackService.RejectFeedback(Global.BASE_EmployeeFeedback_ENDPOINT, Id, 21)
            .subscribe(EmployeeFeedbacks => {
                this.EmployeeFeedbacks = EmployeeFeedbacks;



                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    getupdateEmplyeeFedback(Id: number): void{
        debugger;
        this.indLoading = true;
        this._EmployeeFeedbackService.UpdateFeedback(Global.BASE_EmployeeFeedback_ENDPOINT, Id,21)
            .subscribe(EmployeeFeedbacks => {
                this.EmployeeFeedbacks = EmployeeFeedbacks;



                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }



    getApprovedFeedback(UserId: number): void {
        debugger;

        this.indLoading = true;
        this._EmployeeFeedbackService.GetPendingListEmployee(Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(EmployeeFeedbacks => {
                this.EmployeeFeedbacks = EmployeeFeedbacks;

             

                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }


    deleteEmployeeFeedback(id: number, status: boolean) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }


        this.EmployeeFeedbackFrm.setValue(this.EmployeeFeedback);
        this.modal.open();
    }





    SetControlsState(isEnable: boolean) {
        isEnable ? this.EmployeeFeedbackFrm.enable() : this.EmployeeFeedbackFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }


    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeFeedbacks);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }



    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }


  


    onSubmit(formData: any) {
   
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:

                this._EmployeeFeedbackService.post(Global.BASE_EmployeeFeedback_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;
                            this.LoadEmployeeFeedbacks(21);
                            this.modal.dismiss();
                        }
                        else {


                            alert(data);
                        }


                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                debugger;
                this._EmployeeFeedbackService.UpdateFeedback(Global.BASE_EmployeeFeedback_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;
                            this.LoadEmployeeFeedbacks(21);
                            this.modal.dismiss();
                        }
                        else {


                            alert(data);
                        }


                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:

                this._EmployeeFeedbackService.delete(Global.BASE_EmployeeFeedback_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;
                            this.LoadEmployeeFeedbacks(21);
                            this.modal.dismiss();
                        }
                        else {


                            alert(data);
                        }
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }
}