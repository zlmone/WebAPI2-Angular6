import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Global } from '../../../../app/Shared/global';
import { PagerService } from '../../../../app/Shared/pager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';
import { SalaryGrievancePEService } from '../../../Service/HumanResource/Grievance/SalaryGrievancePE.service';


@Component({
    providers: [SalaryGrievancePEService],
    templateUrl: 'app/Components/HumanResource/Grievance/SalaryGrievancePE.component.html'
})

export class SalaryGrievancePEComponent implements OnInit
{
    
    constructor(private fb: FormBuilder, private _SalaryGrievancePEService: SalaryGrievancePEService, public http: Http, private router: Router, private pagerService: PagerService) { }

    ngOnInit(): void { }
}
