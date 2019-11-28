//Saurabh

import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { RFQResponseService } from '../../Service/RFQ/RFQResponse.service';
import { RFQService } from '../../Service/RFQ/RFQ.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IAddRFQResponse, IActionTakenBy, IHiddenValue, IForRFQId} from '../../Model/RFQ/RFQResponse';
import { ITechMultiCheckBox, ITechnology, IRFQDocEntity, IRFQLink, IRFQDoc, IRFQLinkEntity } from '../../Model/RFQ/GeneralRFQ';
import { IRFQInitial} from '../../Model/RFQ/RFQEstimateListing';
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
    templateUrl: 'app/Components/RFQ/AddResponse.component.html'
})

export class AddRFQResponsecomponent implements OnInit {

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

    constructor(private fb: FormBuilder, private _RFQResponseService: RFQResponseService,private _RFQService: RFQService, private router: Router, private pagerService: PagerService, private route: ActivatedRoute, private http: Http) {
      
    }
    fileChangeDoc(event) {

        this.fileList = event.target.files;
        this.fileListForAPI[this.i] = this.fileList;
        this.i = this.i + 1;
    }
    ngOnInit(): void {
       
        this.addRFQResponse = ({
            RFQ_InitialID: 0,
            IsEstimateReady: false,
            IsChangeToAction:false,
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
            EmpId:0
          
        });
        this.forRFQId = ({
            RFQId :0

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
        this.GetFileType();
        this.GetAuthor();
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
        this._RFQResponseService.GetOnLoadData(Global.BASE_RFQResponse_ENDPOINT, this.forSessionData.SessionId, 21)//21==rfqid
            .subscribe(RFQs => {
                this.hiddenValue = RFQs;
                this.addRFQResponse.EmployeeName = this.hiddenValue.hdnEmployee;
                this.addRFQResponse.hdnEmployeeId = this.hiddenValue.hdnEmployeeId;
                debugger;   
                this.addRFQResponse.CurruntDate = new Date();
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
    GetFileType(): void {

        this.indLoading = true;
        this._RFQService.GetFileType(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.FileTypeDDL = RFQs;

                this.indLoading = false;
            });
    }
    GetAuthor(): void {

        this.indLoading = true;
        this._RFQService.GetAuthor(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.AuthorDDL = RFQs;

                this.indLoading = false;
            });
    }
    onAddRFQSubmit(formData: any)
    {
        debugger;
        this.forRFQId.RFQId = 21;
        debugger;
        var MainAddResponse = {
            SessionData: this.forSessionData,
            RFQResponse: formData,
            RFQDoc: this.RFQDocEntityList,
            RFQLink: this.RFQLinkEntityList,
            RFQId: this.forRFQId.RFQId
            //  RFQDoc: this.RFQDocList,
            //RFQLink: this.RFQLinkList
        }
        this._RFQResponseService.post(Global.BASE_RFQResponse_ENDPOINT, MainAddResponse).subscribe(
            data => {

                if (data.startsWith("Success:"))//Success
                {
                    
                    this.msg = data;
                    if (this.fileListForAPI.length > 0) {
                        var k = 0;
                        for (let fileToBeUpload of this.fileListForAPI) {
                            let file: File = fileToBeUpload[0];
                            let formData: FormData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            let headers = new Headers()
                            let options = new RequestOptions({ headers: headers });
                            let apiUrl1 = "/api/RFQAPI/UploadRFQDoc";
                            this.http.post(apiUrl1, formData, options)
                                .map(res => res.json())
                                .catch(error => Observable.throw(error))
                                .subscribe(
                                data => console.log('success'),
                                error => console.log(error)
                                )
                            file = null;
                            formData = null;
                            headers = null;
                            options = null;
                            k = k + 1;
                        }
                        
                        this.fileListForAPI = null;
                    }
                    alert('Record Added Successfully.');
                    this.router.navigate(['/MyRFQ']);
                }
                else {
                    alert(data);
                }
            },
            error => {
                this.msg = error;
            }
        );
    }

    onDocSubmit(formDocData: any) {
        if (this.fileList != null) {
            this.RFQDocEntity = formDocData;
            this.RFQDocEntity.FileName = this.fileList.item(0).name;
            this.RFQDocEntityList.push(this.RFQDocEntity);

            this.clearDoc();
        }
        else {
            alert('please select Any document file')
        }



    }
    deleteRFQDoc(FileName: any) {
        var elementPos = this.RFQDocList.map(function (x) { return x.FileName; }).indexOf(FileName);
        this.RFQDocEntityList.splice(elementPos, 1);
    }
    onLinkSubmit(formLinkData: any) {
        this.RFQLinkEntity = formLinkData;
        this.RFQLinkEntityList.push(this.RFQLinkEntity);
        this.clearLink();
    }
    deleteRFQLink(UserId: any) {
        var elementPos = this.RFQLinkList.map(function (x) { return x.UserId; }).indexOf(UserId);
        this.RFQLinkEntityList.splice(elementPos, 1);
    }
    clearDoc() {
        this.RFQDoc.Author = "";
        this.RFQDoc.AuthorId = 0;
        this.RFQDoc.FileName = "";
        this.RFQDoc.FileType = "";
        this.RFQDoc.RemarkDoc = "";
    }
    clearLink() {
        this.RFQLink.Password = "";
        this.RFQLink.RemarkLink = "";
        this.RFQLink.URL = "";
        this.RFQLink.UserId = '';
    }
    SetControlsState(isEnable: boolean) {
        isEnable ? this.RFQFrm.enable() : this.RFQFrm.disable();
    }
  

}