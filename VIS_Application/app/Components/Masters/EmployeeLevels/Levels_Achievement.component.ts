
import { Component, OnInit, ViewChild } from '@angular/core';
import { Levels_AchievementService } from '../../../service/Masters/EmployeeLevels/Levels_Achievement.service';
import { LevelCriteriaSetupService } from '../../../service/Masters/EmployeeLevels/LevelCriteriaSetup.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ILevels_Achievement, IForIsCriteria } from '../../../Model/Masters/EmployeeLevels/Levels_Achievement';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { ILevelCriteriaSetup } from '../../../Model/Masters/EmployeeLevels/LevelCriteriaSetup';
import { Http, RequestOptions, Headers, Response } from '@angular/http'; 

@Component({
    providers: [Levels_AchievementService, LevelCriteriaSetupService],
    templateUrl: 'app/Components/Masters/EmployeeLevels/Levels_Achievement.component.html'
})

export class Levels_AchievementComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    Levels_Achievements: ILevels_Achievement[];
    Levels_AchievementsForImage: ILevels_Achievement;
    Levels_AchievementEdit: ILevels_Achievement;
    Levels_Achievement: ILevels_Achievement;
    LevelCriteriaSetupForDll: ILevelCriteriaSetup[];
    IsCriteriaList: IForIsCriteria[];
    ForSetupId: ILevels_Achievement;
    SetupId: number;
    msg: string;
    indLoading: boolean = false;
    Levels_AchievementFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    Levels_AchievementFilter: string;
    isDesc: boolean = false;
    column: any = 'LevelName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchAchievementName: string;
    strSearchCriteriaName: string;
    strSearchCalculatedIn: string;
    strSearchSelectActive: string;
    fileList1: FileList;
    imagePath: string;
    VisibleCriteria: boolean;
    ImgGlobalPath: string;
    ImageEdit: File;
   
   

    constructor(private fb: FormBuilder, private _Levels_AchievementService: Levels_AchievementService, private _LevelCriteriaSetupService: LevelCriteriaSetupService, private pagerService: PagerService, private http: Http) { }
    fileChange1(event) {
        this.fileList1 = event.target.files;
    }
    ngOnInit(): void {

        this.Levels_AchievementFrm = this.fb.group({
           
            Id: [''],
            CompanyId: [''],
            Range:[''],
            CriteriaId:[''],
            CriteriaName: [''],
            CalculatedIn: [''],
            SelectActive:[''],
            AchievementName: [''],
            SetUpID: [''],
            IsCriteria: [''],
            AndAbove: [''],
            Description: [''],
            Help: [''],
            Calculated: [''],
            AchievedIn: [''],
            Points: [''],
            Image: [''],
            Active: [''],
            IsActive: [''],
            LevelSetupId: [''],
            CreatedBy: [''],
            CreatedOn: [''],
            UpdatedBy: [''],
            UpdatedOn: [''],
            EntityMessage:['']
        });

        this.LoadLevels_Achievements();
        this.LoadCriteria()

    }

    Levels_AchievementSearchCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.Levels_AchievementFilter = value;
    }

    Levels_AchievementSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }
    LoadCriteria(): void {
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCriteria(Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(DATA => {
                this.LevelCriteriaSetupForDll = DATA;
            }
            //,error => this.msg = <any>error
            );
    }
    LoadLevels_Achievements(): void {
        this.VisibleCriteria = false;
        this.indLoading = true;
        this._Levels_AchievementService.get(Global.BASE_Levels_Achievement_ENDPOINT)
            .subscribe(Levels_Achievements => {
                debugger;
                this.Levels_Achievements = Levels_Achievements;
               
                //Logic for searching - start
                if (this.ShowHideSearch) {

                    this.strSearchAchievementName = (<HTMLInputElement>document.getElementById("searchAchievementName")).value;
                    if (this.strSearchAchievementName != '') {
                        this.strSearchAchievementName = this.strSearchAchievementName.toLocaleLowerCase();
                        this.Levels_Achievements = this.Levels_Achievements.filter(
                            x => x.AchievementName != null && x.AchievementName.toLocaleLowerCase().indexOf(this.strSearchAchievementName) != -1);
                    }
                    this.strSearchCriteriaName = (<HTMLInputElement>document.getElementById("searchCriteriaName")).value;
                    if (this.strSearchCriteriaName != '') {
                        this.strSearchCriteriaName = this.strSearchCriteriaName.toLocaleLowerCase();
                        this.Levels_Achievements = this.Levels_Achievements.filter(
                            x => x.CriteriaName != null && x.CriteriaName.toLocaleLowerCase().indexOf(this.strSearchCriteriaName) != -1);
                    }
                    this.strSearchCalculatedIn = (<HTMLInputElement>document.getElementById("searchCalculatedIn")).value;
                    if (this.strSearchCalculatedIn != '') {
                        this.strSearchCalculatedIn = this.strSearchCalculatedIn.toLocaleLowerCase();
                        this.Levels_Achievements = this.Levels_Achievements.filter(
                            x => x.CalculatedIn != null && x.CalculatedIn.toLocaleLowerCase().indexOf(this.strSearchCalculatedIn) != -1);
                    }
                    this.strSearchSelectActive = (<HTMLInputElement>document.getElementById("searchActive")).value;
                    if (this.strSearchSelectActive != '') {
                        this.strSearchSelectActive = this.strSearchSelectActive.toLocaleLowerCase();
                        this.Levels_Achievements = this.Levels_Achievements.filter(
                            x => x.SelectActive != null && x.SelectActive.toLocaleLowerCase().indexOf(this.strSearchSelectActive) != -1);
                    }

                   
                }

                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    ChangeCriteria(value:number)
    {
        this.VisibleCriteria = false;
        this.indLoading = true;
        this._Levels_AchievementService.getIsCriteria(Global.BASE_Levels_Achievement_ENDPOINT, value)
            .subscribe(Data => {
                this.IsCriteriaList = Data;
                if (this.IsCriteriaList.length > 1) {
                    this.VisibleCriteria = true;
                }
                else {
                    this.VisibleCriteria = false;
                    
                }
               
            }
            //,error => this.msg = <any>error
            );
    }

    addLevels_Achievement() {
        this.imagePath = null;
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Achievement";
        this.modalBtnTitle = "Add";
        this.Levels_AchievementFrm.reset();
        this.modal.open();
    }

    editLevels_Achievement(id: number) {
        this.ImgGlobalPath = Global.WebAccessURL;
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Achievement";
        this.modalBtnTitle = "Update";
        this.Levels_Achievement = this.Levels_Achievements.filter(x => x.Id == id)[0];
       

        this._Levels_AchievementService.GetDataOnEdit(Global.BASE_Levels_Achievement_ENDPOINT, this.Levels_Achievement.Id)
            .subscribe(Levels_Achieve =>
            {
               
                this.Levels_AchievementEdit = Levels_Achieve[0];
                this.Levels_AchievementsForImage = this.Levels_AchievementEdit;
                this.imagePath = this.Levels_AchievementEdit.Image;
                this.Levels_AchievementEdit.Image = null;

                if (this.Levels_AchievementEdit.IsCriteria) {
                    this.Levels_AchievementEdit.CriteriaId = this.Levels_AchievementEdit.SetUpID;
                    this.VisibleCriteria = false;
                }
                else {
                    this.VisibleCriteria = true;
                    this.ChangeCriteria(this.Levels_AchievementEdit.CriteriaId)
                    this.Levels_AchievementEdit.Range = this.Levels_AchievementEdit.SetUpID;
                }
               
                
                this.Levels_AchievementFrm.setValue(this.Levels_AchievementEdit);
                this.modal.open();
                this.indLoading = false;
            } 
            //,*error => this.msg = <any>error*/
            );
       // this.Levels_Achievement.Id = this.Levels_Achievement.AchievementID;
        
    }

    deleteLevels_Achievement(id: number, status: any) {
        debugger;
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        if (status == "Yes") {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
            
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }

        this.Levels_Achievement = this.Levels_Achievements.filter(x => x.Id == id)[0];
        this.Levels_AchievementFrm.setValue(this.Levels_Achievement);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.Levels_AchievementFrm.enable() : this.Levels_AchievementFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Levels_Achievements);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }
   GetSetupIdFromCriteriaId(CriteriaId):number
    {
        this._LevelCriteriaSetupService.getLevelSetupId(Global.BASE_LEVELCRITERIASETUP_ENDPOINT, CriteriaId)
            .subscribe(Data => {
                this.SetupId = Data;
           

            },
            
            //,error => this.msg = <any>error

        );
        return this.SetupId;
    }

    onSubmit(formData: any) {
        this.msg = "";
        /////
        
       
        switch (this.dbops) {
            case DBOperation.create:
                if (this.fileList1 != null) {
                    formData._value.Image = "/Upload/EmployeeLevels/" + this.fileList1.item(0).name;

                    if (this.VisibleCriteria == true) {
                        if (formData._value.Range > 0) {
                            formData._value.IsCriteria = false;
                            formData._value.SetUpID = formData._value.Range;
                            formData._value.AndAbove = true;
                            formData._value.LevelSetupId = formData._value.Range;
                        }
                        else {
                            formData._value.IsCriteria = true;
                            formData._value.SetUpID = formData._value.CriteriaId;
                            formData._value.AndAbove = false;
                            
                            formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                        }
                    }
                    else {
                        formData._value.IsCriteria = true;
                        formData._value.SetUpID = formData._value.CriteriaId;
                        formData._value.AndAbove = false;
                        formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                        
                        
                    }
                    this._Levels_AchievementService.post(Global.BASE_Levels_Achievement_ENDPOINT, formData._value).subscribe(
                        data => {
                            if (data.startsWith("Success: "))//Success
                            {
                                if (this.fileList1 != null) {

                                    if (this.fileList1.length > 0) {

                                        this.fileList1.item(0).name
                                        let file: File = this.fileList1[0];
                                        let formData: FormData = new FormData();
                                        formData.append('uploadFile', file, file.name);
                                        let headers = new Headers()
                                        let options = new RequestOptions({ headers: headers });
                                        let apiUrl1 = "/api/Levels_AchievementAPI/UploadJsonFile";
                                        this.http.post(apiUrl1, formData, options)
                                            .map(res => res.json())
                                            .catch(error => Observable.throw(error))
                                            .subscribe(
                                            data => console.log('success'),
                                            error => console.log(error)
                                            )
                                        this.fileList1 = null;
                                    }
                                }


                                this.msg = data;
                                this.LoadLevels_Achievements();
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
                }
                else {
                    alert('Please select Image file');
                }
               
                break;
            case DBOperation.update:
               
                if (this.fileList1 != null) {
                    formData._value.Image = "/Upload/EmployeeLevels/" + this.fileList1.item(0).name;
                }

                    if (this.VisibleCriteria == true) {
                        if (formData._value.Range > 0) {
                            formData._value.IsCriteria = false;
                            formData._value.SetUpID = formData._value.Range;
                            formData._value.AndAbove = true;
                            formData._value.LevelSetupId = formData._value.Range;
                        }
                        else {
                            formData._value.IsCriteria = true;
                            formData._value.SetUpID = formData._value.CriteriaId;
                            formData._value.AndAbove = false;

                            formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                        }
                    }
                    else {
                        formData._value.IsCriteria = true;
                        formData._value.SetUpID = formData._value.CriteriaId;
                        formData._value.AndAbove = false;
                        formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                       

                    }


                this._Levels_AchievementService.put(Global.BASE_Levels_Achievement_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            if (this.fileList1 != null) {

                                if (this.fileList1.length > 0) {

                                    this.fileList1.item(0).name
                                    let file: File = this.fileList1[0];
                                    let formData: FormData = new FormData();
                                    formData.append('uploadFile', file, file.name);
                                    let headers = new Headers()
                                    let options = new RequestOptions({ headers: headers });
                                    let apiUrl1 = "/api/Levels_AchievementAPI/UploadJsonFile";
                                    this.http.post(apiUrl1, formData, options)
                                        .map(res => res.json())
                                        .catch(error => Observable.throw(error))
                                        .subscribe(
                                        data => console.log('success'),
                                        error => console.log(error)
                                        )
                                    this.fileList1 = null;
                                }
                            }

                            this.msg = data;
                            this.LoadLevels_Achievements();
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
                this._Levels_AchievementService.delete(Global.BASE_Levels_Achievement_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Levels_Achievement status changed successfully.";
                            this.LoadLevels_Achievements();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing Levels_Achievement!"
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