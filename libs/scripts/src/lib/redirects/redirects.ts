import { getPdpRedirects, publishRedirects } from './pdp_redirects';
import { generateCSVfromObj } from '../utils/to_csv';
import { generateJSONfromObj } from '../utils/to_json';

// node redirects -type -filePath -source -target
const [pathToExecutable, pathToScript, type, filePath, exportType, source, target] = process.argv;

/** CHECK PARAMS */
if (!type || !filePath || !exportType) {
  console.error('Missing arguments: type, filePath, exportType, source, target are all required.');
}

if (!['-plp', '-pdp'].includes(type)) {
  console.error('Invalid type. Must be either -pdp or -plp');
}

if (!filePath) {
  console.error('Missing filePath argument.');
}

if (!['-csv', '-json'].includes(exportType)) {
  console.error('Invalid exportType. Must be either -csv or -json');
}
/** PARAM CHECK END */

function getDataObj() {
  if (type === '-pdp') {
    console.log('Getting PDP data...');

    return getPdpRedirects();
  }
  // Get PLP data
  // else if (type === '-plp') {
  //   console.log('Getting PLP data...');

  //   return await getPlpRedirects();
  // }
}

async function generateRedirects() {
  const sourceBaseUrl = source || 'https://www.vrai.com'; 
  const targetBaseUrl = target || 'http://localhost:4200';
  const dataObj = getDataObj();

  // Export to CSV
  if (exportType === '-csv') {
    console.log('generating csv...')
    const headers = ['from', 'to'];

    const csvDataObj = dataObj.map((redirect) => ({ from: `${sourceBaseUrl}${redirect.source}`, to: `${targetBaseUrl}${redirect.destination}`}))

    generateCSVfromObj(csvDataObj, headers, filePath);
  } else 
  // Export to JSON
  if (exportType === '-json') {
    generateJSONfromObj(dataObj, filePath);
  }
  else {
    console.log('Publishing redirects...');
    publishRedirects(dataObj);
  }

  console.log('Generating redirects with the following options', {
    pathToExecutable,
    pathToScript,
    type,
    filePath,
    exportType,
    source,
    target,
  });
}

generateRedirects();
