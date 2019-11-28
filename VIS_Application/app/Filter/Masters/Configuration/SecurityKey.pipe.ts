import { PipeTransform, Pipe } from '@angular/core';
import { ISecurityKey } from '../../../Model/Masters/Configuration/SecurityKey';

@Pipe
    ({
        name: 'securitykeyFilter'
    })

export class SecurityKeyFilterPipe implements PipeTransform
{
    transform(value: ISecurityKey[], filter: string): ISecurityKey[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ISecurityKey) =>
            app.Key1 != null && app.Key1.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
