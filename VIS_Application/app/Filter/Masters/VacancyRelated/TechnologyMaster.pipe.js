"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TechnologyMasterFilterPipe = (function () {
    function TechnologyMasterFilterPipe() {
    }
    TechnologyMasterFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.TechnologyName != null && app.TechnologyName.toLocaleLowerCase().indexOf(filter) != -1
                || app.Remarks != null && app.Remarks.toLocaleLowerCase().indexOf(filter) != -1;
        }
        //|| app.Major != null && app.Major.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    };
    TechnologyMasterFilterPipe = __decorate([
        core_1.Pipe({
            name: 'TechnologyMasterFilter'
        })
    ], TechnologyMasterFilterPipe);
    return TechnologyMasterFilterPipe;
}());
exports.TechnologyMasterFilterPipe = TechnologyMasterFilterPipe;
/*
1. In the first line, we are importing the PipeTransform and Pipe interfaces that we are implementing to achieve filtering functionality.

2. In the second line, we are importing the ITechnologyMaster interface that we created in first part to hold the list of technologyMasters.
   Over here, we are also using it to hold the list of technologyMasters that is the source data for filtering.

3. In next line, we are specifying the pipe selector/name technologyMasterFilter through which we will use the pipe (you will find in future steps, how).

4. Next, we are creating the TechnologyMasterFilterPipe class that is implementing the PipeTransform interface (implementing interface means providing the body to all methods mentioned in the interface).

5. Right click on PipeTransform and select the option Go To Definition:

6. You will be landed to the pipe_transform_d.ts file where you will find the nice brief description how to use the pipe with an example and transform method that we must need to implement:

7. So let’s go back to technologyMaster.pipe.ts where can see we have transform method with first argument as ITechnologyMaster array and second is named as filter that is the input string to be searched in the ITechnologyMaster array.

8. In transform method, the first line is only to check if the filter is not null.

9. The next statement is the actual implementation of search, if you are C# developer,
   you can compare it to the LINQ to Object. We are calling Array’s filter method, checking through conditional operator that if any of ITechnologyMaster member is matching with technologyMaster input search string and if YES, returning the filtered result. toLocaleLowerCase method is converting string to lower case, to read more about it, click here. If there is no matching record in User list, we are returning the all rows.Now that we have our filter ready, let’s add it to
*/ 
