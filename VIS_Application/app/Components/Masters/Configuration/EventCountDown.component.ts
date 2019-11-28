import { Component, OnInit, ViewChild } from '@angular/core';
import { EventCountDownService } from '../../../service/Masters/Configuration/EventCountDown.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IEventCountDown } from '../../../Model/Masters/Configuration/EventCountDown';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
import { DatePipe } from '@angular/common';

@Component
    ({
        providers: [EventCountDownService],
        templateUrl: 'app/Components/Masters/Configuration/EventCountDown.component.html'
    })

export class EventCountDownComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;

    eventcountdowns: IEventCountDown[];
    eventcountdown: IEventCountDown;
    msg: string;
    indLoading: boolean = false;
    EventCountDownFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    EventCountDownFilter: string;
    isDesc: boolean = false;
    column: any = 'EventName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;
    nums: number[];

    //Variables for Filter
    ShowHideSearch: boolean = false;
    strEventName: string;
    strCountDownText: string;

    //Vaiable for For Loop No of Day

    //noday: number[] = new Array(200)

    constructor(private fb: FormBuilder, private _EventCountDownService: EventCountDownService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    Resetmodel()
    {
        this.eventcountdown =
            {
            Active: false,
            CountDownDate: '',
            CountDownDateTime: null,
            CountDownText: '',
            CountDownTime: '0',
            CreatedBy: '',
            CreatedOn: null,
            EventName: '',
            Id: 0,
            IsActive: false,
            NoOfDay: 0,
            UpdatedBy: '',
            UpdatedOn: null,
            CompanyId: 0,
            EntityMessage:''

        }
    }

    ngOnInit(): void
    {
        //for (var i = 1; i < this.noday.length ; i++)
        //{
        //    //this.noday.push(i);
            
        //}
        this._CommonHelperService.ToogleMenu();

        this.EventCountDownFrm = this.fb.group
            ({
                Id: [''],
                EventName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                CountDownText: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                CountDownDate: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                CountDownTime: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                CountDownDateTime: [''],
                NoOfDay: [0, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
                Active: [''],
                IsActive: [''],
                CreatedOn: [''],
                UpdatedOn: [''],
                CreatedBy: [''],
                UpdatedBy: [''],
                CompanyId: [''],
                EntityMessage:['']
            });

        this.LoadEventCountDown();
        

    }

    EventCountDownFilterCriteriaChange(value: string): void
    {
        if (value != '[object Event]')
            this.EventCountDownFilter = value;
    }

    EventCountDownSort(property: any)
    {
        if (!this.ShowHideSearch)
        {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };
    
    LoadEventCountDown(): void
    {
        this.indLoading = true;
        this._EventCountDownService.get(Global.BASE_EVENTCOUNTDOWN_ENDPOINT)
            .subscribe(eventcountdown => {
                this.eventcountdowns = eventcountdown;

                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strEventName = (<HTMLInputElement>document.getElementById("searchEventName")).value;
                    if (this.strEventName != '') {
                        this.strEventName = this.strEventName.toLocaleLowerCase();
                        this.eventcountdowns = this.eventcountdowns.filter
                            (
                            x => x.EventName != null && x.EventName.toLocaleLowerCase().indexOf(this.strEventName) != -1);
                    }


                    this.strCountDownText = (<HTMLInputElement>document.getElementById("searchCountDownText")).value;
                    if (this.strCountDownText != '') {
                        this.strCountDownText = this.strCountDownText.toLocaleLowerCase();
                        this.eventcountdowns = this.eventcountdowns.filter
                            (
                            x => x.CountDownText != null && x.CountDownText.toLocaleLowerCase().indexOf(this.strCountDownText) != -1);
                    }


                }

                //Logic for searching - End




                this.indLoading = false;
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    AddEventCountDown()
    {

        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Event Count Down";
        this.modalBtnTitle = "Add";
        this.Resetmodel();
        this.EventCountDownFrm.setValue(this.eventcountdown);
        this.modal.open();
    }

    EditEventCountDown(id: number)
    {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Event Count Down";
        this.modalBtnTitle = "Update";
        this.eventcountdown = this.eventcountdowns.filter(x => x.Id == id)[0];
        this.eventcountdown.CountDownTime = this.eventcountdown.CountDownDateTime.substr(11, 9);
        this.eventcountdown.CountDownDate = this.eventcountdown.CountDownDateTime.substr(0, 10);
        this.EventCountDownFrm.setValue(this.eventcountdown);
        this.modal.open();
    }

    DeleteEventCountDown(id: number, status: boolean)
    {
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
        this.eventcountdown = this.eventcountdowns.filter(x => x.Id == id)[0];
        this.eventcountdown.CountDownTime = this.eventcountdown.CountDownDateTime.substr(11, 9);
        this.eventcountdown.CountDownDate = this.eventcountdown.CountDownDateTime.substr(0, 10);
        this.EventCountDownFrm.setValue(this.eventcountdown);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.EventCountDownFrm.enable() : this.EventCountDownFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.eventcountdowns);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls()
    {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: any)
    {
        //this.eventcountdown.CountDownDateTime = this.eventcountdown.CountDownDate + this.eventcountdown.CountDownTime;
        console.log(formData);
        //
        this.msg = "";
        switch (this.dbops) {
            case DBOperation.create:
                this._EventCountDownService.post(Global.BASE_EVENTCOUNTDOWN_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {

                            this.msg = data;
                            this.LoadEventCountDown();
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

                this._EventCountDownService.put(Global.BASE_EVENTCOUNTDOWN_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadEventCountDown();
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
                this._EventCountDownService.delete(Global.BASE_EVENTCOUNTDOWN_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "EventCountDown status changed successfully.";
                            this.LoadEventCountDown();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing EventCountDown!"
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