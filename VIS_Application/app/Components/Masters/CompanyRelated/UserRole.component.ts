import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRoleService } from '../../../service/Masters/CompanyRelated/UserRole.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IUserRole } from '../../../Model/Masters/CompanyRelated/UserRole';
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
        providers: [UserRoleService],
        templateUrl: 'app/Components/Masters/CompanyRelated/UserRole.component.html'
    })

export class UserRoleComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    UserRoles: IUserRole[];
    UserRole: IUserRole;
    msg: string;
    indLoading: boolean = false;
    UserRoleFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    UserRoleFilter: string;
    isDesc: boolean = false;
    column: any = 'Name';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    ShowHideSearch: boolean = false;
    strsearchName: string;
    strsearchType: string;
    strsearchFileName: string;

    constructor(private fb: FormBuilder, private _UserRoleService: UserRoleService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.UserRoleFrm = this.fb.group
            ({
                CompanyId: [''],
                Id: [''],
                Name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                Type: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                FullName: [''],
                 IsActive: 0,
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                EntityMessage: [''],
            });

        this.LoadUserRole();


    }

    UserRoleFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.UserRoleFilter = value;
    }

    UserRoleSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    LoadUserRole(): void {

        this.indLoading = true;
        this._UserRoleService.get(Global.BASE_UserRole_ENDPOINT)
            .subscribe(UserRoles => {
                this.UserRoles = UserRoles;

                debugger;
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strsearchName = (<HTMLInputElement>document.getElementById("searchName")).value;
                    if (this.strsearchName != '') {
                        this.strsearchName = this.strsearchName.toLocaleLowerCase();
                        this.UserRoles = this.UserRoles.filter
                            (
                            x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strsearchName) != -1);
                    }

                }
                if (this.ShowHideSearch) {
                    this.strsearchType = (<HTMLInputElement>document.getElementById("searchType")).value;
                    if (this.strsearchType != '') {
                        this.strsearchType = this.strsearchType.toLocaleLowerCase();
                        this.UserRoles = this.UserRoles.filter
                            (
                            x => x.Type != null && x.Type.toLocaleLowerCase().indexOf(this.strsearchType) != -1);
                    }

                }
                if (this.ShowHideSearch) {
                    this.strsearchFileName = (<HTMLInputElement>document.getElementById("searchFileName")).value;
                    if (this.strsearchFileName!= '') {
                        this.strsearchFileName = this.strsearchFileName.toLocaleLowerCase();
                        this.UserRoles = this.UserRoles.filter
                            (
                            x => x.FullName != null && x.FullName.toLocaleLowerCase().indexOf(this.strsearchFileName) != -1);
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

    AddUserRole() {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New UserRole";
        this.modalBtnTitle = "Add";
        this.UserRoleFrm.reset();
        this.modal.open();
    }

    EditUserRole(id: number) {

        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit UserRole";
        this.modalBtnTitle = "Update";

        this.UserRole = this.UserRoles.filter(x => x.Id == id)[0];

        this.UserRoleFrm.setValue(this.UserRole);
        this.modal.open();
    }

    DeleteUserRole(id: number, status: boolean) {

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

        this.UserRole = this.UserRoles.filter(x => x.Id == id)[0];
        this.UserRoleFrm.setValue(this.UserRole);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.UserRoleFrm.enable() : this.UserRoleFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.UserRoles);
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
                this._UserRoleService.post(Global.BASE_UserRole_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data
                            this.LoadUserRole();
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

                this._UserRoleService.put(Global.BASE_UserRole_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data
                            this.LoadUserRole();
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
                this._UserRoleService.delete(Global.BASE_UserRole_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "UserRole status changed successfully.";
                            this.LoadUserRole();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing UserRole!"
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