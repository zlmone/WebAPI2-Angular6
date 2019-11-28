import { Component, OnInit, ViewChild } from '@angular/core';
import { SkillService } from '../../../service/Masters/VacancyRelated/Skill.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ISkill } from '../../../Model/Masters/VacancyRelated/Skill';
import { ISkillGroup } from '../../../Model/Masters/VacancyRelated/SkillGroup';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component
    ({
        providers: [SkillService],
        templateUrl: 'app/Components/Masters/VacancyRelated/Skill.component.html'
    })

export class SkillComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    skills: ISkill[];
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

    constructor(private fb: FormBuilder, private _SkillService: SkillService, private pagerService: PagerService) { }

    someFunction(data: any) {
        alert(data);
    }
    ngOnInit(): void {
        this.SkillFrm = this.fb.group
            ({
                CompanyId: [''],
                Id: [''],
                SkillName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                Description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                SkillGroupID: [''],
                SkillGroupName: [''],
                RatingGroup: [''],
                IsActive: [''],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: ['']
            });

        this.LoadSkill();
        this.LoadSkillGroup();


    }

    SkillFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.SkillFilter = value;
    }

    SkillSort(property: any) {

        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };

    LoadSkill(): void {
        this.indLoading = true;
        this._SkillService.get(Global.BASE_SKILL_ENDPOINT)
            .subscribe(skills => {
                this.skills = skills;
                this.indLoading = false;
                console.log(skills);
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


    AddSkill() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Skill";
        this.modalBtnTitle = "Add";
        this.SkillFrm.reset();
        this.modal.open();
    }

    EditSkill(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Skill";
        this.modalBtnTitle = "Update";
        this.skill = this.skills.filter(x => x.Id == id)[0];
        this.SkillFrm.setValue(this.skill);
        this.modal.open();
    }

    DeleteSkill(id: number, status: boolean) {
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

        this.skill = this.skills.filter(x => x.Id == id)[0];
        this.SkillFrm.setValue(this.skill);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.SkillFrm.enable() : this.SkillFrm.disable();
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
                this.JumpOnPage(1);
                this.pager = this.pagerService.pager;
                this.pagedItems = this.pagerService.pagedItems;
            }
            //,error => this.msg = <any>error
            );
    }

    onSubmit(formData: any) {
        this.msg = "";
        switch (this.dbops) {
            case DBOperation.create:
                this._SkillService.post(Global.BASE_SKILL_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            
                            this.msg = "Skill added successfully.";
                            this.LoadSkill();
                        }
                        else {
                            this.msg = "Error has occurred while adding new Skill!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                
                this._SkillService.put(Global.BASE_SKILL_ENDPOINT, formData._value.Id, formData._value).subscribe(

                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "Skill modified successfully.";
                            this.LoadSkill();
                        }
                        else {
                            this.msg = "Error has occurred while modifying existing Skill!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                
                this._SkillService.delete(Global.BASE_SKILL_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "Skill status changed successfully.";
                            this.LoadSkill();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing Skill!"
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