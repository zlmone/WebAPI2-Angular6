
import { Component, OnInit, ViewChild, Directive, forwardRef } from '@angular/core';
import { RFQService } from '../../Service/RFQ/RFQ.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRFQ } from '../../Model/RFQ/RFQEstimateListing';
import { DBOperation } from '../../Shared/enum';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
//import * as _ from 'underscore';
import { PagerService } from '../../Shared/pager.index';

@Component({
    providers: [RFQService],
    templateUrl: 'app/Components/RFQ/RFQEstimateAllRFQ.component.html'
})

export class AllRFQComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    RFQs: IRFQ[];
    public RFQ: IRFQ;
    msg: string;
    indLoading: boolean = false;
    RFQFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    RFQFilter: string;
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
    strsearchTitle: string;
    strsearchInitiatedBy: string;
    //  strsearchDateOfInitiation: string;
    strsearchEstimateBy: string;
    // strsearchSubmittedOn: string;
    strsearchStatus: string;
    strsearchrfqStatus: string;
    strsearchLastResponseBy: string;
    // strsearchLastResponseDate: string;
    strsearchActionRequestedBy: string;
    sub: any;
    Mode: number;
    Parameter: any;

    constructor(private fb: FormBuilder, private _RFQService: RFQService, private router: Router, private pagerService: PagerService, private route: ActivatedRoute
    ) {
        //this.route.params.subscribe(params => {
        //    this.Parameter = params['param'];
        //    this.LoadRFQs(this.Parameter);

        //});
    }

    ngOnInit(): void {
        debugger;
        ////////////////

        //this.sub = this.route
        //    .queryParams
        //    .subscribe(params => {
        //        // Defaults to 0 if no query param provided.
        //        this.Mode = +params['Mode'] || 0;
        //    });
        //if (this.Mode == 1) {
        //    this.Param = "myrfq";
        //}
        //else if (this.Mode == 2) {
        //    this.Param = "allrfq"
        //}
        //else if (this.Mode == 3) {
        //    this.Param = "estimateby"
        //}
        //else if (this.Mode == 4) {
        //    this.Param = "mywatch"
        //}
        //else {
        //    this.Param = "myaction"
        //}
        //////////////////////
        this.RFQFrm = this.fb.group({
            RFQInitialId: [''],
            OpportunityId: [''],
            Title: [''],
            InitiatedBy: [''],
            DateOfInitiation: [''],
            EstimateBy: [''],
            SubmittedOn: [''],
            LastResponseBy: [''],
            LastResponseDate: [''],
            ActionRequestedBy: [''],
            Status: [''],
            rfqStatus: [''],
            OtherComments: [''],
            CreatedBy: ['']
        });


        this.LoadRFQs();



    }

    RFQFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.RFQFilter = value;
    }

    RFQSort(property: any) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };

    LoadRFQs(): void {
        debugger;
        var UserName = sessionStorage.getItem('VISUsername');
        var UserType = sessionStorage.getItem('UserType');
        this.indLoading = true;
        this._RFQService.getAllRFQ(Global.BASE_RFQ_ENDPOINT, UserName)
            .subscribe(RFQs => {
                this.RFQs = RFQs;

                //Logic for searching - start

                if (this.ShowHideSearch) {
                    //////////
                    this.strsearchTitle = (<HTMLInputElement>document.getElementById("searchTitle")).value;

                    if (this.strsearchTitle != '') {
                        this.strsearchTitle = this.strsearchTitle.toLocaleLowerCase();
                        this.RFQs = this.RFQs.filter(
                            x => x.Title != null && x.Title.toLocaleLowerCase().indexOf(this.strsearchTitle) != -1);
                    }
                    /////////
                    this.strsearchInitiatedBy = (<HTMLInputElement>document.getElementById("searchInitiatedBy")).value;
                    if (this.strsearchInitiatedBy != '') {
                        this.strsearchInitiatedBy = this.strsearchInitiatedBy.toLocaleLowerCase();
                        this.RFQs = this.RFQs.filter(
                            x => x.InitiatedBy != null && x.InitiatedBy.toLocaleLowerCase().indexOf(this.strsearchInitiatedBy) != -1);
                    }
                    //////////
                    //this.strsearchDateOfInitiation = (<HTMLInputElement>document.getElementById("searchName")).value;

                    //if (this.strsearchDateOfInitiation != '') {
                    //    this.strsearchDateOfInitiation = this.strsearchDateOfInitiation.toLocaleLowerCase();
                    //    this.RFQs = this.RFQs.filter(
                    //        x => x.DateOfInitiation != null && x.DateOfInitiation.toLocaleLowerCase().indexOf(this.strsearchDateOfInitiation) != -1);
                    //}
                    /////////
                    this.strsearchEstimateBy = (<HTMLInputElement>document.getElementById("searchEstimateBy")).value;
                    if (this.strsearchEstimateBy != '') {
                        this.strsearchEstimateBy = this.strsearchEstimateBy.toLocaleLowerCase();
                        this.RFQs = this.RFQs.filter(
                            x => x.EstimateBy != null && x.EstimateBy.toLocaleLowerCase().indexOf(this.strsearchEstimateBy) != -1);
                    }
                    //////////
                    //this.strSearchName = (<HTMLInputElement>document.getElementById("searchName")).value;

                    //if (this.strSearchName != '') {
                    //    this.strSearchName = this.strSearchName.toLocaleLowerCase();
                    //    this.RFQs = this.RFQs.filter(
                    //        x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strSearchName) != -1);
                    //}
                    /////////
                    this.strsearchStatus = (<HTMLInputElement>document.getElementById("searchStatus")).value;
                    if (this.strsearchStatus != '') {
                        this.strsearchStatus = this.strsearchStatus.toLocaleLowerCase();
                        this.RFQs = this.RFQs.filter(
                            x => x.Status != null && x.Status.toLocaleLowerCase().indexOf(this.strsearchStatus) != -1);
                    }
                    //////////
                    this.strsearchrfqStatus = (<HTMLInputElement>document.getElementById("searchrfqStatus")).value;

                    if (this.strsearchrfqStatus != '') {
                        this.strsearchrfqStatus = this.strsearchrfqStatus.toLocaleLowerCase();
                        this.RFQs = this.RFQs.filter(
                            x => x.rfqStatus != null && x.rfqStatus.toLocaleLowerCase().indexOf(this.strsearchrfqStatus) != -1);
                    }
                    /////////
                    this.strsearchLastResponseBy = (<HTMLInputElement>document.getElementById("searchLastResponseBy")).value;
                    if (this.strsearchLastResponseBy != '') {
                        this.strsearchLastResponseBy = this.strsearchLastResponseBy.toLocaleLowerCase();
                        this.RFQs = this.RFQs.filter(
                            x => x.LastResponseBy != null && x.LastResponseBy.toLocaleLowerCase().indexOf(this.strsearchLastResponseBy) != -1);
                    }
                    //////////
                    //this.strSearchName = (<HTMLInputElement>document.getElementById("searchName")).value;

                    //if (this.strSearchName != '') {
                    //    this.strSearchName = this.strSearchName.toLocaleLowerCase();
                    //    this.RFQs = this.RFQs.filter(
                    //        x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strSearchName) != -1);
                    //}
                    /////////
                    //this.strsearchActionRequestedBy = (<HTMLInputElement>document.getElementById("searchDesignation")).value;
                    //if (this.strsearchActionRequestedBy != '') {
                    //    this.strsearchActionRequestedBy = this.strsearchActionRequestedBy.toLocaleLowerCase();
                    //    this.RFQs = this.RFQs.filter(
                    //        x => x.ActionRequestedBy != null && x.ActionRequestedBy.toLocaleLowerCase().indexOf(this.strsearchActionRequestedBy) != -1);
                    //}
                    //////////searchLastResponseBy


                }
                //Logic for searching - End

                this.indLoading = false;
                // initialize to page 1
                this.JumpOnPage(1);
            }
            //,error => this.msg = <any>error
            );
    }

    addRFQ(): void {
        this.router.navigate(['/AddRFQ']);
    }





    deleteRFQ(id: number, status: boolean) {
        //this.dbops = DBOperation.delete;
        //this.SetControlsState(false);
        //if (status == true) {
        //    this.modalTitle = "Confirm to Delete?";
        //    this.modalBtnTitle = "Delete";
        //}
        //else {
        //    this.modalTitle = "Confirm to Undo Delete?";
        //    this.modalBtnTitle = "Undo Delete";
        //}

        //this.RFQ = this.RFQs.filter(x => x.Id == id)[0];
        //this.RFQFrm.setValue(this.RFQ);
        //this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.RFQFrm.enable() : this.RFQFrm.disable();
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.RFQs);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch;
    }

}