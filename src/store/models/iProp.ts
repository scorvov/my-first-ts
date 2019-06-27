export interface IProp {
    id: number;
    name: string;
    type: string;
    value?: string;
}

export interface IPropsList {
    propsList: IProp[];
}
