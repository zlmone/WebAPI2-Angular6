export interface IUserType
{
    UserType: boolean;
}

export interface IUserRoleById
{
    employeeID: number;
    roleName: string;
}

export interface IAllSurveyDetails
{
    SurveyId: number;
    SurveyName: string;
    SurveyDesc: string;
    TotalPoints: number;
    IsTimeBased: boolean;
    SurveyType: string;
    SurveyTime: string;
    SuggestedBy: number;
    ExpiryDate: Date;
}

export interface ISurveyType
{
    Id: number;
    Name: string;
}
export interface IUserForOwnerSelection
{
    Id: number;
    EmployeeName: string;
}