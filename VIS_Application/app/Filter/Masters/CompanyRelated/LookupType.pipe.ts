import { PipeTransform, Pipe } from '@angular/core';
import { ILookupType } from '../../../Model/Masters/CompanyRelated/LookupType';

@Pipe
    ({
        name: 'lookuptypeFilter'
    })

export class LookupTypeFilterPipe implements PipeTransform
{
    transform(value: ILookupType[], filter: string): ILookupType[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ILookupType) =>
            app.TypeName != null && app.TypeName.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
