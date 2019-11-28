export interface IEmployee
{
    Id: number;
    Employee_Name: string;
}

export interface IYear
{
    CurrentYear: string;
}


export interface IParameterModel
{
        EmployeeId: number;
        FromDate: Date;
        ToDate: Date;
        ReportSort: string;
        Sort: number;
        UserId: number;
        UserType: string;

        FromMonth: string;
        FromYear: string;
        ToMonth: string;
        ToYear: string;
        MonthWise: boolean;

}


export interface IOfficialWorkReportBind
{
        Employee_Name: string;
        Date: string;
        OutTime: string;
        InTime: string;
        Total_Time: string;
        Out_Remark: string;
        In_Remark: string;
        Line_Manager: string;
        ApprovalSentTo: string;
        Status: string;
        ActionBy: string;
        Action_DateTime: string;
}

