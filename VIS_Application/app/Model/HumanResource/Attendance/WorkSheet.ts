export interface IWorkSheet {
    ActivityId: number;
    ActivityName: string;
    SubActivityId: number;
    SubActivityName: string;
    Date: string;
    FillDate: string;
    UserId: number;
    ProjectID: number;
    ProjectName: string;
    TaskName: string;
    TaskId: number;
    Description: string;
    Hours: string;
    WorkSheetID: number;

}
export interface IProject {

    Date: string;
    UserId: number;
    ProjectID: number;
    ProjectName: string;

}