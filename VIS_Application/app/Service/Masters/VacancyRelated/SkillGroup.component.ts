import { Component, OnInit, ViewChild } from '@angular/core';
import { SkillGroupService } from '../../../service/Masters/VacancyRelated/SkillGroup.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ISkillGroup } from '../../../Model/Masters/VacancyRelated/SkillGroup';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component
    ({
        providers: [SkillGroupService],
        templateUrl: 'app/Components/Masters/VacancyRelated/SkillGroup.component.html'
    })

export class SkillGroupComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    skillgroups: ISkillGroup[];
    skillgroup: ISkillGroup;
    msg: string;
    indLoading: boolean = false;
    SkillGroupFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    SkillGroupFilter: string;
    isDesc: boolean = false;
    column: any = 'SkillGroupName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    constructor(private fb: FormBuilder, private _SkillGroupService: SkillGroupService, private pagerService: PagerService) { }

    ngOnInit(): void {
        
        this.SkillGroupFrm = this.fb.group
            ({
                CompanyId: [''],
                Id:[''],
                SkillGroupID: [''],
                SkillGroupName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                RatingGroup: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                IsActive: [''],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: ['']
            });

        this.LoadSkillGroup();


    }

    SkillGroupFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.SkillGroupFilter = value;
    }

    SkillGroupSort(property: any)
    {

        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };

    LoadSkillGroup(): void
    {
        
        this.indLoading = true;
        this._SkillGroupService.get(Global.BASE_SKILLGROUP_ENDPOINT)
            .subscribe(skillgroups => {
                this.skillgroups = skillgroups;
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }


    AddSkillGroup()
    {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New SkillGroup";
        this.modalBtnTitle = "Add";
        this.SkillGroupFrm.reset();
        this.modal.open();
    }

    EditSkillGroup(id: number)
    {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit SkillGroup";
        this.modalBtnTitle = "Update";
        this.skillgroup = this.skillgroups.filter(x => x.SkillGroupID == id)[0];
        this.SkillGroupFrm.setValue(this.skillgroup);
        this.modal.open();
    }

    DeleteSkillGroup(id: number, status: boolean)
    {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
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

        this.skillgroup = this.skillgroups.filter(x => x.SkillGroupID == id)[0];
        this.SkillGroupFrm.setValue(this.skillgroup);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.SkillGroupFrm.enable() : this.SkillGroupFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.skillgroups);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }
    onSubmit(formData: any)
    {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._SkillGroupService.post(Global.BASE_SKILLGROUP_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            
                            this.msg = "SkillGroup added successfully.";
                            this.LoadSkillGroup();
                        }
                        else {
                            this.msg = "Error has occurred while adding new SkillGroup!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                
                this._SkillGroupService.put(Global.BASE_SKILLGROUP_ENDPOINT, formData._value.SkillGroupID, formData._value).subscribe(
                    
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "SkillGroup modified successfully.";
                            this.LoadSkillGroup();
                        }
                        else
                        {
                            this.msg = "Error has occurred while modifying existing SkillGroup!"
                        }

                        this.modal.dismiss();
                    },
                    error =>
                    {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                
                this._SkillGroupService.delete(Global.BASE_SKILLGROUP_ENDPOINT, formData._value.SkillGroupID).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "SkillGroup status changed successfully.";
                            this.LoadSkillGroup();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing SkillGroup!"
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