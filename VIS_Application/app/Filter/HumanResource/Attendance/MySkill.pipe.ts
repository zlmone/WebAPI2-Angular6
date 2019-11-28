import { PipeTransform, Pipe } from '@angular/core';
import { IMySkill } from '../../../Model/HumanResource/Attendance/MySkill';

@Pipe
    ({
        name: 'MySkillFilter'
    })

export class MySkillFilterPipe implements PipeTransform {
    transform(value: IMySkill[], filter: string): IMySkill[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IMySkill) =>
            app.SkillName != null && app.SkillName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.SkillGroup != null && app.SkillGroup.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }


    

}
