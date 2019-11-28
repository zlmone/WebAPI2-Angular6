import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class CommonHelperService
{
    constructor(private _http: Http) { }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    UploadImageToServer(url: string, formData: any): Observable<any>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, formData, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    public ToogleMenu(): void
    {
        var vProp;
        var vStyleOfElement = document.getElementById("VISNavigationBar");
        var vNewVisNavBarWidth = "300px";
        var vMainContentLeftMargin = "305px";
        var vCurrentStyleInAnchor = "labeldisplayblock";
        var vChangeStyleInAnchor = "labeldisplaynone";
        var vCurrentArrowClass = "arrow";

        var vChangeInArrowClass = "arrownone";
        if (vStyleOfElement.style.width == "300px")
        {
            vNewVisNavBarWidth = "50px";
            vMainContentLeftMargin = "55px";
        }
        else
        {
            vNewVisNavBarWidth = "300px";
            vMainContentLeftMargin = "305px";
            vCurrentStyleInAnchor = "labeldisplaynone";
            vChangeStyleInAnchor = "labeldisplayblock";
            vCurrentArrowClass = "arrownone";
            vChangeInArrowClass = "arrow";
        }

        var vArrayOfAnchorTag = document.getElementsByClassName(vCurrentStyleInAnchor);

        while (vArrayOfAnchorTag.length > 0)
        {
            vArrayOfAnchorTag[0].setAttribute('class', vChangeStyleInAnchor);
        }

        var vArrayOfArrowClass = document.getElementsByClassName(vCurrentArrowClass);

        while (vArrayOfArrowClass.length > 0)
        {
            vArrayOfArrowClass[0].setAttribute('class', vChangeInArrowClass);
        }



        var vArrayOfMainContentDivTag = document.getElementById("MainDivToLoadChild");
        vArrayOfMainContentDivTag.style.marginLeft = vMainContentLeftMargin;
        vStyleOfElement.style.width = vNewVisNavBarWidth;

        $(".navbar-collapse in").addClass("navbar-collapse");

        $(".navbar-collapse in").toggleClass("collapsed");

    }

}