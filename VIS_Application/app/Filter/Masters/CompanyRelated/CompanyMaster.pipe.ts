import { PipeTransform, Pipe } from '@angular/core';
import { ICompanyMaster } from '../../../Model/Masters/CompanyRelated/CompanyMaster';

@Pipe({
    name: 'CompanyMasterFilter'
})

export class CompanyMasterFilterPipe implements PipeTransform {

    transform(value: ICompanyMaster[], filter: string): ICompanyMaster[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ICompanyMaster) =>
            app.CompanyName != null && app.CompanyName.toLocaleLowerCase().indexOf(filter) != -1
            || app.City != null && app.City.toLocaleLowerCase().indexOf(filter) != -1
            || app.State != null && app.State.toLocaleLowerCase().indexOf(filter) != -1
            || app.Country != null && app.Country.toLocaleLowerCase().indexOf(filter) != -1
            || app.ContactNo != null && app.ContactNo.toLocaleLowerCase().indexOf(filter) != -1
            || app.E_mail != null && app.E_mail.toLocaleLowerCase().indexOf(filter) != -1
            || app.CompanyURL != null && app.CompanyURL.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    }
}

/*
1. In the first line, we are importing the PipeTransform and Pipe interfaces that we are implementing to achieve filtering functionality.

2. In the second line, we are importing the ICompanyMaster interface that we created in first part to hold the list of currencys.
   Over here, we are also using it to hold the list of currencys that is the source data for filtering.

3. In next line, we are specifying the pipe selector/name currencyFilter through which we will use the pipe (you will find in future steps, how).

4. Next, we are creating the CompanyMasterFilterPipe class that is implementing the PipeTransform interface (implementing interface means providing the body to all methods mentioned in the interface).

5. Right click on PipeTransform and select the option Go To Definition:

6. You will be landed to the pipe_transform_d.ts file where you will find the nice brief description how to use the pipe with an example and transform method that we must need to implement:

7. So let’s go back to currency.pipe.ts where can see we have transform method with first argument as ICompanyMaster array and second is named as filter that is the input string to be searched in the ICompanyMaster array.

8. In transform method, the first line is only to check if the filter is not null.

9. The next statement is the actual implementation of search, if you are C# developer,
   you can compare it to the LINQ to Object. We are calling Array’s filter method, checking through conditional operator that if any of ICompanyMaster member (FirstName, LastName or Gender) is matching with currency input search string and if YES, returning the filtered result. toLocaleLowerCase method is converting string to lower case, to read more about it, click here. If there is no matching record in User list, we are returning the all rows.Now that we have our filter ready, let’s add it to
*/