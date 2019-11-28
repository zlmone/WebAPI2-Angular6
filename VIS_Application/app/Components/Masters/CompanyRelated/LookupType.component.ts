import { Component, OnInit, ViewChild } from '@angular/core';
import { LookupTypeService } from '../../../service/Masters/CompanyRelated/LookupType.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ILookupType } from '../../../Model/Masters/CompanyRelated/LookupType';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component
    ({
        providers: [LookupTypeService],
        templateUrl: 'app/Components/Masters/CompanyRelated/LookupType.component.html'
    })

export class LookupTypeComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    lookuptypes: ILookupType[];
    lookuptype: ILookupType;
    msg: string;
    indLoading: boolean = false;
    LookupTypeFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    LookupTypeFilter: string;
    isDesc: boolean = false;
    column: any = 'TypeName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    ShowHideSearch: boolean = false;
    strSearchTypeName: string;

    constructor(private fb: FormBuilder, private _LookupTypeService: LookupTypeService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    ngOnInit(): void {

        this._CommonHelperService.ToogleMenu();

        this.LookupTypeFrm = this.fb.group
            ({
                CompanyId: [''],
                Id: [''],
                TypeName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                IsActive: [''],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: [''],
            });

        this.LoadLookupType();


    }

    LookupTypeFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.LookupTypeFilter = value;
    }

    LookupTypeSort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
        
    };

    LoadLookupType(): ILookupType[] 
    {
        
        this.indLoading = true;
        this._LookupTypeService.get(Global.BASE_LOOKUPTYPE_ENDPOINT)
            .subscribe(lookuptypes => {
                this.lookuptypes = lookuptypes;
                debugger;

                //Logic for searching - start
                if (this.ShowHideSearch)
                {
                    this.strSearchTypeName = (<HTMLInputElement>document.getElementById("searchTypeName")).value;
                    if (this.strSearchTypeName != '')
                    {
                        this.strSearchTypeName = this.strSearchTypeName.toLocaleLowerCase();
                        this.lookuptypes = this.lookuptypes.filter
                            (
                            x => x.TypeName != null && x.TypeName.toLocaleLowerCase().indexOf(this.strSearchTypeName) != -1);
                    }

                }

                //Logic for searching - End



                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
        );
        debugger;
        return this.lookuptypes;
    }

    AddLookupType()
    {
        
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New LookupType";
        this.modalBtnTitle = "Add";
        this.LookupTypeFrm.reset();
        this.modal.open();
    }

    EditLookupType(id: number)
    {
        
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit LookupType";
        this.modalBtnTitle = "Update";
        
        this.lookuptype = this.lookuptypes.filter(x => x.Id == id)[0];
        
        this.LookupTypeFrm.setValue(this.lookuptype);
        this.modal.open();
    }

    DeleteLookupType(id: number, status: boolean)
    {
        
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        if (status == true)
        {
            
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else
        {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        
        this.lookuptype = this.lookuptypes.filter(x => x.Id == id)[0];
        this.LookupTypeFrm.setValue(this.lookuptype);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.LookupTypeFrm.enable() : this.LookupTypeFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.lookuptypes);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }


    onSubmit(formData: any)
    {
        debugger;
        this.msg = "";
        switch (this.dbops)
        {
            case DBOperation.create:
                this._LookupTypeService.post(Global.BASE_LOOKUPTYPE_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data
                            this.LoadLookupType();
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
                
                this._LookupTypeService.put(Global.BASE_LOOKUPTYPE_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data
                            this.LoadLookupType();
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
                this._LookupTypeService.delete(Global.BASE_LOOKUPTYPE_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "LookupType status changed successfully.";
                            this.LoadLookupType();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing LookupType!"
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