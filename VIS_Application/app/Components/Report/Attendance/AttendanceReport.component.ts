import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IDepartment, IEmployee, ICompany, ILineManager, IYear, ICalTotalAttendance, SaveDailyEntryTime, IAttendanceParam } from '../../../Model/Report/Attendance/AttendanceReport';
import { AttendanceReportService } from '../../../Service/Report/Attendance/AttendanceReport.Service';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';
//import { AttendanceReportFilterPipe } from '../../../Filter/Report/Attendance/Attendance_Report';

@Component({
    providers: [AttendanceReportService],
    templateUrl: 'app/Components/Report/Attendance/AttendanceReport.component.html'
})

export class AttendanceReportComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modalAttendanceApprovalPunchIn') modalAttendanceApprovalPunchIn: ModalComponent;
    @ViewChild('modalAttendanceApprovalPunchOut') modalAttendanceApprovalPunchOut: ModalComponent;
    @ViewChild('modalAttendanceApprovalLunchOut') modalAttendanceApprovalLunchOut: ModalComponent;
    @ViewChild('modalAttendanceApprovalLunchIn') modalAttendanceApprovalLunchIn: ModalComponent;
    @ViewChild('modalAttendanceApprovalWorkIn') modalAttendanceApprovalWorkIn: ModalComponent;
    AttendanceDepart: IDepartment[];
    AttendanceEmployee: IEmployee[];
    AttendanceCompany: ICompany[];
    AttendanceLineManager: ILineManager[];
    AttendanceYear: IYear[];
    AttendancebindData: ICalTotalAttendance[];
    EmployeeDailyTime: SaveDailyEntryTime[];
    InId: number; OutId: number; LunchOutId:number; LunchInId: number; OtherId: number;
    Id: number; Employee_Id: number;
    AttendanceDate: string; strDate: string; ToDate: string;
    month: number; year: number; day: number;
    EmployeeName: string;
    msg: string;
    indLoading: boolean = false;
    CurrentRecordsPerPage: number = 10;
    pager: any = {};
    pagedItems: any[];
    name: string;
    DRPData: number;
    RDBDate: string;
    Rdbmonth: string;
    Grace: number;
    ActualHr: string;
    ActualMin: string;
    EntryHr: string;
    EntryMin: string;
    DrpEntryIn: string;
    DrpActualIn: string;
    DrpActualOut: string;
    strarrdate: string[];
    DRPAM_PM: string;
    HODRemarks: string;
    EntryType: number;
    Temp: string;
    Yearval: number;

    constructor(private fb: FormBuilder, public _AttendanceReportService: AttendanceReportService, public http: Http, private router: Router, private pagerService: PagerService) {
    }

    ngOnInit(): void {
        $("#depart").hide();
        $("#companydata").hide();
        $("#LM").hide();
        $("#emp").show();
        $("#empAll").show();
        $("#Employee").prop("checked", true);
        $("#datedata").hide();
        $("#rdbmonth").prop("checked", true);
        $("#rdbDate").prop("checked", false);
        $("#RdbSortName").prop("checked", true);
        $('#ddlmonth option:eq(' + (new Date).getMonth() + ')').prop('selected', true);
        this.Yearval = new Date().getFullYear();

        this.AttendanceDepart = [
            ({
                Id: 0,
                Department_Name: '',
                mode: ''
            })];
        this.AttendanceEmployee = [({
            Id: 0,
            Employee_Name: '',
            mode: ''
        })];
        this.AttendanceCompany = [({
            Id: 0,
            CompanyName: '',
            mode: ''
        })];
        this.AttendanceLineManager = [({
            Id: 0,
            LineManager: '',
            mode: ''
        })];
        this.AttendancebindData = [({
            Employee_Id: 0,
            EmployeeCode: '',
            Employee_Name: '',
            Date: '',
            MMDDYYYY_DateFormat: '',
            Days: '',
            ImportRemarks: '',
            HoverImportRemarks: '',
            InId: 0,
            In_Time: null,
            OutId: 0,
            Out_Time: null,
            LunchOutId: 0,
            LunchOut_Time: null,
            LunchInId: 0,
            LunchIn_Time: null,
            OtherId: 0,
            Other_Time: null,
            TotalWorksheet_Hr: 0,
            status: '',
            Total_W_Hr: '',
            Total_Hrs: '',
            diff: '',
            TotalId: '',
            ActualEntryTime: '',
            Grace: 0,
            EntryType: ''
        })]
        this.AttendanceYear = [({
            Id: 0,
            Month: '',
            Year: ''
        })];
        this.LoadDepartment();
        this.LoadCompany();
        this.LoadLineManager();
        this.LoadYear();
        this.LoadEmployee();
    }

    HideEMCOLM() {
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#companydata").hide(-300);
        $("#LM").hide(-300);
        $("#depart").show(-300);
    }
    HideCOLMDP() {
        $("#depart").hide(-300);
        $("#companydata").hide(-300);
        $("#LM").hide(-300);
        $("#emp").show(-300);
        $("#empAll").show(-300);
    }
    HideLMDPEM() {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#LM").hide(-300);
        $("#companydata").show(-300);
    }
    HideDPEMCO() {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#companydata").hide(-300);
        $("#LM").show(-300);
    }
    HideMonth() {
        $("#monthData").hide(-300);
        $("#datedata").show(-300);
    }
    HideDate() {
        $("#monthData").show(-300);
        $("#datedata").hide(-300);
    }

    
    private btnAttendanceApprovePunchIn(data): void {
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.Employee_Id = data.Employee_Id;
        this.Grace = data.Grace;
        this.EntryHr = data.In_Time;
        this.EntryMin = data.In_Time;
        let HH_EIN = this.EntryHr.slice(8, 10).trim();
        this.EntryHr = HH_EIN;
        let MIN_EIN = this.EntryMin.slice(11, 13).trim();
        this.EntryMin = MIN_EIN;
        this.DrpEntryIn = data.In_Time;
        let DrpIn = this.DrpEntryIn.slice(17, 19).trim();
        this.InId = data.InId;
        this.DrpEntryIn = DrpIn;
        this.ActualHr = data.ActualEntryTime;
        let HH_AIN = this.ActualHr.slice(0, 2).trim();
        this.ActualHr = HH_AIN;
        this.ActualMin = data.ActualEntryTime;
        let MIN_AIN = this.ActualMin.slice(3, 5).trim();
        this.ActualMin = MIN_AIN;
        this.modalAttendanceApprovalPunchIn.open();
    }
    private btnAttendanceApprovePunchOut(data): void {
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.Employee_Id = data.Employee_Id;
        this.Grace = data.Grace;
        this.EntryHr = data.Out_Time;
        this.EntryMin = data.Out_Time;
        let HH_EOUT = this.EntryHr.slice(8, 10).trim();
        this.EntryHr = HH_EOUT;
        let MIN_EOUT = this.EntryMin.slice(11, 13).trim();
        this.EntryMin = MIN_EOUT;
        this.DrpEntryIn = data.Out_Time;
        let DrpOut = this.DrpEntryIn.slice(17, 19).trim();
        this.DrpEntryIn = DrpOut;
        this.ActualHr = data.ActualEntryTime;
        let HH_AOUT = this.ActualHr.slice(0, 2).trim();
        this.ActualHr = HH_AOUT;
        this.ActualMin = data.ActualEntryTime;
        let MIN_AOUT = this.ActualMin.slice(3, 5).trim();
        this.ActualMin = MIN_AOUT;
        this.OutId = data.OutId;
        this.modalAttendanceApprovalPunchOut.open();
    }
    private btnAttendanceApproveLunchOut(data): void {
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.Employee_Id = data.Employee_Id;
        this.LunchOutId = data.LunchOutId;
        this.modalAttendanceApprovalLunchOut.open();
    }
    private btnAttendanceApproveLunchIn(data): void {
        this.LunchInId = data.LunchInId;
        this.Employee_Id = data.Employee_Id;
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.modalAttendanceApprovalLunchIn.open();
    }
    private btnAttendanceApproveOtherwork(data): void {
        this.OtherId = data.OtherId;
        this.Employee_Id = data.Employee_Id;
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.modalAttendanceApprovalWorkIn.open();
    }

    //----Punch-In Attendance Approve

    ApproveAttendancePunchIn(): void {
        this.EntryHr = $("#EntryHour").val();
        this.EntryMin = $("#EntryMinute").val();
        this.DRPAM_PM = $("#ddlIn").val();
        this.HODRemarks = $("#HODRemarks").val();
        this.Grace = $("#Grace").val();
        this.ActualHr = $("#ActualHour").val();
        this.ActualMin = $("#ActualMinute").val();
        this.DrpActualIn = $("#ddlAIn").val();

        if ((parseInt(this.EntryHr.toString()) < 24) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;

            this.EntryType = 1;
            if (this.InId.toString().length > 0) {
                if (this.EntryType < 3) {
                    if (this.DrpActualIn == "PM") {
                        if (parseInt(this.ActualHr) <= 12) {
                        }
                        else {
                            this.ActualHr += 12;
                        }
                        this.ActualHr;
                    }
                    else {
                        this.ActualHr;
                    }
                    this.ActualHr = this.ActualHr + ":" + this.ActualMin;
                }

                this.indLoading = true;
                this._AttendanceReportService.AttendanceApproval(Global.BASE_AttendanceReport_ENDPOINT, this.InId, 1, this.HODRemarks, this.strDate, this.Temp, this.Grace, this.ActualHr)
                    .subscribe(data => {
                        this.indLoading = false;
                    },
                    error => {
                        this.msg = error;
                    });
            }
            else {
                this._AttendanceReportService.GetDailyEntryTime(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(data => {
                        this.indLoading = false;
                        this.EmployeeDailyTime = data;
                        let Datetime = new Date(this.strDate);
                        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var weekday = weekdays[Datetime.getDay()];

                        if (data != "") {
                            let Time = "";
                            this.EmployeeDailyTime = data;
                            if (this.EntryType == 1) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Mon_Fri;
                                    })
                                }
                            }
                            else if (this.EntryType = 2) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Mon_Fri;
                                    })
                                }
                            }
                            else {
                                Time = "";
                            }
                            this.strDate = this.AttendanceDate;
                            this.strarrdate = this.strDate.split("/");
                            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
                            this.EntryType = 1;

                            this._AttendanceReportService.AddEmployeeAttendance(Global.BASE_AttendanceReport_ENDPOINT, 0, this.Employee_Id, this.EntryType, this.HODRemarks, this.Temp, this.strDate, Time, this.Grace)
                                .subscribe(success => {
                                    this.indLoading = false;
                                },
                                error => {
                                    this.msg = error;
                                });
                        }
                    },
                    error => {
                        this.msg = error;
                    });
            }
        }
    }
    AttendanceRejectPunchIn(): void {
        this.EntryType = 1;
        this.HODRemarks = $("#HODRemarks").val();
        this._AttendanceReportService.AttendanceRejectPunchIn(Global.BASE_AttendanceReport_ENDPOINT, this.Id, this.EntryType, this.AttendanceDate, this.HODRemarks, this.InId)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    ApproveAttendanceOkPunchIn(): void {
        let Remarks = $("#RemarksQuickApprove").val();
        this._AttendanceReportService.ApproveAttendanceOkIn(Global.BASE_AttendanceReport_ENDPOINT, this.InId, Remarks)
            .subscribe(data => {
                this.indLoading = true;
            },
            error => {
                this.msg = error;
            });
    }

    //----Punch-Out Attendance Approve

    ApproveAttendancePunchOut(): void {
        this.EntryHr = $("#EntryHrPunchout").val();
        this.EntryMin = $("#EntryMinPunchOut").val();
        this.DRPAM_PM = $("#ddlout").val();
        this.HODRemarks = $("#HODRemarksPunchOut").val();
        this.Grace = $("#GracePunchOut").val();
        this.ActualHr = $("#ActualHourPunchOut").val();
        this.ActualMin = $("#ActualMinute").val();
        this.DrpActualOut = $("#ddlout").val();
        this.EntryType = 2;

        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;

            if (this.OutId.toString().length > 0) {
                if (this.EntryType < 3) {
                    if (this.DrpActualOut == "PM") {
                        if (parseInt(this.ActualHr) <= 12) {

                        }
                        else {
                            this.ActualHr += 12;
                        }
                        this.ActualHr;
                    }
                    else {
                        this.ActualHr;
                    }
                    this.ActualHr = this.ActualHr + ":" + this.ActualMin;
                }

                this._AttendanceReportService.ApproveAttendancePunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.OutId, this.EntryType, this.HODRemarks, this.strDate, this.Temp, this.Grace, this.ActualHr)
                    .subscribe(data => {
                        this.indLoading = false;

                    },
                    error => {
                        this.msg = error;
                    })
            }
            else {
                this._AttendanceReportService.GetDailyEntryTime(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(data => {
                        this.indLoading = false;
                        this.EmployeeDailyTime = data;
                        let Datetime = new Date(this.strDate);
                        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var weekday = weekdays[Datetime.getDay()];

                        if (data != "") {
                            let Time = "";
                            this.EmployeeDailyTime = data;
                            if (this.EntryType == 1) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Mon_Fri;
                                    })
                                }
                            }
                            else if (this.EntryType = 2) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Mon_Fri;
                                    })
                                }
                            }
                            else {
                                Time = "";
                            }
                            this.strDate = this.AttendanceDate;
                            this.strarrdate = this.strDate.split("/");
                            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
                            this.EntryType = 2;

                            this._AttendanceReportService.AddEmployeeAttendancePunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.EntryType, this.HODRemarks, this.Temp, this.strDate, this.ActualHr, this.Grace)
                                .subscribe(success => {
                                    this.indLoading = false;
                                },
                                error => {
                                    this.msg = error
                                });
                        }
                    },
                    error => {
                        this.msg = error;
                    })
            }
        }
    }
    AttendanceRejectPunchOut(): void {
        this.EntryType = 2;
        this.HODRemarks = $("#HODRemarksPunchOut").val();
        this._AttendanceReportService.AttendanceRejectPunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.Id, this.EntryType, this.AttendanceDate, this.HODRemarks, this.OutId)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    ApproveAttendanceOkPunchOut(): void {
        let Remarks = $("#ApprovalRemarksOut").val();
        this._AttendanceReportService.ApproveAttendanceOkPunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.OutId, Remarks)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }

    //----Lunch-Out Attendance Approve 
    ApproveAttendanceLunchOut(): void {
        this.EntryHr = $("#EntryHrLunchOut").val();
        this.EntryMin = $("#EntryMinuteLunchOut").val();
        this.DRPAM_PM = $("#ddlLunchOut").val();
        this.HODRemarks = $("#RemarksLunchOut").val();
        this.EntryType = 3;

        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;

            if (this.LunchOutId.toString().length > 0) {
                this._AttendanceReportService.ApproveAttendanceLunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.LunchOutId, this.HODRemarks, this.Temp)
                    .subscribe(data => {
                        this.indLoading = false;
                    },
                    error => {
                        this.msg = error;
                    });
            }
            else {
                this.strDate = this.AttendanceDate;
                this._AttendanceReportService.GetDailyEntryTime(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(data => {
                        this.indLoading = false;
                        this.EmployeeDailyTime = data;

                        let Datetime = new Date(this.strDate);
                        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var weekday = weekdays[Datetime.getDay()];

                        if (data != "") {
                            let Time = "";
                            this.EmployeeDailyTime = data;
                            if (this.EntryType == 1) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Mon_Fri;
                                    })
                                }
                            }
                            else if (this.EntryType = 2) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Mon_Fri;
                                    })
                                }
                            }
                            else {
                                Time = "";
                            }
                            this.strDate = this.AttendanceDate;
                            this.strarrdate = this.strDate.split("/");
                            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
                            this.EntryType = 3;
                            this._AttendanceReportService.AddEmployeeAttendanceLunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.EntryType, this.HODRemarks, this.Temp, this.strDate, Time)
                                .subscribe(success => {
                                    this.indLoading = false;

                                },
                                error => {
                                    this.msg = error;
                                });
                        }
                    },
                    error => {
                        this.msg = error;
                    });
            }
        }
    }
    AttendanceRejectLunchOut(): void {
        this.EntryType = 3;
        this.strDate = this.AttendanceDate;
        this.HODRemarks = $("#RemarksLunchOut").val();

        this._AttendanceReportService.AttendanceRejectLunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.LunchOutId, this.Employee_Id, this.EntryType, this.strDate, this.HODRemarks)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    ApproveAttendanceOkLunchOut(): void {
        let Remarks = $("#ApprovalRemarksLunchOut").val();
        this._AttendanceReportService.ApproveAttendanceOkLunchOut(Global.BASE_AttendanceReport_ENDPOINT, this.LunchOutId, Remarks)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }

    //----Lunch-In Attendance Approve
    ApproveAttendanceLunchIn(): void {
        this.EntryHr = $("#EntryHourLunchIn").val();
        this.EntryMin = $("#EntryMinuteLunchIn").val();
        this.HODRemarks = $("#RemarksLunchIn").val();
        this.DRPAM_PM = $("#ddlLunchIn").val();
        this.EntryType = 4;
        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;

            if (this.LunchInId.toString().length > 0) {
                this._AttendanceReportService.ApproveAttendanceLunchIn(Global.BASE_AttendanceReport_ENDPOINT, this.LunchInId, this.HODRemarks, this.Temp)
                    .subscribe(data => {
                        this.indLoading = false;
                    },
                    error => {
                        this.msg = error;
                    })
            }
            else {
                this.strDate = this.AttendanceDate;
                this._AttendanceReportService.GetDailyEntryTime(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(data => {
                        this.indLoading = false;
                        this.EmployeeDailyTime = data;

                        let Datetime = new Date(this.strDate);
                        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var weekday = weekdays[Datetime.getDay()];

                        if (data != "") {
                            let Time = "";
                            this.EmployeeDailyTime = data;
                            if (this.EntryType == 1) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Mon_Fri;
                                    })
                                }
                            }
                            else if (this.EntryType = 2) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Mon_Fri;
                                    })
                                }
                            }
                            else {
                                Time = "";
                            }
                            this.strDate = this.AttendanceDate;
                            this.strarrdate = this.strDate.split("/");
                            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
                            this.EntryType = 4;

                            this._AttendanceReportService.AddEmployeeAttendanceLunchIn(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.EntryType, this.HODRemarks, this.Temp, this.strDate, Time)
                                .subscribe(success => {
                                    this.indLoading = false;
                                },
                                error => {
                                    this.msg = error;
                                });
                        }
                    },
                    error => {
                        this.msg = error;
                    });
            }
        }
    }
    AttendanceRejectLunchIn(): void {
        this.EntryType = 4;
        this.HODRemarks = $("#RemarksLunchIn").val();
        this._AttendanceReportService.AttendanceRejectLunchIn(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.LunchInId, this.EntryType, this.AttendanceDate, this.HODRemarks)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    ApproveAttendanceOkLunchIn(): void {
        let Remarks = $("#approvalRemarkslunchin").val();
        this._AttendanceReportService.ApproveAttendanceOkLunchIn(Global.BASE_AttendanceReport_ENDPOINT, this.LunchInId, Remarks)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }

    //-----Other In Attendance Approve
    ApproveAttendanceOther(): void {
        this.EntryHr = $("#EntryHrother").val();
        this.EntryMin = $("#EntryMinother").val();
        this.DRPAM_PM = $("#ddlotherin").val();
        this.HODRemarks = $("#Remarksother").val();
        this.EntryType = 6;

        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;

            if (this.OtherId.toString().length > 0) {
                this._AttendanceReportService.ApproveAttendanceOther(Global.BASE_AttendanceReport_ENDPOINT, this.OtherId, this.HODRemarks, this.Temp)
                    .subscribe(data => {
                        this.indLoading = false;
                    },
                    error => {
                        this.msg = error;
                    })
            }
            else {
                this._AttendanceReportService.GetEmployeeIsNotHostEmployee(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id)
                    .subscribe(data => {
                        this.indLoading = false;
                        this.EmployeeDailyTime = data;

                        let Datetime = new Date(this.strDate);
                        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var weekday = weekdays[Datetime.getDay()];

                        if (data != "") {
                            let Time = "";
                            this.EmployeeDailyTime = data;
                            if (this.EntryType == 1) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.In_Mon_Fri;
                                    })
                                }
                            }
                            else if (this.EntryType = 2) {
                                if (weekday == "Saturday") {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Sat;
                                    })
                                }
                                else {
                                    this.EmployeeDailyTime.forEach((data) => {
                                        Time = data.Out_Mon_Fri;
                                    })
                                }
                            }
                            else {
                                Time = "";
                            }
                            this.strDate = this.AttendanceDate;
                            this.strarrdate = this.strDate.split("/");
                            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
                            this.EntryType = 6;

                            this._AttendanceReportService.AddEmployeeAttendanceOtherwork(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.EntryType, this.HODRemarks, this.Temp, this.strDate, Time)
                                .subscribe(success => {
                                    this.indLoading = false;
                                },
                                error => {
                                    this.msg = error;
                                });
                        }
                    },
                    error => {
                        this.msg = error;
                    });
            }

        }
    }
    AttendanceRejectOther(): void {
        this.EntryType = 6;
        this.HODRemarks = $("#Remarksother").val();
        this._AttendanceReportService.AttendanceRejectOtherWork(Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.OtherId, this.EntryType, this.AttendanceDate, this.HODRemarks)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    ApproveAttendanceOkOtherWork(): void {
        let Remarks = $("#approvalRemarksother").val();
        this._AttendanceReportService.ApproveAttendanceOkOtherWorkIn(Global.BASE_AttendanceReport_ENDPOINT, this.OtherId, Remarks)
            .subscribe(data => {
                this.indLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    //-------Change Event--------//
    ChangeDepartData(event): void {
        this.Id = event.target.value;
    }
    ChangeEmpData(event): void {
        this.Id = event.target.value;
        let empid = event.target.value;
    }
    ChangeCompData(event): void {
        this.Id = event.target.value;
    }
    ChangeLMData(event): void {
        this.Id = event.target.value;
    }

    //-------end drop-down----------//
    LoadEmployee(): void {
        this.indLoading = true;
        this._AttendanceReportService.GetEmployee(Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(data => {
                this.AttendanceEmployee = data;
                this.indLoading = false;
            });
    }
    LoadAllEmployee(event): void {
        this.indLoading = true;
        this._AttendanceReportService.GetAllEmployee(Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(data => {
                this.AttendanceEmployee = data;
                this.indLoading = false;
            });
    }
    LoadDepartment(): void {
        this.indLoading = true;
        this._AttendanceReportService.GetDepartment(Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(data => {
                this.AttendanceDepart = data;
                this.indLoading = false;
            });
    }
    LoadCompany(): void {
        this.indLoading = true;
        this._AttendanceReportService.GetCompany(Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(data => {
                this.AttendanceCompany = data;
                this.indLoading = false;
            });
    }
    LoadLineManager(): void {
        this.indLoading = true;
        this._AttendanceReportService.GetLineManager(Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(data => {
                this.AttendanceLineManager = data;
                this.indLoading = false;
            });
    }
    LoadYear(): void {
        this.indLoading = true;
        this._AttendanceReportService.GetYear(Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(data => {
                this.AttendanceYear = data;
                this.indLoading = false;
            });
    }

    RedirectToAddEmpRecord(data): void {
        var d1 = data.Date.split('/');
        var datval = d1[1] + '/' + d1[0] + '/' + d1[2];
        this.router.navigate(['/AddEmployeeRecord'], { queryParams: { EmployeeId: data.Employee_Id, EmployeeName: data.Employee_Name, Date: datval, EntryTime: data.In_Time, Remarks: data.ImportRemarks} });
    }
    RedirectToRecordPerEmp(data): void {
        this.router.navigate(['/DailyEntryReport'], { queryParams: { EmployeeId: data.Employee_Id, EmployeeName: data.Employee_Name, Date: data.Date, EntryTime: data.In_Time, Remarks: data.ImportRemarks } });
    }
    Getselectedmon(event): void {
        this.Rdbmonth = $("#ddlmonth").val();
    }
    Getselectedyear(event): void {
        this.year = parseInt($("#ddlyear option:selected").text())
    }
    ToogleMyProfile() {
        $("#AttendanceReport").slideToggle(300);
    }
    CloseWidgetProfile() {
        $("#AttendanceReport").hide(300);
    }
    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.AttendancebindData);
        this.pager = this.pagerService.pager;
        this.pagedItems = null;
        this.pagedItems = this.pagerService.pagedItems;
    }
    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }
    ColorChange(data)
    {
        if (data.Total_W_Hr < data.TotalWorksheet_Hr)
        {
            //if ((data.TotalWorksheet_Hr - data.Total_W_Hr) )
            //{

            //}
        }
    }
    onSubmit(formData: any) {
        if ($("#LineManager").prop("checked")) {
            this.DRPData = $("#ddllm").val();
            this.name = "LineManager";
        }
        if ($("#Employee").prop("checked")) {
            this.DRPData = $("#ddlemp").val();
            this.name = "Employee";
        }
        if ($("#Department").prop("checked")) {
            this.name = "DepartMent";
            this.DRPData = 0;
        }
        if ($("#Company").prop("checked")) {
            this.DRPData = $("#ddlcompany").val();
            this.name = "Company";
        }
        if ($("#rdbDate").prop("checked")) {
            this.strDate = $("#txtfromdate").val();
            this.ToDate = $("#txttodate").val();
            this.RDBDate = "checkedDate";
            this.month = 0;
            this.year = 0;
            this.Rdbmonth = "";
        }
        if ($("#rdbmonth").prop("checked")) {
            this.Rdbmonth = "Month";
            this.RDBDate = "";
            this.month = parseInt($("#ddlmonth").val());
            this.year = parseInt($("#ddlyear option:selected").text());
            this.strDate = "";
            this.ToDate = "";
        }
        var fromdate;
        var todate;
        if (this.RDBDate == 'checkedDate')
        {
            fromdate = this.strDate;
            todate = this.ToDate;
        }
        if (this.Rdbmonth == 'Month')
        {
            if (this.month.toString().length == 1)
            {
                fromdate = (this.year).toString().concat('0').toString().concat(this.month.toString()).concat('01').toString();
                todate = (this.year).toString().concat('0').toString().concat(this.month.toString()).concat('30').toString();
            }
            else
            {
                fromdate = (this.year).toString().concat(this.month.toString()).concat('01').toString();
                todate = (this.year).toString().concat(this.month.toString()).concat('30').toString();
            }
        }

        if (formData.cbMissingEntry == true)
        {
            var strEmployeeids = '';
            if (this.name == "DepartMent") {
                this._AttendanceReportService.SelectDepartment(Global.BASE_AttendanceReport_ENDPOINT, formData.ddldept)
                    .subscribe(data => {
                        this.indLoading = false;
                        if (data != '') {
                            for (var i = 0; i < data.length; i++) {
                                strEmployeeids += data[i].id + ',';
                            }
                            strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                            this._AttendanceReportService.GetMissingEntry(Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                                .subscribe(data => {
                                    this.indLoading = false;
                                    this.AttendancebindData = data;
                                },
                                error => {
                                    this.msg = error;
                                });
                        }
                    },
                    error => {
                        this.msg = error;
                    });
            }
            else if (this.name == "Company")
            {
                this._AttendanceReportService.SelectCompany(Global.BASE_AttendanceReport_ENDPOINT, formData.ddlcompany)
                    .subscribe(data =>
                    {
                        this.indLoading = false;
                        if (data != '')
                        {
                            for (var i = 0; i < data.length; i++)
                            {
                                strEmployeeids += data[i].id + ',';
                            }
                            strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                            this._AttendanceReportService.GetMissingEntry(Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                                .subscribe(data =>
                                {
                                    this.indLoading = false;
                                    this.AttendancebindData = data;
                                },
                                error =>
                                {
                                    this.msg = error;
                                });
                        }
                    },
                    error =>
                    {
                        this.msg = error;
                    });
            }
            else if (this.name == "LineManager")
            {
                this._AttendanceReportService.SelectLineManager(Global.BASE_AttendanceReport_ENDPOINT, formData.ddllm)
                    .subscribe(data =>
                    {
                        this.indLoading = false;
                        if (data != '')
                        {
                            for (var i = 0; i < data.length; i++)
                            {
                                strEmployeeids += data[i].id + ',';
                            }
                            strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                            this._AttendanceReportService.GetMissingEntry(Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                                .subscribe(data =>
                                {
                                    this.indLoading = false;
                                    this.AttendancebindData = data;
                                },
                                error =>
                                {
                                    this.msg = error;
                                });
                        }
                    },
                    error =>
                    {
                        this.msg = error;
                    });
            }
        }
        else if (formData.cbDeduction == true)
        {
            var strEmployeeids = '';
            if (this.name == "DepartMent")
            {
                this._AttendanceReportService.SelectDepartment(Global.BASE_AttendanceReport_ENDPOINT, formData.ddldept)
                    .subscribe(data =>
                    {
                        this.indLoading = false;
                        if (data != '')
                        {
                            for (var i = 0; i < data.length; i++)
                            {
                                strEmployeeids += data[i].id + ',';
                            }
                            strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                            this._AttendanceReportService.GetDeductionDetails(Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                                .subscribe(data =>
                                {
                                    this.indLoading = false;
                                    this.AttendancebindData = data;
                                },
                                error =>
                                {
                                    this.msg = error;
                                });
                        }
                    });
            }
            else if (this.name == "Company")
            {
                this._AttendanceReportService.SelectCompany(Global.BASE_AttendanceReport_ENDPOINT, formData.ddlcompany)
                    .subscribe(data =>
                    {
                        this.indLoading = false;
                        if (data != '')
                        {
                            for (var i = 0; i < data.length; i++)
                            {
                                strEmployeeids += data[i].id + ',';
                            }
                            strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                            this._AttendanceReportService.GetDeductionDetails(Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                                .subscribe(data =>
                                {
                                    this.indLoading = false;
                                    this.AttendancebindData = data;
                                },
                                error =>
                                {
                                    this.msg = error;
                                });
                        }
                    },
                    error =>
                    {
                        this.msg = error;
                    });
            }
            else if (this.name == "LineManager")
            {
                this._AttendanceReportService.SelectLineManager(Global.BASE_AttendanceReport_ENDPOINT, formData.ddllm)
                    .subscribe(data =>
                    {
                        this.indLoading = false;
                        if (data != '')
                        {
                            for (var i = 0; i < data.length; i++)
                            {
                                strEmployeeids += data[i].id + ',';
                            }
                            strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                            this._AttendanceReportService.GetDeductionDetails(Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                                .subscribe(data =>
                                {
                                    this.indLoading = false;
                                    this.AttendancebindData = data;
                                },
                                error =>
                                {
                                    this.msg = error;
                                });
                        }
                    },
                    error =>
                    {
                        this.msg = error;
                    });
            }
        }
        else
        {
            this._AttendanceReportService.GetBindAttendanceData(Global.BASE_AttendanceReport_ENDPOINT, this.Id, this.strDate, this.ToDate, this.name, this.DRPData, this.RDBDate, this.Rdbmonth, this.month, this.year)
                .subscribe(success =>
                {
                    this.AttendancebindData = success;
                    this.JumpOnPage(1);
                },
                error => {
                    this.msg = error;
                });
        }
    }
}