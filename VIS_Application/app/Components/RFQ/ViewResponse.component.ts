//Saurabh

import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { RFQResponseService } from '../../Service/RFQ/RFQResponse.service';
import { RFQService } from '../../Service/RFQ/RFQ.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IAddRFQResponse, IActionTakenBy, IHiddenValue, IForRFQId } from '../../Model/RFQ/RFQResponse';
import { ITechMultiCheckBox, ITechnology, IRFQDocEntity, IRFQLink, IRFQDoc, IRFQLinkEntity } from '../../Model/RFQ/GeneralRFQ';
import { IRFQInitial } from '../../Model/RFQ/RFQEstimateListing';
import { ForSessionData } from '../../Model/RFQ/RFQEstimateListing';
import { DBOperation } from '../../Shared/enum';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../Shared/pager.index';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Component({
    providers: [RFQResponseService, RFQService],
    templateUrl: 'app/Components/RFQ/ViewResponse.component.html'
})

export class ViewRFQResponsecomponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    hiddenValue: IHiddenValue;
    addRFQResponse: IAddRFQResponse;
    actionTakenByList: IActionTakenBy[];
    actionTakenBy: IActionTakenBy;
    msg: string;
    indLoading: boolean = false;
    RFQFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    RFQFilter: string;
    isDesc: boolean = false;
    direction: number;
    forSessionData: ForSessionData;
    myOptions: ITechMultiCheckBox[];
    myOptionsEmp: ITechMultiCheckBox[];
    MultiTechnologys: ITechMultiCheckBox;
    Technology: ITechnology[] = [];
    FileTypeDDL: IRFQInitial;
    AuthorDDL: IRFQDoc;
    Access: boolean = true;

    forRFQId: IForRFQId;
    RFQDocList: IRFQDoc[] = [];
    RFQDoc: IRFQDoc;
    RFQDocEntity: IRFQDocEntity;
    RFQDocEntityList: IRFQDocEntity[] = [];
    RFQLinkList: IRFQLink[] = [];
    RFQLink: IRFQLink;
    RFQLinkEntityList: IRFQLink[] = [];
    RFQLinkEntity: IRFQLink;
    fileList: FileList;
    i: number;
    fileListForAPI: FileList[] = [];

    constructor(private fb: FormBuilder, private _RFQResponseService: RFQResponseService, private _RFQService: RFQService, private router: Router, private pagerService: PagerService, private route: ActivatedRoute, private http: Http) {

    }
   
    ngOnInit(): void {

        this.addRFQResponse = ({
            RFQ_InitialID: 0,
            IsEstimateReady: false,
            IsChangeToAction: false,
            Hours: 0,
            Timeline: 0,
            Timeline_Unit: '',
            Leadtime: 0,
            Leadtime_Unit: '',
            Technology: '',
            TechnologyIdList: 0,
            Description: '',
            ActionRequestedBy: 0,
            ActionByDate: null,
            EmployeeName: '',
            hdnEmployee: '',
            CurruntDate: null,
            hdnEmployeeId: 0,
            EmpId: 0

        });
       
        this.forRFQId = ({
            RFQId: 0

        });

        this.forSessionData = ({
            SessionId: 0
        });
        this.actionTakenBy = ({
            EmpId: 0,
            Employee_Name: ''
        });

        this.RFQDoc = ({
            FileTypeID: 0,
            FileType: '',
            FileName: '',
            AuthorId: 0,
            Author: '',
            RemarkDoc: ''
        });
        this.RFQDocEntity = ({
            FileTypeId: 0,
            FileType: '',
            FileName: '',
            AuthorId: 0,
            Author: '',
            RemarkDoc: ''
        });
        this.RFQLink = ({
            RemarkLink: '',
            UserId: '',
            Password: '',
            URL: ''
        })
        this.forSessionData.SessionId = +sessionStorage.getItem('Id');
        this.LoadActionTaken();
        this.GetTechnology();
        this.LoadData();
        this.GetRFQLink();
        this.GetRFQDocument();
      
    }
    GetRFQLink()
    {
        
        this._RFQResponseService.GetRFQLink(Global.BASE_RFQResponse_ENDPOINT)
            .subscribe(RFQs => {
                this.RFQLink = RFQs;
               
            });
    }
    GetRFQDocument() {
        
        this._RFQResponseService.GetRFQDocument(Global.BASE_RFQResponse_ENDPOINT)
            .subscribe(RFQs => {
                this.RFQDoc = RFQs;
            });
    }
    LoadActionTaken(): void {
       
        this.indLoading = true;
        this._RFQResponseService.GetActionTaken(Global.BASE_RFQResponse_ENDPOINT, this.forSessionData.SessionId, this.Access)
            .subscribe(RFQs => {
                this.actionTakenByList = RFQs;
                
            }
            //,error => this.msg = <any>error
            );
    }
    LoadData(): void {
        this._RFQResponseService.GetViewRFQResponseById(Global.BASE_RFQResponse_ENDPOINT, 68)//68==rfqid
            .subscribe(RFQs => {
                this.addRFQResponse = RFQs;
                debugger;
                if (this.addRFQResponse.Timeline_Unit = 'D')
                {
                    this.addRFQResponse.Timeline_Unit = 'Days';
                }
                else if (this.addRFQResponse.Timeline_Unit = 'W')
                {
                    this.addRFQResponse.Timeline_Unit = 'Week';
                }
                else if (this.addRFQResponse.Timeline_Unit = 'M')
                {
                    this.addRFQResponse.Timeline_Unit = 'Month';
                }
                else 
                {
                    this.addRFQResponse.Timeline_Unit = 'Year';
                }


                if (this.addRFQResponse.Leadtime_Unit = 'D') {
                    this.addRFQResponse.Leadtime_Unit = 'Days';
                }
                else if (this.addRFQResponse.Leadtime_Unit = 'W') {
                    this.addRFQResponse.Leadtime_Unit = 'Week';
                }
                else if (this.addRFQResponse.Leadtime_Unit = 'M') {
                    this.addRFQResponse.Leadtime_Unit = 'Month';
                }
                else
                {
                    this.addRFQResponse.Timeline_Unit = 'Year';
                }


                
                debugger;
            }
            //,error => this.msg = <any>error
            );

    }
    GetTechnology(): void {
        this.indLoading = true;
        this._RFQResponseService.GetTechnology(Global.BASE_RFQ_ENDPOINT)
            .subscribe(Technology => {
                this.Technology = Technology;
                this.myOptions = [];
                for (let item of this.Technology) {
                    this.myOptions.push({ id: item.TechnologyId, name: item.TechnologyName });
                }
                this.indLoading = false;
            });
    }
    
   
}