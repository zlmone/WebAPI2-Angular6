import { PipeTransform, Pipe } from '@angular/core';
import { IUserRole } from '../../../Model/Masters/CompanyRelated/UserRole';

@Pipe
    ({
        name: 'UserRoleFilter'
    })

export class UserRoleFilterPipe implements PipeTransform {
    transform(value: IUserRole[], filter: string): IUserRole[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IUserRole) =>
            app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.FullName != null && app.FullName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Type != null && app.Type.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }
}
