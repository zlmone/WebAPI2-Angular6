export interface IFinancialYear
{
    Id: number;
    FromMonth: string;
    ToMonth: string;
    CurrentYear: string;
    Nextyear: string;
    FinancialYear: string;

    CreatedOn: Date;
    CreatedBy: number;
    UpdatedOn: Date;
    UpdatedBy: number;
    IsActive: boolean;
    EntityMessage: string;
}