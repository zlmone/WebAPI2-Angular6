import { PipeTransform, Pipe } from '@angular/core';
import { IEducationType } from '../../../Model/Masters/CompanyRelated/EducationType';

@Pipe
    ({
        name: 'EducationTypeFilter'
    })

export class EducationTypeFilterPipe implements PipeTransform {
    transform(value: IEducationType[], filter: string): IEducationType[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IEducationType) =>
            app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.FullName != null && app.FullName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Type != null && app.Type.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
