import { describe } from "node:test";
import axios from 'axios';
import { PublicHoliday, PublicHolidayShort } from "../types";
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "./public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";

interface AxiosMockResponsePublicHolidays {
  data: PublicHoliday[];
}

describe('Unit Tests Public Holidays API', () => {
    test('should return list of public holidays', async () => {
      const mockYear: number = new Date().getFullYear();
      const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
        const publicHolidaysMockData: AxiosMockResponsePublicHolidays = {data: [{
            date: mockYear + "-01-01",
            localName: "New Year's Day",
            name: "New Year's Day",
            countryCode: mockCountryCode,
            fixed: false,
            global: true,
            counties: null,
            launchYear: null,
            types: [
              "Public"
            ]
          }]};
        const expectedResult: PublicHolidayShort[] = [{
            localName: publicHolidaysMockData.data[0].localName,
            name: publicHolidaysMockData.data[0].name,
            date: publicHolidaysMockData.data[0].date,
        }];
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(publicHolidaysMockData));
        const response = await getListOfPublicHolidays(mockYear, mockCountryCode);
        expect(response).toEqual(expectedResult);
    });

    test('should return empty list of public holidays on error', async () => {
      const mockYear: number = new Date().getFullYear();
      const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
        const response = await getListOfPublicHolidays(mockYear, mockCountryCode);
        expect(response).toEqual([]);
    });

    test('should return true if today is public holiday', async () => {
      const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
      const mockStatus = {status: 200};
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockStatus));
      const response = await checkIfTodayIsPublicHoliday(mockCountryCode);
      expect(response).toBeTruthy();
    });

    test('should return false if today is public holiday with error', async () => {
      const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
      const response = await checkIfTodayIsPublicHoliday(mockCountryCode);
      expect(response).toBeFalsy();
    });

    test('should return list of upcoming public holidays', async () => {
      const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
        const publicHolidaysMockData: AxiosMockResponsePublicHolidays = {data: [{
            date: "2025-01-01",
            localName: "New Year's Day",
            name: "New Year's Day",
            countryCode: mockCountryCode,
            fixed: false,
            global: true,
            counties: null,
            launchYear: null,
            types: [
              "Public"
            ]
          }]};
        const expectedResult: PublicHolidayShort[] = [{
            localName: publicHolidaysMockData.data[0].localName,
            name: publicHolidaysMockData.data[0].name,
            date: publicHolidaysMockData.data[0].date,
        }];
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(publicHolidaysMockData));
        const response = await getNextPublicHolidays(mockCountryCode);
        expect(response).toEqual(expectedResult);
    });

    test('should return empty list of upcoming public holidays on error', async () => {
      const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
        const response = await getNextPublicHolidays(mockCountryCode);
        expect(response).toEqual([]);
    });

    afterEach(() => {
        jest.restoreAllMocks();
      });
});

describe('Integration Tests Public Holidays API', () => {
  let holidaysDates: string[] = [];

  test('should return list of public holidays', async () => {
    const mockYear: number = new Date().getFullYear();
    const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
      const response: PublicHolidayShort[] = await getListOfPublicHolidays(mockYear, mockCountryCode);
      holidaysDates = response.map((holiday) => holiday.date);
      expect(response.length).toBeGreaterThan(0);
  });

  test('should return true if today is public holiday, return false if its not', async () => {
    const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
    const currentDate: string = new Date().toISOString().split('T')[0];
    const response = await checkIfTodayIsPublicHoliday(mockCountryCode);
    if(holidaysDates.includes(currentDate)){
      expect(response).toBeTruthy();
    }else{
      expect(response).toBeFalsy();
    }
  });

  test('should return list of upcoming public holidays', async () => {
    const mockCountryCode: string = SUPPORTED_COUNTRIES[0];
      const response = await getNextPublicHolidays(mockCountryCode);
      expect(response.length).toBeGreaterThan(0);
  });
});