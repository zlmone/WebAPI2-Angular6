import { IMyProfile } from '../Dashboard/myprofile';
import { IMySkills } from '../Dashboard/myskills';
import { IMyAllocation } from '../Dashboard/myallocation';
import { IMyTeam } from '../Dashboard/myteam';
import { IMyLeaveDetails } from '../Dashboard/myworksheet';
import { INwdHistory } from '../Dashboard/myworksheet';
import { ICalTotalAttendance } from '../Dashboard/myworksheet';
import { IActualEntryTimeAndGraceForPunchInId } from '../Dashboard/myworksheet';
import { IEmpLeaveLedgerForDate } from '../Dashboard/myworksheet';
import { ILeaveDetailsByDate } from '../Dashboard/myworksheet';
import { IEmpHolidayListForDate } from '../Dashboard/myworksheet';
import { IHolidayForDate } from '../Dashboard/myworksheet';
import { IMyAlerts } from '../Dashboard/myalerts';
import { ILevels } from '../Dashboard/Levels';
import { ILegend } from '../Dashboard/Legend';
import { IPoints } from '../Dashboard/Points';
import { IMyAttendance } from '../Dashboard/MyAttendance';
export class IDashboard {
    UserProfileData: IMyProfile;
    UserSkillData: IMySkills[];
    UserAllocationData: IMyAllocation[];
    UserTeamData: IMyTeam[];
    UserAlertData: IMyAlerts[];
    WorksheetLeaveDeta: IMyLeaveDetails;
    WorksheetNwdHistoryData: INwdHistory[];
    WorksheetCalTotalAttendanceData: ICalTotalAttendance;
    WorksheetGetActualEntryTimeAndGraceData: IActualEntryTimeAndGraceForPunchInId;
    WorksheetGetEmpLeaveLedgerData: IEmpLeaveLedgerForDate[];
    WorksheetGetLeaveDetailsByDateData: ILeaveDetailsByDate[];
    WorksheetGetEmpHolidayListData: IEmpHolidayListForDate[];
    WorksheetGetHolidayForDateData: IHolidayForDate[];

    ProfileGetLevelsListData: ILevels[];
    ProfileGetPointsLegendData: ILegend[];
    ProfileGetPointsDeta: IPoints[];
    MyAttendanceData: IMyAttendance[];

}