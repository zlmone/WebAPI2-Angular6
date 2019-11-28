export interface IAddRFQResponse
{
         RFQ_InitialID: number;
         IsEstimateReady: boolean;
         IsChangeToAction: boolean;
         Hours: number;
         Timeline: number;
         Timeline_Unit: string;
         Leadtime: number;
         Leadtime_Unit: string;
         Technology: string;
         TechnologyIdList: number;
         Description: string;
         ActionRequestedBy: number;
         ActionByDate: Date;
         CurruntDate: Date;
        hdnEmployee: string;
        EmployeeName: string;
        hdnEmployeeId: number;
        EmpId : number
       
         
}
export interface IActionTakenBy
{
        EmpId: number;
        Employee_Name: string;
}
export interface IHiddenValue
{
       hdnEmployeeId : number;
       hdnEmployee : string;
}
export interface IForRFQId {
    RFQId: number;
}
