import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigureWorksheetService } from '../../../service/Masters/Configuration/ConfigureWorksheet.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IConfigureWorkSheet } from '../../../Model/Masters/Configuration/ConfigureWorksheet';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
import { PagerService } from '../../../Shared/pager.index';

@Component
    ({          
            providers: [ConfigureWorksheetService],
            templateUrl: 'app/Components/Masters/Configuration/ConfigureWorkSheet.component.html',
    })

export class ConfigureWorkSheetComponent implements OnInit
{

    @ViewChild('modal') modal: ModalComponent;

    configureworksheets: IConfigureWorkSheet[];
    configureworksheet: IConfigureWorkSheet;
    msg: string;
    indLoading: boolean = false;
    ConfigureWorksheetFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    ConfigureWorkSheetFilter: string;
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
    

    constructor(private fb: FormBuilder, private _ConfigureWorksheetService: ConfigureWorksheetService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    ngOnInit(): void
    {
        this._CommonHelperService.ToogleMenu();
        this.LoadConfigureWorkSheet();
        this.configureworksheet =
            ({
                Id: 0,
                SrNo:'',
                Fromm: 0,
                Too: 0,
                HexadecimalValue:'',
                CreatedOn: null,
                CreatedBy: '',
                UpdatedOn: null,
                UpdatedBy: '',
                IsActive: false
            })

    }


    LoadConfigureWorkSheet(): void
    {
        
        this.indLoading = true;
        this._ConfigureWorksheetService.get(Global.BASE_CONFIGUREWORKSHEET_ENDPOINT)
            .subscribe(data =>
            {
                this.configureworksheets = data;
                this.indLoading = false;
            }
            //,error => this.msg = <any>error
            );
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.ConfigureWorksheetFrm.enable() : this.ConfigureWorksheetFrm.disable();
    }


    EditConfigureWorksheet(id: number)
    {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Configure Worksheet";
        this.modalBtnTitle = "Update";
        this.configureworksheet = this.configureworksheets.filter(x => x.Id == id)[0];
        this.modal.open();
    }

    CancelConfig()
    {
        this.modal.dismiss();
        this.configureworksheet.HexadecimalValue = this.configureworksheet.HexadecimalValue;
    }

    onSubmit(formData: IConfigureWorkSheet)
    {
        debugger;
        this.msg = "";
        this._ConfigureWorksheetService.put(Global.BASE_CONFIGUREWORKSHEET_ENDPOINT, formData.Id, formData).subscribe(
            data =>
            {
                //if (data == "Success")
                if (data.startsWith("Success: "))//Success
                {
                    this.msg = data;
                    this.LoadConfigureWorkSheet();
                    this.modal.dismiss();   
                }
                else {
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
