import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonConfigurationService } from '../../../service/Masters/Configuration/CommonConfiguration.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICommonConfiguration } from '../../../Model/Masters/Configuration/CommonConfiguration';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import * as _ from 'underscore';
import { PagerService } from '../../../Shared/pager.index';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component
    ({
        providers: [CommonConfigurationService],
        templateUrl: 'app/Components/Masters/Configuration/CommonConfiguration.component.html'
    })

export class CommonConfigurationComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;

    commonconfigurations: ICommonConfiguration[];
    commonconfiguration: ICommonConfiguration;
    msg: string;
    indLoading: boolean = false;
    CommonConfigurationFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    CommonConfigurationFilter: string;
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


    constructor(private fb: FormBuilder, private _CommonConfigurationService: CommonConfigurationService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    ngOnInit(): void {
        this._CommonHelperService.ToogleMenu();

        this.LoadCommonConfiguration();
        this.commonconfiguration =
            ({
                Id: 0,
                URLLocal: '',
                URLLive: '',
                MinimumLunchBreak: 0,
                MinimumOtherBreak: 0,
                MouseMinutes: 0,
                PlusMouseMinutes: 0,
                MouseTracking: 0,
                ProductivityTracker: 0,
                WorksheetPrompt: 0,
                MinimumPunchoutInterval: 0,
                InTimeMondayToFridayHH: 0,
                InTimeMondayToFridayMM: 0,
                OutTimeMondayToFridayHH: 0,
                OutTimeMondayToFridayMM: 0,
                InTimeSaturdayHH: 0,
                InTimeSaturdayMM: 0,
                OutTimeSaturdayHH: 0,
                OutTimeSaturdayMM: 0,
                ShiftDurationHH: 0,
                ShiftDurationMM: 0,
                TDSMenuHideOrShow: '',
                RoleMenu: '',
                CreatedOn: null,
                CreatedBy: '',
                UpdatedOn: null,
                UpdatedBy: '',
                IsActive: false
            })

    }

    LoadCommonConfiguration(): void {

        this.indLoading = true;
        this._CommonConfigurationService.getallconfiguration(Global.BASE_COMMONCONFIGURATION_ENDPOINT)
            .subscribe(data => {
                this.commonconfiguration = data;
                this.indLoading = false;
            }
            //,error => this.msg = <any>error
            );
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.CommonConfigurationFrm.enable() : this.CommonConfigurationFrm.disable();
    }

    onSubmit(formData: ICommonConfiguration) {
        this.msg = "";
        console.log(formData);

        this._CommonConfigurationService.put(Global.BASE_COMMONCONFIGURATION_ENDPOINT, formData.Id, formData).subscribe(
            data => {
                //if (data == "Success") {
                if (data.startsWith("Success: "))//Success
                {
                    $("html, body").animate({ scrollTop: 590 }, 250);
                    this.msg = data;
                    this.LoadCommonConfiguration();
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
