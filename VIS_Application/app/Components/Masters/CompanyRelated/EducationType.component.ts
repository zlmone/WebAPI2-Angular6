import { Component, OnInit, ViewChild } from '@angular/core';
import { EducationTypeService } from '../../../service/Masters/CompanyRelated/EducationType.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IEducationType } from '../../../Model/Masters/CompanyRelated/EducationType';
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
        providers: [EducationTypeService],
        templateUrl: 'app/Components/Masters/CompanyRelated/EducationType.component.html'
    })

export class EducationTypeComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    EducationTypes: IEducationType[];
    EducationType: IEducationType;
    msg: string;
    indLoading: boolean = false;
    EducationTypeFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    EducationTypeFilter: string;
    isDesc: boolean = false;
    column: any = 'Name';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    ShowHideSearch: boolean = false;
    strsearchName: string;
    strsearchType: string;
    strsearchFileName: string;

    constructor(private fb: FormBuilder, private _EducationTypeService: EducationTypeService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.EducationTypeFrm = this.fb.group
            ({
                CompanyId: [''],
                Id: [''],
                Name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                Type: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                FullName: [''],
                IsActive: 0,
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: [''],
            });

        this.LoadEducationType();


    }

    EducationTypeFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.EducationTypeFilter = value;
    }

    EducationTypeSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    LoadEducationType(): void {

        this.indLoading = true;
        this._EducationTypeService.get(Global.BASE_EducationType_ENDPOINT)
            .subscribe(EducationTypes => {
                this.EducationTypes = EducationTypes;

                debugger;
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strsearchName = (<HTMLInputElement>document.getElementById("searchName")).value;
                    if (this.strsearchName != '') {
                        this.strsearchName = this.strsearchName.toLocaleLowerCase();
                        this.EducationTypes = this.EducationTypes.filter
                            (
                            x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strsearchName) != -1);
                    }

                }
                if (this.ShowHideSearch) {
                    this.strsearchType = (<HTMLInputElement>document.getElementById("searchType")).value;
                    if (this.strsearchType != '') {
                        this.strsearchType = this.strsearchType.toLocaleLowerCase();
                        this.EducationTypes = this.EducationTypes.filter
                            (
                            x => x.Type != null && x.Type.toLocaleLowerCase().indexOf(this.strsearchType) != -1);
                    }

                }
                if (this.ShowHideSearch) {
                    this.strsearchFileName = (<HTMLInputElement>document.getElementById("searchFileName")).value;
                    if (this.strsearchFileName != '') {
                        this.strsearchFileName = this.strsearchFileName.toLocaleLowerCase();
                        this.EducationTypes = this.EducationTypes.filter
                            (
                            x => x.FullName != null && x.FullName.toLocaleLowerCase().indexOf(this.strsearchFileName) != -1);
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

    AddEducationType() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New EducationType";
        this.modalBtnTitle = "Add";
        this.EducationTypeFrm.reset();
        this.modal.open();
    }

    EditEducationType(id: number) {

        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit EducationType";
        this.modalBtnTitle = "Update";

        this.EducationType = this.EducationTypes.filter(x => x.Id == id)[0];

        this.EducationTypeFrm.setValue(this.EducationType);
        this.modal.open();
    }

    DeleteEducationType(id: number, status: boolean) {

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

        this.EducationType = this.EducationTypes.filter(x => x.Id == id)[0];
        this.EducationTypeFrm.setValue(this.EducationType);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.EducationTypeFrm.enable() : this.EducationTypeFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EducationTypes);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }


    onSubmit(formData: any) {
        debugger;
        this.msg = "";
        switch (this.dbops) {
            case DBOperation.create:
                this._EducationTypeService.post(Global.BASE_EducationType_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data
                            this.LoadEducationType();
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

                this._EducationTypeService.put(Global.BASE_EducationType_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data
                            this.LoadEducationType();
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
                this._EducationTypeService.delete(Global.BASE_EducationType_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "EducationType status changed successfully.";
                            this.LoadEducationType();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing EducationType!"
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