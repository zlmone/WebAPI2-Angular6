import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { DocumentTemplateService } from '../../Service/DocCenter/DocumentTemplate.service';
import { IDocumentTemplateViewModel } from '../../Model/DocCenter/DocumentTemplate';
import { IDocTemplateModule } from '../../Model/DocCenter/DocumentTemplate';
import { IListItem } from '../../Model/DocCenter/DocumentTemplate';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
import { PagerService } from '../../Shared/pager.index';
import { DatePipe } from '@angular/common';
import { CommonHelperService } from '../../Shared/CommonHelper.service';
import { IDocumentTemplateModel } from '../../Model/DocCenter/DocumentTemplate';
import { IDocMasterFieldDataContract } from '../../Model/DocCenter/DocumentTemplate';
import { IDropdownTableField } from '../../Model/DocCenter/DocumentTemplate';
import { IDropdownCustomField } from '../../Model/DocCenter/DocumentTemplate';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component
    ({
        providers: [DocumentTemplateService],
        templateUrl: 'app/Components/DocCenter/DocumentTemplate.component.html'
    })

export class DocumentTemplateComponent implements OnInit
{

    fileList1: FileList;

    strImgpath: string = '../../../Upload/DocumentCenter/DocumentTemplateImages/';

    strTableField: string='';
    strCustomField; string = '';

    IsStep1Completed: boolean = false;

    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modaldelete') modaldelete: ModalComponent;
    msg: string;
    indLoading: boolean = false;
    dashboardFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    direction: number;
    modalBtnTitle: string;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    PagerInformation: string;
    // paged items
    pagedItems: any[];

    objentitybyid: IDocumentTemplateModel;

    step2Option: string = 'Text';

    IsEditStep2: boolean = false;

    objIDocMasterFieldDataContract: IDocMasterFieldDataContract;
    lstIDocMasterFieldDataContract: IDocMasterFieldDataContract[];
    lstMasterField: IDocMasterFieldDataContract[];

    lstContainerField: IDocMasterFieldDataContract[]=[];
    objContainerField: IDocMasterFieldDataContract;

    lstIDropdownTableField: IDropdownTableField[];
    lstIDropdownCustomField: IDropdownCustomField[];

    objIDocumentTemplateModel: IDocumentTemplateModel;
    objIDocumentTemplateViewModel: IDocumentTemplateViewModel;
    listIDocumentTemplateViewModel: IDocumentTemplateViewModel[];
    listIDocTemplateModule: IDocTemplateModule[];
    listIListItem: IListItem[];
    listIListItemRole: IListItem[];

    EmployeeId: number;
    EmployeeRole: string;
    ApprovedStatus: string;

    ShowHideSearch: boolean = false;
    isDesc: boolean = false;
    column: any = 'Employee_Name';

    DocTempId: number=0;

    strTemplateName: string;
    strOwnerName: string;
    strModuleName: string;

    strPageHeader: string;

    TodayDate: Date = new Date();


    constructor(private fb: FormBuilder, private _DocumentTemplateService: DocumentTemplateService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService, private http: Http)
    {
        this.ResetModal();
        
    }

    // Step 1 & Step 2 Related Function

    ResetModal()
    {
        this.objIDocumentTemplateModel =({
                AddRecurrenceType: false,
                AllowFooter: false,
                AllowHeader: false,
                ApprovedOn: null,
                ContributorsId: '',
                DateFormat: 'Date(dd/mm/yyyy)',
                DocRightsId: 0,
                DocTemplateId: 0,
                DocTemplateInProgressId: 0,
                EmployeeId: 0,
                EmployeeName: '',
                FooterContent: '',
                HeaderContent: '',
                IsApproved: false,
                IsBehalf: false,
                IsDMSPdf: false,
                IsDMSWord: false,
                IsDownloadPdf: false,
                IsDownloadWord: false,
                IsEmailPdf: false,
                IsEmailWord: false,
                IsFinalSubmited: false,
                IsPortrait: true,
                IsRecurrence: false,
                IsSelf: true,
                ModuleId: '',
                ModuleName: '',
                OwnerId:Number(sessionStorage.getItem('Id')),
                PublishDate: '',
                SharingVariableType: '',
                StartingVariableRole: '',
                stringDate: null,
                TemplateDescription: '',
                TemplateName: '',
                TemplateRightsData: '',
                CreatedBy:0
            });
        this.objIDocMasterFieldDataContract = ({
            AttachmentList: '',
            CreatedBy: 0,
            CreatedOn: null,
            DataSourceColumn: '',
            DataSourceColumnForCustom: '',
            DataSourceTable: '',
            DocTemplateId: 0,
            FieldDescription: '',
            FieldId: '',
            FieldName: '',
            FieldType: 'Text',
            Id: 0,
            ImageName: '',
            ImageAlign: 'left',
            ImageHeight: 0,
            ImageWidth: 0,
            IsActive: false,
            IsCustomField: false,
            IsDelete: false,
            IsNew: false,
            ListType: '',
            PageContent: '',
            UpdatedBy: 0,
            UpdatedOn: null
        });
        this.listIListItem = null;
        this.listIListItemRole = null;
    }

