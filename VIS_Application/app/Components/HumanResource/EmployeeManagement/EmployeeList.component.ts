import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeListService } from '../../../Service/HumanResource/EmployeeManagement/EmployeeList.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IEmployeeList } from '../../../Model/HumanResource/EmployeeManagement/EmployeeList';
import { IEmpInfoTabular } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';


@Component({
    providers: [EmployeeListService],
    templateUrl: 'app/Components/HumanResource/EmployeeManagement/EmployeeList.component.html'
})

export class EmployeeListComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;

    EmployeeLists: IEmployeeList[];
    EmployeeList: IEmployeeList;

    EmpInfoTabulars: IEmpInfoTabular[]
    EmpInfoTabular: IEmpInfoTabular

    MyTeamFeedbacks: IEmployeeList[];
    MyTeamFeedback: IEmployeeList;


    msg: string;
    indLoading: boolean = false;
    EmployeeListFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    EmployeeListFilter: string;
    isDesc: boolean = false;
    column: any = '';
    direction: number;
    CurrentRecordsPerPage: number = 10;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    PagerInformation: string;
    Status: string;
    //Variables for Filter
    ShowHideSearch: boolean = false;
    ShowHideSearchNew: boolean = false;


    //second table
    searchID: string;
    searchCompanyName: string;
    searchEmployeeName: string;
    searchEmail: string;
    searchDepartment: string;
    searchTotalExp: string;
    searchJoiningDate: string;
    searchRelevingDate: string;
    searchGrace: string;
    searchSL_CL: string;
    someValue: string;
    //declare id 
    tempUserId: number = 21;
    tempUSertype: string = "Admin"

    constructor(private fb: FormBuilder, private _EmployeeListService: EmployeeListService, private pagerService: PagerService, private router: Router) {


        this.Status = "Active"
        this.someValue = "hey";
    }

    ngOnInit(): void {
        this.EmployeeListFrm = this.fb.group({
            CompanyId: [''],
            UserId: [''],
            Usertype: [''],
            Id: [''],
            EmployeeCode: [''],
            CompanyName: [''],
            Employee_Name: [''],
            Email: [''],
            Department: [''],
            TotalExp: [''],
            JoiningDate: [''],
            RelevingDate: [''],
            Grace: [''],
            SL_CL: [''],



        });

        this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, "%");




    }



    SaveEmployee() {
        alert('Fristtab');
    }


    EmployeeListFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.EmployeeListFilter = value;
    }


    EmployeeListSort(property: any) {

        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    }
    LoadValue(event) {
        debugger;
        var x = ($('input[name="Status"]:checked').val());

        if (x == "InActive")
        {
            if (event.target.value =="E%")
            {
                this.LoadEmployeeModeInActive(this.tempUSertype, this.tempUserId);
            }
            else
            {
                this.LoadEmployeeListInActive(this.tempUSertype, this.tempUserId, event.target.value);
            }

        }
        else if (x == "ALL")
        {
            if (event.target.value == "E%")
            {
                this.LoadEmployeeModeAll(this.tempUSertype, this.tempUserId);
            }
            else
            {
                this.LoadEmployeeListAll(this.tempUSertype, this.tempUserId, event.target.value);
            }
        }
        else
        {
            if (event.target.value == "E%")
            {
                this.LoadEmployeeModeActive(this.tempUSertype, this.tempUserId);
            }
            else
            {
                this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, event.target.value);
            }
        }

    }


    FilterByStatus(event) {


        if (event.target.value == "InActive") {
        

            this.LoadEmployeeListInActive(this.tempUSertype, this.tempUserId, "%");
        }
        if (event.target.value == "ALL") {
           

            this.LoadEmployeeListAll(this.tempUSertype, this.tempUserId, "%");
        }
        else {
           

            this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, "%");
        }

    }



    LoadEmployeelistActive(Usertype: string, UserId: number, EmployeeCode: string): void {

        this.indLoading = true;
        this._EmployeeListService.GetEmployeeListActive(Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId, EmployeeCode)
            .subscribe(EmployeeLists => {
                this.EmployeeLists = EmployeeLists;
            

                if (this.ShowHideSearch) {
                    this.searchID = (<HTMLInputElement>document.getElementById("searchID")).value;
                    if (this.searchID != '') {
                        this.searchID = this.searchID.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(this.searchID) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchCompanyName = (<HTMLInputElement>document.getElementById("searchCompanyName")).value;
                    if (this.searchCompanyName != '') {
                        this.searchCompanyName = this.searchCompanyName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(this.searchCompanyName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmail = (<HTMLInputElement>document.getElementById("searchEmail")).value;
                    if (this.searchEmail != '') {
                        this.searchEmail = this.searchEmail.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Email != null && x.Email.toLocaleLowerCase().indexOf(this.searchEmail) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchDepartment = (<HTMLInputElement>document.getElementById("searchDepartment")).value;
                    if (this.searchDepartment != '') {
                        this.searchDepartment = this.searchDepartment.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Department != null && x.Department.toLocaleLowerCase().indexOf(this.searchDepartment) != -1);
                    }
                    if (this.ShowHideSearch) {
                        this.searchTotalExp = (<HTMLInputElement>document.getElementById("searchTotalExp")).value;
                        if (this.searchTotalExp != '') {
                            this.searchTotalExp = this.searchTotalExp.toLocaleLowerCase();
                            this.EmployeeLists = this.EmployeeLists.filter(
                                x => x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(this.searchTotalExp) != -1);
                        }
                    }



                }

                this.indLoading = false;

                this.JumpOnPage(1);
            }

            );
    }
    LoadEmployeeListAll(Usertype: string, UserId: number, EmployeeCode: string): void {
        debugger;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeListAll(Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId, EmployeeCode)
            .subscribe(EmployeeLists => {
                this.EmployeeLists = EmployeeLists;
                console.log(this.EmployeeLists)

                if (this.ShowHideSearch) {
                    this.searchID = (<HTMLInputElement>document.getElementById("searchID")).value;
                    if (this.searchID != '') {
                        this.searchID = this.searchID.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(this.searchID) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchCompanyName = (<HTMLInputElement>document.getElementById("searchCompanyName")).value;
                    if (this.searchCompanyName != '') {
                        this.searchCompanyName = this.searchCompanyName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(this.searchCompanyName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmail = (<HTMLInputElement>document.getElementById("searchEmail")).value;
                    if (this.searchEmail != '') {
                        this.searchEmail = this.searchEmail.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Email != null && x.Email.toLocaleLowerCase().indexOf(this.searchEmail) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchDepartment = (<HTMLInputElement>document.getElementById("searchDepartment")).value;
                    if (this.searchDepartment != '') {
                        this.searchDepartment = this.searchDepartment.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Department != null && x.Department.toLocaleLowerCase().indexOf(this.searchDepartment) != -1);
                    }
                    if (this.ShowHideSearch) {
                        this.searchTotalExp = (<HTMLInputElement>document.getElementById("searchTotalExp")).value;
                        if (this.searchTotalExp != '') {
                            this.searchTotalExp = this.searchTotalExp.toLocaleLowerCase();
                            this.EmployeeLists = this.EmployeeLists.filter(
                                x => x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(this.searchTotalExp) != -1);
                        }
                    }



                }

                this.indLoading = false;

                this.JumpOnPage(1);
            }

            );
    }

    LoadEmployeeListInActive(Usertype: string, UserId: number, EmployeeCode: string): void {
        debugger;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeListInActive(Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId, EmployeeCode)
            .subscribe(EmployeeLists => {
                this.EmployeeLists = EmployeeLists;
                console.log(this.EmployeeLists)

                if (this.ShowHideSearch) {
                    this.searchID = (<HTMLInputElement>document.getElementById("searchID")).value;
                    if (this.searchID != '') {
                        this.searchID = this.searchID.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(this.searchID) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchCompanyName = (<HTMLInputElement>document.getElementById("searchCompanyName")).value;
                    if (this.searchCompanyName != '') {
                        this.searchCompanyName = this.searchCompanyName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(this.searchCompanyName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmail = (<HTMLInputElement>document.getElementById("searchEmail")).value;
                    if (this.searchEmail != '') {
                        this.searchEmail = this.searchEmail.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Email != null && x.Email.toLocaleLowerCase().indexOf(this.searchEmail) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchDepartment = (<HTMLInputElement>document.getElementById("searchDepartment")).value;
                    if (this.searchDepartment != '') {
                        this.searchDepartment = this.searchDepartment.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Department != null && x.Department.toLocaleLowerCase().indexOf(this.searchDepartment) != -1);
                    }
                    if (this.ShowHideSearch) {
                        this.searchTotalExp = (<HTMLInputElement>document.getElementById("searchTotalExp")).value;
                        if (this.searchTotalExp != '') {
                            this.searchTotalExp = this.searchTotalExp.toLocaleLowerCase();
                            this.EmployeeLists = this.EmployeeLists.filter(
                                x => x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(this.searchTotalExp) != -1);
                        }
                    }



                }

                this.indLoading = false;

                this.JumpOnPage(1);
            }

            );
    }



    LoadEmployeeModeActive(Usertype: string, UserId: number): void {

        this.indLoading = true;
        this._EmployeeListService.GetEmployeeModeActive(Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId)
            .subscribe(EmployeeLists => {
                this.EmployeeLists = EmployeeLists;
                console.log(this.EmployeeLists)

                if (this.ShowHideSearch) {
                    this.searchID = (<HTMLInputElement>document.getElementById("searchID")).value;
                    if (this.searchID != '') {
                        this.searchID = this.searchID.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(this.searchID) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchCompanyName = (<HTMLInputElement>document.getElementById("searchCompanyName")).value;
                    if (this.searchCompanyName != '') {
                        this.searchCompanyName = this.searchCompanyName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(this.searchCompanyName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmail = (<HTMLInputElement>document.getElementById("searchEmail")).value;
                    if (this.searchEmail != '') {
                        this.searchEmail = this.searchEmail.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Email != null && x.Email.toLocaleLowerCase().indexOf(this.searchEmail) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchDepartment = (<HTMLInputElement>document.getElementById("searchDepartment")).value;
                    if (this.searchDepartment != '') {
                        this.searchDepartment = this.searchDepartment.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Department != null && x.Department.toLocaleLowerCase().indexOf(this.searchDepartment) != -1);
                    }
                    if (this.ShowHideSearch) {
                        this.searchTotalExp = (<HTMLInputElement>document.getElementById("searchTotalExp")).value;
                        if (this.searchTotalExp != '') {
                            this.searchTotalExp = this.searchTotalExp.toLocaleLowerCase();
                            this.EmployeeLists = this.EmployeeLists.filter(
                                x => x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(this.searchTotalExp) != -1);
                        }
                    }



                }

                this.indLoading = false;

                this.JumpOnPage(1);
            }

            );
    }
    LoadEmployeeModeAll(Usertype: string, UserId: number): void {
        debugger;
        this.indLoading = true;
        this._EmployeeListService.GetEmployeeModeAll(Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId)
            .subscribe(EmployeeLists => {
                this.EmployeeLists = EmployeeLists;
                console.log(this.EmployeeLists)

                if (this.ShowHideSearch) {
                    this.searchID = (<HTMLInputElement>document.getElementById("searchID")).value;
                    if (this.searchID != '') {
                        this.searchID = this.searchID.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(this.searchID) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchCompanyName = (<HTMLInputElement>document.getElementById("searchCompanyName")).value;
                    if (this.searchCompanyName != '') {
                        this.searchCompanyName = this.searchCompanyName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(this.searchCompanyName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmail = (<HTMLInputElement>document.getElementById("searchEmail")).value;
                    if (this.searchEmail != '') {
                        this.searchEmail = this.searchEmail.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Email != null && x.Email.toLocaleLowerCase().indexOf(this.searchEmail) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchDepartment = (<HTMLInputElement>document.getElementById("searchDepartment")).value;
                    if (this.searchDepartment != '') {
                        this.searchDepartment = this.searchDepartment.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Department != null && x.Department.toLocaleLowerCase().indexOf(this.searchDepartment) != -1);
                    }
                    if (this.ShowHideSearch) {
                        this.searchTotalExp = (<HTMLInputElement>document.getElementById("searchTotalExp")).value;
                        if (this.searchTotalExp != '') {
                            this.searchTotalExp = this.searchTotalExp.toLocaleLowerCase();
                            this.EmployeeLists = this.EmployeeLists.filter(
                                x => x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(this.searchTotalExp) != -1);
                        }
                    }



                }

                this.indLoading = false;

                this.JumpOnPage(1);
            }

            );
    }

    LoadEmployeeModeInActive(Usertype: string, UserId: number): void {

        this.indLoading = true;
        this._EmployeeListService.GetEmployeeModeInActive(Global.BASE_EmployeeList_ENDPOINT, Usertype, UserId)
            .subscribe(EmployeeLists => {
                this.EmployeeLists = EmployeeLists;
                console.log(this.EmployeeLists)

                if (this.ShowHideSearch) {
                    this.searchID = (<HTMLInputElement>document.getElementById("searchID")).value;
                    if (this.searchID != '') {
                        this.searchID = this.searchID.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.EmployeeCode != null && x.EmployeeCode.toLocaleLowerCase().indexOf(this.searchID) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchCompanyName = (<HTMLInputElement>document.getElementById("searchCompanyName")).value;
                    if (this.searchCompanyName != '') {
                        this.searchCompanyName = this.searchCompanyName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.CompanyName != null && x.CompanyName.toLocaleLowerCase().indexOf(this.searchCompanyName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
                    if (this.searchEmployeeName != '') {
                        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchEmail = (<HTMLInputElement>document.getElementById("searchEmail")).value;
                    if (this.searchEmail != '') {
                        this.searchEmail = this.searchEmail.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Email != null && x.Email.toLocaleLowerCase().indexOf(this.searchEmail) != -1);
                    }
                }
                if (this.ShowHideSearch) {
                    this.searchDepartment = (<HTMLInputElement>document.getElementById("searchDepartment")).value;
                    if (this.searchDepartment != '') {
                        this.searchDepartment = this.searchDepartment.toLocaleLowerCase();
                        this.EmployeeLists = this.EmployeeLists.filter(
                            x => x.Department != null && x.Department.toLocaleLowerCase().indexOf(this.searchDepartment) != -1);
                    }
                    if (this.ShowHideSearch) {
                        this.searchTotalExp = (<HTMLInputElement>document.getElementById("searchTotalExp")).value;
                        if (this.searchTotalExp != '') {
                            this.searchTotalExp = this.searchTotalExp.toLocaleLowerCase();
                            this.EmployeeLists = this.EmployeeLists.filter(
                                x => x.TotalExp != null && x.TotalExp.toLocaleLowerCase().indexOf(this.searchTotalExp) != -1);
                        }
                    }



                }

                this.indLoading = false;

                this.JumpOnPage(1);
            }

            );
    }

    addEmployeeList() {

        this.router.navigate(['/EmpInfoTabular']);
       // this.SetControlsState(true);
        this.modalTitle = "Add New EmployeeList";
        this.modalBtnTitle = "Add";



    }

    editEmployeeList(id: number) {
        debugger;
    
      //  this.EmployeeList = this.EmployeeLists.filter(x => x.Id == id)[0];
        this.router.navigate(['/EmpInfoTabular'], { queryParams: { UserId: id,mode:"e" } });
    
    }





    deleteEmployee(id: number) {

        var msg1 = "Are you sure you want to Delete this Employee?";


        if (confirm(msg1) == true) {


            this.deleteEmployeeId(id);

        }

        else {

            this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, "%");
        }



    }



    deleteEmployeeId(id: number): void {


        this.indLoading = true;
        this._EmployeeListService.delete(Global.BASE_EmployeeList_ENDPOINT, id)
            .subscribe(Data => {

                if (Data.startsWith("Success: ")) //Success
                {
                    this.msg = Data;
                    this.LoadEmployeelistActive(this.tempUSertype, this.tempUserId, "%");

                }
                else {


                    alert(Data);
                }



                //Logic for searching - End
                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.EmployeeListFrm.enable() : this.EmployeeListFrm.disable();
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }


    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeLists);
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

                this._EmployeeListService.post(Global.BASE_EmployeeList_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;

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
                debugger;
                this._EmployeeListService.put(Global.BASE_EmployeeList_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;

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

                this._EmployeeListService.delete(Global.BASE_EmployeeList_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data;

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

        }
    }
}