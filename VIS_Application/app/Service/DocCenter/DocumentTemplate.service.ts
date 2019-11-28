import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class DocumentTemplateService
{
    constructor(private _http: Http) { }


    // step1 related services

    getapprovedrecord(url: string, EmployeeId: number, EmployeeRole: string, ApprovedStatus:string): any
    {
        return this._http.get(url + 'GetAllApprovedRecord?EmployeeId=' + EmployeeId + '&EmployeeRole=' + EmployeeRole + '&ApprovedStatus=' + ApprovedStatus +'').map((response: Response) => response.json());
    }

    getallmodule(url: string): any
    {
        return this._http.get(url + 'GetAllModule').map((response: Response) => response.json());
    }

    getbyid(url: string,id:number): any
    {
        return this._http.get(url + 'GetById?Id='+ id).map((response: Response) => response.json());
    }

    addnewdocument(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + "AddNewDocumentTemplate", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    updatedocument(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + "UpdateDocumentTemplate", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    deletedocument(url: string, id: number): Observable<any>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + "DeleteDocumentTemplate?Id=" + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }


    // step2 related services

    addnewdocumentfield(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + "AddDocumentField", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    updatedocumentfield(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + "UpdateDocumentField", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    deletedocumentfield(url: string, Id: number,UpdatedBy:number): Observable<any> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteDocumentField?Id=' + Id + '&UpdatedBy=' + UpdatedBy + '', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getbydoctempid(url: string, id: number): any
    {
        return this._http.get(url + 'GetAllDocumenetFieldByDocId?DocTempId=' + id).map((response: Response) => response.json());
    }

    getalldocumentfieldbyid(url: string, id: number): any {
        return this._http.get(url + 'GetAllDocumenetFieldById?Id=' + id).map((response: Response) => response.json());
    }

    getmaxid(url: string): any
    {
        return this._http.get(url + 'GetDocTemplateMaxId').map((response: Response) => response.json());
    }

    bindtablefielddropdown(url: string,TableName:string): any
    {
        return this._http.get(url + 'BindTableFieldDropDown?TableName=' + TableName).map((response: Response) => response.json());
    }

    bindcustomfielddropdown(url: string,DocTempId:number): any
    {
        return this._http.get(url + 'BindCustomFieldDropDown?DocTempId=' + DocTempId).map((response: Response) => response.json());
    }


    // step 3 Service


    AddDocumentMasterField(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + "AddDocumentMasterField", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    AddDocumentContainerField(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + "AddDocumentContainerField", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    GetDocumentContainer(url: string, id: number): any
    {
        return this._http.get(url + 'BindDocumentContainer?DocTempId=' + id).map((response: Response) => response.json());
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}

