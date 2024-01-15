const UserAgent = require('user-agents')

const generateUserAgent = new UserAgent({ deviceCategory: 'desktop' })

const createUserAgentsArray = (numOfUserAgents) => {
  const userAgents = Array(numOfUserAgents)
    .fill()
    .map(() => generateUserAgent().toString())
  return userAgents
}

const assignNewUserAgent = (userAgentArray) => {
  if (Array.isArray(userAgentArray) && userAgentArray.length) {
    return userAgentArray[Math.floor(Math.random() * userAgentArray.length)]
  }
}

module.exports = { createUserAgentsArray, assignNewUserAgent }
