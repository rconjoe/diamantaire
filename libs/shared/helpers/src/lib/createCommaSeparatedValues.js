import { makeCsvData } from './datoToCsvHelpers';

const createCommaSeperatedValues = (data, filename = 'export.csv') => {
  const csvData = makeCsvData(data);
  const csvFile = new Blob([csvData], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
};

export default createCommaSeperatedValues;
