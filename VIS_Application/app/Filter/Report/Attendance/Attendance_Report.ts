import { PipeTransform, Pipe } from '@angular/core';
import { ICalTotalAttendance } from '../../../Model/Report/Attendance/AttendanceReport';

@Pipe
    ({
        name:'AttendanceReportFilter'
    })

export class AttendanceReportFilterPipe implements PipeTransform
{
    transform(value: ICalTotalAttendance[], filter: string): ICalTotalAttendance[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ICalTotalAttendance) =>
            app.Employee_Name != null && app.Employee_Name.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Date != null && app.Date.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;
    }
}