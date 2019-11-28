export interface ICommonConfiguration
{
    Id: number;
    URLLocal: string;
    URLLive: string;
    MinimumLunchBreak: number;
    MinimumOtherBreak: number;
    MouseMinutes: number;
    PlusMouseMinutes: number;
    MouseTracking: number;
    ProductivityTracker: number;
    WorksheetPrompt: number;
    MinimumPunchoutInterval: number;
    InTimeMondayToFridayHH: number;
    InTimeMondayToFridayMM: number;
    OutTimeMondayToFridayHH: number;
    OutTimeMondayToFridayMM: number;
    InTimeSaturdayHH: number;
    InTimeSaturdayMM: number;
    OutTimeSaturdayHH: number;
    OutTimeSaturdayMM: number;
    ShiftDurationHH: number;
    ShiftDurationMM: number;
    TDSMenuHideOrShow:string;
    RoleMenu: string;
    CreatedOn: Date;
    CreatedBy: string;
    UpdatedOn: Date;
    UpdatedBy: string
    IsActive: boolean;

}