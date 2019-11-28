import { PipeTransform, Pipe } from '@angular/core';
import { IHomePageImage } from '../../../Model/Masters/CompanyRelated/HomePageImage';

@Pipe
    ({
        name: 'homepageimageFilter'
    })

export class HomePageImageFilterPipe implements PipeTransform
{
    transform(value: IHomePageImage[], filter: string): IHomePageImage[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IHomePageImage) =>
            app.ImagePath != null && app.ImagePath.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}
