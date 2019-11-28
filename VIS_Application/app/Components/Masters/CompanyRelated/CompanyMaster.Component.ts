
import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { CompanyMasterService } from '../../../service/Masters/CompanyRelated/CompanyMaster.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICompanyMaster } from '../../../Model/Masters/CompanyRelated/CompanyMaster';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { ILookup } from '../../../Model/Masters/CompanyRelated/Lookup'
import { IFinancialYear } from '../../../Model/Masters/CompanyRelated/FinancialYear'
import { IPosition } from '../../../Model/Masters/VacancyRelated/Position'
import { FileDropDirective, FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { IForHeaddl } from '../../../Model/Masters/CompanyRelated/ForHeaddll'

import { Http, RequestOptions, Headers, Response } from '@angular/http'; 



@Component({
    providers: [CompanyMasterService],
    templateUrl: 'app/Components/Masters/CompanyRelated/CompanyMaster.component.html'
})

export class CompanyMasterComponent implements OnInit {
    public uploaderF1: FileUploader;
    
    @ViewChild('modal') modal: ModalComponent;
    CompanyMasters: ICompanyMaster[];
    Countries: ILookup[];
    FinancialYear: IFinancialYear[];
    Designation: IPosition[];
    ForPositionName: IPosition;
    ForHeaddl: IForHeaddl[];
    public CompanyMaster: ICompanyMaster;
    public CompanyMasterForImg: ICompanyMaster;
    msg: string;
    indLoading: boolean = false;
    CompanyMasterFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    CompanyMasterFilter: string;
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
    strsearchCompanyName: string;
    strSearchCity: string;
    strSearchState: string;
    strSearchEmail: string;
    strSearchCountry: string;
    strSearchE_mail: string;
    strSearchCompanyURL: string;
    fileList1: FileList;
    fileList2: FileList;
    fileList3: FileList;
    fileListUp1: FileList;
    fileListUp2: FileList;
    fileListUp3: FileList;
    File1: File;
    ImgShowHide: boolean;


    imagePathCompanyLogo: string;
    imagePathSignature: string;
    imagePathSignatureOther: string;
    ImgGlobalPath: string;

    constructor(private fb: FormBuilder, private _CompanyMasterService: CompanyMasterService, private pagerService: PagerService, private http: Http)
    {
        //
        //this.uploaderF1 = new FileUploader({
        //    url: 'http://localhost:53349/api/CompanyMasterAPI/FileUpload', disableMultipart: false, maxFileSize: 50000000
        //});
    }

   
    //file upload event  
    fileChange1(event) {
        this.fileList1 = event.target.files;
    }
    fileChange2(event) {
        this.fileList2 = event.target.files;
      //  this.CompanyMaster.Signature = this.fileList2.item(0).name;

    }
    fileChange3(event) {
        this.fileList3 = event.target.files;
       // this.CompanyMaster.SignatureOther = this.fileList3.item(0).name;
    }
 

           
    ngOnInit(): void {
        this.CompanyMasterFrm = this.fb.group({
            Id: [''],
            CompanyName: ['', Validators.required],
            City: [''],
            ZipCode: [''],
            State: [''],
            Country: [''],
            CountryName:[''],
            ContactNo: ['', Validators.required],
            E_mail: ['', Validators.required],
            Fax: [''],
            CompanyURL: [''],
            Address: ['', Validators.required],

            CompanyLogo: [''],
            AccountHead: [''],
            Designation: [''],
            Signature: [''],
            CompanyShortCode: ['', Validators.required],
            Address2: [''],
            StartSeries: [''],
            FinancialYear: ['',Validators.required],
            AccountHeadOther: [''],
            DesignationOther: [''],
            SignatureOther: [''],
            FinancialYeardll: [''],
            PositionName: [''],
            Employee_Name: [''],
            //SignatureOtherUpload: [''],
            //SignatureUpload: [''],
            //CompanyLogoUpload:[''],
           

            
            CompanyId: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        
        
        if (!this.CompanyMasterForImg) {
            this.ImgShowHide == false;
           
        }
        this.ImgShowHide = false;
        this.LoadCompanyMasters()
        this.LoadFY()
        this.LoadCountry()
        this.LoadDesignation()
        this.LoadHead()
       
        //else { this.ImgShowHide = true; }

    }

    LoadFY(): void {
        this.indLoading = true;
        this._CompanyMasterService.getFY(Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(DATAFY => {
                this.FinancialYear = DATAFY;
            }
            //,error => this.msg = <any>error
            );
    }
    LoadCountry(): void {
        this.indLoading = true;
        this._CompanyMasterService.getCountry(Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(DATACOUNTRY => {
                this.Countries = DATACOUNTRY;
            }
            //,error => this.msg = <any>error
            );
    }
    LoadDesignation(): void {
       
        this.indLoading = true;
        this._CompanyMasterService.getDesignation(Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(DATAposition => {
                this.Designation = DATAposition;
            }
            //,error => this.msg = <any>error
            );
    }

    LoadHead(): void {
        
        this.indLoading = true;
        this._CompanyMasterService.getHead(Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(DATAHead => {
                this.ForHeaddl = DATAHead;
            }
            //,error => this.msg = <any>error
            );
    }
    CompanyMasterFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.CompanyMasterFilter = value;
    }

    CompanyMasterSort(property: any) {
        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };

    LoadCompanyMasters(): void {
        
        this.indLoading = true;
        this._CompanyMasterService.get(Global.BASE_COMPANYMASTER_ENDPOINT)
            .subscribe(CompanyMasters => {
                this.CompanyMasters = CompanyMasters;
                
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strsearchCompanyName = (<HTMLInputElement>document.getElementById("searchCompanyName")).value;

                    if (this.strsearchCompanyName != '') {
                        this.strsearchCompanyName = this.strsearchCompanyName.toLocaleLowerCase();
                        this.CompanyMasters = this.CompanyMasters.filter(
                            x => x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(this.strsearchCompanyName) != -1);
                    }
                }

                if (this.ShowHideSearch) {
                    this.strSearchCity = (<HTMLInputElement>document.getElementById("searchCity")).value;

                    if (this.strSearchCity != '') {
                        this.strSearchCity = this.strSearchCity.toLocaleLowerCase();
                        this.CompanyMasters = this.CompanyMasters.filter(
                            x => x.City != null && x.City.toLocaleLowerCase().indexOf(this.strSearchCity) != -1);
                    }
                }

                if (this.ShowHideSearch) {
                    this.strSearchState = (<HTMLInputElement>document.getElementById("searchState")).value;

                    if (this.strSearchState != '') {
                        this.strSearchState = this.strSearchState.toLocaleLowerCase();
                        this.CompanyMasters = this.CompanyMasters.filter(
                            x => x.State != null && x.State.toLocaleLowerCase().indexOf(this.strSearchState) != -1);
                    }
                }

                if (this.ShowHideSearch) {
                    this.strSearchCountry = (<HTMLInputElement>document.getElementById("searchCountry")).value;

                    if (this.strSearchCountry != '') {
                        this.strSearchCountry = this.strSearchCountry.toLocaleLowerCase();
                        this.CompanyMasters = this.CompanyMasters.filter(
                            x => x.Country != null && x.Country.toLocaleLowerCase().indexOf(this.strSearchCountry) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.strSearchEmail = (<HTMLInputElement>document.getElementById("searchE-mail")).value;

                    if (this.strSearchEmail != '') {
                        this.strSearchEmail = this.strSearchEmail.toLocaleLowerCase();
                        this.CompanyMasters = this.CompanyMasters.filter(
                            x => x.E_mail != null && x.E_mail.toLocaleLowerCase().indexOf(this.strSearchEmail) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.strSearchCompanyURL = (<HTMLInputElement>document.getElementById("searchCompanyURL")).value;

                    if (this.strSearchCompanyURL != '') {
                        this.strSearchCompanyURL = this.strSearchCompanyURL.toLocaleLowerCase();
                        this.CompanyMasters = this.CompanyMasters.filter(
                            x => x.CompanyURL != null && x.CompanyURL.toLocaleLowerCase().indexOf(this.strSearchCompanyURL) != -1);
                    }
                }
                //if (this.ShowHideSearch) {
                //    this.strSearchE_mail = (<HTMLInputElement>document.getElementById("E_mail")).value;

                //    if (this.strSearchE_mail != '') {
                //        this.strSearchE_mail = this.strSearchE_mail.toLocaleLowerCase();
                //        this.CompanyMasters = this.CompanyMasters.filter(
                //            x => x.E_mail != null && x.E_mail.toLocaleLowerCase().indexOf(this.strSearchE_mail) != -1);
                //    }
                //}

                //if (this.ShowHideSearch) {
                //    this.strSearchCompanyURL = (<HTMLInputElement>document.getElementById("CompanyURL")).value;

                //    if (this.strSearchCompanyURL != '') {
                //        this.strSearchCompanyURL = this.strSearchCompanyURL.toLocaleLowerCase();
                //        this.CompanyMasters = this.CompanyMasters.filter(
                //            x => x.CompanyURL != null && x.CompanyURL.toLocaleLowerCase().indexOf(this.strSearchCompanyURL) != -1);
                //    }
                //}

                //Logic for searching - End


                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    addCompanyMaster() {
     
        this.imagePathCompanyLogo = null;
        this.imagePathSignature = null;
        this.imagePathSignatureOther = null;
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Company";
        this.modalBtnTitle = "Add";
        this.CompanyMasterFrm.reset();
        this.modal.open();
    }

    editCompanyMaster(id: number) {
        this.ImgGlobalPath = Global.WebAccessURL;
        this.ImgShowHide = true;
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Company";
        this.modalBtnTitle = "Update";
        this.CompanyMaster = this.CompanyMasters.filter(x => x.Id == id)[0];
        this.CompanyMasterForImg = this.CompanyMaster;
        this.imagePathCompanyLogo = this.CompanyMaster.CompanyLogo;
        this.imagePathSignature = this.CompanyMaster.Signature;
        this.imagePathSignatureOther=this.CompanyMaster.SignatureOther
       
        this.CompanyMaster.PositionName = null;
        this.CompanyMaster.FinancialYeardll = null;
        this.CompanyMaster.Employee_Name = null;
      
        this.CompanyMaster.CompanyLogo = null;
        this.CompanyMaster.Signature = null;
        this.CompanyMaster.SignatureOther = null;
         
        this.CompanyMasterFrm.setValue(this.CompanyMaster);

        //this.CompanyMaster["CompanyLogo"] = null;
        //this.CompanyMaster["Signature"] = null;
        //this.CompanyMaster["SignatureOther"] = null;

        this.modal.open();
    }

    deleteCompanyMaster(id: number, status: boolean) {
        
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

        this.CompanyMaster = this.CompanyMasters.filter(x => x.Id == id)[0];

        this.CompanyMaster.PositionName = null;
        this.CompanyMaster.FinancialYeardll = null;
        this.CompanyMaster.Employee_Name = null;

        this.CompanyMaster.CompanyLogo = null;
        this.CompanyMaster.Signature = null;
        this.CompanyMaster.SignatureOther = null;
        this.CompanyMasterFrm.setValue(this.CompanyMaster);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.CompanyMasterFrm.enable() : this.CompanyMasterFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.CompanyMasters);
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
                
                if (this.fileList1 != null) {
                    formData._value.CompanyLogo = "/Upload/CompanyMaster/" + this.fileList1.item(0).name;
                }
                else
                {
                    formData._value.CompanyLogo = null;
                }
                if (this.fileList1 != null) {
                    formData._value.Signature = "/Upload/CompanyMaster/" + this.fileList2.item(0).name;
                }
                else
                {
                    formData._value.Signature = null;
                }
                if (this.fileList1 != null) {
                    formData._value.SignatureOther = "/Upload/CompanyMaster/" + this.fileList3.item(0).name;
                }
                else
                {
                    formData._value.SignatureOther = null;
                }
                this._CompanyMasterService.post(Global.BASE_COMPANYMASTER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            
                            if (this.fileList1 != null )
                            {
                                
                                if (this.fileList1.length > 0) {

                                    this.fileList1.item(0).name
                                    let file: File = this.fileList1[0];
                                    let formData: FormData = new FormData();
                                    formData.append('uploadFile', file, file.name);
                                    let headers = new Headers()
                                    let options = new RequestOptions({ headers: headers });
                                    let apiUrl1 = "/api/CompanyMasterAPI/UploadJsonFile";
                                    this.http.post(apiUrl1, formData, options)
                                        .map(res => res.json())
                                        .catch(error => Observable.throw(error))
                                        .subscribe(
                                        data => console.log('success'),
                                        error => console.log(error)
                                    )
                                    this.fileList1 = null;
                                }
                            }

                            
                            if (this.fileList2 != null)
                            {
                                
                                if (this.fileList2.length > 0) {
                                    let file: File = this.fileList2[0];
                                    let formData: FormData = new FormData();
                                    formData.append('uploadFile', file, file.name);
                                    let headers = new Headers()
                                    let options = new RequestOptions({ headers: headers });
                                    let apiUrl1 = "/api/CompanyMasterAPI/UploadJsonFile";
                                    this.http.post(apiUrl1, formData, options)
                                        .map(res => res.json())
                                        .catch(error => Observable.throw(error))
                                        .subscribe(
                                        data => console.log('success'),
                                        error => console.log(error)
                                    )
                                    this.fileList2 = null;
                                }
                            }

                            
                            if (this.fileList3 != null)
                            {
                                
                                if (this.fileList3.length > 0) {
                                    let file: File = this.fileList3[0];
                                    let formData: FormData = new FormData();
                                    formData.append('uploadFile', file, file.name);
                                    let headers = new Headers()
                                    let options = new RequestOptions({ headers: headers });
                                    let apiUrl1 = "/api/CompanyMasterAPI/UploadJsonFile";
                                    this.http.post(apiUrl1, formData, options)
                                        .map(res => res.json())
                                        .catch(error => Observable.throw(error))
                                        .subscribe(
                                        data => console.log('success'),
                                        error => console.log(error)
                                    )
                                    this.fileList3 = null;
                                }
                            }
                            this.msg = data;
                            this.LoadCompanyMasters();
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
                this._CompanyMasterService.put(Global.BASE_COMPANYMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.LoadCompanyMasters();
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
                
                this._CompanyMasterService.delete(Global.BASE_COMPANYMASTER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Company status changed successfully.";
                            this.LoadCompanyMasters();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing CompanyMaster!"
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