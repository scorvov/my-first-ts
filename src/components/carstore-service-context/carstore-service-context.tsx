import * as React from 'react';

interface AppContextInerface {
    // name: string
}

const {
    Provider: CarstoreServiceProvider,
    Consumer: CarstoreServiceConsumer
} = React.createContext<AppContextInerface | null>(null);

export {
    CarstoreServiceProvider,
    CarstoreServiceConsumer
}

