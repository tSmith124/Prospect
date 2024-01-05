const puppeteer = require('puppeteer')

const INDEED_HOMEPAGE = ''
const TEST_HOME = 'https://pptr.dev/'

async function run() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(TEST_HOME)
  await page.screenshot({ path: 'example.png', fullPage: true })
  await browser.close()
}

run()
