import { PipeTransform, Pipe } from '@angular/core';
import { IOfficialWorkReportBind } from '../../../Model/Report/Attendance/OfficialWorkReport';

@Pipe
    ({
        name: 'officialworkreportFilter'
    })

export class OfficialWorkReporFilterPipe implements PipeTransform
{
    transform(value: IOfficialWorkReportBind[], filter: string): IOfficialWorkReportBind[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IOfficialWorkReportBind) =>
            app.Employee_Name != null && app.Employee_Name.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Date != null && app.Date.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.OutTime != null && app.OutTime.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.InTime != null && app.InTime.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Total_Time != null && app.Total_Time.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Out_Remark != null && app.OutTime.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.In_Remark != null && app.In_Remark.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Line_Manager != null && app.Line_Manager.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.ApprovalSentTo != null && app.ApprovalSentTo.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Status != null && app.Status.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.ActionBy != null && app.ActionBy.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Action_DateTime != null && app.Action_DateTime.toString().indexOf(filter) != -1 
        ) : value;

    }
}
