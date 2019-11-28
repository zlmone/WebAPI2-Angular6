import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityKeyService } from '../../../service/Masters/Configuration/SecurityKey.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ISecurityKey } from '../../../Model/Masters/Configuration/SecurityKey';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component
    ({
        providers: [SecurityKeyService],
        templateUrl: 'app/Components/Masters/Configuration/SecurityKey.component.html'
    })

export class SecurityKeyComponent implements OnInit
{

    @ViewChild('modal') modal: ModalComponent;

    securitykeys: ISecurityKey[];
    securitykey: ISecurityKey;
    msg: string;
    indLoading: boolean = false;
    SecurityKeyFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    SecurityKeyFilter: string;
    isDesc: boolean = false;
    column: any = 'Key1';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;


    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchKey1: string;
    strSearchKey2: string;
    strSearchKey3: string;
    strSearchKey4: string;
    strSearchKey5: string;
    //Variables for UniqueKey
    UniqueKey: string;

    constructor(private fb: FormBuilder, private _SecurityKeyService: SecurityKeyService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }
   
    ngOnInit(): void {

        this._CommonHelperService.ToogleMenu();

        this.securitykey =
            ({
                Id: 0,
                Key1:'',
                Key2: '',
                Key3: '',
                Key4: '',
                Key5: '',
                UniqueKey:'', 
                Active: false,
                IsActive: false,
                CreatedOn: null,
                UpdatedOn: null,
                CreatedBy: '',
                UpdatedBy: '',
            });

        this.LoadSecurityKey();
        this.InputNavigator();

    }

    CancelModel()
    {
        this.modal.dismiss();
        this.securitykey =
            ({
                Id: 0,
                Key1: '',
                Key2: '',
                Key3: '',
                Key4: '',
                Key5: '',
                UniqueKey: '',
                Active: false,
                IsActive: false,
                CreatedOn: null,
                UpdatedOn: null,
                CreatedBy: '',
                UpdatedBy: '',
            });

    }

    InputNavigator():void
    {
        $(function ()
        {
            $("#Key1").keyup(function ()
            {
                if ($("#Key1").val().length == 4)
                {
                    $("#Key2").focus();
                }
            });

            $("#Key2").keyup(function ()
            {
                if ($("#Key2").val().length == 4)
                {
                    $("#Key3").focus();
                }
            });

            $("#Key3").keyup(function ()
            {
                if ($("#Key3").val().length == 4)
                {
                    $("#Key4").focus();
                }
            });

            $("#Key4").keyup(function ()
            {
                if ($("#Key4").val().length == 4)
                {
                    $("#Key5").focus();
                }
            });

        });
     
    }

    SecurityKeyFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.SecurityKeyFilter = value;
    }

    SecurityKeySort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    GenrateUniqueKey(formData: ISecurityKey)
    {
        if (formData.Key1.length == 4 && formData.Key2.length == 4 && formData.Key3.length == 4 && formData.Key4.length == 4 && formData.Key5.length == 4)
        {
            this._SecurityKeyService.GenrateSecurityKey(Global.BASE_SECURITYKEY_ENDPOINT, formData).subscribe(
                securitykeyunique => {
                    this.securitykey.UniqueKey = securitykeyunique;
                },
                error => {
                    this.msg = error;
                }
            );
        }
    }

    LoadSecurityKey(): void
    {
        this.indLoading = true;
        this._SecurityKeyService.get(Global.BASE_SECURITYKEY_ENDPOINT)
            .subscribe(securitykeys => {
                this.securitykeys = securitykeys;

                //Logic for searching - start
                if (this.ShowHideSearch)
                {
                    this.strSearchKey1 = (<HTMLInputElement>document.getElementById("searchKey1")).value;
                    if (this.strSearchKey1 != '')
                    {
                        this.strSearchKey1 = this.strSearchKey1.toLocaleLowerCase();
                        this.securitykeys = this.securitykeys.filter
                            (
                            x => x.Key1 != null && x.Key1.toLocaleLowerCase().indexOf(this.strSearchKey1) != -1);
                    }

                    this.strSearchKey2 = (<HTMLInputElement>document.getElementById("searchKey2")).value;
                    if (this.strSearchKey2 != '')
                    {
                        this.strSearchKey2 = this.strSearchKey2.toLocaleLowerCase();
                        this.securitykeys = this.securitykeys.filter
                            (
                            x => x.Key2 != null && x.Key2.toLocaleLowerCase().indexOf(this.strSearchKey2) != -1);
                    }

                    this.strSearchKey3 = (<HTMLInputElement>document.getElementById("searchKey3")).value;
                    if (this.strSearchKey3 != '')
                    {
                        this.strSearchKey3 = this.strSearchKey3.toLocaleLowerCase();
                        this.securitykeys = this.securitykeys.filter
                            (
                            x => x.Key3 != null && x.Key3.toLocaleLowerCase().indexOf(this.strSearchKey3) != -1);
                    }

                    this.strSearchKey4 = (<HTMLInputElement>document.getElementById("searchKey4")).value;
                    if (this.strSearchKey4 != '')
                    {
                        this.strSearchKey4 = this.strSearchKey4.toLocaleLowerCase();
                        this.securitykeys = this.securitykeys.filter
                            (
                            x => x.Key4 != null && x.Key4.toLocaleLowerCase().indexOf(this.strSearchKey4) != -1);
                    }


                    this.strSearchKey5 = (<HTMLInputElement>document.getElementById("searchKey5")).value;
                    if (this.strSearchKey5 != '')
                    {
                        this.strSearchKey5 = this.strSearchKey5.toLocaleLowerCase();
                        this.securitykeys = this.securitykeys.filter
                            (
                            x => x.Key5 != null && x.Key5.toLocaleLowerCase().indexOf(this.strSearchKey5) != -1);
                    }

                }

                //Logic for searching - End




                this.indLoading = false;
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }


    AddSecurityKey()
    {

        this.dbops = DBOperation.create;
        //this.SetControlsState(true);
        this.modalTitle = "Add New SecurityKey";
        this.modalBtnTitle = "Add";
        //this.SecurityKeyFrm.reset();
        this.modal.open();
    }

    EditSecurityKey(id: number)
    {
        this.dbops = DBOperation.update;
        //this.SetControlsState(true);
        this.modalTitle = "Edit SecurityKey";
        this.modalBtnTitle = "Update";
        this.securitykey = this.securitykeys.filter(x => x.Id == id)[0];
        this.modal.open();
    }

    DeleteSecurityKey(id: number, status: boolean)
    {

        this.dbops = DBOperation.delete;
        
        if (status == true) {

            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }

        this.securitykey = this.securitykeys.filter(x => x.Id == id)[0];
        //this.SecurityKeyFrm.setValue(this.securitykey);
        this.modal.open();
    }

    SetControlsState()
    {
        
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
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.securitykeys);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }


    onSubmit(formData:ISecurityKey)
    {
        
        this.msg = "";
        switch (this.dbops) {
            case DBOperation.create:
                this._SecurityKeyService.post(Global.BASE_SECURITYKEY_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.CancelModel();
                            this.msg = data;
                            this.LoadSecurityKey();
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

                this._SecurityKeyService.put(Global.BASE_SECURITYKEY_ENDPOINT,formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.CancelModel();
                            this.msg = data;
                            this.LoadSecurityKey();
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
                this._SecurityKeyService.delete(Global.BASE_SECURITYKEY_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.CancelModel();
                            this.msg = "SecurityKey status changed successfully.";
                            this.LoadSecurityKey();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing SecurityKey!"
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