import { PipeTransform, Pipe } from '@angular/core';
import { IConfigureTicket } from '../../../Model/Masters/Configuration/ConfigureTicket';

@Pipe
    ({
        name: 'configureticketFilter'
    })

export class ConfigureTicketFilterPipe implements PipeTransform
{
    transform(value: IConfigureTicket[], filter: string): IConfigureTicket[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IConfigureTicket) =>
            app.Department_Name != null && app.Department_Name.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }
}
