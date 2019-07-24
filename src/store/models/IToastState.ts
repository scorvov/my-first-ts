
export interface INotification {
    key?:number;
    message: string;
    variant: 'success' | 'error' | 'warning' | 'info';
}

export interface IToastState {
    notifications: INotification[];
}
