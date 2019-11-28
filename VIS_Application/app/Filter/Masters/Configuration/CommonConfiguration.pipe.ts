import { PipeTransform, Pipe } from '@angular/core';
import { ICommonConfiguration } from '../../../Model/Masters/Configuration/CommonConfiguration';

@Pipe
    ({
        name: 'commonconfigurationFilter'
    })

export class CommonConfigurationFilterPipe implements PipeTransform
{
    transform(value: ICommonConfiguration[], filter: string): ICommonConfiguration[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ICommonConfiguration) =>
            app.TDSMenuHideOrShow != null && app.TDSMenuHideOrShow.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }
}
