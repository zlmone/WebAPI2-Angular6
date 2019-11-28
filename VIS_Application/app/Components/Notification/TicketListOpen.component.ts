
import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketListOpenService } from '../../service/Notification/TicketListOpen.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ITicketListOpen } from '../../Model/Notification/TicketListOpen';
import { IOraganization } from '../../Model/Notification/Organization';
import { FileDropDirective, FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../Shared/pager.index';
import { DatePipe } from '@angular/common';



@Component({
    providers: [TicketListOpenService],
    templateUrl: 'app/Components/Notification/TicketListOpen.component.html'
})

export class TicketListOpenComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modal1') modal1: ModalComponent;

    TicketListOpens: ITicketListOpen[];
    TicketListOpen: ITicketListOpen;
    ViewHistory: ITicketListOpen[];
    GetDetail: ITicketListOpen[];
    GetDetails: ITicketListOpen;
    OpenTicketCount: number;
    UnderReviewTicketCount: number;
    ResolvedTicketCount: number;
    SuspendedTicketCount: number;

    msg: string;
    indLoading: boolean = false;
    TicketListOpenFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    TicketListOpenFilter: string;
    isDesc: boolean = false;
    column: any = 'Subject';
    direction: number;
    CurrentRecordsPerPage: number = 10;

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchSubject: string;
    strSearchMessage: string;
    strSearchAddressToGroup: string;
    strSearchAssignTo: string;
    strSearchPriority: string;
    strSearchUpdatebyName: string;
    strSearchStatus: string;
    Count: number;


    constructor(private fb: FormBuilder, private _TicketListOpenService: TicketListOpenService, private pagerService: PagerService) { }


    ngOnInit(): void {

        this.TicketListOpenFrm = this.fb.group({
            CompanyId: [''],
            Id: 0,
            Subject: [''],
            Message: [''],
            Remarks: [''],
            AddressToGroup: [''],
            AssignTo: [''],
            CreatedByName: [''],
            UpdatedByName: [''],
            Priority: [''],
            Status: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            Mode:[''],
          
            HelpTicketId: [''],
            FileName: [''],
            UserType: [''],
            RoleType: [''],
            EntityMessage: ['']
        });
     
     
        this.LoadGetTicketDetailUser(21);


    }

    TicketListOpenFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.TicketListOpenFilter = value;
    }


    TicketListOpenSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

    loadcount() {

        this.OpenTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "open").length;
        this.UnderReviewTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "underReview").length;
        this.SuspendedTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "suspended").length;
        this.ResolvedTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "resolved").length;
        
    }


    FilterByStatus(event) {
    
        if (event.target.value == 'TicketAddressedToMe') {

            this.LoadGetTicketDetailUser(21);

        }
        else if (event.target.value == 'AllTicket') {

            this.LoadGetTicketDetailAdminAllTicket();
        }
     

    }

    LoadGetTicketDetailUser(UserId: number): void {
    
        
        this.indLoading = true;
        this._TicketListOpenService.getTicketuser(Global.BASE_MyTicketListOpen_ENDPOINT, UserId)
            .subscribe(data => {
               // console.log(data)
                this.TicketListOpens = data;
                
                 //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchSubject = (<HTMLInputElement>document.getElementById("searchSubject")).value;

                    if (this.strSearchSubject != '') {
                        this.strSearchSubject = this.strSearchSubject.toLocaleLowerCase();
                        this.TicketListOpens = this.TicketListOpens.filter(
                            x => x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(this.strSearchSubject) != -1);
                    }
                }



                if (this.ShowHideSearch) {
                    this.strSearchAddressToGroup = (<HTMLInputElement>document.getElementById("searchAddressToGroup")).value;

                    if (this.strSearchAddressToGroup != '') {
                        this.strSearchAddressToGroup = this.strSearchAddressToGroup.toLocaleLowerCase();
                        this.TicketListOpens = this.TicketListOpens.filter(
                            x => x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(this.strSearchAddressToGroup) != -1);
                    }
                }




                if (this.ShowHideSearch) {
                    this.strSearchAssignTo = (<HTMLInputElement>document.getElementById("searchAssignTo")).value;

                    if (this.strSearchAssignTo != '') {
                        this.strSearchAssignTo = this.strSearchAssignTo.toLocaleLowerCase();
                        this.TicketListOpens = this.TicketListOpens.filter(
                            x => x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(this.strSearchAssignTo) != -1);
                    }

                 
                    if (this.ShowHideSearch) {
                        this.strSearchPriority = (<HTMLInputElement>document.getElementById("searchPriority")).value;

                        if (this.strSearchPriority != '') {
                            this.strSearchPriority = this.strSearchPriority.toLocaleLowerCase();
                            this.TicketListOpens = this.TicketListOpens.filter(
                                x => x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(this.strSearchPriority) != -1);
                        }
                    }
                    if (this.ShowHideSearch) {
                        this.strSearchStatus = (<HTMLInputElement>document.getElementById("searchStatus")).value;

                        if (this.strSearchStatus != '') {
                            this.strSearchStatus = this.strSearchStatus.toLocaleLowerCase();
                            this.TicketListOpens = this.TicketListOpens.filter(
                                x => x.Status != null && x.Status.toLocaleLowerCase().indexOf(this.strSearchStatus) != -1);
                        }
                    }

                }
                //Logic for searching - End

                this.OpenTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "open").length;
                this.UnderReviewTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "underReview").length;
                this.SuspendedTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "suspended").length;
                this.ResolvedTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "resolved").length;

          
                this.indLoading = false;
                this.JumpOnPage(1);

            }

        );
      
    }

    LoadGetTicketDetail(id: number): void {
        
        this.indLoading = true;
        this._TicketListOpenService.getTicketDetail(Global.BASE_MyTicketListOpen_ENDPOINT, id)
            .subscribe(DATADP => {
                this.GetDetail = DATADP;


            }

            );
    }
    
    LoadGetTicketDetailAdminAllTicket(): void {


        this.indLoading = true;
        this._TicketListOpenService.getTicketAdmin(Global.BASE_MyTicketListOpen_ENDPOINT)
            .subscribe(data => {
                // console.log(data)
                this.TicketListOpens = data;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchSubject = (<HTMLInputElement>document.getElementById("searchSubject")).value;

                    if (this.strSearchSubject != '') {
                        this.strSearchSubject = this.strSearchSubject.toLocaleLowerCase();
                        this.TicketListOpens = this.TicketListOpens.filter(
                            x => x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(this.strSearchSubject) != -1);
                    }
                }



                if (this.ShowHideSearch) {
                    this.strSearchAddressToGroup = (<HTMLInputElement>document.getElementById("searchAddressToGroup")).value;

                    if (this.strSearchAddressToGroup != '') {
                        this.strSearchAddressToGroup = this.strSearchAddressToGroup.toLocaleLowerCase();
                        this.TicketListOpens = this.TicketListOpens.filter(
                            x => x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(this.strSearchAddressToGroup) != -1);
                    }
                }




                if (this.ShowHideSearch) {
                    this.strSearchAssignTo = (<HTMLInputElement>document.getElementById("searchAssignTo")).value;

                    if (this.strSearchAssignTo != '') {
                        this.strSearchAssignTo = this.strSearchAssignTo.toLocaleLowerCase();
                        this.TicketListOpens = this.TicketListOpens.filter(
                            x => x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(this.strSearchAssignTo) != -1);
                    }

                
                    if (this.ShowHideSearch) {
                        this.strSearchPriority = (<HTMLInputElement>document.getElementById("searchPriority")).value;

                        if (this.strSearchPriority != '') {
                            this.strSearchPriority = this.strSearchPriority.toLocaleLowerCase();
                            this.TicketListOpens = this.TicketListOpens.filter(
                                x => x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(this.strSearchPriority) != -1);
                        }
                    }
                    if (this.ShowHideSearch) {
                        this.strSearchStatus = (<HTMLInputElement>document.getElementById("searchStatus")).value;

                        if (this.strSearchStatus != '') {
                            this.strSearchStatus = this.strSearchStatus.toLocaleLowerCase();
                            this.TicketListOpens = this.TicketListOpens.filter(
                                x => x.Status != null && x.Status.toLocaleLowerCase().indexOf(this.strSearchStatus) != -1);
                        }
                    }

                }
                //Logic for searching - End

                this.OpenTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "open").length;
                this.UnderReviewTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "underReview").length;
                this.SuspendedTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "suspended").length;
                this.ResolvedTicketCount = this.TicketListOpens.filter(x => x.Status.toLowerCase() == "resolved").length;


                this.indLoading = false;
                this.JumpOnPage(1);

            }

            );

    }
    addTicketListOpen() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New News";
        this.modalBtnTitle = "Add";
        this.TicketListOpenFrm.reset();
        this.modal.open();
    }

    editTicketListOpen(id: number) {
      
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit News";
        this.modalBtnTitle = "Update";
        this.TicketListOpen = this.TicketListOpens.filter(x => x.Id == id)[0];
        this.TicketListOpenFrm.setValue(this.TicketListOpen);
        this.modal.open();
        this.LoadGetTicketDetail(id);
    }
   

    ViewTicketListOpen(id: number) {
  
        this.dbops = DBOperation.View;
        this.SetControlsState(true);
        this.modalTitle = "Conversation Ticket";
        this.TicketListOpen = this.TicketListOpens.filter(x => x.Id == id)[0];
          this.TicketListOpenFrm.setValue(this.TicketListOpen);
        this.LoadViwHistory(id);
        this.modal1.open();
        this.modal.dismiss();
      
 

    }
    deleteTicketListOpen(id: number, status: boolean) {
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

        this.TicketListOpen = this.TicketListOpens.filter(x => x.Id == id)[0];
        this.TicketListOpenFrm.setValue(this.TicketListOpen);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.TicketListOpenFrm.enable() : this.TicketListOpenFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.TicketListOpens);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    LoadViwHistory(id: number): void {

        this.indLoading = true;
        this._TicketListOpenService.getViewHistory(Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(DATADP => {
                this.ViewHistory = DATADP;
                     }

            );
    }

    onSubmit(formData: any) {
      
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._TicketListOpenService.post(Global.BASE_MyTicketListOpen_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadGetTicketDetailUser(21);
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
             
                this._TicketListOpenService.put(Global.BASE_MyTicketListOpen_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadGetTicketDetailUser(21);
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
                this._TicketListOpenService.delete(Global.BASE_MyTicketListOpen_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "TicketListOpen status changed successfully.";
                            this.LoadGetTicketDetailUser(21);
                            
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing TicketListOpen!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;



        }
    }



}