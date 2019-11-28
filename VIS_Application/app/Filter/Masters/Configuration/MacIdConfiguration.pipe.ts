import { PipeTransform, Pipe } from '@angular/core';
import { IMacIdConfiguration } from '../../../Model/Masters/Configuration/MacIdConfiguration';

@Pipe
    ({
        name: 'macidconfigurationFilter'
    })

export class MacIdConfigurationFilterPipe implements PipeTransform
{
    transform(value: IMacIdConfiguration[], filter: string): IMacIdConfiguration[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IMacIdConfiguration) =>
            app.MacID != null && app.MacID.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.IPAddress != null && app.IPAddress.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Version != null && app.Version.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }
}
