import { Status } from '@enums/status.enum';
import { Cart } from '@interfaces/cart.interfaces';
import { Item } from '@interfaces/item.interface';
import { ItemForStorage } from '@interfaces/itemToStorage';

export const fakeCarts: Cart[] = [
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        created_at: 'Martes 25 de Junio del 2024',
        status: Status.COMPLETED,
        itemsLength: 1
    },
    {
        id: '0002',
        title: 'Compras de frutas.',
        description: 'Esta es otra descripcion de ejemplo.',
        created_at: 'Martes 26 de Junio del 2024',
        status: Status.PENDING,
        itemsLength: 2
    },
    {
        id: '0003',
        title: 'Compras de verduras.',
        description: 'Esta es otra descripcion de ejemplo.',
        created_at: 'Martes 27 de Junio del 2024',
        status: Status.COMPLETED,
        itemsLength: 3
    },
    {
        id: '0004',
        title: 'Compras de legumbres.',
        description: 'Esta es otra descripcion de ejemplo.',
        created_at: 'Martes 28 de Junio del 2024',
        status: Status.CANCELLED,
        itemsLength: 4
    }
];

export const fakeItems: Item[] = [
    // Items for Cart 0001
    {
        id: '0001',
        name: 'Producto 1',
        price: 10.99,
        quantity: '2 piezas',
        image: 'https://example.com/product1.jpg',
        description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
        status: Status.COMPLETED,
        cartId: '0001'
    },

    // Items for Cart 0002
    {
        id: '0002',
        name: 'Producto 2',
        price: 15.99,
        quantity: '3 piezas',
        image: 'https://example.com/product2.jpg',
        description: 'Otro producto de prueba con una descripcion un poco mas larga.',
        status: Status.PENDING,
        cartId: '0002'
    },
    {
        id: '0003',
        name: 'Producto 3',
        price: 5.99,
        quantity: '1 pieza',
        image: 'https://example.com/product3.jpg',
        description: 'Descripción del producto adicional.',
        status: Status.PENDING,
        cartId: '0002'
    },

    // Items for Cart 0003
    {
        id: '0004',
        name: 'Manzana',
        price: 0.99,
        quantity: '10 kilogramos',
        image: 'https://example.com/apple.jpg',
        description: 'Manzanas frescas y jugosas.',
        status: Status.COMPLETED,
        cartId: '0003'
    },
    {
        id: '0005',
        name: 'Pera',
        price: 1.29,
        quantity: '5 kilogramos',
        image: 'https://example.com/pear.jpg',
        description: 'Peras dulces y maduras.',
        status: Status.COMPLETED,
        cartId: '0003'
    },
    {
        id: '0006',
        name: 'Plátano',
        price: 1.59,
        quantity: '12 unidades',
        image: 'https://example.com/banana.jpg',
        description: 'Plátanos ricos en potasio.',
        status: Status.COMPLETED,
        cartId: '0003'
    },

    // Items for Cart 0004
    {
        id: '0007',
        name: 'Tomate',
        price: 2.49,
        quantity: '5 kilogramos',
        image: 'https://example.com/tomato.jpg',
        description: 'Tomates frescos para ensaladas.',
        status: Status.CANCELLED,
        cartId: '0004'
    },
    {
        id: '0008',
        name: 'Zanahoria',
        price: 1.79,
        quantity: '8 kilogramos',
        image: 'https://example.com/carrot.jpg',
        description: 'Zanahorias crujientes y saludables.',
        status: Status.CANCELLED,
        cartId: '0004'
    },
    {
        id: '0009',
        name: 'Calabacín',
        price: 2.29,
        quantity: '4 kilogramos',
        image: 'https://example.com/zucchini.jpg',
        description: 'Calabacines frescos para cocinar.',
        status: Status.CANCELLED,
        cartId: '0004'
    },
    {
        id: '0010',
        name: 'Pepino',
        price: 1.99,
        quantity: '6 unidades',
        image: 'https://example.com/cucumber.jpg',
        description: 'Pepinos refrescantes y crujientes.',
        status: Status.CANCELLED,
        cartId: '0004'
    }
];

export const fakeItemsGroupedByCart: ItemForStorage[] = [
    {
        cartId: '0001',
        items: [
            {
                id: '0001',
                name: 'Producto 1',
                price: 10.99,
                quantity: '2 piezas',
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.COMPLETED,
                cartId: '0001'
            }
        ]
    },
    {
        cartId: '0002',
        items: [
            {
                id: '0002',
                name: 'Producto 2',
                price: 15.99,
                quantity: '3 piezas',
                image: 'https://example.com/product2.jpg',
                description: 'Otro producto de prueba con una descripcion un poco mas larga.',
                status: Status.PENDING,
                cartId: '0002'
            },
            {
                id: '0003',
                name: 'Producto 3',
                price: 5.99,
                quantity: '1 pieza',
                image: 'https://example.com/product3.jpg',
                description: 'Descripción del producto adicional.',
                status: Status.PENDING,
                cartId: '0002'
            }
        ]
    },
    {
        cartId: '0003',
        items: [
            {
                id: '0004',
                name: 'Manzana',
                price: 0.99,
                quantity: '10 kilogramos',
                image: 'https://example.com/apple.jpg',
                description: 'Manzanas frescas y jugosas.',
                status: Status.COMPLETED,
                cartId: '0003'
            },
            {
                id: '0005',
                name: 'Pera',
                price: 1.29,
                quantity: '5 kilogramos',
                image: 'https://example.com/pear.jpg',
                description: 'Peras dulces y maduras.',
                status: Status.COMPLETED,
                cartId: '0003'
            },
            {
                id: '0006',
                name: 'Plátano',
                price: 1.59,
                quantity: '12 unidades',
                image: 'https://example.com/banana.jpg',
                description: 'Plátanos ricos en potasio.',
                status: Status.COMPLETED,
                cartId: '0003'
            }
        ]
    },
    {
        cartId: '0004',
        items: [
            {
                id: '0007',
                name: 'Tomate',
                price: 2.49,
                quantity: '5 kilogramos',
                image: 'https://example.com/tomato.jpg',
                description: 'Tomates frescos para ensaladas.',
                status: Status.CANCELLED,
                cartId: '0004'
            },
            {
                id: '0008',
                name: 'Zanahoria',
                price: 1.79,
                quantity: '8 kilogramos',
                image: 'https://example.com/carrot.jpg',
                description: 'Zanahorias crujientes y saludables.',
                status: Status.CANCELLED,
                cartId: '0004'
            },
            {
                id: '0009',
                name: 'Calabacín',
                price: 2.29,
                quantity: '4 kilogramos',
                image: 'https://example.com/zucchini.jpg',
                description: 'Calabacines frescos para cocinar.',
                status: Status.CANCELLED,
                cartId: '0004'
            },
            {
                id: '0010',
                name: 'Pepino',
                price: 1.99,
                quantity: '6 unidades',
                image: 'https://example.com/cucumber.jpg',
                description: 'Pepinos refrescantes y crujientes.',
                status: Status.CANCELLED,
                cartId: '0004'
            }
        ]
    }
];
