import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpTicketAddService } from '../../service/Notification/HelpTicketAdd.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IHelpAddTicket } from '../../Model/Notification/HelpTicketAdd';
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
    providers: [HelpTicketAddService],
    templateUrl: 'app/Components/Notification/HelpTicketAdd.component.html'
})

export class HelpTicketAddComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;

    HelpAddTickets: IHelpAddTicket[];
    HelpAddTicket: IHelpAddTicket;
    Oraganization: IOraganization[];

    msg: string;
    indLoading: boolean = false;
    HelpAddTicketFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    HelpAddTicketFilter: string;
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
    strSearchHelpAddTicket_Name: string;
    strSearchDescription: string;

    //File Add
    fileList1: FileList;
    fileList2: FileList;
    fileList3: FileList;

    constructor(private fb: FormBuilder, private _HelpAddTicketService: HelpTicketAddService, private pagerService: PagerService, private http: Http) { }

    ngOnInit(): void {
        this.HelpAddTicketFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Subject: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            Message: ['', Validators.required],
            Remarks: [''],
            AssignTo: [''],
            AddressToGroup: [''],
            Priority: [''],
            Status: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            FileName: [''],
            FileName1: [''],
            FileName2: [''],
            EntityMessage: ['']
        });
        // this.LoadHelpAddTickets()

        this.LoadDp();
    }
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


    HelpAddTicketFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.HelpAddTicketFilter = value;
    }


    HelpAddTicketSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }


    LoadDp(): void {
        this.indLoading = true;
        this._HelpAddTicketService.getDp(Global.BASE_HelpTicketAdd_ENDPOINT)
            .subscribe(DATADP => {
                this.Oraganization = DATADP;
            }
            //,error => this.msg = <any>error
            );
    }

    LoadHelpAddTickets(): void {
        this.indLoading = true;
        this._HelpAddTicketService.get(Global.BASE_HelpTicketAdd_ENDPOINT)
            .subscribe(HelpAddTickets => {
                this.HelpAddTickets = HelpAddTickets;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchHelpAddTicket_Name = (<HTMLInputElement>document.getElementById("searchMessage")).value;

                    if (this.strSearchHelpAddTicket_Name != '') {
                        this.strSearchHelpAddTicket_Name = this.strSearchHelpAddTicket_Name.toLocaleLowerCase();
                        this.HelpAddTickets = this.HelpAddTickets.filter(
                            x => x.Message != null && x.Message.toLocaleLowerCase().indexOf(this.strSearchHelpAddTicket_Name) != -1);
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


    addHelpAddTicket() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New HelpAddTicket";
        this.modalBtnTitle = "Add";
        this.HelpAddTicketFrm.reset();
        this.modal.open();
    }

    editHelpAddTicket(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit HelpAddTicket";
        this.modalBtnTitle = "Update";
        this.HelpAddTicket = this.HelpAddTickets.filter(x => x.Id == id)[0];
        this.HelpAddTicketFrm.setValue(this.HelpAddTicket);
        this.modal.open();
    }

    deleteHelpAddTicket(id: number, status: boolean) {
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

        this.HelpAddTicket = this.HelpAddTickets.filter(x => x.Id == id)[0];
        this.HelpAddTicketFrm.setValue(this.HelpAddTicket);
        this.modal.open();
    }





    SetControlsState(isEnable: boolean) {
        isEnable ? this.HelpAddTicketFrm.enable() : this.HelpAddTicketFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.HelpAddTickets);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    //onSubmit(formData: IHelpAddTicket) {
    //    this.msg = "";
    //    console.log(formData);

    //    this._HelpAddTicketService.put(Global.BASE_HelpTicketAdd_ENDPOINT, formData.Id, formData).subscribe(
    //        data => {
    //            if data.startsWith("Success: "){
    //                this.msg = "Common Configuration Save successfully.";
    //                this.LoadHelpAddTickets();
    //            }
    //            else {
    //                this.msg = "Error has occurred while modifying existing Common Configuration!"
    //            }

    //        },
    //        error => {
    //            this.msg = error;
    //        }
    //    );


    //}

    onSubmit(formData: any) {

        console.log(formData);
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
                this._HelpAddTicketService.post(Global.BASE_HelpTicketAdd_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            if (this.fileList1 != null) {
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
                            else {
                                formData._value.FileName = null
                            }

                            if (this.fileList2 != null) {
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
                            else {
                                formData._value.FileName2 = null
                            }
                            if (this.fileList3 != null) {
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
                            else {
                                formData._value.FileName3 = null
                            }
                            this.msg = data;
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
                this._HelpAddTicketService.put(Global.BASE_HelpTicketAdd_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadHelpAddTickets();
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
                this._HelpAddTicketService.delete(Global.BASE_HelpTicketAdd_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "HelpAddTicket status changed successfully.";
                            this.LoadHelpAddTickets();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing HelpAddTicket!"
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