import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingTypeService } from '../../../service/Masters/VacancyRelated/RatingType.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRatingType } from '../../../Model/Masters/VacancyRelated/RatingType';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component
    ({
        providers: [RatingTypeService],
        templateUrl: 'app/Components/Masters/VacancyRelated/RatingType.component.html'
    })

export class RatingTypeComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    RatingTypes: IRatingType[];
    RatingType: IRatingType;
    msg: string;
    indLoading: boolean = false;
    RatingTypeFrm: FormGroup; 
    dbops: DBOperation; 
    modalTitle: string;
    modalBtnTitle: string;
    RatingTypeFilter: string;
    isDesc: boolean = false;
    column: any = 'TypeName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    ShowHideSearch: boolean = false;
    strSearchTypeName: string;

    constructor(private fb: FormBuilder, private _RatingTypeService: RatingTypeService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.RatingTypeFrm = this.fb.group
            ({
                CompanyId: [''],
                Id: [''],
                TypeName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                IsActive: [''],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: [''],
            });

        this.LoadRatingType();


    }

    LookupTypeFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.RatingTypeFilter = value;
    }

    RatingTypeSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    LoadRatingType(): void {

        this.indLoading = true;
        this._RatingTypeService.get(Global.BASE_RATINGTYPE_ENDPOINT)
            .subscribe(lookuptypes => {
                this.RatingTypes = lookuptypes;


                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchTypeName = (<HTMLInputElement>document.getElementById("searchTypeName")).value;
                    if (this.strSearchTypeName != '') {
                        this.strSearchTypeName = this.strSearchTypeName.toLocaleLowerCase();
                        this.RatingTypes = this.RatingTypes.filter
                            (
                            x => x.TypeName != null && x.TypeName.toLocaleLowerCase().indexOf(this.strSearchTypeName) != -1);
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

    AddRatingType() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New RatingType";
        this.modalBtnTitle = "Add";
        this.RatingTypeFrm.reset();
        this.modal.open();
    }

    EditRatingType(id: number) {

        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit RatingType";
        this.modalBtnTitle = "Update";

        this.RatingType = this.RatingTypes.filter(x => x.Id == id)[0];

        this.RatingTypeFrm.setValue(this.RatingType);
        this.modal.open();
    }

    DeleteRatingType(id: number, status: boolean) {

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

        this.RatingType = this.RatingTypes.filter(x => x.Id == id)[0];
        this.RatingTypeFrm.setValue(this.RatingType);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.RatingTypeFrm.enable() : this.RatingTypeFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.RatingTypes);
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
                this._RatingTypeService.post(Global.BASE_RATINGTYPE_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data
                            this.LoadRatingType();
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

                this._RatingTypeService.put(Global.BASE_RATINGTYPE_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data
                            this.LoadRatingType();
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
                this._RatingTypeService.delete(Global.BASE_RATINGTYPE_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "RatingType status changed successfully.";
                            this.LoadRatingType();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing RatingType!"
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