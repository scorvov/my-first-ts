
class CarstoreService {

    getCars() {
        return[
            {
                id: 1,
                name: 'Mersedes S550 4matic',
                cost: 118000,
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg/1200px-Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg',
                dateUp: '18/05/2019',
                optional: {
                }
            },
            {
                id: 2,
                name: 'Mersedes S550 4matic',
                cost: 55000,
                img: 'https://img.drivemag.net/jato_car_photos/MERCEDES%2FS-CLASS%2Fsedan%2F4%2F2009%2Fexterior-photos%2Fo%2Fmercedes-s-class-sedan-4-doors-2009-model-exterior-photos-0.jpg',
                dateUp: '18/05/2019',
                optional: {
                }
            }
        ];
    }
}

export {
    CarstoreService
}
