if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const puppeteer = require('puppeteer')
const proxyChain = require('proxy-chain')

const INDEED_HOMEPAGE = ''
const TEST_HOME = 'https://pptr.dev/'

async function run() {
  const oldProxyUrl = `http://${process.env.PROXY_USER}:${process.env.PROXY_PASS}_country-UnitedStates@24.199.75.16:31112`

  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl)
  console.log(newProxyUrl)

  const browser = await puppeteer.launch({
    headless: true,
    args: [`--proxy-server=${newProxyUrl}`],
  })
  const page = await browser.newPage()
  await page.goto(TEST_HOME)
  await page.screenshot({ path: 'example.png', fullPage: true })
  await browser.close()
}

run()
