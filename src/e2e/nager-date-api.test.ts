import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { PublicHoliday } from '../types';

describe('/AvailableCountries', () => {
    test('should return status code 200 and a list of available countries', async () => {
        const {status, body} = await request(PUBLIC_HOLIDAYS_API_URL).get('/AvailableCountries');
        expect(status).toEqual(200);
        body.forEach((country: any) => {
            expect(country).toEqual({
                countryCode: expect.any(String),
                name: expect.any(String),
            });
        })
    });
});

describe('/Version', () => {
    test('should return status code 200 and a list of available countries', async () => {
        const {status, body} = await request(PUBLIC_HOLIDAYS_API_URL).get('/Version');
        expect(status).toEqual(200);
        expect(body).toEqual({
            name: expect.any(String),
            version: expect.any(String),
        });
    });
});