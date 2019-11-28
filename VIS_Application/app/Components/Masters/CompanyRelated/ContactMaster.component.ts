
import { Component, OnInit, ViewChild, Directive, forwardRef  } from '@angular/core';
import { ContactMasterService } from '../../../service/Masters/CompanyRelated/ContactMaster.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IContactMaster } from '../../../Model/Masters/CompanyRelated/ContactMaster';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component({
    providers: [ContactMasterService],
    templateUrl: 'app/Components/Masters/CompanyRelated/ContactMaster.component.html'
})



export class ContactMasterComponent implements OnInit {
    
    @ViewChild('modal') modal: ModalComponent;
    ContactMasters: IContactMaster[];
    public ContactMaster: IContactMaster;
    msg: string;
    indLoading: boolean = false;
    ContactMasterFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    ContactMasterFilter: string;
    isDesc: boolean = false;
    column: any = 'Full_Name';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    PagerInformation: string;
    // paged items
    pagedItems: any[];

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchName: string;
    strSearchDesignation: string;
    strSearchContactDetails: string;

    constructor(private fb: FormBuilder, private _ContactMasterService: ContactMasterService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.ContactMasterFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Designation: ['', Validators.required],
            Email: ['', Validators.required],
            phone: ['', Validators.required],
            SkypeId: ['', Validators.required],
            MsnId: ['', Validators.required],
            GtalkId: ['', Validators.required],
            AolId: ['', Validators.required],
            Other: ['', Validators.required],
            ProspectId: ['', Validators.required],
            CompanyId : [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        

        this.LoadContactMasters()


    }

    ContactMasterFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.ContactMasterFilter = value;
    }

    ContactMasterSort(property: any) {
        if (!this.ShowHideSearch) { 
        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadContactMasters(): void {
        
        this.indLoading = true;
        this._ContactMasterService.get(Global.BASE_CONTACTMASTER_ENDPOINT)
            .subscribe(ContactMasters => {
                this.ContactMasters = ContactMasters;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchName = (<HTMLInputElement>document.getElementById("searchName")).value;

                    if (this.strSearchName != '') {
                        this.strSearchName = this.strSearchName.toLocaleLowerCase();
                        this.ContactMasters = this.ContactMasters.filter(
                            x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strSearchName) != -1);
                    }

                    this.strSearchDesignation = (<HTMLInputElement>document.getElementById("searchDesignation")).value;
                    if (this.strSearchDesignation != '') {
                        this.strSearchDesignation = this.strSearchDesignation.toLocaleLowerCase();
                        this.ContactMasters = this.ContactMasters.filter(
                            x => x.Designation != null && x.Designation.toLocaleLowerCase().indexOf(this.strSearchDesignation) != -1);
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

    addContactMaster() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Contact";
        this.modalBtnTitle = "Add";
        this.ContactMasterFrm.reset();
        this.modal.open();
    }

    editContactMaster(id: number) {
        
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Contact";
        this.modalBtnTitle = "Update";
        this.ContactMaster = this.ContactMasters.filter(x => x.Id == id)[0];
        this.ContactMasterFrm.setValue(this.ContactMaster);
        this.modal.open();
    }

    deleteContactMaster(id: number, status: boolean) {
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

        this.ContactMaster = this.ContactMasters.filter(x => x.Id== id)[0];
        this.ContactMasterFrm.setValue(this.ContactMaster);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.ContactMasterFrm.enable() : this.ContactMasterFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.ContactMasters);
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
                this._ContactMasterService.post(Global.BASE_CONTACTMASTER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadContactMasters();
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
                this._ContactMasterService.put(Global.BASE_CONTACTMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadContactMasters();
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
                this._ContactMasterService.delete(Global.BASE_CONTACTMASTER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "ContactMaster status changed successfully.";
                            this.LoadContactMasters();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing ContactMaster!"
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