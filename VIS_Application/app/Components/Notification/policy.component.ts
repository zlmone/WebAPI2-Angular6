import { Component, OnInit, ViewChild } from '@angular/core';
import { PolicyService } from '../../service/Notification/Policy.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IPolicy } from '../../Model/Notification/Policy';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../Shared/pager.index';

@Component({
    providers: [PolicyService],
    templateUrl: 'app/Components/Notification/Policy.component.html'
})

export class PolicyComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modal1') modal1: ModalComponent;
    Policys: IPolicy[];
    Policy: IPolicy;
    ViewIPolicy: IPolicy[];
    msg: string;
    indLoading: boolean = false;
    PolicyFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    PolicyFilter: string;
    isDesc: boolean = false;
    column: any = 'Policy_Name';
    direction: number;
    CurrentRecordsPerPage: number = 10;
    
    // pager object
    pager: any = {};    
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchPolicy_Name: string;
    strSearchDescription: string;
    
    constructor(private fb: FormBuilder, private _PolicyService: PolicyService, private pagerService: PagerService) { }

    ngOnInit(): void {
        this.PolicyFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Policy_Name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            Description: ['', Validators.required],
            IsNewPolicy: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadPolicys()
    }

    PolicyFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.PolicyFilter = value;
    }

   
    PolicySort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

    LoadPolicys(): void {
        this.indLoading = true;
        this._PolicyService.get(Global.BASE_POLICY_ENDPOINT)
            .subscribe(Policys => {
                this.Policys = Policys;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchPolicy_Name = (<HTMLInputElement>document.getElementById("searchPolicy_Name")).value;

                    if (this.strSearchPolicy_Name != '') {
                        this.strSearchPolicy_Name = this.strSearchPolicy_Name.toLocaleLowerCase();
                        this.Policys = this.Policys.filter(
                            x => x.Policy_Name != null && x.Policy_Name.toLocaleLowerCase().indexOf(this.strSearchPolicy_Name) != -1);
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


    addPolicy() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Policy";
        this.modalBtnTitle = "Add";
        this.PolicyFrm.reset();
        this.modal.open();
    }

    editPolicy(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Policy";
        this.modalBtnTitle = "Update";
        this.Policy = this.Policys.filter(x => x.Id == id)[0];
        this.PolicyFrm.setValue(this.Policy);
        this.modal.open();
    }

    deletePolicy(id: number, status: boolean) {
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

        this.Policy = this.Policys.filter(x => x.Id == id)[0];
        this.PolicyFrm.setValue(this.Policy);
        this.modal.open();
    }


    ViewPolicy(id: number) {
        
        this.dbops = DBOperation.View;
        this.SetControlsState(false);
        this.modalTitle = "View Policy";
        this.modalBtnTitle = "Back";
        this.Policy = this.Policys.filter(x => x.Id == id)[0];
        this.PolicyFrm.setValue(this.Policy);
        this.modal1.open();
        this.LoadViewPolicy(id);

    }
    LoadViewPolicy(id: number): void {
        
        this.indLoading = true;
        this._PolicyService.getViewPolicy(Global.BASE_POLICY_ENDPOINT, id)
            .subscribe(DATADP => {
                this.ViewIPolicy = DATADP;


            }

            );
    }
    SetControlsState(isEnable: boolean) {
        isEnable ? this.PolicyFrm.enable() : this.PolicyFrm.disable();
    }
    
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Policys);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        
    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._PolicyService.post(Global.BASE_POLICY_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadPolicys();
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
                this._PolicyService.put(Global.BASE_POLICY_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadPolicys();
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
                this._PolicyService.delete(Global.BASE_POLICY_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Policy status changed successfully.";
                            this.LoadPolicys();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing Policy!"
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