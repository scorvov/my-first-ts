import * as React from 'react';

// interface AppContextInerface {
//     // name: string
// }

const {
    Provider: CarstoreServiceProvider,
    Consumer: CarstoreServiceConsumer
} = React.createContext<any | null>(null);

export {
    CarstoreServiceProvider,
    CarstoreServiceConsumer
}

