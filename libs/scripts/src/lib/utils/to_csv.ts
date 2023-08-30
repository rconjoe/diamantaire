//const fs = require('fs');
import fs from 'fs';

function initiateCSVData(headers) {
  return getCSVRows([headers]).concat('\n');
}

function getCSVRows(rows) {
  return rows.map(getCSVRow).join('\n');
}

function getCSVRow(row) {
  return row.join(',');
}

function getDataRows<T>(dataObj: T[], headers: string[]) {
  return dataObj.reduce((rowsData: string[][], rowObj) => {
    const rowData: string[] = [];

    headers.forEach((header) => {
      if (rowObj[header]) {
        rowData.push(rowObj[header]);
      } else {
        rowData.push('');
      }
    });
    rowsData.push(rowData);

    return rowsData;
  }, []);
}

export async function generateCSVfromObj(dataObj, headers, filename) {
  const csvfile = fs.createWriteStream(filename);
  const data = getDataRows(dataObj, headers);
  const csvRows = getCSVRows(data);
  const csvData = initiateCSVData(headers).concat(csvRows);

  csvfile.write(csvData);
  csvfile.end();
}
