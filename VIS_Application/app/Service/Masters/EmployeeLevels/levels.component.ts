
import { Component, OnInit, ViewChild } from '@angular/core';
import { LevelsService } from '../../../service/Masters/EmployeeLevels/levels.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ILevels } from '../../../Model/Masters/EmployeeLevels/levels';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component({
    providers: [LevelsService],
    templateUrl: 'app/Components/Masters/EmployeeLevels/levels.component.html'
})

export class LevelsComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    levelss: ILevels[];
    levels: ILevels;
    msg: string;
    indLoading: boolean = false;
    levelsFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    LevelsFilter: string;
    isDesc: boolean = false;
    column: any = 'LevelName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;
    constructor(private fb: FormBuilder, private _levelsService: LevelsService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.levelsFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            LevelNumber: ['', Validators.compose([Validators.required])],
            LevelName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            LevelIcon: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            StartPoint: ['', Validators.compose([Validators.required])],
            EndPoint: ['', Validators.compose([Validators.required])],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });

        this.LoadLevelss();

    }

    LevelsSearchCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.LevelsFilter = value;
    }

    LevelsSort(property: any) {
        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };

    LoadLevelss(): void {
        this.indLoading = true;
        this._levelsService.get(Global.BASE_LEVELS_ENDPOINT)
            .subscribe(levelss => {
                this.levelss = levelss;
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    addLevels() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Levels";
        this.modalBtnTitle = "Add";
        this.levelsFrm.reset();
        this.modal.open();
    }

    editLevels(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Levels";
        this.modalBtnTitle = "Update";
        this.levels = this.levelss.filter(x => x.Id == id)[0];
        this.levelsFrm.setValue(this.levels);
        this.modal.open();
    }

    deleteLevels(id: number, status: boolean) {
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

        this.levels = this.levelss.filter(x => x.Id == id)[0];
        this.levelsFrm.setValue(this.levels);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.levelsFrm.enable() : this.levelsFrm.disable();
    }
  
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.levelss);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._levelsService.post(Global.BASE_LEVELS_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "Levels added successfully.";
                            this.LoadLevelss();
                        }
                        else {
                            this.msg = "Error has occurred while adding new levels!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._levelsService.put(Global.BASE_LEVELS_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "Levels modified successfully.";
                            this.LoadLevelss();
                        }
                        else {
                            this.msg = "Error has occurred while modifying existing levels!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._levelsService.delete(Global.BASE_LEVELS_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "Levels status changed successfully.";
                            this.LoadLevelss();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing levels!"
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