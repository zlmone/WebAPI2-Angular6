import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { ManualPointEntryService } from '../../../service/Masters/EmployeeLevels/ManualPointEntry.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IManualPointEntry,IEmployeeTag } from '../../../Model/Masters/EmployeeLevels/ManualPointEntry';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';




@Component({
    //selector: 'ss-multiselect-dropdown',
    providers: [ManualPointEntryService],
    templateUrl: 'app/Components/Masters/EmployeeLevels/ManualPointEntry.component.html',
    //styleUrls: ['./dropdown.component.css'],
    
})

export class ManualPointEntryComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    ManualPointEntrys: IManualPointEntry[];
   
    ListCriteria: IManualPointEntry[];
    ListCategory: IManualPointEntry[];
    DataOnCriteria: IManualPointEntry;
    public ManualPointEntry: IManualPointEntry;
    EmployeeTag: IEmployeeTag[];
    msg: string;
    indLoading: boolean = false;
    ManualPointEntryFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    ManualPointEntryFilter: string;
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
    strsearchEmpName: string;
    strsearchCriteria: string;
    strsearchRemarks: string;
    strSearchManualPointEntryDetails: string;
    ////////////////////////////////
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    //myOptions: IMultiSelectOption[];
    IMultiSelectOption: IEmployeeTag[];
    ////////////////////////////////
    constructor(private fb: FormBuilder, private _ManualPointEntryService: ManualPointEntryService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.ManualPointEntry ={
            Id: 0,
            GroupID: 0,
            EmpName: "",
           
            Criteria: "",
            Points: 0,
            Point:0,
            Month: null,
            Remarks: "",
            Category: "",
            Type: "",
            ForDate: null,
            CriteriaId: 0,
            IsPerformanceBadge: false,
            CategoryId: 0,
          
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
            EntityMessage: ""
        };
        this.TestMultidll()
        this.LoadManualPointEntrys()
        this.LoadCriteria()
        this.LoadCategory()
       
        this.LoadEmployee()
    }
    LoadEmployee(): void {
        debugger;
        this._ManualPointEntryService.GetEmployeeList(Global.BASE_ManualPointEntry_ENDPOINT)
            .subscribe(DATA => {
                this.IMultiSelectOption = DATA;
                debugger;
            }
            //,error => this.msg = <any>error
            );   

    }
    TestMultidll(): void
    {
        debugger;
        this.myOptions = [
            { id: 6, name: 'Option 1'},
            { id: 7, name: 'Option 2' },
            { id: 8, name: 'Option 3' }
        ];
    }
    onChange() {
        console.log(this.optionsModel);
    }
    LoadCriteria(): void
    {
        this._ManualPointEntryService.getCriteria(Global.BASE_ManualPointEntry_ENDPOINT)
                .subscribe(DATA => {
                    this.ListCriteria = DATA;
                }
                //,error => this.msg = <any>error
                );   
    }

    LoadCategory(): void {
        this._ManualPointEntryService.getCategory(Global.BASE_ManualPointEntry_ENDPOINT)
            .subscribe(DATA => {
                this.ListCategory = DATA;
            }
            //,error => this.msg = <any>error
            );
    }

    ManualPointEntryFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.ManualPointEntryFilter = value;
    }

    ManualPointEntrySort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadManualPointEntrys(): void {
      
        this.indLoading = true;
        this._ManualPointEntryService.get(Global.BASE_ManualPointEntry_ENDPOINT)
            .subscribe(ManualPointEntrys => {
                this.ManualPointEntrys = ManualPointEntrys;
                //Logic for searching - start

                if (this.ShowHideSearch) {
                    this.strsearchEmpName = (<HTMLInputElement>document.getElementById("searchEmpName")).value;
                    if (this.strsearchEmpName != '') {
                        this.strsearchEmpName = this.strsearchEmpName.toLocaleLowerCase();
                        this.ManualPointEntrys = this.ManualPointEntrys.filter(
                            x => x.EmpName != null && x.EmpName.toLocaleLowerCase().indexOf(this.strsearchEmpName) != -1);
                    }
                }

                if (this.ShowHideSearch) {
                   
                    this.strsearchCriteria = (<HTMLInputElement>document.getElementById("searchCriteria")).value;
                    if (this.strsearchCriteria != '') {
                        this.strsearchCriteria = this.strsearchCriteria.toLocaleLowerCase();
                        this.ManualPointEntrys = this.ManualPointEntrys.filter(
                            x => x.Criteria != null && x.Criteria.toLocaleLowerCase().indexOf(this.strsearchCriteria) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.strsearchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
                    if (this.strsearchRemarks != '') {
                        this.strsearchRemarks = this.strsearchRemarks.toLocaleLowerCase();
                        this.ManualPointEntrys = this.ManualPointEntrys.filter(
                            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.strsearchRemarks) != -1);
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
   
    addManualPointEntry() {
       
        this.dbops = DBOperation.create;
       // this.SetControlsState(true);
        this.modalTitle = "Add New ManualPointEntry";
        this.modalBtnTitle = "Add";
        //this.ManualPointEntryFrm.reset();
        this.modal.open();
    }

    editManualPointEntry(id: number) {
        
        this.dbops = DBOperation.update;
       // this.SetControlsState(true);
        this.modalTitle = "Edit ManualPointEntry";
        this.modalBtnTitle = "Update";
        this.ManualPointEntry = this.ManualPointEntrys.filter(x => x.Id == id)[0];
      //  this.ManualPointEntryFrm.setValue(this.ManualPointEntry);
        this.modal.open();
    }

    deleteManualPointEntry(id: number, status: boolean) {
       
        this.dbops = DBOperation.delete;
        //this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }

        this.ManualPointEntry = this.ManualPointEntrys.filter(x => x.Id == id)[0];
       // this.ManualPointEntryFrm.setValue(this.ManualPointEntry);
        this.modal.open();
    }

    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.ManualPointEntryFrm.enable() : this.ManualPointEntryFrm.disable();
    //}
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    ChangeCriteria(CriteriaId: number) { 
        this._ManualPointEntryService.GetDataOnChange(Global.BASE_ManualPointEntry_ENDPOINT,CriteriaId)
            .subscribe(DATA => {
               
                this.DataOnCriteria = DATA;
               // this.ManualPointEntry = this.DataOnCriteria;
                if (this.DataOnCriteria.IsPerformanceBadge == false) {
                    this.ManualPointEntry.Type = "Manual";
                }
                else {
                    this.ManualPointEntry.Type = "Performance Badges";
                }
                this.ManualPointEntry.Points = this.DataOnCriteria.Point;
                this.ManualPointEntry.CategoryId = this.DataOnCriteria.CategoryId

                
            }
            //,error => this.msg = <any>error
            );
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.ManualPointEntrys);
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
                debugger;
            
                    formData.EmpName = formData.EmpName.toString();
              
                
                this._ManualPointEntryService.post(Global.BASE_ManualPointEntry_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadManualPointEntrys();
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
                this._ManualPointEntryService.put(Global.BASE_ManualPointEntry_ENDPOINT, formData._value.Id, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadManualPointEntrys();
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
                this._ManualPointEntryService.delete(Global.BASE_ManualPointEntry_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "ManualPointEntry status changed successfully.";
                            this.LoadManualPointEntrys();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing ManualPointEntry!"
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




