"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const para_phraser_service_1 = require("./para-phraser.service");
describe('ParaPhraserService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [para_phraser_service_1.ParaPhraserService],
        }).compile();
        service = module.get(para_phraser_service_1.ParaPhraserService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=para-phraser.service.spec%20copy.js.map