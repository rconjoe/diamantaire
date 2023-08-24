# scripts

## Redirect Sctips
### /lib/redirects/redirects.ts

Make sure you have **ts-node** installed, it is now part of dev dependency

Options: (parameters in order)
-plp | -pdp
[filePath] 
-json | -csv
sourceBaseUrl (default = https://www.vrai.com)
targetBaseUrl (default = http://localhost:4200)

`npx ts-node /path/to/lib/redirects -plp ~/Documents/redirects/plp_redirects.json -json https://www.vrai.com https://diamantaire.vercel.app/`

This will create a PLP redirect list in JSON format in a redirects folder.  Make sure to name the file appropriately (.json or .csv)

## Running unit tests

Run `nx test scripts` to execute the unit tests via [Jest](https://jestjs.io).
