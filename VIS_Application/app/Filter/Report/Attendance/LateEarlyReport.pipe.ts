import { PipeTransform, Pipe } from '@angular/core';
import { ILateEarlyReport } from '../../../Model/Report/Attendance/LateEarlyReport';

@Pipe
    ({
        name: 'lateearlyreportFilter'
    })

export class LateEarlyReportFilterPipe implements PipeTransform
{
    transform(value: ILateEarlyReport[], filter: string): ILateEarlyReport[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ILateEarlyReport) =>
            app.Employees_Name != null && app.Employees_Name.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
