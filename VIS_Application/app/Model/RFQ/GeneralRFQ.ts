export interface ITechMultiCheckBox {
    id: number;
    name: string;

}
export interface ITechnology {
    TechnologyId: number;
    TechnologyName: string
}

export interface IRFQDoc {
    FileTypeID: number;
    FileType: string;
    FileName: string;
    AuthorId: number;
    Author: string;
    RemarkDoc: string;
}
export interface IRFQDocEntity {
    FileTypeId: number;
    FileType: string;
    FileName: string;
    AuthorId: number;
    Author: string;
    RemarkDoc: string;
}
export interface IRFQLink {
    RemarkLink: string;
    URL: string;
    UserId: string;
    Password: string;
}
export interface IRFQLinkEntity {
    RemarkLink: string;
    URL: string;
    UserId: number;
    Password: string;
}