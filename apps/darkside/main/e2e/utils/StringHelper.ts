export class StringHelper {


    
    static extractPrice(stringTOExtract:String) : number {

        stringTOExtract = stringTOExtract.replace(/\D/g, "");
        console.log('Extracted Price -> ' + stringTOExtract );

        return Number(stringTOExtract);
    }
}



