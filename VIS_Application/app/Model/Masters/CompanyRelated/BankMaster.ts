export interface IBankMaster
{
    Id: number;
    CompanyId: number;
    CurrencyId: number
    BankAlias: string;
    BankName: string;
    BranchName: string;
    BankAddress: string;
    BankDetail: string;
    AccountNumber: string;
    Status: boolean;
    IsActive: boolean;
    CreatedOn: Date;
    UpdatedOn: Date;
    CreatedBy: string;
    UpdatedBy: string;
    EntityMessage: string;
}

export interface ICompany
{
    Id: number;
    CompanyName: string;
}

export interface ICurrency
{
    Id: number;
    Short_Name: string;
}