import { Component, OnInit, ViewChild, Directive, DirectiveDecorator } from '@angular/core';
import { ConfigureTicketService } from '../../../service/Masters/Configuration/ConfigureTicket.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IConfigureTicket } from '../../../Model/Masters/Configuration/ConfigureTicket';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { TreeModel, NodeEvent } from 'ng2-tree';

@Component
    ({
        providers: [ConfigureTicketService],
        templateUrl: 'app/Components/Masters/Configuration/ConfigureTicket.component.html'
    })

export class ConfigureTicketComponent implements OnInit
{
    @ViewChild('treeComponent') treeComponent;

    public tree: TreeModel;

    @ViewChild('modal') modal: ModalComponent;
    ticketselectedemployee: IConfigureTicket[];
    ticketseeperson: IConfigureTicket[];
    parentgrouplists: IConfigureTicket[];
    parentgrouplist: IConfigureTicket;
    childgrouplist: IConfigureTicket[];
    employeeheadlist: IConfigureTicket[];
    configureticket: IConfigureTicket;

 

    handleSelected(event: NodeEvent)
    {
        const oopNodeController = this.treeComponent.getControllerByNodeId(2);
    }

    msg: string;
    indLoading: boolean = false;
    ConfigureTicketFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    ConfigureTicketFilter: string;
    isDesc: boolean = false;
    column: any = 'EventName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;
    nums: number[];
    toStr = JSON.stringify;
    constructor(private fb: FormBuilder, private _ConfigureTicketService: ConfigureTicketService, private pagerService: PagerService) { }
            
    ngOnInit()
    {
        this.ticketseeperson =
            [({
                Id: 0,
                CreatedOn: null,
                CreatedBy: '',
                UpdatedOn: null,
                UpdatedBy: '',
                IsActive: false,
                Parent_Id: 0,
                User_Id: 0,
                Department_Name: '',
                Position_Id: 0,
                IsActiveSuggestion: false,
                SuggestionAlie: '',
                Employee_Name: '',
                Employee_Id: 0,
                Flag: false,
                Organization_Id: 0,
                Suggestion_Dep_Emp_Id: 0
            })];
        this.configureticket = ({
            Id: 0,
            CreatedOn: null,
            CreatedBy: '',
            UpdatedOn: null,
            UpdatedBy: '',
            IsActive: false,
            Parent_Id: 0,
            User_Id: 0,
            Department_Name: '',
            Position_Id: 0,
            IsActiveSuggestion: false,
            SuggestionAlie: '',
            Employee_Name: '',
            Employee_Id: 0,
            Flag: false,
            Organization_Id: 0,
            Suggestion_Dep_Emp_Id: 0
        });
        this.parentgrouplists = [({
            CreatedBy: '',
            CreatedOn: null,
            Department_Name: '',
            Employee_Id: 0,
            Employee_Name: '',
            Flag: false,
            Id: 0,
            IsActive: false,
            IsActiveSuggestion: false,
            Organization_Id: 0,
            Parent_Id: 0,
            Position_Id: 0,
            SuggestionAlie: '',
            Suggestion_Dep_Emp_Id: 0,
            UpdatedBy: '',
            UpdatedOn: null,
            User_Id: 0

        })]
        this.LoadEmployeeHead();
        this.LoadParentGroup();
    }

    moveItems(origin, dest)
    {
        $(origin).find(':selected').appendTo(dest);
    }

    moveAllItems(origin, dest)
    {
        $(origin).children().appendTo(dest);
    }

    moveRightAll(origin, dest)
    {
        this.moveAllItems("#ddlticket1", "#ddlticket2");
    }

    moveLeftAll(origin, dest)
    {
        this.moveAllItems("#ddlticket2", "#ddlticket1");
    }

    moveRight(origin, dest)
    {
        this.moveItems("#ddlticket1", "#ddlticket2");
    }

    moveLeft(origin, dest)
    {
        this.moveItems("#ddlticket2", "#ddlticket1");
    }

    LoadChildGroup(event)
    {
        this.indLoading = true;
        this._ConfigureTicketService.getchildgroup(Global.BASE_CONFIGURETICKET_ENDPOINT,event.target.value)
            .subscribe(data =>
            {
                this.childgrouplist = data;
                this.indLoading = false;
            }

        ); 
    }

    TicketDetail(event)
    {
        this.configureticket = this.childgrouplist.filter(x => x.Id == event.target.value)[0];
        this._ConfigureTicketService.getticketdisplay(Global.BASE_CONFIGURETICKET_ENDPOINT, event.target.value)
            .subscribe(data =>
            {
                this.ticketseeperson = data;
                this.indLoading = false;
            }
        );
        
    }

    LoadEmployeeHead()
    {
        this.indLoading = true;
        this._ConfigureTicketService.getemployeehead(Global.BASE_CONFIGURETICKET_ENDPOINT)
            .subscribe(data =>
            {
                this.employeeheadlist = data;
                this.indLoading = false;
            }
            );
    }

    LoadParentGroup(): IConfigureTicket[]
    {
        this._ConfigureTicketService.getparantgroup(Global.BASE_CONFIGURETICKET_ENDPOINT)
            .subscribe(data =>
            {
                this.parentgrouplists = data;
                //Static Data

                this.tree =
                    {
                        value: 'Parent value',
                        children:
                        [
                            {
                                value: 'Child value',
                                children:
                                [
                                    { value: 'child 1' },
                                    { value: 'child 2' },
                                    { value: 'child 3' }
                                ]
                            }
                        ]
                    };

                // dynamic Data
                //debugger;
                //for (let item of this.parentgrouplists)
                //{
                //    for (let itemchild of this.parentgrouplists)
                //    {
                //        this.tree =
                //            {
                //                value: item.Department_Name,
                //                children:
                //                [{
                //                    value: this.parentgrouplists[0].Department_Name,
                //                    children:
                //                    [{
                //                            value: this.parentgrouplists[0].Department_Name
                //                    }]
                //                }]
                //            };
                //    }
                //}

            }
            );
        return this.parentgrouplists;
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.ConfigureTicketFrm.enable() : this.ConfigureTicketFrm.disable();
    } 

    onSubmit(formData: IConfigureTicket)
    {
        var id = this.configureticket.Id;
        this.msg = "";
        this._ConfigureTicketService.put(Global.BASE_CONFIGURETICKET_ENDPOINT, id, formData).subscribe(
            data =>
            {
                debugger;
                if (data.startsWith("Success: "))//Success
                {
                    this.msg = "Configure ticket details updated successfully.";
                }
                else
                {
                    this.msg = "Error has occurred while modifying existing Configure Ticket";
                }
            },
            error =>
            {
                this.msg = error;
            }
        );
        
        this._ConfigureTicketService.saveemployeeid(Global.BASE_CONFIGURETICKET_ENDPOINT, this.ticketseeperson).subscribe(
            data =>
            {

                debugger;
                if (data.startsWith("Success: "))//Success
                {
                    this.msg = "Configure ticket saved successfully.";
                }
                else
                {
                    this.msg = "error has occurred while modifying existing configuration";
                }
            },
            error =>
            {
                this.msg = error;
            }
        );
    }
}
