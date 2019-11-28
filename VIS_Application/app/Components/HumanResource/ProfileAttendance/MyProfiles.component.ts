import { Component, OnInit, ViewChild } from '@angular/core';
import { MyProfilesService } from '../../../Service/HumanResource/ProfileAttendance/MyProfiles.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IMyProfiles } from '../../../Model/HumanResource/ProfileAttendance/MyProfiles';

import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';
import { Ng2TabModule } from 'ng2-tab';


@Component({
    providers: [MyProfilesService],
    templateUrl: 'app/Components/HumanResource/ProfileAttendance/MyProfiles.component.html'
})


export class MyProfilesComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    MyProfiless: IMyProfiles[];
    MyProfiles: IMyProfiles;
    ViewHistory: IMyProfiles[];
    employeeheadlist: IMyProfiles[];
    Dropdownlist: IMyProfiles;
    ViewEducation: IMyProfiles[];
    msg: string;
    indLoading: boolean = false;
    MyProfilesFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    isDesc: boolean = false;
    direction: number;
    CurrentRecordsPerPage: number = 10;

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    //other declartion
    imagePathSignatureOther: string;
    ImgGlobalPath: string;


    constructor(private fb: FormBuilder, private _MyProfilesService: MyProfilesService, public http: Http, private router: Router, private pagerService: PagerService,
    ) {

    }

    ngOnInit(): void {
        
        this.MyProfilesFrm = this.fb.group({
            Mode: [''],
            UserId: [''],
            Employee_Name: [''],
            LineManagerName: [''],
            FirstName: [''],
            MiddleName: [''],
            LastName: [''],
            Gender: [''],
            PhotographFileName: [''],
            CompanyName: [''],
            Email: [''],
            JoiningDesignation: [''],
            DepartmentName: [''],
            FatherName: [''],
            MotherName: [''],
            PermenantAddres: [''],
            CommunicationAddress: [''],
            LandlineNumber: [''],
            MobileNumber: [''],
            BirthDate: [''],
            BloodGroup: [''],
            MaritalStatus: [''],


        });
        this.LoadGetUserProfiles(21);
        this.LoadEducationDetail(21);
        
        this.LoadEmployeeList();

    }

    LoadGetUserProfiles(UserId: number): void {
        
        this.ImgGlobalPath = Global.WebAccessURL;
        this.indLoading = true;
        this._MyProfilesService.getuserProfile(Global.BASE_MyProfiles_ENDPOINT, UserId)
            .subscribe(DATADP => {
                this.ViewHistory = DATADP;
                this.indLoading = false;

            }

            );
    }


    LoadEducationDetail(UserId: number): void {
        
        this.indLoading = true;
        this._MyProfilesService.getEducatinDeatils(Global.BASE_MyProfiles_ENDPOINT, UserId)
            .subscribe(DATADP => {
                this.ViewEducation = DATADP;
                this.indLoading = false;
              
            }
            );
    }
    LoadSelectValue(event) {
        debugger
        this.indLoading = true;
        
        this.Dropdownlist = this.employeeheadlist.filter(x => x.UserId == event.target.value)[0];
        console.log(this.Dropdownlist); 

        this._MyProfilesService.getuserProfile(Global.BASE_MyProfiles_ENDPOINT, this.Dropdownlist.UserId)

            .subscribe(DATADP => {

                this.ViewHistory = DATADP;
                console.log(DATADP); 
                this.indLoading = false;

            }

        );

        this._MyProfilesService.getEducatinDeatils(Global.BASE_MyProfiles_ENDPOINT, this.Dropdownlist.UserId)
            .subscribe(DATADP => {
                this.ViewEducation = DATADP;
                console.log(DATADP);
                this.indLoading = false;

            });

      
        //this.LoadGetUserProfiles(event.traget.value);
        //this.LoadEducationDetail(event.traget.value);
               // this.indLoading = false;
   


    }


    LoadEmployeeList() {
       
        this.indLoading = true;
        this._MyProfilesService.getEmployeeList(Global.BASE_MyProfiles_ENDPOINT)
            .subscribe(data => {
                this.employeeheadlist = data
           
                this.indLoading = false;
            }

            );
    }

    onSubmit(formData: any) {
        


    }
}