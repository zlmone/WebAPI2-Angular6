import { PipeTransform, Pipe } from '@angular/core';
import { ILeaveType } from '../../../Model/Masters/CompanyRelated/LeaveType';

@Pipe
    ({
        name: 'LeaveTypeFilter'
    })

export class LeaveTypeFilterPipe implements PipeTransform {
    transform(value: ILeaveType[], filter: string): ILeaveType[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ILeaveType) =>
            app.LeaveTypeName != null && app.LeaveTypeName.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
