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
const ECHO_SERVER = 'http://localhost:8083'
const TEST_HOME =
  'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending'
const BOT_TEST = 'https://bot.sannysoft.com/'
const LINKEDIN_REFERRAL = 'https://www.google.com/'
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
      'sec-ch-ua':
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Chrome OS"',
      'upgrade-insecure-requests': '1',
      'user-agent': `${randomUserAgent}`,
      'Accept':
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'sec-fetch-site': 'none',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-user': '?1',
      'sec-fetch-dest': 'document',
      referer: `${LINKEDIN_REFERRAL}`,
      'accept-encoding': 'gzip, deflate, br ',
      'accept-language': 'en-US,en;q=0.9 ',
    })
    //console.log((await page.goto(TEST_HOME)).request().headers())
    await page.goto(ECHO_SERVER)
    await new Promise((resolve) => setTimeout(resolve, 10000))
    await page.screenshot({ path: 'header.png', fullPage: true })
    await page.goto(TEST_HOME)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    await page.screenshot({ path: 'example.png', fullPage: true })
  } catch (error) {
    console.error('Jobs scrape failed', error)
  } finally {
    await browser.close()
    // proxyChain.closeAnonymizedProxy(newProxyUrl, true)
  }
}

run()
