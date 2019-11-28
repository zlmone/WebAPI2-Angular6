import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupNameService } from '../../../service/Masters/CompanyRelated/GroupName.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IGroupName } from '../../../Model/Masters/CompanyRelated/GroupName';
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
        providers: [GroupNameService],
        templateUrl: 'app/Components/Masters/CompanyRelated/GroupName.component.html'
    })

export class GroupNameComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    GroupNames: IGroupName[];
    GroupName: IGroupName;
    msg: string;
    indLoading: boolean = false;
    GroupNameFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    GroupNameFilter: string;
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

    constructor(private fb: FormBuilder, private _GroupNameService: GroupNameService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.GroupNameFrm = this.fb.group
            ({
                CompanyId: [''],
                Id: [''],
                GroupNames: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                IsActive: [''],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: [''],
            });

        this.LoadGroupName();


    }

    GroupNameFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.GroupNameFilter = value;
    }

    GroupNameSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    LoadGroupName(): void {

        this.indLoading = true;
        this._GroupNameService.get(Global.BASE_GroupName_ENDPOINT)
            .subscribe(GroupNames => {
                this.GroupNames = GroupNames;
                

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchTypeName = (<HTMLInputElement>document.getElementById("searchGroupNames")).value;
                    if (this.strSearchTypeName != '') {
                        this.strSearchTypeName = this.strSearchTypeName.toLocaleLowerCase();
                        this.GroupNames = this.GroupNames.filter
                            (
                            x => x.GroupNames != null && x.GroupNames.toLocaleLowerCase().indexOf(this.strSearchTypeName) != -1);
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

    AddGroupName() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New GroupName";
        this.modalBtnTitle = "Add";
        this.GroupNameFrm.reset();
        this.modal.open();
    }

    EditGroupName(id: number) {

        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit GroupName";
        this.modalBtnTitle = "Update";

        this.GroupName = this.GroupNames.filter(x => x.Id == id)[0];

        this.GroupNameFrm.setValue(this.GroupName);
        this.modal.open();
    }

    DeleteGroupName(id: number, status: boolean) {

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

        this.GroupName = this.GroupNames.filter(x => x.Id == id)[0];
        this.GroupNameFrm.setValue(this.GroupName);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.GroupNameFrm.enable() : this.GroupNameFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.GroupNames);
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
                this._GroupNameService.post(Global.BASE_GroupName_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {

                            this.msg = data;
                            this.LoadGroupName();
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

                this._GroupNameService.put(Global.BASE_GroupName_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadGroupName();
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
                this._GroupNameService.delete(Global.BASE_GroupName_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "GroupName status changed successfully.";
                            this.LoadGroupName();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing GroupName!"
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