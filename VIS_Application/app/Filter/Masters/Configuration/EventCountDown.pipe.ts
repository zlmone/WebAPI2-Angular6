import { PipeTransform, Pipe } from '@angular/core';
import { IEventCountDown } from '../../../Model/Masters/Configuration/EventCountDown';

@Pipe
    ({
        name: 'eventcountdownFilter'
    })

export class EventCountDownFilterPipe implements PipeTransform
{
    transform(value: IEventCountDown[], filter: string): IEventCountDown[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IEventCountDown) =>
            app.EventName != null && app.EventName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.CountDownText != null && app.CountDownText.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
