"use strict";
// import csv from 'csv';
// adapter that implement exportuserdata
class ExportUserToPDF {
    export(userData) {
        //  pdf package
    }
}
/**
 * This class will be responsible for a user intention
 */
class ExportUserUseCase {
    constructor(exportUserData) {
        this.exportUserData = exportUserData;
    }
    execute(userData) {
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
class ExportUserToCSV {
    export(userData) {
        //  csv package
    }
}
const exportUserToCSV = new ExportUserToPDF();
// use the userusecase
const exportUserCSV = new ExportUserUseCase(exportUserToCSV);
//# sourceMappingURL=export-user.js.map