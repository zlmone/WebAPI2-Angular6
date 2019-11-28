import { PipeTransform, Pipe } from '@angular/core';
import { IGroupName } from '../../../Model/Masters/CompanyRelated/GroupName';

@Pipe
    ({
        name: 'GroupNameFilter'
    })

export class GroupNameFilterPipe implements PipeTransform {
    transform(value: IGroupName[], filter: string): IGroupName[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IGroupName) =>
            app.GroupNames != null && app.GroupNames.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
