export interface IMyTeam {
    id: number;
    mode: string;
    UserId: number;
    Name: string;
    NumberOfSkill: number;
    NumberToBeApproved: number;
    SkillName: string;
}
export interface ILinemanager {
    mode: string;
    SkillID: number;
    UserId: number;
    SkillName: string;
    SkillGroup: string;
    SkillText: number;
    leavel: string;
    IsApproved: boolean;
    Status: string;
}
export interface ISkillLevel {
    SkillID: number;
    LevelText: string;
    Levelorder: number;
   
}