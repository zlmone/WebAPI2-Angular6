import { PipeTransform, Pipe } from '@angular/core';
import { ISkillGroup } from '../../../Model/Masters/VacancyRelated/SkillGroup';

@Pipe
    ({
        name: 'skillgroupFilter'
    })

export class SkillGroupFilterPipe implements PipeTransform
{
    transform(value: ISkillGroup[], filter: string): ISkillGroup[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ISkillGroup) =>
            app.SkillGroupName != null && app.SkillGroupName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.RatingGroup != null && app.RatingGroup.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }
}
