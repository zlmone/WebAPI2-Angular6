export interface ICurrencyHistory
{
    CompanyId: number;
    Id: number;
    Currency_Id: number;
    Default_Exch_Rate: number;
    Current_Exch_Rate: number;
    Month_Entered: number;
    Year_Entered: number;
    Date_Entered: Date;
    FromDate: Date;
    ToDate: Date;
    CreatedOn: Date;
    CreatedBy: string;
    UpdatedOn: Date;
    UpdatedBy: string
    IsActive: boolean;

}