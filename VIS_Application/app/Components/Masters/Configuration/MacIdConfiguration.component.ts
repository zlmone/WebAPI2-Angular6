import { Component, OnInit, ViewChild } from '@angular/core';
import { MacIdConfigurationService } from '../../../service/Masters/Configuration/MacIdConfiguration.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IMacIdConfiguration } from '../../../Model/Masters/Configuration/MacIdConfiguration';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
import { PagerService } from '../../../Shared/pager.index';

@Component
    ({
        providers: [MacIdConfigurationService],
        templateUrl: 'app/Components/Masters/Configuration/MacIdConfiguration.component.html'
    })

export class MacIdConfigurationComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;

    macidconfigurationsbackup: IMacIdConfiguration[];
    macidconfigurations: IMacIdConfiguration[];
    macidconfiguration: IMacIdConfiguration;
    employees: IMacIdConfiguration[];
    employee: IMacIdConfiguration;
    msg: string;
    indLoading: boolean = false;
    MacIdConfigurationFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    MacIdConfigurationFilter: string;
    isDesc: boolean = false;
    column: any = 'Employee_Name';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;


    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchEmployee_Name: string;
    strSearchMacID: string;
    strSearchIPAddress: string;
    strSearchVersion: string;

    constructor(private fb: FormBuilder, private _MacIdConfigurationService: MacIdConfigurationService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService ) { }

    ResetModel()
    {
        this.macidconfiguration = {
            Active: false,
            ApprovalDate: null,
            ApprovedBy: '',
            CreatedBy: '',
            CreatedOn: null,
            Description: '',
            EmployeeId: 0,
            Employee_Name: '',
            Id: 0,
            IP1: '',
            IP2: '',
            IP3: '',
            IP4: '',
            IPAddress: '',
            IsActive: false,
            MacID: '',
            MacID1: '',
            MacID2: '',
            MacID3: '',
            MacID4: '',
            MacID5: '',
            MacID6: '',
            OfficeMacId: false,
            RequestedDate: null,
            UpdatedBy: '',
            UpdatedOn: null,
            Version: '',
            Version1: '',
            Version2: '',
            Version3: ''
        }
    }

    ngOnInit(): void
    {
        this._CommonHelperService.ToogleMenu();
        this.ResetModel();        
        this.LoadMacIdConfiguration();
        this.LoadEmployees();
        this.InputNavigator();
    }

    MacIdConfigurationFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.MacIdConfigurationFilter = value;
    }

    MackIdConfigurationSort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
        
    };

    GetActiveRecord()
    {
        if ($("#rbtactive").prop("checked"))
        {
            this.macidconfigurations = this.macidconfigurationsbackup;
            this.macidconfigurations = this.macidconfigurations.filter(x => x.Active === true);
            this.JumpOnPage(1);
        }
        else if ($("#rbtinactive").prop("checked"))
        {
            this.macidconfigurations = this.macidconfigurationsbackup;
            this.macidconfigurations = this.macidconfigurations.filter(x => x.Active === false);
            this.JumpOnPage(1);
        }
        else
        {
            this.macidconfigurations = this.macidconfigurationsbackup;
            this.isDesc = true;
            this.MackIdConfigurationSort("Active");
            this.JumpOnPage(1);
        }
    }

    LoadMacIdConfiguration(): void
    {
        
        this.indLoading = true;
        this._MacIdConfigurationService.get(Global.BASE_MACIDCONFIGURATION_ENDPOINT)
            .subscribe(macidconfigurations => {
                this.macidconfigurations = macidconfigurations;
                this.macidconfigurationsbackup = macidconfigurations;
                //Logic for searching - start
                if (this.ShowHideSearch)
                {
                    this.strSearchEmployee_Name = (<HTMLInputElement>document.getElementById("searchEmployee_Name")).value;
                    if (this.strSearchEmployee_Name != '') {
                        this.strSearchEmployee_Name = this.strSearchEmployee_Name.toLocaleLowerCase();
                        this.macidconfigurations = this.macidconfigurations.filter
                            (
                            x => x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(this.strSearchEmployee_Name) != -1);
                    }

                    this.strSearchMacID = (<HTMLInputElement>document.getElementById("searchMacID")).value;
                    if (this.strSearchMacID != '') {
                        this.strSearchMacID = this.strSearchMacID.toLocaleLowerCase();
                        this.macidconfigurations = this.macidconfigurations.filter
                            (
                            x => x.MacID != null && x.MacID.toLocaleLowerCase().indexOf(this.strSearchMacID) != -1);
                    }

                    this.strSearchIPAddress = (<HTMLInputElement>document.getElementById("searchIPAddress")).value;
                    if (this.strSearchIPAddress != '') {
                        this.strSearchIPAddress = this.strSearchIPAddress.toLocaleLowerCase();
                        this.macidconfigurations = this.macidconfigurations.filter
                            (
                            x => x.IPAddress != null && x.IPAddress.toLocaleLowerCase().indexOf(this.strSearchIPAddress) != -1);
                    }

                    this.strSearchVersion = (<HTMLInputElement>document.getElementById("searchVersion")).value;
                    if (this.strSearchVersion != '') {
                        this.strSearchVersion = this.strSearchVersion.toLocaleLowerCase();
                        this.macidconfigurations = this.macidconfigurations.filter
                            (
                            x => x.Version != null && x.Version.toLocaleLowerCase().indexOf(this.strSearchVersion) != -1);
                    }

                }

                //Logic for searching - End




                this.indLoading = false;
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    LoadEmployees(): void
    {
        this.indLoading = true;
        this._MacIdConfigurationService.getallemployee(Global.BASE_MACIDCONFIGURATION_ENDPOINT)
            .subscribe(employee => {
                this.employees = employee;
                this.indLoading = false;
            }
            //,error => this.msg = <any>error
            );
    }

    AddMackId()
    {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New MackId";
        this.modalBtnTitle = "Add";
        this.ResetModel();
        this.modal.open();
    }

    EditMackId(id: number)
    {

        this.dbops = DBOperation.update;
        this.modalTitle = "Edit MackId";
        this.modalBtnTitle = "Update";
        this.macidconfiguration = this.macidconfigurations.filter(x => x.Id == id)[0];
        this.modal.open();
    }

    DeleteMacId(id: number, status: boolean)
    {
        this.dbops = DBOperation.delete;
        var confimation = confirm("Are you sure ?")

        if (confimation == true)
        {
            this.macidconfiguration.Id = id;
            this.onSubmit(this.macidconfiguration);
        }
                
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.MacIdConfigurationFrm.enable() : this.MacIdConfigurationFrm.disable();
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
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.macidconfigurations);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: IMacIdConfiguration)
    {
        Number(formData.ApprovedBy='21')
        formData.MacID = formData.MacID1 + '-' + formData.MacID2 + '-' + formData.MacID3 + '-' + formData.MacID4 + '-' + formData.MacID5 + '-' + formData.MacID6;
        formData.IPAddress = formData.IP1 + '.' + formData.IP2 + '.' + formData.IP3 + '.' + formData.IP4;
        formData.Version = formData.Version1 + '.' + formData.Version2 + '.' + formData.Version3;
        
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._MacIdConfigurationService.post(Global.BASE_MACIDCONFIGURATION_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data;
                            this.LoadMacIdConfiguration();
                        }
                        else {
                            alert(data);
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:

                this._MacIdConfigurationService.put(Global.BASE_MACIDCONFIGURATION_ENDPOINT, formData.Id, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadMacIdConfiguration();
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
                this._MacIdConfigurationService.delete(Global.BASE_MACIDCONFIGURATION_ENDPOINT, formData.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "MackId status changed successfully.";
                            this.LoadMacIdConfiguration();
                        }
                        else
                        {
                            this.msg = "Error has occurred while changing status of existing MackId!"
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

    InputNavigator(): void {
        $(function () {
            $("#MacID1").keyup(function ()
            {
                if ($("#MacID1").val().length == 2)
                {
                    $("#MacID2").focus();
                }
            });

            $("#MacID2").keyup(function () {
                if ($("#MacID2").val().length == 2) {
                    $("#MacID3").focus();
                }
            });

            $("#MacID3").keyup(function () {
                if ($("#MacID3").val().length == 2) {
                    $("#MacID4").focus();
                }
            });

            $("#MacID4").keyup(function () {
                if ($("#MacID4").val().length == 2) {
                    $("#MacID5").focus();
                }
            });

            $("#MacID5").keyup(function () {
                if ($("#MacID5").val().length == 2) {
                    $("#MacID6").focus();
                }
            });

            $("#MacID6").keyup(function () {
                if ($("#MacID6").val().length == 2) {
                    $("#IP1").focus();
                }
            });

            $("#IP1").keyup(function () {
                if ($("#IP1").val().length == 3) {
                    $("#IP2").focus();
                }
            });

            $("#IP2").keyup(function () {
                if ($("#IP2").val().length == 3) {
                    $("#IP3").focus();
                }
            });
            $("#IP3").keyup(function () {
                if ($("#IP3").val().length == 3) {
                    $("#IP4").focus();
                }
            });

            $("#IP4").keyup(function () {
                if ($("#IP4").val().length == 3) {
                    $("#Version1").focus();
                }
            });

            $("#Version1").keyup(function () {
                if ($("#Version1").val().length == 1) {
                    $("#Version2").focus();
                }
            });
            $("#Version2").keyup(function () {
                if ($("#Version2").val().length == 1) {
                    $("#Version3").focus();
                }
            });


        });

    }

    ActivateDeactivateStatus(Id:number)
    {
        this._MacIdConfigurationService.activatedeactivatestatus(Global.BASE_MACIDCONFIGURATION_ENDPOINT, Id)
            .subscribe(data =>
            {
                this.LoadMacIdConfiguration();
                this.GetActiveRecord();
            },
            error =>
            {
                this.msg = error;
            }
            //,error => this.msg = <any>error
            );
    }

}