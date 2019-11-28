import { Component, OnInit, ViewChild } from '@angular/core';
import { PositionService } from '../../Service/Masters/VacancyRelated/Position.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IPosition } from '../../Model/Masters/VacancyRelated/Position';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../Shared/pager.index';

@Component
    ({
        providers: [PositionService],
        templateUrl: 'app/Components/Masters/Position.component.html'
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
    constructor(private fb: FormBuilder, private _PositionService: PositionService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.PositionFrm = this.fb.group
            ({

                CompanyId: [''],
                Id: [''],   
                PositionName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                Remarks: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: [''],
                IsActive: ['']
            });

        this.LoadPosition();
      
    }

    PositionFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.PositionFilter = value;
    }

    PositionSort(property: any)
    {
        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };

    LoadPosition(): void
    {

        this.indLoading = true;
        this._PositionService.get(Global.BASE_POSITION_ENDPOINT)
            .subscribe(positions => {
                this.positions = positions;
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
        this.SetControlsState(true);
        this.modalTitle = "Add New Position";
        this.modalBtnTitle = "Add";
        this.PositionFrm.reset();
        this.modal.open();
    }

    EditPosition(id: number)
    {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Position";
        this.modalBtnTitle = "Update";
        this.position = this.positions.filter(x => x.Id == id)[0];
        this.PositionFrm.setValue(this.position);
        this.modal.open();
    }

    DeletePosition(id: number, status: boolean)
    {
        debugger;
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

        this.position = this.positions.filter(x => x.Id == id)[0];
        this.PositionFrm.setValue(this.position);
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
    onSubmit(formData: any)
    {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._PositionService.post(Global.BASE_POSITION_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == "Success") //Success
                        {

                            this.msg = "Position added successfully.";
                            this.LoadPosition();
                        }
                        else {
                            this.msg = "Error has occurred while adding new Position!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:

                this._PositionService.put(Global.BASE_POSITION_ENDPOINT, formData._value.Id, formData._value).subscribe(

                    data => {
                        if (data == "Success") //Success
                        {
                            this.msg = "Position modified successfully.";
                            this.LoadPosition();
                        }
                        else {
                            this.msg = "Error has occurred while modifying existing Position!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:

                this._PositionService.delete(Global.BASE_POSITION_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == "Success") //Success
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