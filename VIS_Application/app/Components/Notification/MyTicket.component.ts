
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTicketService } from '../../service/Notification/MyTicket.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IMyTicket } from '../../Model/Notification/MyTicket';
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
    providers: [MyTicketService],
    templateUrl: 'app/Components/Notification/MyTicket.component.html'
})

export class MyTicketComponent implements OnInit {
    public uploaderF1: FileUploader;

    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modal1') modal1: ModalComponent;
    @ViewChild('modal3') modal3: ModalComponent;

    MyTickets: IMyTicket[];
    MyTicket: IMyTicket;
    ViewHistory: IMyTicket[];
    GetDetail: IMyTicket[];
    GetDetails: IMyTicket;
    Oraganization: IOraganization[];
    msg: string;
    indLoading: boolean = false;
    MyTicketFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    MyTicketFilter: string;
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

    //File Add
    fileList1: FileList;
    fileList2: FileList;
    fileList3: FileList;

    constructor(private fb: FormBuilder, private _MyTicketService: MyTicketService, private pagerService: PagerService, private http: Http) { }


    //file upload event  
    fileChange1(event) {
        
        this.fileList1 = event.target.files;



    }
    fileChange2(event) {
        this.fileList2 = event.target.files;


    }
    fileChange3(event) {
        this.fileList3 = event.target.files;

    }

    ngOnInit(): void {

        this.MyTicketFrm = this.fb.group({
            CompanyId: [''],
            Id: 0,
            Subject: [''],
            Message: [''],
            Remarks :[''],
            AddressToGroup: [''],
            AssignTo: [''],
            CreatedByName: [''],
            UpdatedByName: [''],
            Priority: [''],
            Status: [''],
            CreatedId: 0,
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            RecordCreatedOn: [''],
            RecordCreatedBy: [''],
            HelpTicketId: [''],
            FileName: [''],
            FileName1: [''],
            FileName2: [''],
            DepartmentHelpTicketDll: [''],
            SuggestionAlie: [''],
            SuggestionId: [''],
            RoleType: [''],
         
            EntityMessage: ['']
        });
        //
        
        this.LoadGetChildGroup(21);
        // this.LoadOpenTicket(21);


    }

    MyTicketFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.MyTicketFilter = value;
    }


    MyTicketSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }


    //LoadMyTickets(): void {
    //    this.indLoading = true;
    //    this._MyTicketService.get(Global.BASE_MyTicket_ENDPOINT)
    //        .subscribe(MyTickets => {
    //            this.MyTickets = MyTickets;

    //            //Logic for searching - start
    //            if (this.ShowHideSearch) {
    //                this.strSearchMyTicket_Name = (<HTMLInputElement>document.getElementById("searchMyTicket_Name")).value;

    //                if (this.strSearchMyTicket_Name != '') {
    //                    this.strSearchMyTicket_Name = this.strSearchMyTicket_Name.toLocaleLowerCase();
    //                    this.MyTickets = this.MyTickets.filter(
    //                        x => x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(this.strSearchMyTicket_Name) != -1);
    //                }
    //            }
    //            //Logic for searching - End
    //            this.indLoading = false;
    //            // initialize to page 1
    //            this.JumpOnPage(1);
    //        }
    //        //,error => this.msg = <any>error
    //        );
    //}



    LoadGetChildGroup(CreatedId: number): void {
        
        this.indLoading = true;
        this._MyTicketService.getchildgroup(Global.BASE_MyTicket_ENDPOINT, CreatedId)
            .subscribe(data => {
                this.MyTickets = data;



                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchSubject = (<HTMLInputElement>document.getElementById("searchSubject")).value;

                    if (this.strSearchSubject != '') {
                        this.strSearchSubject = this.strSearchSubject.toLocaleLowerCase();
                        this.MyTickets = this.MyTickets.filter(
                            x => x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(this.strSearchSubject) != -1);
                    }
                }



                if (this.ShowHideSearch) {
                    this.strSearchAddressToGroup = (<HTMLInputElement>document.getElementById("searchAddressToGroup")).value;

                    if (this.strSearchAddressToGroup != '') {
                        this.strSearchAddressToGroup = this.strSearchAddressToGroup.toLocaleLowerCase();
                        this.MyTickets = this.MyTickets.filter(
                            x => x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(this.strSearchAddressToGroup) != -1);
                    }
                }




                if (this.ShowHideSearch) {
                    this.strSearchAssignTo = (<HTMLInputElement>document.getElementById("searchAssignTo")).value;

                    if (this.strSearchAssignTo != '') {
                        this.strSearchAssignTo = this.strSearchAssignTo.toLocaleLowerCase();
                        this.MyTickets = this.MyTickets.filter(
                            x => x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(this.strSearchAssignTo) != -1);
                    }

                    if (this.ShowHideSearch) {
                        this.strSearchUpdatebyName = (<HTMLInputElement>document.getElementById("searchUpdatedByName")).value;

                        if (this.strSearchUpdatebyName != '') {
                            this.strSearchUpdatebyName = this.strSearchUpdatebyName.toLocaleLowerCase();
                            this.MyTickets = this.MyTickets.filter(
                                x => x.UpdatedByName != null && x.UpdatedByName.toLocaleLowerCase().indexOf(this.strSearchUpdatebyName) != -1);
                        }
                    }
                    if (this.ShowHideSearch) {
                        this.strSearchPriority = (<HTMLInputElement>document.getElementById("searchPriority")).value;

                        if (this.strSearchPriority != '') {
                            this.strSearchPriority = this.strSearchPriority.toLocaleLowerCase();
                            this.MyTickets = this.MyTickets.filter(
                                x => x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(this.strSearchPriority) != -1);
                        }
                    }
                    if (this.ShowHideSearch) {
                        this.strSearchStatus = (<HTMLInputElement>document.getElementById("searchStatus")).value;

                        if (this.strSearchStatus != '') {
                            this.strSearchStatus = this.strSearchStatus.toLocaleLowerCase();
                            this.MyTickets = this.MyTickets.filter(
                                x => x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(this.strSearchStatus) != -1);
                        }
                    }

                }
                //Logic for searching - End
                this.indLoading = false;
                this.JumpOnPage(1);

            }

            );
    }





    FilterByStatus(event) {




        if (event.target.value == 'Open') {

            this.MyTickets = this.MyTickets.filter(x => x.Status == 'Open')

            this.JumpOnPage(1);

        }
        else if (event.target.value == 'Closed') {

            this.MyTickets = this.MyTickets.filter(x => x.Status == 'Closed')

            this.JumpOnPage(1);
        }
        // this.LoadGetChildGroup(21);

    }
    LoadDp(): void {
     
        this.indLoading = true;
        this._MyTicketService.getDp(Global.BASE_MyTicket_ENDPOINT)
            .subscribe(DATADP => {
                this.Oraganization = DATADP;
          

            }
         
            );
    }
    LoadViwHistory(id: number): void {

        this.indLoading = true;
        this._MyTicketService.getViewHistory(Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(DATADP => {
                this.ViewHistory = DATADP;


            }
         
            );
    }
    LoadGetTicketDetail(id: number): void {
        
        this.indLoading = true;
        this._MyTicketService.getTicketDetail(Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(DATADP => {
                this.GetDetail = DATADP;


            }

            );
    }


    addMyTicket() {
        
        this.LoadDp();
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New MyTicket";
        this.modalBtnTitle = "Add";
        this.MyTicketFrm.reset();
        this.modal.open();

    }

    editMyTicket(Id: number) {
        
        this.LoadDp();
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit MyTicket";
        this.modalBtnTitle = "Update";
        this.MyTicket = this.MyTickets.filter(x => x.Id == Id)[0];
        this.MyTicketFrm.setValue(this.MyTicket);
        this.LoadGetTicketDetail(Id);
        this.modal3.open();

    }

    ViewMyTicket(Id: number) {
        

        this.dbops = DBOperation.View;
        this.SetControlsState(true);
        this.modalTitle = "Conversation Ticket";
        this.MyTicket = this.MyTickets.filter(x => x.Id == Id)[0];
        this.MyTicketFrm.setValue(this.MyTicket);
        this.LoadViwHistory(Id);
        this.modal1.open();
        this.modal3.dismiss();
    
    }
    deleteMyTicket(id: number, status: boolean) {
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

        this.MyTicket = this.MyTickets.filter(x => x.Id == id)[0];
        this.MyTicketFrm.setValue(this.MyTicket);
        this.modal.open();
    }

  



    SetControlsState(isEnable: boolean) {
        isEnable ? this.MyTicketFrm.enable() : this.MyTicketFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.MyTickets);
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
                if (this.fileList1 != null) {
                    formData._value.FileName = this.fileList1.item(0).name;
                }
                else {
                    formData._value.FileName = null
                }
                if (this.fileList2 != null) {
                    formData._value.FileName1 = this.fileList2.item(0).name;
                }
                else {
                    formData._value.FileName1 = null
                }
                if (this.fileList3 != null) {
                    formData._value.FileName2 = this.fileList3.item(0).name;
                }
                else {
                    formData._value.FileName2 = null
                }
                //formData._value.FileName = this.fileList2.item(0).name;
                //formData._value.FileName = this.fileList3.item(0).name;

                this._MyTicketService.post(Global.BASE_MyTicket_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            if (this.fileList1 != null)
                            {
                                if (this.fileList1.length > 0) {

                                    this.fileList1.item(0).name
                                    let file: File = this.fileList1[0];
                                    let formData: FormData = new FormData();
                                    formData.append('uploadFile', file, file.name);
                                    let headers = new Headers()
                                    let options = new RequestOptions({ headers: headers });
                                    let apiUrl1 = "/api/MyTicketapi/UploadJsonFile";
                                    this.http.post(apiUrl1, formData, options)
                                        .map(res => res.json())
                                        .catch(error => Observable.throw(error))
                                        .subscribe(
                                        data => console.log('success'),
                                        error => console.log(error)
                                        )
                                }
                            }
                            else
                            {
                                formData._value.FileName = null
                            }

                            if (this.fileList2 != null)
                            {
                                if (this.fileList2.length > 0) {

                                    this.fileList2.item(0).name
                                    let file: File = this.fileList2[0];
                                    let formData: FormData = new FormData();
                                    formData.append('uploadFile', file, file.name);
                                    let headers = new Headers()
                                    let options = new RequestOptions({ headers: headers });
                                    let apiUrl1 = "/api/MyTicketapi/UploadJsonFile";
                                    this.http.post(apiUrl1, formData, options)
                                        .map(res => res.json())
                                        .catch(error => Observable.throw(error))
                                        .subscribe(
                                        data => console.log('success'),
                                        error => console.log(error)
                                        )
                                }
                            }
                            else
                            {
                                formData._value.FileName2 = null
                            }
                            if (this.fileList3 != null)
                            {
                                if (this.fileList3.length > 0) {

                                    this.fileList3.item(0).name
                                    let file: File = this.fileList3[0];
                                    let formData: FormData = new FormData();
                                    formData.append('uploadFile', file, file.name);
                                    let headers = new Headers()
                                    let options = new RequestOptions({ headers: headers });
                                    let apiUrl1 = "/api/MyTicketapi/UploadJsonFile";
                                    this.http.post(apiUrl1, formData, options)
                                        .map(res => res.json())
                                        .catch(error => Observable.throw(error))
                                        .subscribe(
                                        data => console.log('success'),
                                        error => console.log(error)
                                        )
                                }
                            }
                            else
                            {
                                formData._value.FileName3 = null
                            }
                            this.msg = data;
                            this.LoadGetChildGroup(21);
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
                
                this._MyTicketService.put(Global.BASE_MyTicket_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadGetChildGroup(21);
                            //  this.LoadMyTickets();
                            this.modal3.dismiss();
                        }
                        else {
                            //alert(data);
                            this.msg = "Error has occurred while changing status of existing MyTicket!.";
                        }
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._MyTicketService.delete(Global.BASE_MyTicket_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "MyTicket status changed successfully.";
                            this.LoadGetChildGroup(21);
                            // this.LoadMyTickets();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing MyTicket!"
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