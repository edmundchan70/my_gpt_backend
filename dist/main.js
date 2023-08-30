"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const guards_1 = require("./common/guards");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const reflector = new core_1.Reflector();
    app.useGlobalGuards(new guards_1.AtGuard(reflector));
    await app.listen(1919);
}
bootstrap();
//# sourceMappingURL=main.js.map