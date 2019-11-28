import { PipeTransform, Pipe } from '@angular/core';
import { IRatingType } from '../../../Model/Masters/VacancyRelated/RatingType';

@Pipe
    ({
        name: 'RatingtypeFilter'
    })

export class RatingTypeFilterPipe implements PipeTransform {
    transform(value: IRatingType[], filter: string): IRatingType[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IRatingType) =>
            app.TypeName != null && app.TypeName.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
