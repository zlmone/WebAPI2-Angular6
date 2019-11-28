import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../service/Notification/News.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { INews } from '../../Model/Notification/News';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../Shared/pager.index';
import { DatePipe } from '@angular/common';

@Component({
    providers: [NewsService],
    templateUrl: 'app/Components/Notification/News.component.html'
})

export class NewsComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modal1') modal1: ModalComponent;
    Newss: INews[];
    News: INews;
    ViewNew: INews[];

    msg: string;
    indLoading: boolean = false;
    NewsFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    NewsFilter: string;
    isDesc: boolean = false;
    column: any = 'News_Name';
    direction: number;
    CurrentRecordsPerPage: number = 10;

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strSearchNews_Name: string;
    strSearchDescription: string;

    constructor(private fb: FormBuilder, private _NewsService: NewsService, private pagerService: PagerService) { }

    ngOnInit(): void {
        this.NewsFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            News_Name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            Description: ['', Validators.required],
            IsNew: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadNewss()
    }

    NewsFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.NewsFilter = value;
    }


    NewsSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

    LoadNewss(): void {
        this.indLoading = true;
        this._NewsService.get(Global.BASE_News_ENDPOINT)
            .subscribe(Newss => {
                this.Newss = Newss;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchNews_Name = (<HTMLInputElement>document.getElementById("searchNews_Name")).value;

                    if (this.strSearchNews_Name != '') {
                        this.strSearchNews_Name = this.strSearchNews_Name.toLocaleLowerCase();
                        this.Newss = this.Newss.filter(
                            x => x.News_Name != null && x.News_Name.toLocaleLowerCase().indexOf(this.strSearchNews_Name) != -1);
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


    addNews() {
     
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New News";
        this.modalBtnTitle = "Add";
        this.NewsFrm.reset();
        this.modal.open();
    }

    editNews(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit News";
        this.modalBtnTitle = "Update";
        this.News = this.Newss.filter(x => x.Id == id)[0];
        this.NewsFrm.setValue(this.News);
        this.modal.open();
    }

    deleteNews(id: number, status: boolean) {
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

        this.News = this.Newss.filter(x => x.Id == id)[0];
        this.NewsFrm.setValue(this.News);
        this.modal.open();
    }

    ViewNews(id: number) {
        
        this.dbops = DBOperation.View;
        this.SetControlsState(false);
        this.modalTitle = "View News";
        this.modalBtnTitle = "Back";
        this.News = this.Newss.filter(x => x.Id == id)[0];
        this.NewsFrm.setValue(this.News);
        this.modal1.open();
        this.LoadViewNews(id);
    }

    LoadViewNews(id: number): void {

        this.indLoading = true;
        this._NewsService.getViewNews(Global.BASE_News_ENDPOINT, id)
            .subscribe(DATADP => {
                this.ViewNew = DATADP;


            }

            );
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.NewsFrm.enable() : this.NewsFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Newss);
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
                
                this._NewsService.post(Global.BASE_News_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data;
                            this.LoadNewss();
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
                this._NewsService.put(Global.BASE_News_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadNewss();
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
                this._NewsService.delete(Global.BASE_News_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "News status changed successfully.";
                            this.LoadNewss();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing News!"
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