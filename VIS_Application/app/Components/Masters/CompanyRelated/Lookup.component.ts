import { Component, OnInit, ViewChild } from '@angular/core';
import { LookupService } from '../../../service/Masters/CompanyRelated/Lookup.service';
import { LookupTypeService } from '../../../service/Masters/CompanyRelated/LookupType.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ILookup } from '../../../Model/Masters/CompanyRelated/Lookup';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
import { LookupTypeComponent } from '../CompanyRelated/LookupType.component';
import { ILookupType } from '../../../Model/Masters/CompanyRelated/LookupType';
@Component
    ({
        providers: [LookupService, LookupTypeService],
        templateUrl: 'app/Components/Masters/CompanyRelated/Lookup.component.html'
    })


export class LookupComponent
{
    
    @ViewChild('modal') modal: ModalComponent;
    lookups: ILookup[];
    lookup: ILookup;
    msg: string;
    indLoading: boolean = false;
    LookupFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    LookupFilter: string;
    isDesc: boolean = false;
    column: any = 'Name';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;


    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchName: string;
    strSearchType: string;
    strSearchValue: string;
    strSearchFullName: string;
    strSearchColorCode: string;
    LookupTyeList: ILookupType[];


    constructor(private fb: FormBuilder, private _LookupService: LookupService, private pagerService: PagerService, private _LookupTypeService: LookupTypeService, private _CommonHelperService: CommonHelperService)
    {

    }

    //private lt: LookupTypeComponent = new LookupTypeComponent(this.fb, this._LookupTypeService, this.pagerService);

    Resetmodel()
    {
        this.lookup =
            {
            ColorCode: '',
            Country: '',
            CreatedBy: '',
            CreatedOn: '',
            FullName: '',
            Id: 0,
            IsActive: '',
            Name: '',
            Type: '0',
            UpdatedBy: '',
            UpdatedOn: null,
            Value: '',
            CompanyId: 0,
            EntityMessage: ''
        }
    }

    ngOnInit(): void
    {
        this._CommonHelperService.ToogleMenu();

        this.LookupFrm = this.fb.group
            ({
            CompanyId: [''],
            Id: [''],
            Name: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            Type: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            Value: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            FullName: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            ColorCode: [''],
            Country:[''],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
            });

        this.LoadLookup();
        this.LoadLookupType();
        debugger;
    }

    LookupFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.LookupFilter = value;
    }

    LookupSort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
        
    };

    LoadLookup(): void
    {
        
        this.indLoading = true;
        this._LookupService.get(Global.BASE_LOOKUP_ENDPOINT)
            .subscribe(lookups => {
                this.lookups = lookups;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchName = (<HTMLInputElement>document.getElementById("searchName")).value;
                    if (this.strSearchName != '') {
                        this.strSearchName = this.strSearchName.toLocaleLowerCase();
                        this.lookups = this.lookups.filter
                            (
                            x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strSearchName) != -1);
                    }

                    this.strSearchType = (<HTMLInputElement>document.getElementById("searchType")).value;
                    if (this.strSearchType != '') {
                        this.strSearchType = this.strSearchType.toLocaleLowerCase();
                        this.lookups = this.lookups.filter
                            (
                            x => x.Type != null && x.Type.toLocaleLowerCase().indexOf(this.strSearchType) != -1);
                    }

                    //this.strSearchValue = (<HTMLInputElement>document.getElementById("searchValue")).value;
                    //if (this.strSearchValue != '')
                    //{
                    //    this.strSearchValue = this.strSearchValue.toLocaleLowerCase();
                    //    this.lookups = this.lookups.filter
                    //        (
                    //        x => x.Value != null && x.Value.indexOf(this.strSearchValue) != -1);
                    //}

                    this.strSearchFullName = (<HTMLInputElement>document.getElementById("searchFullName")).value;
                    if (this.strSearchFullName != '') {
                        this.strSearchFullName = this.strSearchFullName.toLocaleLowerCase();
                        this.lookups = this.lookups.filter
                            (
                            x => x.FullName != null && x.FullName.toLocaleLowerCase().indexOf(this.strSearchFullName) != -1);
                    }

                    this.strSearchColorCode = (<HTMLInputElement>document.getElementById("searchColorCode")).value;
                    if (this.strSearchColorCode != '') {
                        this.strSearchColorCode = this.strSearchColorCode.toLocaleLowerCase();
                        this.lookups = this.lookups.filter
                            (
                            x => x.ColorCode != null && x.ColorCode.toLocaleLowerCase().indexOf(this.strSearchColorCode) != -1);
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

    LoadLookupType(): ILookupType[] 
    {
        this.indLoading = true;
        this._LookupTypeService.get(Global.BASE_LOOKUPTYPE_ENDPOINT)
            .subscribe(lookuptype =>
            {
                this.LookupTyeList = lookuptype;
            }
        );
        return this.LookupTyeList;
    }

    AddLookup()
    {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Lookup";
        this.modalBtnTitle = "Add";
        this.Resetmodel();
        this.LookupFrm.setValue(this.lookup);
        $("#ColorCode").css("background-color", "");
        this.modal.open();
    }

    EditLookup(id: number)
    {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Lookup";
        this.modalBtnTitle = "Update";
        this.lookup = this.lookups.filter(x => x.Id == id)[0];
        this.LookupFrm.setValue(this.lookup);
        $("#ColorCode").css("background-color", this.lookup.ColorCode);
        this.modal.open();
    }

    DeleteLookup(id: number, status: boolean)
    {
        
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        if (status == true)
        {
            
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        
        this.lookup = this.lookups.filter(x => x.Id == id)[0];
        this.LookupFrm.setValue(this.lookup);
        $("#ColorCode").css("background-color", this.lookup.ColorCode);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.LookupFrm.enable() : this.LookupFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.lookups);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: any)
    {
        formData.value.ColorCode = ($("#ColorCode").val());
        this.msg = "";
        debugger;
        switch (this.dbops)
        {
            case DBOperation.create:
                this._LookupService.post(Global.BASE_LOOKUP_ENDPOINT, formData.value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadLookup();
                            this.modal.dismiss();
                            $("#ColorCode").val(null);
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
                
                this._LookupService.put(Global.BASE_LOOKUP_ENDPOINT, formData.value.Id, formData.value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadLookup();
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
                this._LookupService.delete(Global.BASE_LOOKUP_ENDPOINT, formData.value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Lookup status changed successfully.";
                            this.LoadLookup();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing Lookup!"
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

