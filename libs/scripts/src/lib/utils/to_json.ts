import fs from 'fs';

export async function generateJSONfromObj(dataObj, filename) {
  const csvfile = fs.createWriteStream(filename);

  csvfile.write(JSON.stringify(dataObj));
  csvfile.end();
}
