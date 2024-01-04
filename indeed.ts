const playwright = require('playwright')

const BASE_URL = 'https://www.indeed.com/'

console.log(BASE_URL) 

;(async() =>{
    for (const browserType of ['chromium', 'firefox',  'webkit']){
       const browser = await playwright[browserType].launch({headless: true})
       const context = await browser.newContext()
       const page = await context.newPage()
       await page.setDefaultTimeout(20000)
       //await page.setViewportSize({width: 800, height: 600})
       await page.goto(BASE_URL)
       await browser.close()
       }
    })().catch((error) => {
        console.log(error)
        process.exit(1)
    })