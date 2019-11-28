import { PipeTransform, Pipe } from '@angular/core';
import { IEmployeeFeedback } from '../../../Model/HumanResource/Attendance/EmployeeFeedback';

@Pipe
    ({
        name: 'EmployeeFeedbackFilter'
    })

export class EmployeeFeedbackFilterPipe implements PipeTransform {
    transform(value: IEmployeeFeedback[], filter: string): IEmployeeFeedback[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IEmployeeFeedback) =>
            app.Remarks != null && app.Remarks.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.EmployeeName != null && app.EmployeeName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.SenderName != null && app.SenderName.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }




}
