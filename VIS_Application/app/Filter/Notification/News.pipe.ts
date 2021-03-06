﻿import { PipeTransform, Pipe } from '@angular/core';
import { INews } from '../../Model/Notification/News';

@Pipe({
    name: 'NewsFilter'
})

export class NewsFilterPipe implements PipeTransform {

    transform(value: INews[], filter: string): INews[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(
            (app: INews) =>
                app.News_Name != null && app.News_Name.toLocaleLowerCase().indexOf(filter) != -1
                || app.Description != null && app.Description.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}

/*
1. In the first line, we are importing the PipeTransform and Pipe interfaces that we are implementing to achieve filtering functionality.

2. In the second line, we are importing the IContactMaster interface that we created in first part to hold the list of Newss.
   Over here, we are also using it to hold the list of Newss that is the source data for filtering.

3. In next line, we are specifying the pipe selector/name NewsFilter through which we will use the pipe (you will find in future steps, how).

4. Next, we are creating the NewsFilterPipe class that is implementing the PipeTransform interface (implementing interface means providing the body to all methods mentioned in the interface).

5. Right click on PipeTransform and select the option Go To Definition:

6. You will be landed to the pipe_transform_d.ts file where you will find the nice brief description how to use the pipe with an example and transform method that we must need to implement:

7. So let’s go back to News.pipe.ts where can see we have transform method with first argument as IContactMaster array and second is named as filter that is the input string to be searched in the IContactMaster array.

8. In transform method, the first line is only to check if the filter is not null.

9. The next statement is the actual implementation of search, if you are C# developer,
   you can compare it to the LINQ to Object. We are calling Array’s filter method, checking through conditional operator that if any of IContactMaster member is matching with News input search string and if YES, returning the filtered result. toLocaleLowerCase method is converting string to lower case, to read more about it, click here. If there is no matching record in User list, we are returning the all rows.Now that we have our filter ready, let’s add it to
*/