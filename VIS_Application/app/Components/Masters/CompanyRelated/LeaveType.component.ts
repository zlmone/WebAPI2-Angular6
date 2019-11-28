import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveTypeService } from '../../../service/Masters/CompanyRelated/LeaveType.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ILeaveType } from '../../../Model/Masters/CompanyRelated/LeaveType';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component
    ({
        providers: [LeaveTypeService],
        templateUrl: 'app/Components/Masters/CompanyRelated/LeaveType.component.html'
    })

export class LeaveTypeComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    LeaveTypes: ILeaveType[];
    LeaveType: ILeaveType;
    msg: string;
    indLoading: boolean = false;
    LeaveTypeFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    LeaveTypeFilter: string;
    isDesc: boolean = false;
    column: any = 'LeaveType';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    ShowHideSearch: boolean = false;
    strSearchTypeName: string;

    constructor(private fb: FormBuilder, private _LeaveTypeService: LeaveTypeService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.LeaveTypeFrm = this.fb.group
            ({
                CompanyId: [''],
                Id: [''],
                LeaveTypeName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                IsActive: [''],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: [''],
            });

        this.LoadLeaveType();


    }

    LeaveTypeFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.LeaveTypeFilter = value;
    }

    LeaveTypeSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    LoadLeaveType(): void {

        this.indLoading = true;
        this._LeaveTypeService.get(Global.BASE_LeaveType_ENDPOINT)
            .subscribe(LeaveTypes => {
                this.LeaveTypes = LeaveTypes;


                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchTypeName = (<HTMLInputElement>document.getElementById("searchLeaveTypeName")).value;
                    if (this.strSearchTypeName != '') {
                        this.strSearchTypeName = this.strSearchTypeName.toLocaleLowerCase();
                        this.LeaveTypes = this.LeaveTypes.filter
                            (
                            x => x.LeaveTypeName != null && x.LeaveTypeName.toLocaleLowerCase().indexOf(this.strSearchTypeName) != -1);
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

    AddLeaveType() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New LeaveType";
        this.modalBtnTitle = "Add";
        this.LeaveTypeFrm.reset();
        this.modal.open();
    }

    EditLeaveType(id: number) {

        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit LeaveType";
        this.modalBtnTitle = "Update";

        this.LeaveType = this.LeaveTypes.filter(x => x.Id == id)[0];

        this.LeaveTypeFrm.setValue(this.LeaveType);
        this.modal.open();
    }

    DeleteLeaveType(id: number, status: boolean) {

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

        this.LeaveType = this.LeaveTypes.filter(x => x.Id == id)[0];
        this.LeaveTypeFrm.setValue(this.LeaveType);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.LeaveTypeFrm.enable() : this.LeaveTypeFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LeaveTypes);
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
                this._LeaveTypeService.post(Global.BASE_LeaveType_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data;
                            this.LoadLeaveType();
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

                this._LeaveTypeService.put(Global.BASE_LeaveType_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadLeaveType();
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
                this._LeaveTypeService.delete(Global.BASE_LeaveType_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "LeaveType status changed successfully.";
                            this.LoadLeaveType();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing LeaveType!"
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