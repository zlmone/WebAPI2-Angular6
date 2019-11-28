import { Component, OnInit, ViewChild } from '@angular/core';
import { BankMasterService } from '../../../service/Masters/CompanyRelated/BankMaster.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IBankMaster } from '../../../Model/Masters/CompanyRelated/BankMaster';
import { ICompany } from '../../../Model/Masters/CompanyRelated/BankMaster';
import { ICurrency } from '../../../Model/Masters/CompanyRelated/BankMaster';
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
    providers: [BankMasterService],
    templateUrl: 'app/Components/Masters/CompanyRelated/BankMaster.component.html'
})

export class BankMasterComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    bankmasters: IBankMaster[];
    bankmaster: IBankMaster;

    company: ICompany[];
    currency: ICurrency[];

    msg: string;
    indLoading: boolean = false;
    BankMasterFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    BankMasterFilter: string;
    isDesc: boolean = false;
    column: any = 'BankName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchBankAlias: string;
    strSearchBankName: string;
    strSearchBranchName: string;
    strSearchBankAddress: string;

    constructor(private fb: FormBuilder, private _BankMasterService: BankMasterService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    Resetmodel()
    {
        
        this.bankmaster =
    {
            AccountNumber:'',
            BankAddress: '',
            BankAlias: '',
            BankDetail: '',
            BankName: '',
            BranchName: '',
            CompanyId: 0,
            CreatedBy: '',
            CreatedOn:null,
            CurrencyId: 0,
            Id: 0,
            IsActive: false,
            Status: false,
            UpdatedBy: '',
            UpdatedOn: null,
            EntityMessage: '',
            
        }
    }

    ngOnInit(): void
    {
        this._CommonHelperService.ToogleMenu();

        this.BankMasterFrm = this.fb.group
            ({
            Id: [''],
            BankAlias: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            BankName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            BranchName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            BankAddress: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            BankDetail: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            CreatedBy: [''],
            UpdatedBy: [''],
            AccountNumber: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            Status:[''],
            CompanyId: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            CurrencyId: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            EntityMessage: ['']
        });

        this.LoadBankMaster();
        this.GetCompany();
        this.GetCurrency();

    }

    BankFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.BankMasterFilter = value;
    }

    BankMasterSort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadBankMaster(): void
    {
        
        this.indLoading = true;
        this._BankMasterService.get(Global.BASE_BANKMASTER_ENDPOINT)
            .subscribe(bankmasters => {
                this.bankmasters = bankmasters;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchBankAlias = (<HTMLInputElement>document.getElementById("searchBankAlias")).value;
                    if (this.strSearchBankAlias != '')
                    {
                        this.strSearchBankAlias = this.strSearchBankAlias.toLocaleLowerCase();
                        this.bankmasters = this.bankmasters.filter
                            (
                            x => x.BankAlias != null && x.BankAlias.toLocaleLowerCase().indexOf(this.strSearchBankAlias) != -1);
                    }

                    this.strSearchBankName = (<HTMLInputElement>document.getElementById("searchBankName")).value;
                    if (this.strSearchBankName != '')
                    {
                        this.strSearchBankName = this.strSearchBankName.toLocaleLowerCase();
                        this.bankmasters = this.bankmasters.filter
                            (
                            x => x.BankName != null && x.BankName.toLocaleLowerCase().indexOf(this.strSearchBankName) != -1);
                    }

                    this.strSearchBranchName = (<HTMLInputElement>document.getElementById("searchBranchName")).value;
                    if (this.strSearchBranchName != '') {
                        this.strSearchBranchName = this.strSearchBranchName.toLocaleLowerCase();
                        this.bankmasters = this.bankmasters.filter
                            (
                            x => x.BranchName != null && x.BranchName.toLocaleLowerCase().indexOf(this.strSearchBranchName) != -1);
                    }

                    this.strSearchBankAddress = (<HTMLInputElement>document.getElementById("searchBankAddress")).value;
                    if (this.strSearchBankAddress != '') {
                        this.strSearchBankAddress = this.strSearchBankAddress.toLocaleLowerCase();
                        this.bankmasters = this.bankmasters.filter
                            (
                            x => x.BankAddress != null && x.BankAddress.toLocaleLowerCase().indexOf(this.strSearchBankAddress) != -1);
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


    AddBankMaster()
    {
        
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Bank";
        this.modalBtnTitle = "Add";
        this.Resetmodel();
        this.BankMasterFrm.setValue(this.bankmaster);
        this.modal.open();
    }

    editBankMaster(id: number)
    {
        
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Bank";
        this.modalBtnTitle = "Update";
        this.bankmaster = this.bankmasters.filter(x => x.Id == id)[0];
        this.BankMasterFrm.setValue(this.bankmaster);
        this.modal.open();
    }

    deleteBankMaster(id: number, status: boolean)
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
        
        this.bankmaster = this.bankmasters.filter(x => x.Id == id)[0];
        this.BankMasterFrm.setValue(this.bankmaster);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.BankMasterFrm.enable() : this.BankMasterFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.bankmasters);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: any)
    {
        this.msg = "";

        switch (this.dbops)
        {
            case DBOperation.create:
                this._BankMasterService.post(Global.BASE_BANKMASTER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data;
                            this.LoadBankMaster();
                            this.modal.dismiss();
                        }
                        else
                        {
                            alert(data);
                        }
                    },
                    error =>
                    {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._BankMasterService.put(Global.BASE_BANKMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadBankMaster();
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
                this._BankMasterService.delete(Global.BASE_BANKMASTER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Bank status changed successfully.";
                            this.LoadBankMaster();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing Bank!"
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

    GetCompany(): void
    {
        this.indLoading = true;
        this._BankMasterService.getcompany(Global.BASE_BANKMASTER_ENDPOINT)
            .subscribe(companylist =>
            {
                this.company = companylist;
            });
    }

    GetCurrency(): void {
        this.indLoading = true;
        this._BankMasterService.getcurrency(Global.BASE_BANKMASTER_ENDPOINT)
            .subscribe(currencylist =>
            {
                this.currency = currencylist;
            });
    }

}