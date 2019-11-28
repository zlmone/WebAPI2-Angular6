import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { LevelConfigurationService } from '../../../service/Masters/EmployeeLevels/LevelConfiguration.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ILevelConfiguration } from '../../../Model/Masters/EmployeeLevels/LevelConfiguration';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component({
    providers: [LevelConfigurationService],
    templateUrl: 'app/Components/Masters/EmployeeLevels/LevelConfiguration.component.html'
})

export class LevelConfigurationComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    LevelConfigurations: ILevelConfiguration[];
    public LevelConfiguration: ILevelConfiguration;
    msg: string;
    indLoading: boolean = false;
    LevelConfigurationFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    LevelConfigurationFilter: string;
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
    strsearchPeriodName: string;
    strSearchLevelConfigurationDetails: string;

    ArrayYear: number[] = new Array();
    CurrentYear: number;
    YearforEdit: number;

    constructor(private fb: FormBuilder, private _LevelConfigurationService: LevelConfigurationService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.LevelConfigurationFrm = this.fb.group({
            Id: [''],
            Period: [''],
            PeriodName: [''],
            StartDate: [''],
            EndDate: [''],
            Active: [''],
            IsCurrentPeriod: [''],
            StartYear: [''],
            StartMonth: [''],
            CompanyId: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });


        this.LoadLevelConfigurations()
       this.YearforEdit = ((new Date()).getFullYear())-1;
      

    }

    LevelConfigurationFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.LevelConfigurationFilter = value;
    }

    LevelConfigurationSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadLevelConfigurations(): void {
        debugger
        this.indLoading = true;
        this._LevelConfigurationService.get(Global.BASE_LEVELCONFIGURATION_ENDPOINT)
            .subscribe(LevelConfigurations => {
                debugger;
                this.LevelConfigurations = LevelConfigurations;
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strsearchPeriodName = (<HTMLInputElement>document.getElementById("searchPeriodName")).value;

                    if (this.strsearchPeriodName != '') {
                        this.strsearchPeriodName = this.strsearchPeriodName.toLocaleLowerCase();
                        this.LevelConfigurations = this.LevelConfigurations.filter(
                            x => x.PeriodName != null && x.PeriodName.toLocaleLowerCase().indexOf(this.strsearchPeriodName) != -1);
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
    FillYear()
    {
        this.ArrayYear = [];
        var displayDate = (new Date()).getFullYear();
        var EndDate = displayDate;
        var j: number = 6;

        for (var i = 0; i < j; i++) {
            this.ArrayYear.push(EndDate);
            EndDate = EndDate + 1;
        }
    }
    addLevelConfiguration() {
        this.FillYear();
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New LevelConfiguration";
        this.modalBtnTitle = "Add";
        this.LevelConfigurationFrm.reset();
        this.modal.open();
    }

    editLevelConfiguration(id: number) {
        debugger;
        this.FillYear();
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit LevelConfiguration";
        this.modalBtnTitle = "Update";
        this.LevelConfiguration = this.LevelConfigurations.filter(x => x.Id == id)[0];
        this.LevelConfigurationFrm.setValue(this.LevelConfiguration);
        this.modal.open();
    }

    deleteLevelConfiguration(id: number, status: boolean) {
        this.FillYear();
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

        this.LevelConfiguration = this.LevelConfigurations.filter(x => x.Id == id)[0];
        this.LevelConfigurationFrm.setValue(this.LevelConfiguration);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.LevelConfigurationFrm.enable() : this.LevelConfigurationFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LevelConfigurations);
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
                
                this._LevelConfigurationService.post(Global.BASE_LEVELCONFIGURATION_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadLevelConfigurations();
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
                this._LevelConfigurationService.put(Global.BASE_LEVELCONFIGURATION_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadLevelConfigurations();
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
                this._LevelConfigurationService.delete(Global.BASE_LEVELCONFIGURATION_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "LevelConfiguration status changed successfully.";
                            this.LoadLevelConfigurations();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing LevelConfiguration!"
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