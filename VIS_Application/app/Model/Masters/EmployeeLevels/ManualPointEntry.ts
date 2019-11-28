export interface IManualPointEntry {
    Id: number;
    GroupID: number;
    EmpName: string;
    Criteria: string;
    Points: number;
    Point: number;
    Month: Date;
    Remarks: string;
    EntityMessage: string;
    ForDate: Date;
    Type: string;
    Category: string;
    CategoryId: number;
    IsPerformanceBadge: boolean;
    CriteriaId: number;

    CreatedOn: Date;
    CreatedBy: number;
    UpdatedOn: Date;
    UpdatedBy: number;
    IsActive: boolean;
}
export interface IEmployeeTag {
    id: number;
    name: string;
}