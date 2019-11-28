export interface IPosition
{
    Id: number;
    PositionName: string;
    Remarks: string;
    Status: boolean;
    SkillName: string;
    SkillsId: string;
    CreatedOn: Date;
    CreatedBy: string;
    UpdatedOn: Date;
    UpdatedBy: string;
    IsActive: boolean;
    SkillId: number[];

}
export interface ISkillListViewModel
{
    PositionId: number;
    SkillId: number;
    SkillName: string;
}


