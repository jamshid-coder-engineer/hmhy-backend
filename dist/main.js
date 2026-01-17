"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_service_1 = require("./api/app.service");
async function main() {
    const application = new app_service_1.Application();
    await application.start();
}
main();
//# sourceMappingURL=main.js.map