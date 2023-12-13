"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("langchain/llms/openai");
const chrome_cookies_secure_1 = require("chrome-cookies-secure");
const puppeteer_1 = require("langchain/document_loaders/web/puppeteer");
let TestService = class TestService {
    constructor() { }
    async analyzeImage() {
        const URL = "https://ieeexplore.ieee.org/abstract/document/9136589";
        const getCookies = (callback) => {
            chrome_cookies_secure_1.default.getCookies("https://ieeexplore.ieee.org/", 'puppeteer', function (err, cookies) {
                if (err) {
                    console.log(err, 'error');
                    return;
                }
                console.log(cookies, 'cookies');
                callback(cookies);
            }, 'Profile 2');
        };
        getCookies(async (cookies) => {
            const loader = new puppeteer_1.PuppeteerWebBaseLoader("", {
                gotoOptions: {
                    waitUntil: 'domcontentloaded',
                },
                async evaluate(page, browser) {
                    await page.setCookie(...cookies);
                    await page.goto(URL, { waitUntil: "domcontentloaded" });
                    const html = await page.content();
                    return html;
                }
            });
            await loader.load();
        });
        const model = new openai_1.OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "gpt-4-vision-preview"
        });
    }
};
TestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=test.service.js.map