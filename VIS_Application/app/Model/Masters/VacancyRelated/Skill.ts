export interface ISkill
{
    Id: number;
    SkillName: string;
    Description: string;
    Level: any[];
    SkillGroupID: number;
    SkillGroupName: string;
    RatingGroup: string;
    Status: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    UpdatedOn: Date;
    UpdatedBy: string;
    IsActive: boolean;
}

export interface ISkillViewModel
{
    Id: number;
    SkillName: string;
    Description: string;
    Level: string;
    SkillGroupID: number;
    SkillGroupName: string;
    RatingGroup: string;
    Status: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    UpdatedOn: Date;
    UpdatedBy: string;
    IsActive: boolean;
}

export interface ISkillList
{
    id: number;
    name: string;
}