import { PipeTransform, Pipe } from '@angular/core';
import { ILevels } from '../../../Model/Masters/EmployeeLevels/levels';

@Pipe({
    name: 'levelsFilter'
})

export class LevelsFilterPipe implements PipeTransform {

    transform(value: ILevels[], filter: string): ILevels[] {
            return filter ? value.filter((app: ILevels) =>
                app.LevelName != null && app.LevelName.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }
}
