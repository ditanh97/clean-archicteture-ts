// import csv from 'csv';

type UserDataDTO = {
    name: string,
    email: string,
    dateOfBirth: Date
};

interface ExportUserData {
    export(userData: UserDataDTO): void;
}


// adapter that implement exportuserdata
class ExportUserToPDF implements ExportUserData {
     export(userData: UserDataDTO): void {
        //  pdf package
     }
}


/**
 * This class will be responsible for a user intention 
 */
class ExportUserUseCase {
    constructor(
        private exportUserData: ExportUserData
    ){}

    execute(userData: UserDataDTO): void {
        // csv.export => klw kita langsung import kesini maka our app akan dependence pada csv package
        // lalu bagaimana agar use case kita bisa set any kind of export implementation => gunakan interface
        // interface dalam hexagonal architecture merupakan port
        this.exportUserData.export(userData);
    }
}

// instantiate the dependency (instance of the adapter) 
const exportUserToPDF = new ExportUserToPDF();
// use the userusecase
const exportUser = new ExportUserUseCase(exportUserToPDF);

exportUser.execute({
    name: "Dita",
    email: "ditanurhalimah@gmail.com",
    dateOfBirth: new Date()

});


class ExportUserToCSV implements ExportUserData {
    export(userData: UserDataDTO): void {
       //  csv package
    }
}

const exportUserToCSV = new ExportUserToPDF();
// use the userusecase
const exportUserCSV = new ExportUserUseCase(exportUserToCSV);


