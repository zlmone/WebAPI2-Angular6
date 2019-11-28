import { Component, OnInit } from "@angular/core";
import { Global } from './Shared/global';
import { SharedContents } from './Shared/sharedcontents';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { LoginComponent } from './Components/UserManagement/login.component';
import { AttendanceEntryComponent } from './Components/UserManagement/AttendanceEntry.component';
import { LoginData } from './Model/UserManagement/login';

@Component({
    selector: "vis-app",
    templateUrl: "app/app.component.html",    
})

export class AppComponent implements OnInit
{
    AttendanceEntryComponent: AttendanceEntryComponent;


    ShowDashboard: boolean;
    VISUsername: string;
    subscription: Subscription;
    PageWrapper: string;
    Employee_Name: string='';
    strDocmentTemplateHeader: string;
    displayLoader = 'none';

    objLoginData : LoginData;

    Logout()
    {
        sessionStorage.clear();
        this.ExitDashboard();
        this.router.navigate(['/login']);
    }

    AttendanceEntry()
    {
        this.router.navigate(['/AttendanceEntry']);
    }

    ngOnInit()
    {
        this.VISUsername = sessionStorage.getItem('VISUsername');
        this.Employee_Name = sessionStorage.getItem('UserFullName');
        this.GetDynamicMenuLinkText();
    }

    constructor(private router: Router, private service: SharedContents) {
        this.subscription = service.pageWrapper$.subscribe(pWrapper => {
            this.PageWrapper = pWrapper;
        });
        this.subscription = service.showDashboard$.subscribe(showDashboard => {
            this.ShowDashboard = showDashboard;
        });
        
    }

    buttonClick()
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
    }

    ExitDashboard()
    {
        this.ShowDashboard = false;
        var vMainContentLeftMargin = "55px";
        var vArrayOfMainContentDivTag = document.getElementById("MainDivToLoadChild");
        vArrayOfMainContentDivTag.style.marginLeft = vMainContentLeftMargin;

    }

    GetDynamicMenuLinkText()
    {
        if (sessionStorage.length > 0)
        {
            if (JSON.parse(sessionStorage.getItem('IsAdmin')) || JSON.parse(sessionStorage.getItem('IsLineManager'))) 
            {
                this.strDocmentTemplateHeader = 'Document Template'
            }
            else
            {
                this.strDocmentTemplateHeader = 'My Suggestion';
            }
        }
        
    }

}