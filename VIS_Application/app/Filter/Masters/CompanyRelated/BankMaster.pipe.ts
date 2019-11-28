import { PipeTransform, Pipe } from '@angular/core';
import { IBankMaster } from '../../../Model/Masters/CompanyRelated/BankMaster';

@Pipe
    ({
    name: 'bankFilter'
})

export class BankMasterFilterPipe implements PipeTransform
{
    transform(value: IBankMaster[], filter: string): IBankMaster[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IBankMaster) =>
            app.BankName != null && app.BankName.toLocaleLowerCase().indexOf(filter) != -1
            || app.BranchName != null && app.BranchName.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
