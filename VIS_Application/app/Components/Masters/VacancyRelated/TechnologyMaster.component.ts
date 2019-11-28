import { Component, OnInit, ViewChild } from '@angular/core';
import { TechnologyMasterService } from '../../../service/Masters/VacancyRelated/TechnologyMaster.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ITechnologyMaster } from '../../../Model/Masters/VacancyRelated/TechnologyMaster';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';

@Component({
    providers: [TechnologyMasterService],
    templateUrl: 'app/Components/Masters/VacancyRelated/TechnologyMaster.component.html'
})

export class TechnologyMasterComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    TechnologyMasters: ITechnologyMaster[];
    TechnologyMaster: ITechnologyMaster;
    msg: string;
    indLoading: boolean = false;
    TechnologyMasterFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    TechnologyMasterFilter: string;
    isDesc: boolean = false;
    column: any = 'Full_Name';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchTechnologyName: string;
    strSearchRemarks: string;
    strSearchMajor: string;
    

    // paged items
    pagedItems: any[];
    constructor(private fb: FormBuilder, private _TechnologyMasterService: TechnologyMasterService, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.TechnologyMasterFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            TechnologyName: ['', Validators.required],
            Remarks: ['', Validators.required],
            Major: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });

        this.LoadTechnologyMasters()


    }

    TechnologyMasterFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.TechnologyMasterFilter = value;
    }

    TechnologyMasterSort(property: any) {
        if (!this.ShowHideSearch) { 
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadTechnologyMasters(): void {
        this.indLoading = true;
        this._TechnologyMasterService.get(Global.BASE_TECHNOLOGYMASTER_ENDPOINT)
            .subscribe(TechnologyMasters => {
                this.TechnologyMasters = TechnologyMasters;
                this.indLoading = false;
                // set items to json response
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchTechnologyName = (<HTMLInputElement>document.getElementById("searchTechnologyName")).value;

                    if (this.strSearchTechnologyName != '') {
                        this.strSearchTechnologyName = this.strSearchTechnologyName.toLocaleLowerCase();
                        this.TechnologyMasters = this.TechnologyMasters.filter(
                            x => x.TechnologyName != null && x.TechnologyName.toLocaleLowerCase().indexOf(this.strSearchTechnologyName) != -1);
                    }

                    this.strSearchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
                    if (this.strSearchRemarks != '') {
                        this.strSearchRemarks = this.strSearchRemarks.toLocaleLowerCase();
                        this.TechnologyMasters = this.TechnologyMasters.filter(
                            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.strSearchRemarks) != -1);
                    }

                    //this.strSearchMajor = (<HTMLInputElement>document.getElementById("searchSub_Unit")).value;
                    //if (this.strSearchMajor != '') {
                    //    this.strSearchMajor = this.strSearchMajor.toLocaleLowerCase();
                    //    this.TechnologyMasters = this.TechnologyMasters.filter(
                    //        x => x.Major != null && x.Major.toLocaleLowerCase().indexOf(this.strSearchMajor) != -1);
                    //}
                }
                //Logic for searching - End

                // initialize to page 1
                this.JumpOnPage(1);
                this.pager = this.pagerService.pager;
                this.pagedItems = this.pagerService.pagedItems;
            }
            //,error => this.msg = <any>error
            );
    }


    addTechnologyMaster() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New TechnologyMaster";
        this.modalBtnTitle = "Add";
        this.TechnologyMasterFrm.reset();
        this.modal.open();
    }

    editTechnologyMaster(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit TechnologyMaster";
        this.modalBtnTitle = "Update";
        this.TechnologyMaster = this.TechnologyMasters.filter(x => x.Id == id)[0];
        this.TechnologyMasterFrm.setValue(this.TechnologyMaster);
        this.modal.open();
    }

    deleteTechnologyMaster(id: number, status: boolean) {
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

        this.TechnologyMaster = this.TechnologyMasters.filter(x => x.Id == id)[0];
        this.TechnologyMasterFrm.setValue(this.TechnologyMaster);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.TechnologyMasterFrm.enable() : this.TechnologyMasterFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.TechnologyMasters);
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
                this._TechnologyMasterService.post(Global.BASE_TECHNOLOGYMASTER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadTechnologyMasters();
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
                this._TechnologyMasterService.put(Global.BASE_TECHNOLOGYMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadTechnologyMasters();
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
                this._TechnologyMasterService.delete(Global.BASE_TECHNOLOGYMASTER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "TechnologyMaster status changed successfully.";
                            this.LoadTechnologyMasters();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing TechnologyMaster!"
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