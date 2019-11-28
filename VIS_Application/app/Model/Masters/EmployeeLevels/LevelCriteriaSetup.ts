export interface ILevelCriteriaSetup
{
    Id: number;
    IsAutomatic: boolean;
    IsRange: boolean;
    IsRepeated: boolean;
    IsOnce: boolean;
    IsPerformanceBased: boolean;
    IsEnable: boolean;
    IsPercentage: boolean;
    IsProgressive:boolean
   // ArbManualType: string;

    //rbEnabledYes: boolean;
    //rbEnabledNo: boolean;
    //rbProgressiveYes: boolean;
    //rbProgressiveNo: boolean;
    //rbCSYes: boolean;
    //rbCSNo: boolean;

    ArbSubType: string;
    ArbCriteriaType: string;
    ArbEnable: string;
    ArbIsProgressive: string;
    ArbCascading: string;
  //ArbMPerBadge: string

    CriteriaID: number;
    Criteria: string;
    Category: string;
    AIsRange: string;
    FromLimit: number;
    ToLimit: number;
    AIsRepeated: string;
    Units: number;
    AIsOnce: string;
    dtFromDate: Date;
    dtToDate: Date;
    
   // IsMPerformanceBadge: boolean;
   
    Point: number;
    Active: boolean;
  
    ProgressiveDays: number;
    ProgressivePoints: number;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: number;
    UpdatedOn: Date;
    UpdatedBy: number;

    Name: string;
    CriteriaType: string;
    CalculatedOn: string;
    SelectPoint: number;
    EntityMessage: string;

    //ArbAutomatic: string;
    //ArbManual: string;
    //rbRange: boolean;
    //rbRepeated: boolean;
    //rbOnce: boolean;
   // rbPerformanceBasedType: boolean;
    ArbManualType: string;
   
    //rbEnabledYes: boolean;
    //rbEnabledNo: boolean;
    //rbProgressiveYes: boolean;
    //rbProgressiveNo: boolean;
    //rbCSYes: boolean;
    //rbCSNo: boolean;

}
export interface ICriteriaDLL
{
    CriteriaID: number;
    CriteriaName: string;
}
export interface ICategoryDLL
{
    Id: number;
    Category: string;
}
export interface ICalculatedOnDLL
{
    Id: number;
    CalculatedOn: string;
}
