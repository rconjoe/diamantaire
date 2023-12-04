import { getPdpRedirects, publishRedirects } from './pdp_redirects';
import { getPlpRedirects } from './plp_redirects';
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

async function getDataObj() {
  if (type === '-pdp') {
    console.log('Getting PDP data...');

    return await getPdpRedirects(source, target);
  }
  // Get PLP data
  else if (type === '-plp') {
    console.log('Getting PLP data...');

    return await getPlpRedirects(source, target);
  }
}

async function generateRedirects() {
  const dataObj = await getDataObj();

  // Export to CSV
  if (exportType === '-csv') {
    const headers = ['from', 'to'];

    generateCSVfromObj(dataObj, headers, filePath);
  }
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
