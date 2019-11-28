import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaryBreakupTypeService } from '../../../service/Masters/CompanyRelated/SalaryBreakupType.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ISalaryBreakupType } from '../../../Model/Masters/CompanyRelated/SalaryBreakupType';
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
        providers: [SalaryBreakupTypeService],
        templateUrl: 'app/Components/Masters/CompanyRelated/SalaryBreakupType.component.html'
    })

export class SalaryBreakupTypeComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    SalaryBreakupTypes: ISalaryBreakupType[];
    SalaryBreakupType: ISalaryBreakupType;
    msg: string;
    indLoading: boolean = false;
    SalaryBreakupTypeFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    SalaryBreakupTypeFilter: string;
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

    constructor(private fb: FormBuilder, private _SalaryBreakupTypeService: SalaryBreakupTypeService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.SalaryBreakupTypeFrm = this.fb.group
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

        this.LoadSalaryBreakupType();


    }

    SalaryBreakupTypeFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.SalaryBreakupTypeFilter = value;
    }

    SalaryBreakupTypeSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    LoadSalaryBreakupType(): void {

        this.indLoading = true;
        this._SalaryBreakupTypeService.get(Global.BASE_SalaryBreakupType_ENDPOINT)
            .subscribe(SalaryBreakupTypes => {
                this.SalaryBreakupTypes = SalaryBreakupTypes;

                debugger;
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strsearchName = (<HTMLInputElement>document.getElementById("searchName")).value;
                    if (this.strsearchName != '') {
                        this.strsearchName = this.strsearchName.toLocaleLowerCase();
                        this.SalaryBreakupTypes = this.SalaryBreakupTypes.filter
                            (
                            x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strsearchName) != -1);
                    }

                }
                if (this.ShowHideSearch) {
                    this.strsearchType = (<HTMLInputElement>document.getElementById("searchType")).value;
                    if (this.strsearchType != '') {
                        this.strsearchType = this.strsearchType.toLocaleLowerCase();
                        this.SalaryBreakupTypes = this.SalaryBreakupTypes.filter
                            (
                            x => x.Type != null && x.Type.toLocaleLowerCase().indexOf(this.strsearchType) != -1);
                    }

                }
                if (this.ShowHideSearch) {
                    this.strsearchFileName = (<HTMLInputElement>document.getElementById("searchFileName")).value;
                    if (this.strsearchFileName != '') {
                        this.strsearchFileName = this.strsearchFileName.toLocaleLowerCase();
                        this.SalaryBreakupTypes = this.SalaryBreakupTypes.filter
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

    AddSalaryBreakupType() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New SalaryBreakupType";
        this.modalBtnTitle = "Add";
        this.SalaryBreakupTypeFrm.reset();
        this.modal.open();
    }

    EditSalaryBreakupType(id: number) {

        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit SalaryBreakupType";
        this.modalBtnTitle = "Update";

        this.SalaryBreakupType = this.SalaryBreakupTypes.filter(x => x.Id == id)[0];

        this.SalaryBreakupTypeFrm.setValue(this.SalaryBreakupType);
        this.modal.open();
    }

    DeleteSalaryBreakupType(id: number, status: boolean) {

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

        this.SalaryBreakupType = this.SalaryBreakupTypes.filter(x => x.Id == id)[0];
        this.SalaryBreakupTypeFrm.setValue(this.SalaryBreakupType);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.SalaryBreakupTypeFrm.enable() : this.SalaryBreakupTypeFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.SalaryBreakupTypes);
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
                this._SalaryBreakupTypeService.post(Global.BASE_SalaryBreakupType_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data
                            this.LoadSalaryBreakupType();
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

                this._SalaryBreakupTypeService.put(Global.BASE_SalaryBreakupType_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data
                            this.LoadSalaryBreakupType();
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
                this._SalaryBreakupTypeService.delete(Global.BASE_SalaryBreakupType_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "SalaryBreakupType status changed successfully.";
                            this.LoadSalaryBreakupType();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing SalaryBreakupType!"
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