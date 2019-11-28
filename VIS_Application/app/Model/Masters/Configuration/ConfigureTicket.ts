export interface IConfigureTicket
{

    Parent_Id: number;
    User_Id: number;
    Department_Name: string;
    Position_Id: number;
    IsActiveSuggestion: boolean;
    SuggestionAlie: string;
    Organization_Id: number;
    Suggestion_Dep_Emp_Id: number;
    Flag: boolean;


    Id: number;
    CreatedOn: Date;
    CreatedBy: string;
    UpdatedOn: Date;
    UpdatedBy: string
    IsActive: boolean;

   
    Employee_Name: string;
        
    Employee_Id: number;

}