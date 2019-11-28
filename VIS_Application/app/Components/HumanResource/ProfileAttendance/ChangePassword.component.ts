import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangePSWService } from '../../../Service/HumanResource/ProfileAttendance/ChangePassword.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IChangePassword } from '../../../Model/HumanResource/ProfileAttendance/ChangePassword';
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
    providers: [ChangePSWService],
    templateUrl: 'app/Components/HumanResource/ProfileAttendance/ChangePassword.component.html'
})


export class ChangePasswordComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    //@ViewChild('modal1') modal1: ModalComponent;
    public ChangePSW: IChangePassword;
    public ChangePswObj: IChangePassword[];
    msg: string;
    indLoading: boolean = false;
    ChangePSWFRM: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    isDesc: boolean = false;
    //column: any = 'News_Name';
    direction: number;

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    PagerInformation: string;

    constructor(private fb: FormBuilder, private _ChangePSWService: ChangePSWService, public http: Http, private router: Router, private pagerService: PagerService) {

    }

    ngOnInit(): void {
        
        this.ChangePSWFRM = this.fb.group({
           
            Id: [''],
            VISUserName: [''],
            VISPassword: [''],
            NewPassword: [''],
            ConfirmNewPassword: ['']
            //IsNew: [''],
            //CreatedOn: [''],
            //CreatedBy: [''],
            //UpdatedOn: [''],
            //UpdatedBy: [''],
            //IsActive: [''],
            //EntityMessage: ['']
        });
        //this.LoadChangePsw()
    }

    onSubmit(formData: any)
    {
        
        if (formData._value.ConfirmNewPassword == formData._value.NewPassword)
        {
            this.dbops = DBOperation.update;
            this.msg = "";
            
            switch (this.dbops) {
                case DBOperation.update:
                    this._ChangePSWService.ChangePassword(Global.BASE_ChhangePassword_ENDPOINT, 2, formData._value).subscribe(
                        data => {
                            if (data.startsWith("Success: "))//Success
                            {
                                this.msg = "Password Changed successfully ...";
                                this.ngOnInit();
                            }
                            else {
                                this.msg = "Error has occurred while modifying existing ChangePassword!"
                            }
                            //this.modal.dismiss();
                        },
                        error => {
                            this.msg = error;
                        }
                    );
                    break;
            }
        }
        else
        {
            this.msg = "Password does not match !!!";
        }
    }
}