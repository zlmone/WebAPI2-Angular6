import { Component, OnInit, ViewChild, Directive, DirectiveDecorator, forwardRef } from '@angular/core';
import { HomePageImageService } from '../../../service/Masters/CompanyRelated/HomePageImage.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IHomePageImage } from '../../../Model/Masters/CompanyRelated/HomePageImage';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
import * as _ from 'underscore';
import { Http, RequestOptions, Headers, Response } from '@angular/http'; 

@Component
    ({
        providers: [HomePageImageService],
        templateUrl: 'app/Components/Masters/CompanyRelated/HomePageImage.component.html'
    })

export class HomePageImageComponent implements OnInit
{

    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modal2') modal2: ModalComponent;

    homepageimages: IHomePageImage[];
    homepageimage: IHomePageImage;
    imgpathshow: string;
    imgpath: string;
    activeimages: IHomePageImage[];
    activeimagescount: number;
    strSearchImageName: string;
    strSearchActive: string;
    ShowHideSearch: boolean = false;
    msg: string;
    msg2: string;
    indLoading: boolean = false;
    HomePageImageFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    HomePageImageFilter: string;
    isDesc: boolean = false;
    column: any = 'ImagePath';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;
    nums: number[];
    fileList1: FileList;
    constructor(private fb: FormBuilder, private _HomePageImageService: HomePageImageService, private pagerService: PagerService, private http: Http, private _CommonHelperService: CommonHelperService) { }

    ngOnInit() {
        this._CommonHelperService.ToogleMenu();
        this.homepageimage =
            ({
                Id: 0,
                ImagePath:'',
                Active: false,
                IsActive: false,
                CreatedOn: null,
                UpdatedOn: null,
                CreatedBy: 0,
                UpdatedBy: 0
            });
        this.GetAllImage();
        this.GetActiveImage();
    }

    AddHomePageImage()
    {
        
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Home Page Image";
        this.modalBtnTitle = "Upload Image";
        //this.homepageimage.ImagePath = this.homepageimage.ImagePath;
        this.ngOnInit();
        this.modal.open();
    }

    EditHomePageImage(id: number)
    {
        debugger;
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Home Page Image";
        this.modalBtnTitle = "Update";
        this.homepageimage = this.homepageimages.filter(x => x.Id == id)[0];
        this.modal.open();
    }

    DeleteHomePageImage(id: number, status: boolean)
    {
        this.dbops = DBOperation.delete;
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
        this.homepageimage = this.homepageimages.filter(x => x.Id == id)[0];
        this.homepageimage.ImagePath = this.homepageimage.ImagePath;
        this.modal.open();
    }

    GetAllImage() {
        this.indLoading = true;
        this._HomePageImageService.get(Global.BASE_HOMEPAGEIMAGE_ENDPOINT)
            .subscribe(data => {
                this.homepageimages = data;
                //Logic for searching - start
                if (this.ShowHideSearch) {
                    this.strSearchImageName = (<HTMLInputElement>document.getElementById("searchImageName")).value;
                    if (this.strSearchImageName != '') {
                        this.strSearchImageName = this.strSearchImageName.toLocaleLowerCase();
                        this.homepageimages = this.homepageimages.filter
                            (
                            x => x.ImagePath != null && x.ImagePath.toLocaleLowerCase().indexOf(this.strSearchImageName) != -1);
                    }
                }

                //Logic for searching - End
                this.indLoading = false;
                this.JumpOnPage(1);
            }
            );
    }

    GetActiveImage() {
        this.indLoading = true;
        this._HomePageImageService.getactiveimage(Global.BASE_HOMEPAGEIMAGE_ENDPOINT)
            .subscribe(activeimages => {
                this.activeimages = activeimages;
                this.indLoading = false;
            }
            );
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.HomePageImageFrm.enable() : this.HomePageImageFrm.disable();
    }

    HomePageImageSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }

    };

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.homepageimages);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

    onSubmit(formData: IHomePageImage)
    {
        
        this.msg = "";
        switch (this.dbops)
        {
            case DBOperation.create:
                if (this.fileList1 != null)
                {
                    formData.ImagePath = this.fileList1.item(0).name;
                    this._HomePageImageService.post(Global.BASE_HOMEPAGEIMAGE_ENDPOINT, formData).subscribe(
                        data => {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.fileList1.item(0).name
                                let file: File = this.fileList1[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl = "/api/HomePageImageAPI/UploadJsonFile";
                                this.http.post(apiUrl, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                )
                                this.msg = data;
                                this.GetAllImage();
                                this.GetActiveImage();
                                this.fileList1 = null;
                                this.msg2 = '';
                                this.modal.dismiss();
                            }
                            else 
                            {
                                alert(data);
                                this.fileList1 = null;
                            }
                        },
                        error =>
                        {
                            this.msg = error;
                        }
                    );
                }
                else
                {
                    this.msg2 = "Please Choose Image";
                }
                break;
            case DBOperation.update:
                this._HomePageImageService.put(Global.BASE_HOMEPAGEIMAGE_ENDPOINT, formData.Id, formData).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = data
                            this.GetAllImage();
                            this.modal.dismiss();
                        }
                        else {
                            alert(data);
                        }
                        this.GetActiveImage();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._HomePageImageService.delete(Global.BASE_HOMEPAGEIMAGE_ENDPOINT, formData.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: "))//Success
                        {
                            this.msg = "Home Page Image status changed successfully.";
                            this.GetAllImage();
                        }
                        else {
                            this.msg = "Error has occurred while changing status of existing Home Page Image!"
                        }

                        this.modal.dismiss();
                        this.GetActiveImage();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
        }

    }

    fileChange(event)
    {
        
        this.fileList1 = event.target.files;
    }

    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    ViewImage(id)
    {
        this.modalTitle = "Preview Home Page Image";
        this.homepageimage = this.homepageimages.filter(x => x.Id == id)[0];
        this.imgpathshow = this.homepageimage.ImagePath;
        this.modal2.open();
    }

    CancelPopup()
    {
        this.modal.dismiss();
        this.msg2 = '';
    }

}
