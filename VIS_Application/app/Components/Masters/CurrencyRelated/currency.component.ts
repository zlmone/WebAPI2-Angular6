import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../../service/Masters/CurrencyRelated/currency.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICurrency } from '../../../Model/Masters/CurrencyRelated/currency';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component({
    providers: [CurrencyService],
    templateUrl: 'app/Components/Masters/CurrencyRelated/currency.component.html'
})

export class CurrencyComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    currencys: ICurrency[];
    currency: ICurrency;
    msg: string;
    indLoading: boolean = false;
    currencyFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    CurrencyFilter: string;
    isDesc: boolean = false;
    column: any = 'Full_Name';
    direction: number;
    CurrentRecordsPerPage: number = 10;
    
    // pager object
    pager: any = {};    
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchFull_Name: string;
    strSearchShort_Name: string;
    strSearchSub_Unit: string;
    
    constructor(private fb: FormBuilder, private _currencyService: CurrencyService, private pagerService: PagerService) { }

    ngOnInit(): void {
        this.currencyFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Full_Name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            Short_Name: ['', Validators.required],
            Sub_Unit: ['', Validators.required],
            Symbol: ['', Validators.required],
            Is_Base_Currency: [''],
            Default_Exchange: ['', Validators.required],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadCurrencys()
    }

    CurrencyFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.CurrencyFilter = value;
    }

   
    CurrencySort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

    LoadCurrencys(): void {
        this.indLoading = true;
        this._currencyService.get(Global.BASE_CURRENCY_ENDPOINT)
            .subscribe(currencys => {
                this.currencys = currencys;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchFull_Name = (<HTMLInputElement>document.getElementById("searchFull_Name")).value;

                    if (this.strSearchFull_Name != '') {
                        this.strSearchFull_Name = this.strSearchFull_Name.toLocaleLowerCase();
                        this.currencys = this.currencys.filter(
                            x => x.Full_Name != null && x.Full_Name.toLocaleLowerCase().indexOf(this.strSearchFull_Name) != -1);
                    }

                    this.strSearchShort_Name = (<HTMLInputElement>document.getElementById("searchShort_Name")).value;
                    if (this.strSearchShort_Name != '') {
                        this.strSearchShort_Name = this.strSearchShort_Name.toLocaleLowerCase();
                        this.currencys = this.currencys.filter(
                            x => x.Short_Name != null && x.Short_Name.toLocaleLowerCase().indexOf(this.strSearchShort_Name) != -1);
                    }

                    this.strSearchSub_Unit = (<HTMLInputElement>document.getElementById("searchSub_Unit")).value;
                    if (this.strSearchSub_Unit != '') {
                        this.strSearchSub_Unit = this.strSearchSub_Unit.toLocaleLowerCase();
                        this.currencys = this.currencys.filter(
                            x => x.Sub_Unit != null && x.Sub_Unit.toLocaleLowerCase().indexOf(this.strSearchSub_Unit) != -1);
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


    addCurrency() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Currency";
        this.modalBtnTitle = "Add";
        this.currencyFrm.reset();
        this.modal.open();
    }

    editCurrency(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Currency";
        this.modalBtnTitle = "Update";
        this.currency = this.currencys.filter(x => x.Id == id)[0];
        this.currencyFrm.setValue(this.currency);
        this.modal.open();
    }

    deleteCurrency(id: number, status: boolean) {
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

        this.currency = this.currencys.filter(x => x.Id == id)[0];
        this.currencyFrm.setValue(this.currency);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.currencyFrm.enable() : this.currencyFrm.disable();
    }
    
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.currencys);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._currencyService.post(Global.BASE_CURRENCY_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadCurrencys();
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
                this._currencyService.put(Global.BASE_CURRENCY_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadCurrencys();
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
                this._currencyService.delete(Global.BASE_CURRENCY_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Currency status changed successfully.";
                            this.LoadCurrencys();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing currency!"
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