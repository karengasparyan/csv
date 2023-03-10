import {CSVFields, File} from "../types/main";
import {Readable} from "stream";
import csvParser from "csv-parser";
import csvWriter from "csv-write-stream";
import fs from "fs";
import path from "path";

export const transformCSVData = async (file: File) => {
    const readable = Readable.from(file.buffer);
    const jsonStreamData: string[] = [];
    const regex = /\[.*?\]/;

    const csvData = new Promise((resolve, reject) => {
        readable.pipe(csvParser())
            .on('data', (data) => {
                jsonStreamData.push(data);
            })
            .on('error', (error) => {
                reject(error);
            })
            .on('end', () => {
                resolve(jsonStreamData);
            });
    });

    const jsonCSV: any = await csvData;
    const newData: CSVFields[] = [];

    jsonCSV.forEach((i: object) => {
        if (Object.keys(i).length) {
            const matchKey = Object.keys(i)[0].match(regex);
            const matchValue = Object.values(i)[0].match(regex);
            let key = '';
            let value = '';

            if (matchKey) {
                key = matchKey[0];
            }

            if (matchValue) {
                const arrStr = matchValue[0];
                const arr = JSON.parse(arrStr).sort();
                value = JSON.stringify(arr);
            }

            newData.push({
                [key]: value
            })
        } else {
            newData.push({})
        }
    })

    return newData
}

export const writeCSVData = async (data: CSVFields[]) => {
    const writer = csvWriter();
    const url = '/csv/output.csv';
    const filePath = path.resolve('./csv/output.csv')
    writer.pipe(fs.createWriteStream(filePath));
    data.forEach((data: CSVFields) => writer.write(data));
    writer.end();
    return url;
}