    ngOnInit(): void
    {
        this.lstIDropdownTableField = [
            {
                FieldName: '',
                IsActive: false,
                ModuleId: 0,
                VariableId: 0,
                VarName: '',
                TableName: ''
            }]

        this.lstIDropdownCustomField = [
            {
                MasterFieldId: 0,
                TokenName: '',
                TokenValue: ''
            }]
            this._CommonHelperService.ToogleMenu();
            this.GetApprovedDocumentData();
    }

    BindTableFieldDropDown(TableName:string)
    {
        this._DocumentTemplateService.bindtablefielddropdown(Global.BASE_DocumentTemplateAPI_ENDPOINT, TableName).
            subscribe(data =>
            {
                this.lstIDropdownTableField = data;
            });
    }

    BindCustomFieldDropDown(DocTempId:number)
    {
        this._DocumentTemplateService.bindcustomfielddropdown(Global.BASE_DocumentTemplateAPI_ENDPOINT, DocTempId).
            subscribe(data =>
            {
                this.lstIDropdownCustomField = data;
            });
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.listIDocumentTemplateViewModel);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    }

    DocumentTemplateSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    GetApprovedDocumentData()
    {
        
        // get id
        this.EmployeeId = Number(sessionStorage.getItem('Id'));

        // get role
        if (JSON.parse(sessionStorage.getItem('IsAdmin')))
        {
            this.EmployeeRole = 'Admin';
        }
        else if (JSON.parse(sessionStorage.getItem('IsLineManager')) && this.EmployeeRole != 'Admin') {
            this.EmployeeRole = 'LM';
        }

        // get status
        if ($("#rbtapproved").prop("checked"))
        {
            this.ApprovedStatus = 'Approved';
        }
        else if ($("#rbtpending").prop("checked"))
        {
            this.ApprovedStatus = 'Pending';
        }
        else if ($("#rbtreject").prop("checked"))
        {
            this.ApprovedStatus = 'Reject';
        }

        if (this.EmployeeRole == 'Admin' || this.EmployeeRole == 'LM') {
            this.strPageHeader = 'Document Template';
        }
        else {
            this.strPageHeader = 'My Suggestion';
        }

        this._DocumentTemplateService.getapprovedrecord(Global.BASE_DocumentTemplateAPI_ENDPOINT, this.EmployeeId, this.EmployeeRole, this.ApprovedStatus).
            subscribe(data => {
                this.indLoading = true;
                this.listIDocumentTemplateViewModel = data;
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strTemplateName = (<HTMLInputElement>document.getElementById("searchTemplateName")).value;
                    if (this.strTemplateName != '') {
                        this.strTemplateName = this.strTemplateName.toLocaleLowerCase();
                        this.listIDocumentTemplateViewModel = this.listIDocumentTemplateViewModel.filter
                            (
                            x => x.TemplateName != null && x.TemplateName.toLocaleLowerCase().indexOf(this.strTemplateName) != -1);
                    }

                    this.strOwnerName = (<HTMLInputElement>document.getElementById("searchOwnerName")).value;
                    if (this.strOwnerName != '') {
                        this.strOwnerName = this.strOwnerName.toLocaleLowerCase();
                        this.listIDocumentTemplateViewModel = this.listIDocumentTemplateViewModel.filter
                            (
                            x => x.OwnerName != null && x.OwnerName.toLocaleLowerCase().indexOf(this.strOwnerName) != -1);
                    }

                    this.strModuleName = (<HTMLInputElement>document.getElementById("searchModuleName")).value;
                    if (this.strModuleName != '') {
                        this.strModuleName = this.strModuleName.toLocaleLowerCase();
                        this.listIDocumentTemplateViewModel = this.listIDocumentTemplateViewModel.filter
                            (
                            x => x.ModuleName != null && x.ModuleName.toLocaleLowerCase().indexOf(this.strModuleName) != -1);
                    }
                }

                //Logic for searching - End
                this.indLoading = false;
                this.JumpOnPage(1);
            });




    }

    AddNewTemplate()
    {
        this.DisableAllSteps();
        this.BindModuleDropDown();
        this.modalTitle = 'Document Template';
        this.modalBtnTitle = 'Save & Next';
        this.dbops = DBOperation.create;
        this.ResetModal();
        this.GetDocumentFieldByDocId(0);
        this.DocTempId = 0;
        this.IsStep1Completed = false;
        this.modal.open();
    }

    EditTempalte(id:number)     
    {
        this.DisableAllSteps();
        this.BindModuleDropDown();
        this.modalTitle = 'Document Template';
        this.modalBtnTitle = 'Save & Next';
        this.dbops = DBOperation.update;

        this._DocumentTemplateService.getbyid(Global.BASE_DocumentTemplateAPI_ENDPOINT, id).
            subscribe(data =>
            {
                this.objentitybyid = data;
                this.BindStartingVariableNameDropdown(this.objentitybyid.ModuleId);
                this.objIDocumentTemplateModel = this.objentitybyid;
                this.DocTempId = this.objentitybyid.DocTemplateId;
                this.GetDocumentFieldByDocId(this.DocTempId);
                this.BindContainerField();
                this.BindMasterField();
                this.IsStep1Completed = true;
            });


        this.modal.open();

        
    }

    DeleteTemplate(id:number,status:boolean)
    {
        this.objIDocumentTemplateModel.DocTemplateId = this.listIDocumentTemplateViewModel.filter(x => x.DocTemplateId == id)[0].DocTemplateId;
        this.objIDocumentTemplateModel.TemplateName = this.listIDocumentTemplateViewModel.filter(x => x.DocTemplateId == id)[0].TemplateName;

        if (status == true)
        {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else
        {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }

        this.dbops = DBOperation.delete;

        this.modaldelete.open();
    }

    CopyTemplate() {

    }

    ActivateDeactivateStatus(id: number)
    {
        alert(id);
    }

    EnableDisableApproveButton()
    {
        if (this.listIDocumentTemplateViewModel[0].ApprovedStatus == 'Approved')
        {
            let styles =
                {
                    'filter': 'grayscale(100%)',
                    'cursor': 'not-allowed'
                }

            $(".btnstatus").prop('disabled', true);

            return styles;
        }
        else
        {
            let styles =
                {
                    'filter': 'grayscale(0%)',
                    'cursor': 'allowed'
                }

            $(".btnstatus").prop('disabled', false);

            return styles;
            
        }


    }

    BindModuleDropDown()
    {
        this._DocumentTemplateService.getallmodule(Global.BASE_DocumentTemplateAPI_ENDPOINT).
            subscribe(data =>
            {
                this.listIDocTemplateModule = data;
            }
            );
    }

    BindStartingVariableNameDropdown(modulevalue:string)
    {
        if (modulevalue == 'DocTemplateModuleVariables')
        {
            this.listIListItem =
            [{
                text: 'Employee Name',
                value:''
            }
            ,
            {
                text: 'Candidate Name',
                value:'interviewsheetmaster'
            }]
            $("#rbtself").prop('disabled', false);
            $("#rbtself").prop('checked', true);
            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', false);
        }
        else if (modulevalue =='Other')
        {
            this.listIListItem =
                [{
                    text: 'Employee Name',
                    value: 'Employee_Master'
                }
                 ,
                {
                    text: 'Candidate Name',
                    value: 'interviewsheetmaster'
                }]
            $("#rbtself").prop('disabled', false);
            $("#rbtself").prop('checked', false);
            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', true);
        }
        else if (modulevalue == "ProjectMaster")
        {
            this.listIListItem =
                [{
                    text: 'Project Name',
                    value: 'ProjectMaster'
                }]

            $("#rbtself").prop('checked', false);
            $("#rbtself").prop('disabled', true);
            $("#rbtbehalf").prop('checked', true);
            $("#rbtbehalf").prop('disabled', false);
        }
        else if (modulevalue == "RFQ_Initial")
        {
            this.listIListItem =
                [{
                    text: 'RFQ Initial',
                    value: 'RFQ_Initial'
                }]
            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', true);
            $("#rbtself").prop('checked', false);
            $("#rbtself").prop('disabled', true);
        }
        else if (modulevalue == "ManageProjectMaster")
        {

            this.listIListItem =
            [{
                text: 'BD Project Name',
                value: 'ManageProjectMaster'
            }]

            $("#rbtbehalf").prop('disabled', false);
            $("#rbtbehalf").prop('checked', true);
            $("#rbtself").prop('checked', false);
            $("#rbtself").prop('disabled', true);   
        }
        this.objIDocumentTemplateModel.SharingVariableType = this.listIListItem[0].value
        this.BindStartingVariableTypeDropdown(modulevalue);
        
    }

    BindStartingVariableTypeDropdown(modulevalue: string)
    {
        if (modulevalue == 'DocTemplateModuleVariables')
        {
            this.listIListItemRole =
                [{
                    text: 'None',
                    value: 'none'
                }
                    ,
                {
                    text: 'Admin',
                    value: 'admin'
                },
                {
                    text: 'HR',
                    value:'hr'
                },
                {
                    text: 'HRH',
                    value: 'hrh'
                },
                {
                    text: 'LM',
                    value: 'lm'
                }]
        }
        else if (modulevalue == 'Other')
        {
            this.listIListItemRole =
                [{
                    text: 'None',
                    value: 'none'
                }
                    ,
                {
                    text: 'Admin',
                    value: 'admin'
                },
                {
                    text: 'HR',
                    value: 'hr'
                },
                {
                    text: 'HRH',
                    value: 'hrh'
                },
                {
                    text: 'LM',
                    value: 'lm'
                }]
        }
        else if (modulevalue == "ProjectMaster")
        {
            this.listIListItemRole =
                [{
                    text: 'None',
                    value: 'none'
                }
                    ,
                {
                    text: 'Admin',
                    value: 'admin'
                },
                {
                    text: 'AManager',
                    value: 'amanager'
                },
                {
                    text: 'AMG',
                    value: 'amg'
                },
                {
                    text: 'BH',
                    value: 'bh'
                },
                {
                    text: 'BM',
                    value: 'bm'
                },
                {
                    text: 'DH',
                    value: 'dh'
                },
                {
                    text: 'PM',
                    value: 'pm'
                },
                {
                    text: 'RMG',
                    value: 'rmg'
                },
                {
                    text: 'SH',
                    value: 'sh'
                }]
        }
        else if (modulevalue == "RFQ_Initial")
        {
            this.listIListItemRole =
                [{
                    text: 'None',
                    value: 'none'
                }
                    ,
                {
                    text: 'Admin',
                    value: 'admin'
                },
                {
                    text: 'BH',
                    value: 'bh'
                },
                {
                    text: 'BM',
                    value: 'bm'
                },
                {
                    text: 'SH',
                    value: 'sh'
                }]
        }
        else if (modulevalue == "ManageProjectMaster") {

            this.listIListItemRole =
                [{
                    text: 'None',
                    value: 'none'
                }
                    ,
                {
                    text: 'Admin',
                    value: 'admin'
                },
                {
                    text: 'BH',
                    value: 'bh'
                },
                {
                    text: 'BM',
                    value: 'bm'
                },
                {
                    text: 'SH',
                    value: 'sh'
                }]
        }
        this.objIDocumentTemplateModel.StartingVariableRole = this.listIListItemRole[0].value;

    }

    onSubmitStep1(formData: IDocumentTemplateModel)
    {
        formData.OwnerId = Number(sessionStorage.getItem('Id'));
        formData.CreatedBy = Number(sessionStorage.getItem('Id'));

        if ($("#rbtself").prop("checked"))
        {
            formData.IsSelf = true;
            formData.IsBehalf = false
        }
        else {
            formData.IsSelf = false;
            formData.IsBehalf = true;
        }

        if (JSON.parse(sessionStorage.getItem('IsAdmin')) || JSON.parse(sessionStorage.getItem('IsLineManager')))
        {
            formData.ApprovedOn = new Date();
            formData.IsApproved = true;
            formData.IsFinalSubmited = true;
        }

        switch (this.dbops)
        {
            case DBOperation.create:
                this._DocumentTemplateService.addnewdocument(Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(
                    data =>
                    {
                        if (data.startsWith("Success: "))//Success
                        {
                        alert('Document Template Saved sucessfully...');
                        this.ResetModal();
                        this._DocumentTemplateService.getmaxid(Global.BASE_DocumentTemplateAPI_ENDPOINT).
                            subscribe(id =>
                            {
                                this.DocTempId = id;
                                if (this.DocTempId > 0)
                                {
                                    this.IsStep1Completed = true;
                                    this.NextStep1();
                                }
                            });
                        }
                        else
                        {
                            alert(data);
                        }
                    },
                    error =>
                    {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._DocumentTemplateService.updatedocument(Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            alert('Document Template Saved sucessfully...');
                            this.ResetModal();
                            this.NextStep1();
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
                this._DocumentTemplateService.deletedocument(Global.BASE_DocumentTemplateAPI_ENDPOINT, formData.DocTemplateId).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data;
                            this.GetApprovedDocumentData();
                            this.modaldelete.dismiss();
                        }
                        else
                        {
                            alert(data);
                        }
                    },
                    error =>
                    {
                        this.msg = error;
                    }
                );
        }
    }

    onSubmitStep2(formData: IDocMasterFieldDataContract)
    {
        if (formData.DataSourceColumn == '' && formData.DataSourceColumnForCustom == '')
        {
            alert('Select Table Field or Custom Control Field');
        }
        else
        {
            if (formData.DataSourceColumn == '')
            {
                formData.DataSourceColumn = '0';
            }

            if (this.fileList1 != null)
            {
                if (this.fileList1.length > 0)
                {
                    formData.ImageName = this.fileList1.item(0).name;
                    formData.ImageHeight = 100;
                    formData.ImageWidth = 100;
                }
            }
            else
            {
                formData.ImageName = this.objIDocMasterFieldDataContract.ImageName;
            }


            if (this.IsEditStep2 == false)
            {
                formData.DocTemplateId = this.DocTempId;
                formData.CreatedBy = Number(sessionStorage.getItem('Id'));
                
                this._DocumentTemplateService.addnewdocumentfield(Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            alert('Field saved Successfully...');
                            this.GetDocumentFieldByDocId(this.DocTempId);
                            this.BindContainerField();
                            this.BindMasterField();
                            this.ResetModal();
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

            else {
                formData.UpdatedBy = Number(sessionStorage.getItem('Id'));
                this._DocumentTemplateService.updatedocumentfield(Global.BASE_DocumentTemplateAPI_ENDPOINT, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            alert('Field saved Successfully...');
                            this.GetDocumentFieldByDocId(this.DocTempId);
                            this.BindContainerField();
                            this.BindMasterField();
                            this.ResetModal();
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
        }
    }

    CheckEnableDisableOption()
    {
        if ($("#rbtself").prop('checked'))
        {
            $("#SharingVariableType").prop('disabled', true);
            $("#StartingVariableRole").prop('disabled', true);
        }
        else
        {
            $("#SharingVariableType").prop('disabled', false);
            $("#StartingVariableRole").prop('disabled', false);
        }
    }

    EditField(id:number)
    {
        this.IsEditStep2 = true;
        this.objIDocMasterFieldDataContract = this.lstIDocMasterFieldDataContract.filter(x => x.Id == id)[0];
        this.strImgpath = '../../../Upload/DocumentCenter/DocumentTemplateImages/' + this.objIDocMasterFieldDataContract.ImageName;
    }

    DeleteField(id:number)
    {
        var confirmation = confirm('Are you sure want to delete User Input?');

        if (confirmation == true)
        {
            this._DocumentTemplateService.deletedocumentfield(Global.BASE_DocumentTemplateAPI_ENDPOINT, id, Number(sessionStorage.getItem('Id'))).subscribe(
                data =>
                {
                    if (data.startsWith("Success: "))//Success
                    {
                        alert('Field deleted Successfully...');
                        this.GetDocumentFieldByDocId(this.DocTempId);
                        this.ResetModal();
                    }
                    else
                    {
                        alert(data);
                    }
                },
                error =>
                {
                    this.msg = error;
                }
            );

        }
    }

    CopyField(id:number)
    {
        this.IsEditStep2 = false;
        this.objIDocMasterFieldDataContract = this.lstIDocMasterFieldDataContract.filter(x => x.Id == id)[0];
        this.objIDocMasterFieldDataContract.FieldName = '';

    }

    GetDocumentFieldByDocId(doctempid:number)
    {
        this._DocumentTemplateService.getbydoctempid(Global.BASE_DocumentTemplateAPI_ENDPOINT, doctempid).
            subscribe(data =>
            {
                this.lstIDocMasterFieldDataContract = data;

                this.lstIDocMasterFieldDataContract = this.lstIDocMasterFieldDataContract.filter(x => x.FieldType == 'Text' || x.FieldType == 'Image' || x.FieldType == 'TokenText');

            });
    }

    EnableDisableSteps()
    {
        if (this.IsStep1Completed == true)
        {
            let styles =
                {
                    'pointer-events': 'auto',
                    'color':'#337ab7'
                    
                }
            return styles;
        }
        else
        {
            let styles =
                {
                    'pointer-events': 'none',
                    'color':'#dce2e8'
                }
            return styles;
        }

        
      
    }

    GetImageFile(event)
    {
        this.fileList1 = event.target.files;
    }

    UploadImage()
    {
        if (this.fileList1 != null)
        {
            if (this.fileList1.length > 0)
            {
                this.fileList1.item(0).name;
                let file: File = this.fileList1[0];
                let formData: FormData = new FormData();
                formData.append('uploadFile', file, file.name);
                let headers = new Headers();
                let options = new RequestOptions({ headers: headers });
                this.http.post(Global.BASE_DocumentTemplateAPI_ENDPOINT + 'UploadImage', formData, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(error))
                    .subscribe(
                    data =>
                    {

                    }
                    ,
                    error =>
                    {
                        console.log(error)
                    }
                );
                this.strImgpath = '../../../Upload/DocumentCenter/DocumentTemplateImages/' + this.fileList1.item(0).name;
            }
        }
        else
        {
            alert('Please Select Image');
        }
    }

    BindDropDownTableField()
    {
        this.IsEditStep2 = false;
        this.objIDocMasterFieldDataContract.AttachmentList = '';
        this.objIDocMasterFieldDataContract.DataSourceColumn = '';
        this.objIDocMasterFieldDataContract.DataSourceColumnForCustom = '';
        this.objIDocMasterFieldDataContract.DataSourceTable = '';
        this.objIDocMasterFieldDataContract.FieldDescription = '';
        this.objIDocMasterFieldDataContract.FieldName = '';
        this.objIDocMasterFieldDataContract.ImageAlign = 'left';
        this.objIDocMasterFieldDataContract.ImageHeight = 0;
        this.objIDocMasterFieldDataContract.ImageWidth = 0;
        this.objIDocMasterFieldDataContract.PageContent = '';
        this.strImgpath = '';
        this.GetDocumentFieldByDocId(this.DocTempId);

        if (this.DocTempId > 0 )
        {
            this.BindCustomFieldDropDown(this.DocTempId)
        }

        if (this.objIDocumentTemplateModel.ModuleName != '')
        {
            this.BindTableFieldDropDown(this.objIDocumentTemplateModel.ModuleId);
        }

    }

    ChangeTableFieldDropDown(value)
    {
        this.strTableField = '<p>' + value + '</p>' 
    }
   
    AddTableFieldToTextEditor()
    {
        if (this.strTableField != '')
        {
            this.objIDocMasterFieldDataContract.PageContent += this.strTableField;
        }
        else
        {
            alert("Select Table Field.");
        }
    }

    AddCustomFieldToTextEditor(value)
    {
        if (value != '')
        {
            var todayDate = new Date(), day = todayDate.getDate(), month = todayDate.getMonth(), year = todayDate.getFullYear(), hour = todayDate.getHours(), minute = todayDate.getMinutes(), second = todayDate.getSeconds(), miSecond = todayDate.getMilliseconds();

            if (value == "{Textbox}") {
                value = "{Textbox_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{TextArea}") {
                value = "{TextArea_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{CKEditor}") {
                value = "{CKEditor_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{SingleDate}") {
                value = "{SingleDate_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{Time}") {
                value = "{Time_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "{DateRange}") {
                value = "{DateRange_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "DropDownList") {
                value = "{DropDownList_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "ListBox") {
                value = "{ListBox_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "CheckBoxList") {
                value = "{CheckBoxList_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }
            else if (value == "RadioButtonList") {
                value = "{RadioButtonList_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + "_" + second + "_" + miSecond + "}";
            }

            this.strCustomField = '<p>' + value + '</p>'
            this.objIDocMasterFieldDataContract.PageContent += this.strCustomField;
        }
        else
        {
            alert("Select Custom Field.");
        }

        

    }

    NextStep1()
    {
        $("#Step1Content").hide();
        $("#Step2Content").show();
        $("#Step2Content").scrollTop(0);
    }

    CancelStep2()
    {
        this.IsEditStep2 = false
        this.strImgpath = '';
        this.strTableField = '';
        this.strCustomField = '';
        this.fileList1 = null;

        var FieldType = this.objIDocMasterFieldDataContract.FieldType;

        this.objIDocMasterFieldDataContract = ({
            AttachmentList: '',
            CreatedBy: 0,
            CreatedOn: null,
            DataSourceColumn: '',
            DataSourceColumnForCustom: '',
            DataSourceTable: '',
            DocTemplateId: 0,
            FieldDescription: '',
            FieldId: '',
            FieldName: '',
            FieldType: 'Text',
            Id: 0,
            ImageName: '',
            ImageAlign: 'left',
            ImageHeight: 0,
            ImageWidth: 0,
            IsActive: false,
            IsCustomField: false,
            IsDelete: false,
            IsNew: false,
            ListType: '',
            PageContent: '',
            UpdatedBy: 0,
            UpdatedOn: null
        });

        this.objIDocMasterFieldDataContract.FieldType = FieldType;

        $("#Step2Content").scrollTop(0);
    }

    PreviousStep2()
    {
        $("#Step2Content").hide();
        $("#Step1Content").show();
        $("#Step1Content").scrollTop(0);
    }

    NextStep2()
    {
        $("#Step2Content").hide();
        $("#Step3Content").show();
        $("#Step3Content").scrollTop(0);
    }

    DisableAllSteps()
    {
        $("#Step1Content").hide();
        $("#Step2Content").hide();
        $("#Step3Content").hide();
        $("#Step4Content").hide();
        $("#Step5Content").hide();
        $("#Step6Content").hide();
        $("#Step7Content").hide();
        $("#Step8Content").hide();
        $("#Step1Content").show();
        $("#Step1Content").scrollTop(0);
    }

    // Step 3 Related Function

    BindContainerField()
    {
        this._DocumentTemplateService.GetDocumentContainer(Global.BASE_DocumentTemplateAPI_ENDPOINT, this.DocTempId).
            subscribe(data =>
            {
                this.lstContainerField = [];
                this.lstContainerField = data;
            });
        
    }

    BindMasterField() 
    {
        this._DocumentTemplateService.getbydoctempid(Global.BASE_DocumentTemplateAPI_ENDPOINT, this.DocTempId).
            subscribe(data =>
            {
                this.lstMasterField = data;
            });
    }

    AddAllField()
    {
        if (this.lstMasterField.length > 0)
        {
            for (var item of this.lstMasterField)
            {
                this.lstContainerField.push(item);
            }

            this.lstMasterField = this.lstIDocMasterFieldDataContract.filter(x => x.FieldType == 'Text' || x.FieldType=='Image');
        }
        
    }

    RemoveAllField()
    {
        if (this.lstContainerField.length > 0)
        {
            for (let item of this.lstContainerField)
            {
                if (item.FieldType != 'Text' && item.FieldType != 'Image')
                {
                    this.lstMasterField.push(item);
                }
            }
            this.lstContainerField = [];
        }
    }

    AddLineBreak()
    {
            this.objContainerField = ({
                AttachmentList: '',
                CreatedBy: Number(sessionStorage.getItem('Id')),
                CreatedOn: new Date(),
                DataSourceColumn: '',
                DataSourceColumnForCustom: '',
                DataSourceTable: '',
                DocTemplateId: this.DocTempId,
                FieldDescription: '',
                FieldId: '',
                FieldName: 'Line Break',
                FieldType: '<BR>',
                Id: 0,
                ImageName: '',
                ImageAlign: '',
                ImageHeight: 0,
                ImageWidth: 0,
                IsActive: false,
                IsCustomField: false,
                IsDelete: false,
                IsNew: false,
                ListType: '',
                PageContent: '',
                UpdatedBy: 0,
                UpdatedOn: null
            });
            this.lstContainerField.push(this.objContainerField);
    }

    AddPageBreak()
    {
            this.objContainerField = ({
                AttachmentList: '',
                CreatedBy: Number(sessionStorage.getItem('Id')),
                CreatedOn: new Date(),
                DataSourceColumn: '',
                DataSourceColumnForCustom: '',
                DataSourceTable: '',
                DocTemplateId: this.DocTempId,
                FieldDescription: '',
                FieldId: '',
                FieldName: 'Page Break',
                FieldType: '<PageBreak>',
                Id: 0,
                ImageName: '',
                ImageAlign: '',
                ImageHeight: 0,
                ImageWidth: 0,
                IsActive: false,
                IsCustomField: false,
                IsDelete: false,
                IsNew: false,
                ListType: '',
                PageContent: '',
                UpdatedBy: 0,
                UpdatedOn: null
            });
            this.lstContainerField.push(this.objContainerField);
            this.lstContainerField = this.lstContainerField;
    }

    NextStep3()
    {
        $("#Step3Content").hide();
        $("#Step4Content").show();
        $("#Step4Content").scrollTop(0);
    }

    CancelStep3()
    {
        this.BindContainerField();
        this.BindMasterField();
        $("#Step3Content").scrollTop(0);
        $(".contentscrollermasterfield").scrollTop(0);
    }

    PreviousStep3()
    {
        $("#Step3Content").hide();
        $("#Step2Content").show();
        $("#Step2Content").scrollTop(0);
    }

    onSubmitStep3()
    {
        if (this.lstContainerField.length == 0)
        {
            this.objContainerField = ({
                AttachmentList: '',
                CreatedBy: 0,
                CreatedOn: null,
                DataSourceColumn: '',
                DataSourceColumnForCustom: '',
                DataSourceTable: '',
                DocTemplateId: this.DocTempId,
                FieldDescription: '',
                FieldId: '',
                FieldName: '',
                FieldType: '',
                Id: 0,
                ImageName: '',
                ImageAlign: '',
                ImageHeight: 0,
                ImageWidth: 0,
                IsActive: false,
                IsCustomField: false,
                IsDelete: false,
                IsNew: false,
                ListType: '',
                PageContent: '',
                UpdatedBy: 0,
                UpdatedOn: null
            });
            this.lstContainerField.push(this.objContainerField);
        }

        this._DocumentTemplateService.AddDocumentContainerField(Global.BASE_DocumentTemplateAPI_ENDPOINT, this.lstContainerField).
            subscribe(data =>
            {
                this.BindContainerField();
                alert('My Document Container Saved Successfully...');
            });

    }

    RemoveLineBreakPageBreak(CreatedOn)
    {
        this.objContainerField = this.lstContainerField.filter(x => x.CreatedOn == CreatedOn)[0];

        const index: number = this.lstContainerField.indexOf(this.objContainerField);

        if (index !== -1)
        {
            this.lstContainerField.splice(index,1);
        }    
    }

    RemoveLineBreakPageBreakMaster(CreatedOn)
    {
        this.objContainerField = this.lstMasterField.filter(x => x.CreatedOn == CreatedOn)[0];

        const index: number = this.lstMasterField.indexOf(this.objContainerField);

        if (index !== -1)
        {
            this.lstMasterField.splice(index, 1);
        }
    }

}



