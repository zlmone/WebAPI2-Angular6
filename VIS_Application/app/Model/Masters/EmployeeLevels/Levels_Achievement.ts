export interface ILevels_Achievement
{
    Id: number;
    Range: number;
    AchievementID: number;//For select Operation
    AchievementName: string;
    SetUpID: number;
    CriteriaId: number;
    CriteriaName: string;
    IsCriteria:boolean
    AndAbove: boolean;
    Description: string;
    Help: string;
    Calculated: string;
    CalculatedIn:string;    
    AchievedIn: number;
    Points: number;
    Image: string;
    Active: boolean;
    SelectActive: string;
    IsActive: boolean;
    LevelSetupId: number;
    CreatedBy: number;
    CreatedOn: Date;
    UpdatedBy: number;
    UpdatedOn: Date;
    EntityMessage: string;
   
}
export interface IForIsCriteria
{
    Id: number;
    Range: string;
}