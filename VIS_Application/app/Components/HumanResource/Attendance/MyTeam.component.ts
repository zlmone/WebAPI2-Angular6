import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTeamService } from '../../../Service/HumanResource/Attendance/MyTeam.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IMyTeam } from '../../../Model/HumanResource/Attendance/MyTeam';
import { ILinemanager } from '../../../Model/HumanResource/Attendance/MyTeam';
import { ISkillLevel } from '../../../Model/HumanResource/Attendance/MyTeam';
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
    providers: [MyTeamService],
    templateUrl: 'app/Components/HumanResource/Attendance/MyTeam.component.html'
})

export class MyTeamComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;

    MyTeams: IMyTeam[];
    MyTeam: IMyTeam;
    HoverList: IMyTeam[];
    Childdata: IMyTeam[];
    SecondData: IMyTeam[];
    Linemangers: ILinemanager[];
    Linemanger: ILinemanager;
    Skillleavels: ISkillLevel[];
    SkillLevel: ISkillLevel;
    Skillleavellist: ISkillLevel[];
    msg: string;
    indLoading: boolean = false;
    MyTeamFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    MyTeamFilter: string;
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
    ShowHideSearchNew: boolean = false;

    searchName: string;
    searchNumberOfSkill: string;
    searchNumberToBeApproved: string;

    //second table
    searchSkillName: string;
    searchSkillGroup: string;
    searchleavel: string;

    constructor(private fb: FormBuilder, private _MyTeamService: MyTeamService, private pagerService: PagerService) { }

    ngOnInit(): void {
        this.MyTeamFrm = this.fb.group({
            CompanyId: [''],
            mode: [''],
            UserID: [''],
            Name: [''],
            NumberOfSkill: [''],
            NumberToBeApproved: [''],
            SkillName: [''],
            SkillGroup: [''],
            leavel: [''],
            SkillID: [''],
            id: [''],
            IsApproved: [''],
            Status: [''],

        });
        this.LoadMyTeams(21);





    }

    MyTeamFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.MyTeamFilter = value;
    }


    MyTeamSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }
    MyTeamSortNew(property: any) {
        if (!this.ShowHideSearchNew) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

    MouseHover(id: number): void {

        //this.LoadhoverPopup(event.target.value);
        this.indLoading = true;
        this._MyTeamService.GetHoverPopup(Global.BASE_MyTeam_ENDPOINT, id)
            .subscribe(data => {
                this.HoverList = data;

                console.log(data);

                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );

    }





    LoadMyTeams(UserId: number): void {

        this.indLoading = true;
        this._MyTeamService.GetMyTeam(Global.BASE_MyTeam_ENDPOINT, UserId)
            .subscribe(MyTeams => {
                this.MyTeams = MyTeams;
                console.log(MyTeams)
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.searchName = (<HTMLInputElement>document.getElementById("searchName")).value;

                    if (this.searchName != '') {
                        this.searchName = this.searchName.toLocaleLowerCase();
                        this.MyTeams = this.MyTeams.filter(
                            x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.searchName) != -1);
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



    addMyTeam() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New MyTeam";
        this.modalBtnTitle = "Add";
        this.MyTeamFrm.reset();
        this.modal.open();

    }

    editMyTeam(id: number) {
        debugger;
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit MyTeam";
        this.modalBtnTitle = "Update";
        this.indLoading = true;
        this._MyTeamService.GetLinemanager(Global.BASE_MyTeam_ENDPOINT, id)
            .subscribe(Linemangers => {
                this.Linemangers = Linemangers;
                //Logic for searching - start
                if (this.ShowHideSearchNew) {
                    this.searchSkillName = (<HTMLInputElement>document.getElementById("searchSkillName")).value;

                    if (this.searchSkillName != '') {
                        this.searchSkillName = this.searchSkillName.toLocaleLowerCase();
                        this.Linemangers = this.Linemangers.filter(
                            x => x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(this.searchName) != -1);
                    }

                    this.searchSkillGroup = (<HTMLInputElement>document.getElementById("searchSkillGroup")).value;

                    if (this.searchSkillGroup != '') {
                        this.searchSkillGroup = this.searchSkillGroup.toLocaleLowerCase();
                        this.Linemangers = this.Linemangers.filter(
                            x => x.SkillGroup != null && x.SkillGroup.toLocaleLowerCase().indexOf(this.searchSkillGroup) != -1);
                    }
                }
                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
            }
            //,error => this.msg = <any>error
            );

        this.modal.open();
    }
    GetSkillOrderLeavel(SkillId: number) {
        if (SkillId != null) {

            this._MyTeamService.GetSkill(Global.BASE_MyTeam_ENDPOINT, SkillId)
                .subscribe(Skillleavels => {
                    this.Skillleavels = Skillleavels;


                    //Logic for searching - End
                    this.indLoading = false;
                    // initialize to page 1

                }
                //,error => this.msg = <any>error
                );
        }

        else {
            alert(SkillId)
        }

    }


    deleteMyTeam(id: number, status: boolean) {
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


        this.MyTeamFrm.setValue(this.MyTeam);
        this.modal.open();
    }





    SetControlsState(isEnable: boolean) {
        isEnable ? this.MyTeamFrm.enable() : this.MyTeamFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }


    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.MyTeams);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }



    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }


    ShowHideSearchControlsNew() {
        this.ShowHideSearchNew = !this.ShowHideSearchNew;
    }


    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:

                this._MyTeamService.post(Global.BASE_MyTeam_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;
                            this.LoadMyTeams(21);
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
                this._MyTeamService.put(Global.BASE_MyTeam_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;
                            this.LoadMyTeams(21);
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

                this._MyTeamService.delete(Global.BASE_MyTeam_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;
                            this.LoadMyTeams(21);
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

        }
    }
}