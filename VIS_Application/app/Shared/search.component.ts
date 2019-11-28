import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-list',
    template: `<div class="form-inline" style="float:right;clear:both">
                <div class="form-group">
                  <label><h3>{{title}}</h3></label>
                </div>
          <div class="form-group">
            <div class="col-lg-12">
              <input class="form-control" placeholder="Enter any text to filter" (paste)="getPasteData($event)" (keyup)="getEachChar($event.target.value)" type="text" [(ngModel)]="listFilter" /><img src="../../images/cross.png" class="cross-btn" (click)="clearFilter()" *ngIf="listFilter"/>
           </div>
         </div>
         <div class="form-group">
             <div *ngIf='listFilter'>
           
        </div>
      </div>
     </div> `
})

export class SearchComponent {

    listFilter: string;
    @Input() title: string;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    getEachChar(value: any) {
        this.change.emit(value);
    }

    clearFilter() {
        this.listFilter = null;
        this.change.emit(null);
    }

    getPasteData(value: any) {
        let pastedVal = value.clipboardData.getData('text/plain');
        this.change.emit(pastedVal);
        value.preventDefault();
    }
}

/*

1. In first line we are importing Input, Output interfaces and EventEmitter class. Input and Output
   interfaces are self-explanatory, to take the input parameter from CurrencyComponent (in our case the
   search string from user), Output is to send the value back from SearchComponent but it is little
   interesting, the output is sent back through event using EventEmitter class. This will get more
   clear in the further steps.

2. In next line, we are providing the Component metadata, i.e. selector (tag name through which we
   will use SearchComponent in CurrencyComponent e.g. <search-list></search-list>). template is the HTML
   part of component. You can also put it in separate HTML file and specify the templateUrl property
   instead but since this is quite slim, I would prefer to have it in the same file.

3. In SearchComponent class, we are declaring one local variable listFilter that is search string we
   will use to display here <div class="h3 text-muted">Filter by: {{listFilter}}</div>. That is only
   for cosmetic purpose to show what we are searching.

4. Second variable title is with @Input decorator, we will send search textbox title from CurrencyComponent.
   Third variable change is with @Output decorator and of EventEmitter type. This is how we send data
   back to parent component. change EventEmitter<string> means change is an event that parent component
   needs to subscribe and will get string argument type. We will explicitly call emit function (i.e.
   change.emit(“test”)) to send the value back to the parent component.

5. getEachChar(value: any): this function will be called for every character user will enter in search
   textbox. We are only calling this.change.emit(value); that is sending that character to parent
   component where it is being sent to the CurrencyFilterPipe pipe to be filtered from Currency list. Just for
   revision, in CurrencyPipeFilter we are comparing that character with and
   returning only those records where this character(s) exist. So as long the user would be entering
   characters in Search textbox, data would be filtering on runtime.

6. clearFilter(): Will clear the filter to reset the Currency list to default without any filtering.

7. getPasteData(value: any): This is little interesting function that will take care if user would copy
   search string from somewhere and paste it in search textbox to filter the Currencys list. Through
   value.clipboardData.getData('text/plain') we are getting the pasted data and sending it through
   change.emit(value) function to parent component.

8. Now, we got some idea about these function, if you jump back to SearchComponent template (HTML).
   We are calling getEachChar on keyup event that will trigger every time user would type in Search textbox,
   getPasteData is being called on paste event that will occur when user would paste value in Search textbox,
   clearFilter function would be called on clicking the cross image that would only be visible if search textbox
   would have at least one character.

*/