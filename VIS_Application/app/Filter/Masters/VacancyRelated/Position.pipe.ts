import { PipeTransform, Pipe } from '@angular/core';
import { IPosition } from '../../../Model/Masters/VacancyRelated/Position';

@Pipe
    ({
        name: 'positionFilter'
    })

export class PositionFilterPipe implements PipeTransform
{
    transform(value: IPosition[], filter: string): IPosition[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IPosition) =>
            app.PositionName != null && app.PositionName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Remarks != null && app.Remarks.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
