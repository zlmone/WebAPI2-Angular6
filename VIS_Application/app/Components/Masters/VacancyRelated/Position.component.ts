import { Component, OnInit, ViewChild } from '@angular/core';
import { PositionService } from '../../../service/Masters/VacancyRelated/Position.service';
import { SkillService } from '../../../service/Masters/VacancyRelated/Skill.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IPosition } from '../../../Model/Masters/VacancyRelated/Position';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ISkillList } from '../../../Model/Masters/VacancyRelated/Skill';
import { ISkillListViewModel } from '../../../Model/Masters/VacancyRelated/Position';

@Component
    ({
        providers: [PositionService, SkillService],
        templateUrl: 'app/Components/Masters/VacancyRelated/Position.component.html'
    })

export class PositionComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    positions: IPosition[];
    position: IPosition;
    msg: string;
    indLoading: boolean = false;
    PositionFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    PositionFilter: string;
    isDesc: boolean = false;
    column: any = 'PositionName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchPositionName: string;
    strSearchRemarks: string;
    optionsModel: number[];
    myOptions: IMultiSelectOption[];

    IMultiSelectOption: ISkillList[];
    
    objISkillListViewModel: ISkillListViewModel[];

    TempSkillId: string[];

    constructor(private fb: FormBuilder, private _PositionService: PositionService, private pagerService: PagerService, private _SkillService: SkillService, private _CommonHelperService: CommonHelperService) { }

    ngOnInit(): void
    {
        this._CommonHelperService.ToogleMenu();
        this.LoadPosition();
        this.LoadSkills();
        this.ModelReset();
    }

    ModelReset() : void
    {
        this.position =
            {
                SkillsId:"",
                SkillName: "",
                CreatedBy: "",
                CreatedOn: null,
                Id: 0,
                IsActive: false,
                Status: false,
                PositionName: "",
                Remarks: "",
                UpdatedBy: "",
                UpdatedOn: null,
                SkillId: null
            }

    }

    TestMultidll(): void {
   
        this.myOptions = [
            { id: 6, name: 'Option 1' },
            { id: 7, name: 'Option 2' },
            { id: 8, name: 'Option 3' }
        ];
    }

    LoadSkills()
    {
        this._PositionService.getskills(Global.BASE_POSITION_ENDPOINT)
            .subscribe(skilllist =>
            {
                this.IMultiSelectOption = skilllist;
            });
    }

    PositionFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.PositionFilter = value;
    }

    PositionSort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadPosition(): void
    {

        this.indLoading = true;
        this._PositionService.get(Global.BASE_POSITION_ENDPOINT)
            .subscribe(positions => {
                this.positions = positions;
                
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchPositionName = (<HTMLInputElement>document.getElementById("searchPositionName")).value;
                    if (this.strSearchPositionName != '') {
                        this.strSearchPositionName = this.strSearchPositionName.toLocaleLowerCase();
                        this.positions = this.positions.filter
                            (
                            x => x.PositionName != null && x.PositionName.toLocaleLowerCase().indexOf(this.strSearchPositionName) != -1);
                    }

                    this.strSearchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
                    if (this.strSearchRemarks != '') {
                        this.strSearchRemarks = this.strSearchRemarks.toLocaleLowerCase();
                        this.positions = this.positions.filter
                            (
                            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.strSearchRemarks) != -1);
                    }



                }

                //Logic for searching - End




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

    AddPosition()
    {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Position";
        this.modalBtnTitle = "Add";
        this.ModelReset();
        this.modal.open();
    }

    EditPosition(id: number)
    {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Position";
        this.modalBtnTitle = "Update";
        this.position = this.positions.filter(x => x.Id == id)[0];
        this.TempSkillId = this.position.SkillsId.split(',');

        this.position.SkillId = [];

        for (let item of this.TempSkillId)
        {
            this.position.SkillId.push(Number(item));
        }

        this.modal.open();
    }

    DeletePosition(id: number, status: boolean)
    {
        this.dbops = DBOperation.delete;
        if (status == true)
        {

            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }

        this.position = this.positions.filter(x => x.Id == id)[0];
        this.TempSkillId = this.position.SkillsId.split(',');

        this.position.SkillId = [];

        for (let item of this.TempSkillId)
        {
            this.position.SkillId.push(Number(item));
        }

        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.PositionFrm.enable() : this.PositionFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.positions);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: IPosition)
    {
        this.msg = "";

        if (formData.SkillId == null)
        {
            formData.SkillId=[0];
        }

        switch (this.dbops)
        {
            case DBOperation.create:
                this._PositionService.post(Global.BASE_POSITION_ENDPOINT, formData).subscribe(
                    data =>
                    {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadPosition();
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

                this._PositionService.put(Global.BASE_POSITION_ENDPOINT, formData.Id, formData).subscribe(

                    data =>
                    {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadPosition();
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

                this._PositionService.delete(Global.BASE_POSITION_ENDPOINT, formData.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Position status changed successfully.";
                            this.LoadPosition();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing Position!"
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