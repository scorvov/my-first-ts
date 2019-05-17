

export const carsLoaded = (newCars: any) => {
    return {
        type:'CARS_LOADED',
        payload: newCars
    };
};
