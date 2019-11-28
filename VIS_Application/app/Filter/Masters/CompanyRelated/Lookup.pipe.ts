import { PipeTransform, Pipe } from '@angular/core';
import { ILookup } from '../../../Model/Masters/CompanyRelated/Lookup';

@Pipe
    ({
        name: 'lookupFilter'
    })

export class LookupFilterPipe implements PipeTransform
{
    transform(value: ILookup[], filter: string): ILookup[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ILookup) =>
            app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1 
            || app.FullName != null && app.FullName.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }
}
