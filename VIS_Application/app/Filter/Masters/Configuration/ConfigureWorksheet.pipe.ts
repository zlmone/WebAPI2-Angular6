import { PipeTransform, Pipe } from '@angular/core';
import { IConfigureWorkSheet } from '../../../Model/Masters/Configuration/ConfigureWorksheet';

@Pipe
    ({
        name: 'configureworksheetFilter'
    })

export class ConfigureWorkSheetFilterPipe implements PipeTransform
{
    transform(value: IConfigureWorkSheet[], filter: string): IConfigureWorkSheet[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IConfigureWorkSheet) =>
            app.Fromm != null && app.Fromm.toLocaleString().indexOf(filter) != -1
        ) : value;

    }
}
