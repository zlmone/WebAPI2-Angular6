import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../Shared/enum';

import { Global } from '../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../Shared/pager.index';

@Injectable()
export class entityService {

    @ViewChild('modal') modal: ModalComponent;
    public entityCollection: any[];
    public entityObject: any;
    public entityEmptyObjectForView : any;
    public msg: string;
    
    public entityObjectFrm: FormGroup;
    public dbops: DBOperation;
    public modalTitle: string;
    public modalBtnTitle: string;
    public entityFilter: string;
    public isDesc: boolean = false;
    public column: string;
    public direction: number;
    public CurrentRecordsPerPage: number = 10;
    public GetURL: string;
    public CreateURL: string;
    public UpdateURL: string;
    public DeleteURL: string;
    // pager object
    public pager: any = {};
    // paged items
    public pagedItems: any[];
    public PagerInformation: string;

    //Variables for Filter
    ShowHideSearch: boolean = false;


    constructor(private _http: Http, private fb: FormBuilder, private pagerService: PagerService) {
    }

    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());
    }

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    ngOnInit(): void {
        
        this.entityObjectFrm = this.fb.group(this.entityEmptyObjectForView);
       
        
    }

    entityFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.entityFilter = value;
    }


    entitySort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }

   


    addentity() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New entity";
        this.modalBtnTitle = "Add";
        this.entityObjectFrm.reset();
        this.modal.open();
    }

    editentity(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit entity";
        this.modalBtnTitle = "Update";
        this.entityObject = this.entityCollection.filter(x => x.Id == id)[0];
        this.entityObjectFrm.setValue(this.entityObject);
        this.modal.open();
    }

    deleteentity(id: number, status: boolean) {
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

        this.entityObject = this.entityCollection.filter(x => x.Id == id)[0];
        this.entityObjectFrm.setValue(this.entityObject);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.entityObjectFrm.enable() : this.entityObjectFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.entityCollection);
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
                this.post(this.GetURL, formData._value);
                break;
            case DBOperation.update:
                this.put(this.GetURL, formData._value.Id, formData._value);
                break;
            case DBOperation.delete:
                this.delete(this.GetURL, formData._value.Id);
                break;

        }
    }
}