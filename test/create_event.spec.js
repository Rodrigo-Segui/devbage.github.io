const request = require('supertest');
const app = require('../app');

describe('Event', () => {

    it('should be able to create a new event', async () => {

        const responseEvent = await request(app)
            .post('/eventos/novo')
            .send({
                nome: "APAD",
                descricao: "test@hotma.com",
                local: "0000000000",
            });

        expect(responseEvent.body).toHaveProperty('_id');
    })

    it('should be able to get a event', async () => {

        const responseEvent = await request(app)
            .get('/eventos/')
            
        expect(responseEvent.body[0]).toHaveProperty('_id');
    })
})