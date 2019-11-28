import { PipeTransform, Pipe } from '@angular/core';
import { IMyTeam } from '../../../Model/HumanResource/Attendance/MyTeam';

@Pipe
    ({
        name: 'MyTeamFilter'
    })

export class MyTeamFilterPipe implements PipeTransform {
    transform(value: IMyTeam[], filter: string): IMyTeam[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IMyTeam) =>
            app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1 
        

        ) : value;

    }




}
