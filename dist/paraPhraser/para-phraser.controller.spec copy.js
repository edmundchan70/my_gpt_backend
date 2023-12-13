"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const para_phraser_controller_1 = require("./para-phraser.controller");
describe('ParaPhraserController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [para_phraser_controller_1.ParaPhraserController],
        }).compile();
        controller = module.get(para_phraser_controller_1.ParaPhraserController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=para-phraser.controller.spec%20copy.js.map