export interface ILevelConfiguration
{
        Id: number;
    Period: number;
    PeriodName: string;
    StartDate: Date;
    EndDate: Date;
    Active: boolean
    IsCurrentPeriod: boolean;
    CreatedOn: Date;
    CreatedBy: number;
    UpdatedOn: Date;
    UpdatedBy: number;
    IsActive: boolean;

    StartYear: number;
    StartMonth: number;
}