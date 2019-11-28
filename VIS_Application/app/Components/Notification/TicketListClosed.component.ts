
import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketListClosedService } from '../../service/Notification/TicketListClosed.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ITicketListClosed } from '../../Model/Notification/TicketListClosed';
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
    providers: [TicketListClosedService],
    templateUrl: 'app/Components/Notification/TicketListClosed.component.html'
})

export class TicketListClosedComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modal1') modal1: ModalComponent;

    TicketListCloseds: ITicketListClosed[];
    TicketListClosed: ITicketListClosed;
    ViewHistory: ITicketListClosed[];
    GetDetail: ITicketListClosed[];
    GetDetails: ITicketListClosed;

    ClosedTicketCount: number;
    TerminatedTicketCount: number;


    msg: string;
    indLoading: boolean = false;
    TicketListClosedFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    TicketListClosedFilter: string;
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


    constructor(private fb: FormBuilder, private _TicketListClosedService: TicketListClosedService, private pagerService: PagerService) { }


    ngOnInit(): void {

        this.TicketListClosedFrm = this.fb.group({
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
            Mode: [''],
          
            HelpTicketId: [''],
            FileName: [''],
            RoleType: [''],
            EntityMessage: ['']
        });


        this.LoadGetTicketDetailUser(21);
        //this.loadcount();
        //this.Loadstore();
        // this.LoadOpenTicket(21);


    }

    TicketListClosedFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.TicketListClosedFilter = value;
    }


    TicketListClosedSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }







    //Loadstore() {

    //    
    //    this.TicketListCloseds = this.TicketListCloseds.filter(x => x.Status == "Open");
    //    this.JumpOnPage(1);

    //    for (var i = 0; i < this.TicketListCloseds.length; i++) {
    //        if (this.TicketListCloseds[i].Status == "Open")

    //            return this.TicketListCloseds[i];
    //    }
    //}



    LoadCount() {
        this.ClosedTicketCount = this.TicketListCloseds.filter(x => x.Status.toLowerCase() == "closed").length;
        this.TerminatedTicketCount = this.TicketListCloseds.filter(x => x.Status.toLowerCase() == "terminated").length;

    }



    LoadGetTicketDetailUser(UserId: number): void {
        

        this.indLoading = true;
        this._TicketListClosedService.getTicketuser(Global.BASE_MyTicketListClosed_ENDPOINT, UserId)
            .subscribe(data => {
                // console.log(data)
                this.TicketListCloseds = data;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchSubject = (<HTMLInputElement>document.getElementById("searchSubject")).value;

                    if (this.strSearchSubject != '') {
                        this.strSearchSubject = this.strSearchSubject.toLocaleLowerCase();
                        this.TicketListCloseds = this.TicketListCloseds.filter(
                            x => x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(this.strSearchSubject) != -1);
                    }
                }



                if (this.ShowHideSearch) {
                    this.strSearchAddressToGroup = (<HTMLInputElement>document.getElementById("searchAddressToGroup")).value;

                    if (this.strSearchAddressToGroup != '') {
                        this.strSearchAddressToGroup = this.strSearchAddressToGroup.toLocaleLowerCase();
                        this.TicketListCloseds = this.TicketListCloseds.filter(
                            x => x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(this.strSearchAddressToGroup) != -1);
                    }
                }




                if (this.ShowHideSearch) {
                    this.strSearchAssignTo = (<HTMLInputElement>document.getElementById("searchAssignTo")).value;

                    if (this.strSearchAssignTo != '') {
                        this.strSearchAssignTo = this.strSearchAssignTo.toLocaleLowerCase();
                        this.TicketListCloseds = this.TicketListCloseds.filter(
                            x => x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(this.strSearchAssignTo) != -1);
                    }

                  
                    if (this.ShowHideSearch) {
                        this.strSearchPriority = (<HTMLInputElement>document.getElementById("searchPriority")).value;

                        if (this.strSearchPriority != '') {
                            this.strSearchPriority = this.strSearchPriority.toLocaleLowerCase();
                            this.TicketListCloseds = this.TicketListCloseds.filter(
                                x => x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(this.strSearchPriority) != -1);
                        }
                    }
                    if (this.ShowHideSearch) {
                        this.strSearchStatus = (<HTMLInputElement>document.getElementById("searchStatus")).value;

                        if (this.strSearchStatus != '') {
                            this.strSearchStatus = this.strSearchStatus.toLocaleLowerCase();
                            this.TicketListCloseds = this.TicketListCloseds.filter(
                                x => x.Status != null && x.Status.toLocaleLowerCase().indexOf(this.strSearchStatus) != -1);
                        }
                    }

                }
                //Logic for searching - End

                this.ClosedTicketCount = this.TicketListCloseds.filter(x => x.Status.toLowerCase() == "closed").length;
                this.TerminatedTicketCount = this.TicketListCloseds.filter(x => x.Status.toLowerCase() == "terminated").length;



                this.indLoading = false;
                this.JumpOnPage(1);

            }

            );

    }

    LoadGetTicketDetail(id: number): void {
        
        this.indLoading = true;
        this._TicketListClosedService.getTicketDetail(Global.BASE_MyTicketListClosed_ENDPOINT, id)
            .subscribe(DATADP => {
                this.GetDetail = DATADP;
            }

            );
    }
    addTicketListClosed() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New News";
        this.modalBtnTitle = "Add";
        this.TicketListClosedFrm.reset();
        this.modal.open();
    }

    editTicketListClosed(id: number) {
        
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit News";
        this.modalBtnTitle = "Update";
        this.TicketListClosed = this.TicketListCloseds.filter(x => x.Id == id)[0];
        this.TicketListClosedFrm.setValue(this.TicketListClosed);
        this.modal.open();
        this.LoadGetTicketDetail(id);
    }


    ViewTicketListClosed(id: number) {
        

        this.dbops = DBOperation.View;
        this.SetControlsState(true);
        this.modalTitle = "Conversation Ticket";
        this.TicketListClosed = this.TicketListCloseds.filter(x => x.Id == id)[0];
        this.TicketListClosedFrm.setValue(this.TicketListClosed);
        this.LoadViwHistory(id);
        this.modal1.open();
        this.modal.dismiss();



    }
    deleteTicketListClosed(id: number, status: boolean) {
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

        this.TicketListClosed = this.TicketListCloseds.filter(x => x.Id == id)[0];
        this.TicketListClosedFrm.setValue(this.TicketListClosed);
        this.modal.open();
    }





    SetControlsState(isEnable: boolean) {
        isEnable ? this.TicketListClosedFrm.enable() : this.TicketListClosedFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.TicketListCloseds);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    LoadViwHistory(id: number): void {

        this.indLoading = true;
        this._TicketListClosedService.getViewHistory(Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(DATADP => {
                this.ViewHistory = DATADP;
            }

            );
    }

    onSubmit(formData: any) {
        
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._TicketListClosedService.post(Global.BASE_MyTicketListClosed_ENDPOINT, formData._value).subscribe(
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
                
                this._TicketListClosedService.put(Global.BASE_MyTicketListClosed_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadGetTicketDetailUser(21);
                           //  this.LoadTicketListCloseds();
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
                this._TicketListClosedService.delete(Global.BASE_MyTicketListClosed_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "TicketListClosed status changed successfully.";
                            this.LoadGetTicketDetailUser(21);
                            // this.LoadTicketListCloseds();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing TicketListClosed!"
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