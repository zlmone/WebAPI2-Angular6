import * as _ from 'underscore';

export class PagerService {
    pager: any;
    pagedItems: any[];
    

    setPage(page: number, pageSize: number, objectArry: any[]) {
        let totalPages = 1;
        if (pageSize == 0) {
            pageSize = objectArry.length;
        }
        else if (pageSize > 0 && objectArry.length > pageSize) {
            totalPages = objectArry.length / pageSize;
            totalPages = Math.ceil(totalPages);
        }
        
        if (page < 1 || page > totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.getPager(objectArry.length, page, pageSize);

        // get current page of items
        this.pagedItems = objectArry.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {

        let totalPages: number;
        totalPages = 1;
        // calculate total pages
        if (pageSize == 0) {
            pageSize = totalItems;
        }
        if (pageSize > 0 && totalItems > pageSize) {
            totalPages = totalItems / pageSize;
            totalPages = Math.ceil(totalPages);
        }
        


        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let PaginInformation = 'Showing  ' + (startIndex + 1).toString() + ' to ' + (endIndex + 1).toString() + ' of ' + totalItems.toString();
        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages,
            pagerinformtion : PaginInformation
        };
    }
}