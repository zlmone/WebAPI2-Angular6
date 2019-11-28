import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { LevelCriteriaSetupService } from '../../../service/Masters/EmployeeLevels/LevelCriteriaSetup.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ILevelCriteriaSetup, ICalculatedOnDLL,ICategoryDLL,ICriteriaDLL } from '../../../Model/Masters/EmployeeLevels/LevelCriteriaSetup';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component({
    selector:"level-criteria-setup",
    providers: [LevelCriteriaSetupService],
    templateUrl: 'app/Components/Masters/EmployeeLevels/LevelCriteriaSetup.component.html'
})

export class LevelCriteriaSetupComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
   // @ViewChild('modal') modal: ModalComponent;
    LevelCriteriaSetups: ILevelCriteriaSetup[];
    LevelCriteriaSetup: ILevelCriteriaSetup;
    LevelCriteriaSetupFilterDDL: ILevelCriteriaSetup;
    LevelCriteriaSetupForDll: ILevelCriteriaSetup[];
    CriteriaDllData: ICriteriaDLL;
    CategoryDllData: ICategoryDLL;
    CalculatedOnDllData: ICalculatedOnDLL;
    msg: string;
    indLoading: boolean = false;
    LevelCriteriaSetupFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    LevelCriteriaSetupFilter: string;
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
    strSearchName: string;
    strSearchType: string;
    strCalculatedOn: string;
    strPoints: string;
    strSearchCriteriaDetails: string;
    SelectedCalculatedOn: string;
    EditData: boolean;

    ArbCriteriaType: string;
    ArbSubType: string;
    ArbEnable: string;
    ArbCascading: string;
    ArbIsProgressive: string;
    ArbManualType: string;
    constructor(private fb: FormBuilder, private _LevelCriteriaSetupService: LevelCriteriaSetupService, private pagerService: PagerService)
    {
        this.ArbCriteriaType = "Automatic"
        this.ArbManualType = "PerformanceBased";
        this.ArbSubType = "Range";
    }

    ngOnInit(): void {
        
        this.LevelCriteriaSetup = ({
            Id: 0,
            IsAutomatic: false,
            IsRange: false,
            IsRepeated: false,
            IsOnce:false,
            IsPerformanceBased: false,
            IsEnable: false,
            ArbSubType: "",
            ArbCriteriaType: "",
            ArbIsProgressive: "",
            ArbCascading:"",
            ArbEnable:"",
          
            CriteriaID: 0,
            Criteria: '',
            Category:'',
            AIsRange: "",
            FromLimit: 0,
            ToLimit: 0,
            AIsRepeated: "",
            Units: 0,
            AIsOnce: "",
         //   rbPerformanceBasedType: false,
            ArbManualType: "",
            IsPercentage: false,
            Point: 0,
            Active:false,
            IsProgressive: false,
            ProgressiveDays: 0,
            ProgressivePoints: 0,
            //CalculatedOn: 0,
           // CompanyId: 0,
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
             dtFromDate:null,
            dtToDate:null,
            Name: '',
            CriteriaType: '',
            CalculatedOn: '',
            SelectPoint: 0,
            EntityMessage: ''

        });
        this.LoadLevelCriteriaSetups();
        
        this.LoadCriteria();
        this.LoadCalculatedOn();
        this.LoadCategory();
     
    }
    ClearModel(): void
    {
        this.LevelCriteriaSetup = ({
            Id: 0,
            IsAutomatic: false,
            IsRange: false,
            IsRepeated: false,
            IsOnce: false,
            IsPerformanceBased: false,
            IsEnable: false,
            ArbSubType: "",
            ArbCriteriaType: "",
            ArbIsProgressive: "",
            ArbCascading:"",
            ArbEnable: "",
            
            CriteriaID: 0,
            Criteria: '',
            Category: '',
            AIsRange: "",
            FromLimit: 0,
            ToLimit: 0,
            AIsRepeated: "",
            Units: 0,
            AIsOnce: "",
            //   rbPerformanceBasedType: false,
            ArbManualType: "",
            IsPercentage: false,
            Point: 0,
            Active: false,
            IsProgressive: false,
            ProgressiveDays: 0,
            ProgressivePoints: 0,
            //CalculatedOn: 0,
            // CompanyId: 0,
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
            dtFromDate:null,
            dtToDate:null,
            Name: '',
            CriteriaType: '',
            CalculatedOn: '',
            SelectPoint: 0,
            EntityMessage: ''
            

        });
    }
    LoadCriteria(): void
    {
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCriteria(Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(DATA => {
                this.LevelCriteriaSetupForDll = DATA;
                
            }
            //,error => this.msg = <any>error
            );
    }
    LoadCalculatedOn(): void {
    
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCalculatedOn(Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(DATA => {
                this.CalculatedOnDllData = DATA;
            }
            //,error => this.msg = <any>error
            );
    }
    LoadCategory(): void {
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCategory(Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(DATA => {
                this.CategoryDllData = DATA;
            }
            //,error => this.msg = <any>error
            );
    }

    LevelCriteriaSetupFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.LevelCriteriaSetupFilter = value;
    }

    LevelCriteriaSetupSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadLevelCriteriaSetups(): void {
        this.indLoading = true;
        this._LevelCriteriaSetupService.get(Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(LevelCriteriaSetups => {
                debugger;
                this.LevelCriteriaSetups = LevelCriteriaSetups;
            
                
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchName = (<HTMLInputElement>document.getElementById("searchName")).value;

                    if (this.strSearchName != '') {
                        this.strSearchName = this.strSearchName.toLocaleLowerCase();
                        this.LevelCriteriaSetups = this.LevelCriteriaSetups.filter(
                            x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strSearchName) != -1);
                    }

                    this.strSearchType = (<HTMLInputElement>document.getElementById("searchType")).value;
                    if (this.strSearchType != '') {
                        this.strSearchType = this.strSearchType.toLocaleLowerCase();
                        this.LevelCriteriaSetups = this.LevelCriteriaSetups.filter(
                            x => x.CriteriaType != null && x.CriteriaType.toLocaleLowerCase().indexOf(this.strSearchType) != -1);
                    }
                    this.strCalculatedOn = (<HTMLInputElement>document.getElementById("searchCalculatedOn")).value;
                    if (this.strCalculatedOn != '') {
                        this.strCalculatedOn = this.strCalculatedOn.toLocaleLowerCase();
                        this.LevelCriteriaSetups = this.LevelCriteriaSetups.filter(
                            x => x.CalculatedOn != null && x.CalculatedOn.toLocaleLowerCase().indexOf(this.strCalculatedOn) != -1);
                    }
                    //this.strPoints = (<HTMLInputElement>document.getElementById("searchPoints")).value;
                    //if (this.strPoints != '') {
                    //    this.strPoints = this.strPoints.toLocaleLowerCase();
                    //    this.LevelCriteriaSetups = this.LevelCriteriaSetups.filter(
                    //        x => x.Point != null && x.Point.toLocaleLowerCase().indexOf(this.strPoints) != -1);
                    //}

                }

                //Logic for searching - End

                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    addLevelCriteriaSetup() {
        this.EditData = false;
        this.ClearModel();
        this.dbops = DBOperation.create;
      //this.SetControlsState(true);
        this.modalTitle = "Add New Criteria";
        this.modalBtnTitle = "Add";
       // this.LevelCriteriaSetup.reset();
        this.modal.open();
    }

    editLevelCriteriaSetup(id: number) {
        
        this.ClearModel();
        this.EditData = true;
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Criteria";
        this.modalBtnTitle = "Update";
        this.LevelCriteriaSetup = this.LevelCriteriaSetups.filter(x => x.Id == id)[0];

        this.ArbEnable = "Yes";
        if (this.LevelCriteriaSetup.IsAutomatic) {
            this.ArbCriteriaType = "Automatic"
        

            if (this.LevelCriteriaSetup.IsRange) {
                this.ArbSubType = "Range";
            }
            else if (this.LevelCriteriaSetup.IsRepeated) {
                this.ArbSubType = "Repeated";
            }
            else {
                this.ArbSubType = "once";
            }
        }
        else {
            this.ArbCriteriaType = "Manual"

        }

        //cascadding
        if (this.LevelCriteriaSetup.IsProgressive) {
            this.ArbIsProgressive = "Yes";
        }
        else
        {
            this.ArbIsProgressive = "No";
        }
        
        
       // this.LevelCriteriaSetupFrm.setValue(this.LevelCriteriaSetup);
        this.modal.open();
    }

    deleteLevelCriteriaSetup(id: number, status: boolean) {
        this.dbops = DBOperation.delete;
       // this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        debugger;
        this.LevelCriteriaSetup = this.LevelCriteriaSetups.filter(x => x.Id == id)[0];
       // this.LevelCriteriaSetupFrm.setValue(this.LevelCriteriaSetup);
        this.modal.open();
    }

    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.LevelCriteriaSetupFrm.enable() : this.LevelCriteriaSetupFrm.disable();
    //}
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }
    ChangeCriteria(CriteriaId: number) {
        this.LevelCriteriaSetupFilterDDL = this.LevelCriteriaSetups.filter(x => x.Id == CriteriaId)[0]
        //this.SelectedCalculatedOn = this.LevelCriteriaSetupFilterDDL.CalculatedOn
        this.LevelCriteriaSetup.CalculatedOn = this.LevelCriteriaSetupFilterDDL.CalculatedOn;
        
    }
    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LevelCriteriaSetups);
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
               
                formData.CalculatedOn = this.LevelCriteriaSetup.CalculatedOn;
                this._LevelCriteriaSetupService.post(Global.BASE_LEVELCRITERIASETUP_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadLevelCriteriaSetups();
                            this.modal.dismiss();
                            this.ClearModel();
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
                formData.Id = this.LevelCriteriaSetup.Id;
                formData.CriteriaID = this.LevelCriteriaSetup.CriteriaID;
                this._LevelCriteriaSetupService.put(Global.BASE_LEVELCRITERIASETUP_ENDPOINT, formData.Id, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadLevelCriteriaSetups();
                            this.modal.dismiss();
                            this.ClearModel();
                            this.EditData = false;
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
                debugger;
                this._LevelCriteriaSetupService.delete(Global.BASE_LEVELCRITERIASETUP_ENDPOINT, this.LevelCriteriaSetup.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "LevelCriteriaSetup status changed successfully.";
                            this.LoadLevelCriteriaSetups();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing LevelCriteriaSetup!"
                        }

                        this.modal.dismiss();
                        this.ClearModel();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
        }
    }
}