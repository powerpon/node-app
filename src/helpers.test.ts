import { SUPPORTED_COUNTRIES } from "./config"
import { shortenPublicHoliday, validateInput } from "./helpers";
import { PublicHoliday, PublicHolidayShort } from "./types";

describe('Helpers Logic', () => {
    test('should return true on provided valid country and year', () =>{
        const mockCountryData: string = SUPPORTED_COUNTRIES[0];
        const mockYearData: number = new Date().getFullYear();
        expect(validateInput({year: mockYearData, country: mockCountryData})).toBeTruthy();
    });

    test('should throw error on provided invalid country', () => {
        const mockCountryData: string = 'US';
        const mockYearData: number = new Date().getFullYear();
        expect(() => validateInput({year: mockYearData, country: mockCountryData})).toThrow(new Error(`Country provided is not supported, received: ${mockCountryData}`));
    });

    test('should throw error on provided invalid year', () => {
        const mockCountryData: string = SUPPORTED_COUNTRIES[0];
        const mockYearData: number = 2020;
        expect(() => validateInput({year: mockYearData, country: mockCountryData})).toThrow(new Error(`Year provided not the current, received: ${mockYearData}`));
    });

    test('should return shortened public holiday object', () => {
        const publicHolidaysMockData: PublicHoliday = {
            date: new Date().getFullYear() + "-01-01",
            localName: "New Year's Day",
            name: "New Year's Day",
            countryCode: SUPPORTED_COUNTRIES[0],
            fixed: false,
            global: true,
            counties: null,
            launchYear: null,
            types: [
              "Public"
            ]
        };
        const expectedResult: PublicHolidayShort = {
            localName: publicHolidaysMockData.localName,
            name: publicHolidaysMockData.name,
            date: publicHolidaysMockData.date,
        };
        expect(shortenPublicHoliday(publicHolidaysMockData)).toEqual(expectedResult);
    });
});