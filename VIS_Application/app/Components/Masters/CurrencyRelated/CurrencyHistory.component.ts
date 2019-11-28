import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyHistoryService } from '../../../service/Masters/CurrencyRelated/CurrencyHistory.service';
import { ICurrency } from '../../../Model/Masters/CurrencyRelated/currency';
import { CurrencyService } from '../../../service/Masters/CurrencyRelated/currency.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICurrencyHistory } from '../../../Model/Masters/CurrencyRelated/CurrencyHistory';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component({
    providers: [CurrencyHistoryService, CurrencyService],
    templateUrl: 'app/Components/Masters/CurrencyRelated/CurrencyHistory.component.html'
})

export class CurrencyHistoryComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;

    lstCurrency: ICurrency[];

    objCurrencyDetail: ICurrency;

    objICurrencyHistory: ICurrencyHistory;
    listICurrencyHistory: ICurrencyHistory[];

    Year: number[];
    ToDayDate: Date = new Date();
    YearNow: number = this.ToDayDate.getFullYear();

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

    DefaultExchangeRate: string;
    CurrentExchangeRate: string;
    FromDate: string;
    ToDate: string;

    ResetModel()
    {
        this.objICurrencyHistory =
            ({
                CompanyId: 0,
                CreatedBy: '',
                CreatedOn: null,
                Currency_Id: 0,
                Current_Exch_Rate: 0,
                Date_Entered: null,
                Default_Exch_Rate: 0,
                FromDate: null,
                Id: 0,
                IsActive: false,
                Month_Entered: 1,
                ToDate: null,
                UpdatedBy: '',
                UpdatedOn: null,
                Year_Entered: this.YearNow
            });
    }

    constructor(private _CurrencyHistoryService: CurrencyHistoryService, private pagerService: PagerService, private _CurrencyService: CurrencyService, private _CommonHelperService: CommonHelperService)
    {
        
    }

    ngOnInit(): void
    {
        this._CommonHelperService.ToogleMenu();
        this.ResetModel();
        this.listICurrencyHistory = [({
            CompanyId: 0,
            CreatedBy: '',
            CreatedOn: null,
            Currency_Id: 0,
            Current_Exch_Rate: 0,
            Date_Entered: null,
            Default_Exch_Rate: 0,
            FromDate: null,
            Id: 0,
            IsActive: false,
            Month_Entered: 0,
            ToDate: null,
            UpdatedBy: '',
            UpdatedOn: null,
            Year_Entered: 0
        })];
        this.LoadCurrencyHistory();
        this.BindCurrencyDropdown()
        this.GetYear();
    }

    GetYear()
    {
        this.YearNow = new Date().getFullYear();
        this.Year = [];
        for (var i = 0; i < 100; i++)
        {
            this.Year.push(this.YearNow);
            this.YearNow++;
        }

    }

    ChangeDefaultExchangeRateByCurrency(id:number)
    {
        this._CurrencyHistoryService.getbyid(Global.BASE_CurrencyHistoryAPI_ENDPOINT, id).
            subscribe(defaultexchangerate =>
            {
                this.objICurrencyHistory.Default_Exch_Rate = Number(defaultexchangerate);
            });
    }

    CurrencyFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.CurrencyFilter = value;
    }

    CurrencySort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

    LoadCurrencyHistory(): void
    {
        this.indLoading = true;
        this._CurrencyHistoryService.get(Global.BASE_CurrencyHistoryAPI_ENDPOINT)
            .subscribe(currencyhistorylist => {
                this.listICurrencyHistory = currencyhistorylist;
                
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.DefaultExchangeRate = (<HTMLInputElement>document.getElementById("txtDefaultExchangeRate")).value;
                    if (this.DefaultExchangeRate != '') {
                        this.DefaultExchangeRate = this.DefaultExchangeRate.toLocaleLowerCase();
                        this.listICurrencyHistory = this.listICurrencyHistory.filter
                            (
                            x => x.Default_Exch_Rate != null && x.Default_Exch_Rate.toLocaleString().indexOf(this.DefaultExchangeRate) != -1);
                    }

                    this.CurrentExchangeRate = (<HTMLInputElement>document.getElementById("txtCurrentExchangeRate")).value;
                    if (this.CurrentExchangeRate != '') {
                        this.CurrentExchangeRate = this.CurrentExchangeRate.toLocaleLowerCase();
                        this.listICurrencyHistory = this.listICurrencyHistory.filter
                            (
                            x => x.Current_Exch_Rate != null && x.Current_Exch_Rate.toLocaleString().indexOf(this.CurrentExchangeRate) != -1);
                    }

                    this.FromDate = (<HTMLInputElement>document.getElementById("txtfromdate")).value;
                    if (this.FromDate != '')
                    {
                        this.FromDate = this.FromDate.toLocaleLowerCase();
                        this.listICurrencyHistory = this.listICurrencyHistory.filter
                            (
                            x => x.FromDate != null && x.FromDate.toLocaleString().indexOf(this.FromDate) != -1);
                    }

                    this.ToDate = (<HTMLInputElement>document.getElementById("txttodate")).value;
                    if (this.ToDate != '') {
                        this.ToDate = this.ToDate.toLocaleLowerCase();
                        this.listICurrencyHistory = this.listICurrencyHistory.filter
                            (
                            x => x.ToDate != null && x.ToDate.toLocaleString().indexOf(this.ToDate) != -1);
                    }
                }
                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            });
            //,error => this.msg = <any>error
            
    }

    BindCurrencyDropdown()
    {
        this._CurrencyService.get(Global.BASE_CURRENCY_ENDPOINT).
            subscribe(currencylist =>
            {
                this.lstCurrency = currencylist;
            })
        
    }

    addCurrencyhistory()
    {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Currency History";
        this.modalBtnTitle = "Add";
        this.objICurrencyHistory.Currency_Id = 0;
        this.objICurrencyHistory.Default_Exch_Rate = 0;
        this.objICurrencyHistory.Current_Exch_Rate = 0;
        this.objICurrencyHistory.Month_Entered = 1;
        this.YearNow = this.ToDayDate.getFullYear();
        this.objICurrencyHistory.Year_Entered = this.YearNow;
        this.modal.open();
    }

    editCurrencyhistory(id: number)
    {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Currency";
        this.modalBtnTitle = "Update";

        this.objICurrencyHistory = this.listICurrencyHistory.filter(x => x.Id == id)[0];
        this.YearNow = this.ToDayDate.getFullYear();

        if (this.objICurrencyHistory.Year_Entered < this.YearNow)
        {
            this.objICurrencyHistory.Year_Entered = this.YearNow;
        }

        this.modal.open();
    }

    deleteCurrencyhistory(id: number, status: boolean)
    {
        this.dbops = DBOperation.delete;
        
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
        
        this.objICurrencyHistory = this.listICurrencyHistory.filter(x => x.Id == id)[0];
        this.YearNow = this.ToDayDate.getFullYear();

        if (this.objICurrencyHistory.Year_Entered < this.YearNow)
        {
            this.objICurrencyHistory.Year_Entered = this.YearNow;
        }

        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.currencyFrm.enable() : this.currencyFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.listICurrencyHistory);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: ICurrencyHistory)
    {
        this.msg = "";

        if (formData.Currency_Id != 0)
        {
            switch (this.dbops)
            {
                case DBOperation.create:
                    this._CurrencyHistoryService.post(Global.BASE_CurrencyHistoryAPI_ENDPOINT, formData).subscribe(
                        data =>
                        {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.msg = data;
                                this.LoadCurrencyHistory();
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
                    this._CurrencyHistoryService.put(Global.BASE_CurrencyHistoryAPI_ENDPOINT, formData.Id, formData).subscribe(
                        data =>
                        {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.msg = data;
                                this.LoadCurrencyHistory();
                                this.modal.dismiss();
                            }
                            else {
                                alert(data);
                            }
                        },
                        error =>
                        {
                            this.msg = error;
                        }
                    );
                    break;
                case DBOperation.delete:
                    this._CurrencyHistoryService.delete(Global.BASE_CurrencyHistoryAPI_ENDPOINT, formData.Id).subscribe(
                        data =>
                        {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.msg = "Currency status changed successfully.";
                                this.LoadCurrencyHistory();
                            }
                            else {
                                this.msg = "Error has occurred while changing status of existing currency!"
                            }

                            this.modal.dismiss();
                        },
                        error =>
                        {
                            this.msg = error;
                        }
                    );
                    break;

            }
        }
        else
        {
            alert("Please Select Currency !");
        }
        

    }

}