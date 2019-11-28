
import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { RFQService } from '../../Service/RFQ/RFQ.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ProspectClient,SessionValues,IRFQ, IRFQInitial, IRFQDoc, IRFQLink, ITechnology, ITechMultiCheckBox, IEmployee,IRFQDocEntity, ForSessionData} from '../../Model/RFQ/RFQEstimateListing';
import { DBOperation } from '../../Shared/enum';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../Shared/pager.index';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { DatepickerOptions } from 'ng2-datepicker';
import { Http, RequestOptions, Headers, Response } from '@angular/http'; 

@Component({
    providers: [RFQService],
    templateUrl: 'app/Components/RFQ/AddRFQ.component.html'
})

export class AddRFQComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    forSessionData: ForSessionData;
    prospectClient: ProspectClient;
    prospectClientList: ProspectClient[];
    sessionValues: SessionValues;
    RFQs: IRFQInitial;
    MultiTechnology: any=[];
    myOptions: ITechMultiCheckBox[];
    myOptionsEmp: ITechMultiCheckBox[];
    MultiTechnologys: ITechMultiCheckBox;
    Technology: ITechnology[] = [];
    Employee: IEmployee[] = [];
    RFQDocList: IRFQDoc[] = [];
    RFQDoc: IRFQDoc;
    RFQDocEntity: IRFQDocEntity;
    RFQDocEntityList: IRFQDocEntity[] = [];
    RFQLinkList: IRFQLink[] = [];
    RFQLink: IRFQLink;
    RFQLinkEntityList: IRFQLink[] = [];
    RFQLinkEntity: IRFQLink;
    BusinessHeadDDL: IRFQInitial;
    BusinessManagerDDL: IRFQInitial;
    BusinessTypeDDL: IRFQInitial;
    ProjectTypeDDL: IRFQInitial;
    IndustriesDDL: IRFQInitial;
    SolutionDDL: IRFQInitial;
    ServiceOfferingDDL: IRFQInitial;
    AuthorDDL: IRFQDoc;
    RFQStatusDDL: IRFQInitial;
    FileTypeDDL: IRFQInitial;
    fileList: FileList
    fileListForAPI: FileList[] = [];
    msg: string;
    i: number;
    indLoading: boolean = false;
    ProspectHelper: boolean;
    sessionvar: string;
    ProspectClientFilter: string;
    CurrentRecordsPerPage: number = 10;
    pager: any = {};
    pagedItems: any[];
    CPFrm: FormGroup;
    SourceVal: boolean;

    constructor(private fb: FormBuilder, private _RFQService: RFQService, private router: Router, private pagerService: PagerService, private http: Http) {
        this.MultiTechnology.id = null;
        this.MultiTechnology.name = null;
        this.i = 0;
    }
    fileChangeDoc(event) {
    
        this.fileList = event.target.files;
        this.fileListForAPI[this.i] = this.fileList;
        this.i = this.i + 1;
    }
    addClient() {
        debugger;
        this.modal.open();
        this.ProspectHelper = false;
    }
  
    ngOnInit(): void {

        this.CPFrm = this.fb.group({
            Id: [''],
            CompanyName: [''],
            Country: [''],
            FilterRadioButton: ['']
            
        });

        this.RFQs = ({
            Id: 0,
            BusinessHeadId: 0,
            BusinessManagerId:0,
            Employee_Name: '',
            BusinessTypeId: 0,
            BusinessType: '',
            ProjectTypeId: 0,
            ProjectType: '',
            IndustryId: 0,
            Industries: '',
            SolutionId: 0,
            Solution: '',
            ServiceOfferingId: 0,
            ServiceOffering: '',
            TechnologyIdList : 0,
            TechnologyId: 0,
            TechnologyName: '',
            Remark: '',
            ResponseRequiredBy: null,
            SupportedBy: '',
            ConfidenceLevel: 0,
            OpportunityStatus: '',
            StatusId :0,
            RFQStatus: '',
            ExpectedClosureDate: null,
            Source: '',
            Title: '',
            ProspectClient: '',
            DateOfInitiation: null,
            UserIdList : 0,
            UserId: 0,
            ResponseRequiredFrom: 0,
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedBy: 0,
            UpdatedDate: null,

        });
        this.RFQDoc = ({
            FileTypeID : 0,
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
            UserId: 0,
            Password: '',
            URL: ''
        })
        this.forSessionData = ({
            SessionId : 0
        });
        this.prospectClient = ({
                 Id: 0,
                CompanyName: "",
                Country : "",
                FilterRadioButton: ""
        });
        this.sessionValues = ({
            UserType: "",
            UserId: 0
        })
        this.GetEmployee();
        this.GetTechnology();
        this.LoadFillBusinessHead();
        this.GetBusinessManager();
        this.GetBusinessType();
        this.GetProjectType();
        this.GetIndustries();
        this.GetSolution();
        this.GetServiceOffering();
        this.GetFileType();
        this.GetAuthor();
        this.GetRFQStatus();
        this.GetProspectClient();
        this.ProspectHelper = true;
        this.SourceVal = false;
       
    }

    LoadFillBusinessHead(): void {
       
        this.indLoading = true;
        this._RFQService.FillBusinessHead(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.BusinessHeadDDL = RFQs;
                this.indLoading = false;
            });
    }
    GetBusinessManager(): void {
        var UserName = sessionStorage.getItem('VISUsername');
        var UserType = sessionStorage.getItem('UserType');
        this.indLoading = true;
        this._RFQService.GetBusinessManager(Global.BASE_RFQ_ENDPOINT, UserName)
            .subscribe(RFQs => {
                this.BusinessManagerDDL = RFQs;
                this.indLoading = false;
            });
    }
    GetBusinessType(): void {
        this.indLoading = true;
        this._RFQService.GetBusinessType(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.BusinessTypeDDL = RFQs;
                this.indLoading = false;
            });
    }
    GetProjectType(): void {

        this.indLoading = true;
        this._RFQService.GetProjectType(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.ProjectTypeDDL = RFQs;
                
                this.indLoading = false;
            });
    }
    GetIndustries(): void {
        this.indLoading = true;
        this._RFQService.GetIndustries(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.IndustriesDDL = RFQs;
                this.indLoading = false;
            });
    }
    GetSolution(): void {

        this.indLoading = true;
        this._RFQService.GetSolution(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.SolutionDDL = RFQs;
               
                this.indLoading = false;
            });
    }
    GetServiceOffering(): void {
       
        this.indLoading = true;
        this._RFQService.GetServiceOffering(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.ServiceOfferingDDL = RFQs;
               
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
    GetRFQStatus(): void {

        this.indLoading = true;
        this._RFQService.GetRFQStatus(Global.BASE_RFQ_ENDPOINT)
            .subscribe(RFQs => {
                this.RFQStatusDDL = RFQs;

                this.indLoading = false;
            });
    }
    GetTechnology(): void {

        this.indLoading = true;
        this._RFQService.GetTechnology(Global.BASE_RFQ_ENDPOINT)
            .subscribe(Technology => {
                this.Technology = Technology;


                this.myOptions = [];
                for (let item of this.Technology)
                {
                    this.myOptions.push({ id: item.TechnologyId, name: item.TechnologyName });
                }
                
                this.indLoading = false;
            });
    }
    GetEmployee(): void {
       
        this.indLoading = true;
        this._RFQService.GetEmployee(Global.BASE_RFQ_ENDPOINT)
            .subscribe(Emp => {
                this.Employee = Emp;

                debugger
                this.myOptionsEmp = [];
                for (let item of this.Employee) {
                    this.myOptionsEmp.push({ id : item.UserId , name: item.Employee_Name});
                }

                debugger;
                this.indLoading = false;
            });
    }
    GetProspectClient()
    {
        this.sessionvar = sessionStorage.getItem('IsAdmin');
        this.sessionValues.UserId = +sessionStorage.getItem('Id'); // + is used for casting string to number 
        if (this.sessionvar == "true")
        {
            this.sessionValues.UserType = "admin";
        }

        this.sessionValues.UserType = "admin";
        this.prospectClient.FilterRadioButton = "Client"
        var SuperProspectClient =
            {
                ProspectClient : this.prospectClient,
                SessionValues : this.sessionValues
            }

        this._RFQService.GetProspectClient(Global.BASE_RFQ_ENDPOINT, SuperProspectClient).subscribe(
            data => {
                this.prospectClientList = data;
                debugger;
                // initialize to page 1
                this.JumpOnPage(1);
            },
            error => {
                this.msg = error;
            }
        );
    }
  

    onRFQInitialSubmit(formData: any)
    {
        if (this.ProspectHelper == true) {
            this.forSessionData.SessionId = +sessionStorage.getItem('Id'); // + is used for casting string to number
       
            var MainRFQInitial = {
                SessionData: this.forSessionData,
                RFQInitial: formData,
                RFQDoc: this.RFQDocEntityList,
                RFQLink: this.RFQLinkEntityList
                //  RFQDoc: this.RFQDocList,
                //RFQLink: this.RFQLinkList
            }

            this._RFQService.post(Global.BASE_RFQ_ENDPOINT, MainRFQInitial).subscribe(
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
        else
        {
            this.ProspectHelper = true;
        }
    }
    onDocSubmit(formDocData: any)
    {
        if (this.fileList != null) {
            this.RFQDocEntity = formDocData;
            this.RFQDocEntity.FileName = this.fileList.item(0).name;
            this.RFQDocEntityList.push(this.RFQDocEntity);
           
            this.clearDoc();
        }
        else
        {
            alert('please select Any document file')
        }


       
    }
    deleteRFQDoc(FileName: any) {
        var elementPos = this.RFQDocList.map(function (x) { return x.FileName; }).indexOf(FileName);
        this.RFQDocEntityList.splice(elementPos, 1);
    }
    onLinkSubmit(formLinkData: any)
    {
        this.RFQLinkEntity = formLinkData;
        this.RFQLinkEntityList.push(this.RFQLinkEntity);
        this.clearLink();
    }
    deleteRFQLink(UserId: any) {
        var elementPos = this.RFQLinkList.map(function (x) { return x.UserId; }).indexOf(UserId);
        this.RFQLinkEntityList.splice(elementPos, 1);
    }
    clearDoc()
    {
        this.RFQDoc.Author = "";
        this.RFQDoc.AuthorId = 0;
        this.RFQDoc.FileName = "";
        this.RFQDoc.FileType = "";
        this.RFQDoc.RemarkDoc = "";
    }
    clearLink()
    {
        this.RFQLink.Password = "";
        this.RFQLink.RemarkLink = "";
        this.RFQLink.URL = "";
        this.RFQLink.UserId = 0;
    }

    
    ProspectClientFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.ProspectClientFilter = value;
    }
    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.prospectClientList);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }
    addClientInForm(Id: number, CompanyName: string, Country:string)
    {
        this.RFQs.ProspectClient = CompanyName;
        this.SourceVal = true;
        this.modal.dismiss();
    }
    ClearClient() {
        this.RFQs.ProspectClient = "";
        this.ProspectHelper = false;
        this.SourceVal = false;
    }
}