import * as React from 'react';
import {CarstoreServiceConsumer} from '../carstore-service-context';


interface P {

}

export const withCarstoreService = () => (Wrapped: React.ComponentType<P>) => {
    return (props: any) => {
        return (
            <CarstoreServiceConsumer>
                {(carstoreService) =>
                        <Wrapped {...props}
                            carstoreService = {carstoreService} />
                }
            </CarstoreServiceConsumer>
        );
    }

};

// function withTheme<P extends ThemeAwareProps>(Component: React.ComponentType<P>) {
//     return function ThemedComponent(props: Pick<P, Exclude<keyof P, keyof ThemeAwareProps>>) {
//         return (
//             <CarstoreServiceConsumer>
//                 {(theme) => <Component {...props} theme={theme} />}
//             </CarstoreServiceConsumer>
//         )
//     }
// }
