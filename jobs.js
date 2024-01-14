if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const puppeteer = require('puppeteer-extra')
const proxyChain = require('proxy-chain')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const INDEED_HOMEPAGE = ''
const TEST_HOME = 'https://www.whatismyip.com/'
const BOT_TEST = 'https://bot.sannysoft.com/'

async function run() {
  const oldProxyUrl = `http://${process.env.PROXY_USER}:${process.env.PROXY_PASS}_country-UnitedStates@24.199.75.16:31112`

  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl)
  console.log(newProxyUrl)

  const browser = await puppeteer.launch({
    headless: true,
    args: [`--proxy-server=${newProxyUrl}`],
  })
  const page = await browser.newPage()
  await page.goto(BOT_TEST)
  await new Promise((resolve) => setTimeout(resolve, 10000))
  await page.screenshot({ path: 'example.png', fullPage: true })
  await browser.close()
  await proxyChain.closeAnonymizedProxy(newProxyUrl, true)
}

run()
