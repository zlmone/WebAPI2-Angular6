import { PipeTransform, Pipe } from '@angular/core';
import { IRFQ } from '../../Model/RFQ/RFQEstimateListing';

@Pipe
    ({
        name: 'RFQFilter'
    })

export class RFQFilterPipe implements PipeTransform {
    transform(value: IRFQ[], filter: string): IRFQ[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IRFQ) =>
            app.Status != null && app.Status.toLocaleLowerCase().indexOf(filter) != -1
            || app.EstimateBy != null && app.EstimateBy.toLocaleLowerCase().indexOf(filter) != -1
            || app.Title != null && app.Title.toLocaleLowerCase().indexOf(filter) != -1
            || app.InitiatedBy != null && app.InitiatedBy.toLocaleLowerCase().indexOf(filter) != -1
            || app.LastResponseBy != null && app.LastResponseBy.toLocaleLowerCase().indexOf(filter) != -1
            || app.Status != null && app.Status.toLocaleLowerCase().indexOf(filter) != -1
            || app.rfqStatus != null && app.rfqStatus.toLocaleLowerCase().indexOf(filter) != -1
            || app.OtherComments != null && app.OtherComments.toLocaleLowerCase().indexOf(filter) != -1
            || app.ActionRequestedBy != null && app.ActionRequestedBy.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
