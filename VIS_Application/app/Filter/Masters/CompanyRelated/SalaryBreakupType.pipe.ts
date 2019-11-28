import { PipeTransform, Pipe } from '@angular/core';
import { ISalaryBreakupType } from '../../../Model/Masters/CompanyRelated/SalaryBreakupType';

@Pipe
    ({
        name: 'SalaryBreakupTypeFilter'
    })

export class SalaryBreakupTypeFilterPipe implements PipeTransform {
    transform(value: ISalaryBreakupType[], filter: string): ISalaryBreakupType[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ISalaryBreakupType) =>
            app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.FullName != null && app.FullName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Type != null && app.Type.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
