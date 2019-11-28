import { PipeTransform, Pipe } from '@angular/core';
import { IEmployeeList } from '../../../Model/HumanResource/EmployeeManagement/EmployeeList';

@Pipe
    ({
        name: 'EmployeeListFilter'
    })

export class EmployeeListFilterPipe implements PipeTransform {
    transform(value: IEmployeeList[], filter: string): IEmployeeList[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IEmployeeList) =>
            app.EmployeeCode != null && app.EmployeeCode.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.CompanyName != null && app.CompanyName.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Employee_Name != null && app.Employee_Name.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Email != null && app.Email.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.Department != null && app.Department.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.TotalExp != null && app.TotalExp.toLocaleLowerCase().indexOf(filter) != -1 ||
            app.SL_CL != null && app.SL_CL.toLocaleLowerCase().indexOf(filter) != -1 
        ) : value;

    }




}
