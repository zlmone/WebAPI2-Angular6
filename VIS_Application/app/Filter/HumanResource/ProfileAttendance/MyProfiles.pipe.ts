
import { PipeTransform, Pipe } from '@angular/core';
import { IMyProfiles } from '../../../Model/HumanResource/ProfileAttendance/MyProfiles';

@Pipe
    ({
        name: 'MyProfilesFilter'
    })

export class MyProfilesFilterPipe implements PipeTransform {
    transform(value: IMyProfiles[], filter: string): IMyProfiles[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IMyProfiles) =>
            app.CompanyName != null && app.CompanyName.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
