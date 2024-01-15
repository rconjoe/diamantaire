import fs from 'fs';

export async function generateJSONfromObj(dataObj, filename) {
  const jsonFile = fs.createWriteStream(filename);

  jsonFile.write(JSON.stringify(dataObj));
  jsonFile.end();
}
