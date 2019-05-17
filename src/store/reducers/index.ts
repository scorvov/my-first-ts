


const initialState: any = {
    itemList: []
};

export const reducer = (state = initialState, action:any) => {

    switch (action.type) {
        case 'CARS_LOADED':
            return {
                books: action.payload
            };

        default:
            return state;
    }
};


