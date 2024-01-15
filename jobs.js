if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const puppeteer = require('puppeteer-extra')
const proxyChain = require('proxy-chain')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const UserAgent = require('user-agents')
const { createUserAgentsArray, assignNewUserAgent } = require('./helper')

puppeteer.use(StealthPlugin())

const INDEED_HOMEPAGE = ''
const TEST_HOME = 'https://www.whatismyip.com/'
const BOT_TEST = 'https://bot.sannysoft.com/'
const LINKEDIN_REFERRAL =
  'https://www.google.com/search?q=front+end+engineer+jobs+linkedin+remote'
let randomUserAgentsArray = createUserAgentsArray(20)

async function run() {
  //const oldProxyUrl = `http://${process.env.PROXY_USER}:${process.env.PROXY_PASS}_country-UnitedStates@24.199.75.16:31112`

  //const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl)
  //console.log(newProxyUrl)

  const browser = await puppeteer.launch({
    headless: true,
    // args: [`--proxy-server=${newProxyUrl}`],
  })
  try {
    const page = await browser.newPage()

    const randomUserAgent = assignNewUserAgent(randomUserAgentsArray)
    await page.setUserAgent(randomUserAgent)
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US',
      'Accept-Encoding': 'gzip, deflate, br ',
      'Accept':
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Referer': `${LINKEDIN_REFERRAL}`,
    })
    console.log((await page.goto(BOT_TEST)).request().headers())
    await page.goto(BOT_TEST)
    await new Promise((resolve) => setTimeout(resolve, 10000))
    await page.screenshot({ path: 'example.png', fullPage: true })
  } catch (error) {
    console.error('Jobs scrape failed', error)
  } finally {
    await browser.close()
    // proxyChain.closeAnonymizedProxy(newProxyUrl, true)
  }
}

run()
