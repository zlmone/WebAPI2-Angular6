
import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { FinancialYearService } from '../../../service/Masters/CompanyRelated/FinancialYear.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IFinancialYear } from '../../../Model/Masters/CompanyRelated/FinancialYear';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component({
    providers: [FinancialYearService],
    templateUrl: 'app/Components/Masters/CompanyRelated/FinancialYear.component.html'
})



export class FinancialYearComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    FinancialYears: IFinancialYear[];
    public FinancialYear: IFinancialYear;
    msg: string;
    indLoading: boolean = false;
    FinancialYearFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    FinancialYearFilter: string;
    isDesc: boolean = false;
    column: any = 'Full_Name';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    PagerInformation: string;
    // paged items
    pagedItems: any[];

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchFromMonth: string;
    strSearchToMonth: string;
    strSearchCurrentYear: string;
    strSearchNextyear: string;
    ArrayYear: number[] = new Array();
    CurrentYear: number;
    
    constructor(private fb: FormBuilder, private _FinancialYearService: FinancialYearService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.FinancialYear = ({
            Id: 0,
            FromMonth:'',
            ToMonth: '',
            CurrentYear:'',
            Nextyear: '',
            FinancialYear: '',
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
            EntityMessage: ''
          
        });
        this.LoadFinancialYearsCM();
        this.LoadFinancialYears();
    }
    LoadFinancialYearsCM(): void
    {
       
       
    }
    GetNextYear(): void
    {
        this.ArrayYear = [];
        var displayDate = (new Date()).getFullYear();
        var EndDate = displayDate + 1;
        var j: number = 10;
        

        for (var i = 0; i < j; i++) {
            this.ArrayYear.push(EndDate);
            EndDate = EndDate - 1;
        }
    }
    FinancialYearFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.FinancialYearFilter = value;
    }

    FinancialYearSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ResetInputControls(): void
    {
        this.FinancialYear.FinancialYear = null;
        this.FinancialYear.FromMonth = null;
        this.FinancialYear.Nextyear = null;
        this.FinancialYear.ToMonth = null;
    }

    LoadFinancialYears(): void {
        
        this.indLoading = true;
        this._FinancialYearService.get(Global.BASE_FINANCIALYEAR_ENDPOINT)
            .subscribe(FinancialYears => {
                this.FinancialYears = FinancialYears;
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchFromMonth = (<HTMLInputElement>document.getElementById("searchFromMonth")).value;

                    if (this.strSearchFromMonth != '') {
                        this.strSearchFromMonth = this.strSearchFromMonth.toLocaleLowerCase();
                        this.FinancialYears = this.FinancialYears.filter(
                            x => x.FromMonth != null && x.FromMonth.toLocaleLowerCase().indexOf(this.strSearchFromMonth) != -1);
                    }

                    this.strSearchToMonth = (<HTMLInputElement>document.getElementById("searchToMonth")).value;
                    if (this.strSearchToMonth != '') {
                        this.strSearchToMonth = this.strSearchToMonth.toLocaleLowerCase();
                        this.FinancialYears = this.FinancialYears.filter(
                            x => x.ToMonth != null && x.ToMonth.toLocaleLowerCase().indexOf(this.strSearchToMonth) != -1);
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

    
    
    addFinancialYear() {
        
      //  this.ResetInputControls();
        $(function () {
            
            var year = $("#lblYear").val((new Date()).getFullYear());

        });
        this.GetNextYear();
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Financial Year";
        this.modalBtnTitle = "Add";
        
        //this.FinancialYearFrm.reset();
        this.modal.open();
    }

    editFinancialYear(id: number) {
        
        this.GetNextYear();
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Financial Year";
        this.modalBtnTitle = "Update";
        this.FinancialYear = this.FinancialYears.filter(x => x.Id == id)[0];
        //this.FinancialYearFrm.setValue(this.FinancialYear);
        this.modal.open();
    }

    deleteFinancialYear(id: number, status: boolean) {
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

        this.FinancialYear = this.FinancialYears.filter(x => x.Id == id)[0];
        //this.FinancialYearFrm.setValue(this.FinancialYear);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
       // isEnable ? this.FinancialYearFrm.enable() : this.FinancialYearFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.FinancialYears);
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
                
                this._FinancialYearService.post(Global.BASE_FINANCIALYEAR_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadFinancialYears();
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
                
                this._FinancialYearService.put(Global.BASE_FINANCIALYEAR_ENDPOINT, formData.Id, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadFinancialYears();
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
                this._FinancialYearService.delete(Global.BASE_FINANCIALYEAR_ENDPOINT, formData.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Financial Year status changed successfully.";
                            this.LoadFinancialYears();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing FinancialYear!"
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