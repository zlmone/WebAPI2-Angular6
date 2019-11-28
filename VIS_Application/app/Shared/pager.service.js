"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var PagerService = (function () {
    function PagerService() {
    }
    PagerService.prototype.setPage = function (page, pageSize, objectArry) {
        var totalPages = 1;
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
    };
    PagerService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        var totalPages;
        totalPages = 1;
        // calculate total pages
        if (pageSize == 0) {
            pageSize = totalItems;
        }
        if (pageSize > 0 && totalItems > pageSize) {
            totalPages = totalItems / pageSize;
            totalPages = Math.ceil(totalPages);
        }
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var PaginInformation = 'Showing  ' + (startIndex + 1).toString() + ' to ' + (endIndex + 1).toString() + ' of ' + totalItems.toString();
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
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
            pagerinformtion: PaginInformation
        };
    };
    return PagerService;
}());
exports.PagerService = PagerService;
