// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getUserDataFromRut:"http://localhost:5000/bancoripleypoc/us-central1/app/clients/get/",
  getUserDataFromEmail:"http://localhost:5000/bancoripleypoc/us-central1/app/clients/get/email/",
  getDestinataries:"http://localhost:5000/bancoripleypoc/us-central1/app/clients/get/destinatary/",
  addDestinatary:"http://localhost:5000/bancoripleypoc/us-central1/app/clients/add/destinatary",
  bankList:"https://bast.dev/api/banks.php",
  transfer:"http://localhost:5000/bancoripleypoc/us-central1/app/movements/transfer/",
  getHistory:"http://localhost:5000/bancoripleypoc/us-central1/app/movements/get/history/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
