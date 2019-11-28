import { PipeTransform, Pipe } from '@angular/core';
import { ISkill } from '../../../Model/Masters/VacancyRelated/Skill';

@Pipe
    ({
        name: 'skillFilter'
    })

export class SkillFilterPipe implements PipeTransform {
    transform(value: ISkill[], filter: string): ISkill[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ISkill) =>
            app.SkillName != null && app.SkillName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Description != null && app.Description.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
