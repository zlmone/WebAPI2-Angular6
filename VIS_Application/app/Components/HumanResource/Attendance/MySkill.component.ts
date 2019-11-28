import { Component, OnInit, ViewChild } from '@angular/core';
import { MySkillService } from '../../../Service/HumanResource/Attendance/MySkill.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IMySkill } from '../../../Model/HumanResource/Attendance/MySkill';

import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';


@Component({
    providers: [MySkillService],
    templateUrl: 'app/Components/HumanResource/Attendance/MySkill.component.html'
})

export class MySkillComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;

    MySkills: IMySkill[];
    MySkill: IMySkill;
  
    Childdata: IMySkill[];
    SecondData: IMySkill[];

    msg: string;
    indLoading: boolean = false;
    MySkillFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    MySkillFilter: string;
    isDesc: boolean = false;
    column: any = 'SkillName';
    direction: number;
    CurrentRecordsPerPage: number = 10;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;

    searchSkillName: string;
    searchSkillGroupName: string;


    constructor(private fb: FormBuilder, private _MySkillService: MySkillService, private pagerService: PagerService) { }

    ngOnInit(): void {
        this.MySkillFrm = this.fb.group({
            CompanyId: [''],
            mode: [''],
            UserID: [''],
            SkillName: [''],
            SkillGroup: [''],
            Skilltext: [''],
            SkillID: [''],
            lookupSkilId:[''],
            Name: [''],
            status: [''],
            IsApproved: [''],
            id :[''],
        });
        this.LoadMySkills(21);
     
    }

    MySkillFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.MySkillFilter = value;
    }


    MySkillSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

  

    deleteNewSkill(SkillID: number, UserId: number,) {
         
        this.indLoading = true;
        this._MySkillService.DeleteSkill(Global.BASE_MySkill_ENDPOINT, SkillID,21)
            .subscribe(data => {

                if (data.startsWith("Success: ")) //Success
                {
                    this.msg = data;
                    this.LoadMySkills(21);
                 
                }
                else {


                    alert(data);
                }



                this.indLoading = false;
                // initialize to page 1
                //this.JumpOnPageNewSkill(1);
            }
            //,error => this.msg = <any>error
            );
    }



    LoadChildgrop() {
        
        this.indLoading = true;
        this._MySkillService.GetPopupChildSkill(Global.BASE_MySkill_ENDPOINT)
            .subscribe(data => {
                this.Childdata = data
                this.indLoading = false;

            }

            );
    }
        
    LoadSkillName(event) {
        
        this.indLoading = true;
        this._MySkillService.GetPopupSecondSkill(Global.BASE_MySkill_ENDPOINT, event.target.value)
            .subscribe(data => {
                this.SecondData = data;
                this.indLoading = false;
            }

            );


    }
    LoadMySkills(UserId: number): void {
        
        this.indLoading = true;
        this._MySkillService.GetMySkill(Global.BASE_MySkill_ENDPOINT, UserId)
            .subscribe(MySkills => {
                this.MySkills = MySkills;
                console.log(MySkills)
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.searchSkillName = (<HTMLInputElement>document.getElementById("searchSkillName")).value;

                    if (this.searchSkillName != '') {
                        this.searchSkillName = this.searchSkillName.toLocaleLowerCase();
                        this.MySkills = this.MySkills.filter(
                            x => x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(this.searchSkillName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchSkillGroupName = (<HTMLInputElement>document.getElementById("searchSkillGroupName")).value;

                    if (this.searchSkillGroupName != '') {
                        this.searchSkillGroupName = this.searchSkillGroupName.toLocaleLowerCase();
                        this.MySkills = this.MySkills.filter(
                            x => x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(this.searchSkillGroupName) != -1);
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

  

    addMySkill() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New MySkill";
        this.modalBtnTitle = "Add";
        this.MySkillFrm.reset();
        this.modal.open();
        this.LoadChildgrop();

    }

    editMySkill(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit MySkill";
        this.modalBtnTitle = "Update";
      
        this.MySkillFrm.setValue(this.MySkill);
        this.modal.open();
    }

    deleteMySkill(id: number, status: boolean) {
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

     
        this.MySkillFrm.setValue(this.MySkill);
        this.modal.open();
    }

  



    SetControlsState(isEnable: boolean) {
        isEnable ? this.MySkillFrm.enable() : this.MySkillFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }
  

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.MySkills);
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
                
                this._MySkillService.post(Global.BASE_MySkill_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;
                            this.LoadMySkills(21);
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
                this._MySkillService.put(Global.BASE_MySkill_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "MySkill modified successfully.";
                            
                        }
                        else {
                            this.msg = "Error has occurred while modifying existing MySkill!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                
                this._MySkillService.DeleteSkill(Global.BASE_MySkill_ENDPOINT, formData._value.UserId, formData._value.SkillID).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "MySkill status changed successfully.";
                       
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing MySkill!"
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