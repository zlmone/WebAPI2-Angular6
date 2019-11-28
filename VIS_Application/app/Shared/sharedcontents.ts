import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedContents {
    private PageWrapper = new Subject<string>();
    private ShowDashboard = new Subject<boolean>();
    private loader = new Subject<string>();

    pageWrapper$ = this.PageWrapper.asObservable();
    showDashboard$ = this.ShowDashboard.asObservable();
    loader$ = this.loader.asObservable();

    setData(pWrapper: string, showDashboard: boolean) {
        this.PageWrapper.next(pWrapper);
        this.ShowDashboard.next(showDashboard);
    }

    setLoader(loader: string) {
        this.loader.next(loader);
    }
}