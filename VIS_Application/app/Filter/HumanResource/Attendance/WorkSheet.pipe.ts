import { PipeTransform, Pipe } from '@angular/core';
import { IWorkSheet } from '../../../Model/HumanResource/Attendance/WorkSheet';

@Pipe
    ({
        name: 'WorkSheetFilter'
    })

export class WorkSheetFilterPipe implements PipeTransform {
    transform(value: IWorkSheet[], filter: string): IWorkSheet[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IWorkSheet) =>
            app.ActivityName != null && app.ActivityName.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
