export const CoreConfig = {
    environment: 'development',
    app: {
        port: 8000,
        baseUrl: 'http://localhost:8000/',
    },
    database: {
        port:3306,
        name: 'oak_demo',
        hostname: '127.0.0.1',
        password: '',
        username: 'root',
        poolSize: 0
    },
    jwt: {
        secretKey: 'cRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s',
        name: 'Authorization'
    },
    password: {
        bit: 256,
        key: 'B&E(H+MbQeThWmZq4t7w!z%C*F-J@NcR'
    },
    log: {
        'format': 'dev',
        'dir': '../logs'
    },
    locale: {
        'default': 'en',
        'supported': {
            'en': 'en',
            'fa': 'fa'
        }
    },
    email: {
        host: '',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: ''
        },
        fromName: '',
        fromEmail: ''
    },
    siteAddress: '',
}