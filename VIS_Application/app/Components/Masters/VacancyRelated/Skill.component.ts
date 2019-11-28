import { Component, OnInit, ViewChild } from '@angular/core';
import { SkillService } from '../../../service/Masters/VacancyRelated/Skill.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ISkill } from '../../../Model/Masters/VacancyRelated/Skill';
import { ISkillViewModel } from '../../../Model/Masters/VacancyRelated/Skill';
import { ISkillGroup } from '../../../Model/Masters/VacancyRelated/SkillGroup';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ISkillList } from '../../../Model/Masters/VacancyRelated/Skill';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
@Component
    ({
        providers: [SkillService],
        templateUrl: 'app/Components/Masters/VacancyRelated/Skill.component.html'
    })

export class SkillComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    skills: ISkillViewModel[];
    skill: ISkill;
    skillgroups: ISkillGroup[];
    skillgroup: ISkillGroup;
    msg: string;
    indLoading: boolean = false;
    SkillFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    SkillFilter: string;
    isDesc: boolean = false;
    column: any = 'SkillName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchSkillName: string;
    strSearchDescription: string;
    strSearchSkillGroupName: string;

    myOptions: IMultiSelectOption[];
    IMultiSelectOption: ISkillList[];

    
    TempLevel: string[];

    ControlIsDisable: boolean;

    constructor(private fb: FormBuilder, private _SkillService: SkillService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    ResetModel()
    {
        this.skill =
            {
                CreatedBy: '',
                CreatedOn: null,
                Description: '',
                Id: 0,
                IsActive: false,
                Level: [],
                RatingGroup: '',
                SkillGroupID: 0,
                SkillGroupName: '',
                SkillName: '',
                Status: false,
                UpdatedBy: '',
                UpdatedOn: null,
            }
        
        this.IMultiSelectOption =
            [
                {
                    id: 0,
                    name: '0'
                },
                {
                    id: 1,
                    name: '1'
                },
                {
                    id: 2,
                    name: '2'
                },
                {
                    id: 3,
                    name: '3'
                },
                {
                    id: 4,
                    name: '4'
                },
                {
                    id: 5,
                    name: '5'
                },
                {
                    id: 6,
                    name: '6'
                },
                {
                    id: 7,
                    name: '7'
                },
                {
                    id: 8,
                    name: '8'
                },
                {
                    id: 9,
                    name: '9'
                },
                {
                    id: 10,
                    name: '10'
                },
            ]

    }

    ngOnInit(): void
    {
        this._CommonHelperService.ToogleMenu();
        this.LoadSkill();
        this.LoadSkillGroup();
        this.ResetModel();
    }

    SkillFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.SkillFilter = value;
    }

    SkillSort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
        
    };

    LoadSkill(): void {
        this.indLoading = true;
        this._SkillService.get(Global.BASE_SKILL_ENDPOINT)
            .subscribe(skills => {
                this.skills = skills;

                //Logic for searching - start
                if (this.ShowHideSearch)
                {
                    this.strSearchSkillName = (<HTMLInputElement>document.getElementById("searchSkillName")).value;
                    if (this.strSearchSkillName != '') {
                        this.strSearchSkillName = this.strSearchSkillName.toLocaleLowerCase();
                        this.skills = this.skills.filter
                            (
                            x => x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(this.strSearchSkillName) != -1);
                    }

                    this.strSearchSkillGroupName = (<HTMLInputElement>document.getElementById("searchSkillGroupName")).value;
                    if (this.strSearchSkillGroupName != '') {
                        this.strSearchSkillGroupName = this.strSearchSkillGroupName.toLocaleLowerCase();
                        this.skills = this.skills.filter
                            (
                            x => x.SkillGroupName != null && x.SkillGroupName.toLocaleLowerCase().indexOf(this.strSearchSkillGroupName) != -1);
                    }

                    this.strSearchDescription = (<HTMLInputElement>document.getElementById("searchDescription")).value;
                    if (this.strSearchDescription != '') {
                        this.strSearchDescription = this.strSearchDescription.toLocaleLowerCase();
                        this.skills = this.skills.filter
                            (
                            x => x.Description != null && x.Description.toLocaleLowerCase().indexOf(this.strSearchDescription) != -1);
                    }

                  
                }

                //Logic for searching - End

                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );

        this.indLoading = true;
        this._SkillService.get(Global.BASE_SKILLGROUP_ENDPOINT)
            .subscribe(skillgroups => {
                this.skillgroups = skillgroups;
                this.indLoading = false;
            }
            //,error => this.msg = <any>error
            );
    }

    AddSkill()
    {
        this.skill.SkillName = '';
        this.skill.SkillGroupID = 0;
        this.skill.Description ='';
        this.skill.Level = [];
        this.skill.Status = false;

        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Skill";
        this.modalBtnTitle = "Add";
        this.SetControlsState(false);
        this.modal.open();
    }

    EditSkill(id: number)
    {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Skill";
        this.modalBtnTitle = "Update";

        this.skill.Id = id;
        this.skill.SkillName = this.skills.filter(x => x.Id == id)[0].SkillName;
        this.skill.SkillGroupID = this.skills.filter(x => x.Id == id)[0].SkillGroupID;
        this.skill.Description = this.skills.filter(x => x.Id == id)[0].Description;
        this.skill.Status = this.skills.filter(x => x.Id == id)[0].Status;
        this.TempLevel = this.skills.filter(x => x.Id == id)[0].Level.toString().split(',');

        this.skill.Level = [];

        for (let item of this.TempLevel)
        {
            this.skill.Level.push(Number(item));
        }

        this.modal.open();

    }

    DeleteSkill(id: number, status: boolean)    
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

        this.skill.Id = id;
        this.skill.SkillName = this.skills.filter(x => x.Id == id)[0].SkillName;
        this.skill.SkillGroupID = this.skills.filter(x => x.Id == id)[0].SkillGroupID;
        this.skill.Description = this.skills.filter(x => x.Id == id)[0].Description;
        this.skill.Status = this.skills.filter(x => x.Id == id)[0].Status;
        this.TempLevel = this.skills.filter(x => x.Id == id)[0].Level.toString().split(',');
        
        this.skill.Level = [];

        for (let item of this.TempLevel)
        {
            this.skill.Level.push(Number(item));
        }

        this.SetControlsState(true);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.ControlIsDisable = true : this.ControlIsDisable = false;
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.skills);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }

    LoadSkillGroup() {

        this.indLoading = true;
        this._SkillService.get(Global.BASE_SKILLGROUP_ENDPOINT)
            .subscribe(skillgroups => {
                this.skillgroups = skillgroups;
                this.indLoading = false;
                // set items to json response

                // initialize to page 1
                //this.JumpOnPage(1);
                //this.pager = this.pagerService.pager;
                //this.pagedItems = this.pagerService.pagedItems;
            }
            //,error => this.msg = <any>error
            );
    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: ISkill)
    {
        this.msg = "";

        if (formData.SkillGroupID != 0 && formData.Level.length > 0 )
        {
            switch (this.dbops)
            {
                case DBOperation.create:
                    this._SkillService.post(Global.BASE_SKILL_ENDPOINT, formData).subscribe(
                        data =>
                        {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.msg = data;
                                this.ResetModel();
                                this.LoadSkill();
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

                    this._SkillService.put(Global.BASE_SKILL_ENDPOINT, formData.Id, formData).subscribe(
                        data =>
                        {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.msg = data;
                                this.LoadSkill();
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
                case DBOperation.delete:

                    this._SkillService.delete(Global.BASE_SKILL_ENDPOINT, formData.Id).subscribe(
                        data =>
                        {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.LoadSkill();
                                this.msg = "Skill status changed successfully.";
                            }
                            else
                            {
                                this.msg = "Error has occurred while changing status of existing Skill!"
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
    }

}