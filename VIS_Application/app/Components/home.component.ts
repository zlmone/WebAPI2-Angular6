import { Component, OnInit } from "@angular/core";
import { SharedContents } from '../Shared/sharedcontents'

@Component({
    selector: "home-page",
    templateUrl: 'app/Components/home.component.html'
})

export class HomeComponent implements OnInit {

    constructor(private service: SharedContents) {
        this.service.setData('page-wrapper', true);
    } 

    ngOnInit()
    {
       
    }
}