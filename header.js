const chromeHeader = (userAgentDetails) => {
  return {
    'sec-ch-ua':
      '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Chrome OS"',
    'upgrade-insecure-requests': '1',
    'user-agent': `${userAgentDetails}`,
    'Accept':
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    referer: 'https://www.google.com/', //`${LINKEDIN_REFERRAL}`,
    'accept-encoding': 'gzip, deflate, br ',
    'accept-language': 'en-US,en;q=0.9 ',
  }
}

module.exports = { chromeHeader }
