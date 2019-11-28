import { PipeTransform, Pipe } from '@angular/core';
import { ProspectClient } from '../../../app/Model/RFQ/RFQEstimateListing';

@Pipe({
    name: 'prospectclientFilter'
})

export class ProspectClientFilterPipe implements PipeTransform {

    transform(value: ProspectClient[], filter: string): ProspectClient[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ProspectClient) =>
            app.CompanyName != null && app.CompanyName.toLocaleLowerCase().indexOf(filter) != -1
            || app.Country != null && app.Country.toLocaleLowerCase().indexOf(filter) != -1
           

           
            //|| app.ProspectId != null && app.ProspectId.toLocaleLowerCase().indexOf(filter) != -1

        ) : value;

    }
}

