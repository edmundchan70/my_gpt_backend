import { Injectable } from '@nestjs/common';
import { OpenAI } from "langchain/llms/openai";
import chrome from "chrome-cookies-secure"
import { Browser, PuppeteerWebBaseLoader ,Page} from "langchain/document_loaders/web/puppeteer";
@Injectable()
export class TestService {
    constructor(){}
    async analyzeImage(){
        
        const URL ="https://ieeexplore.ieee.org/abstract/document/9136589"
       // const cookies = await chrome.getCookiesPromised("https://ieeexplore.ieee.org/", 'puppeteer', 'Profile 2')
        const getCookies = (callback) => {
            chrome.getCookies("https://ieeexplore.ieee.org/", 'puppeteer', function(err, cookies) {
                if (err) {
                    console.log(err, 'error');
                    return
                }
                console.log(cookies, 'cookies');
                callback(cookies);
            }, 'Profile 2') // e.g. 'Profile 2'
        }
        getCookies(async (cookies)=>{
            const loader = new PuppeteerWebBaseLoader("",{
                gotoOptions:{
                    waitUntil:'domcontentloaded',
                
                },
                
                async evaluate(page: Page, browser: Browser)  {
                    await page.setCookie(...cookies);
                    await page.goto(URL,{waitUntil:"domcontentloaded"});
                    const html = await page.content();
                    //console.log(html);
                    
                    return html;
                }
            });
            await loader.load();
           
        })
       
        const model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "gpt-4-vision-preview"
          })
         
         
    }

}
