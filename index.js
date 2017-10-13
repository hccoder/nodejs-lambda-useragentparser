'use strict'

exports.handler = (event, context, callback) => {
  if (undefined === event.userAgent)
    callback( new Error('userAgent is not provided') )

  let result = {
    isMobile: isMobile(event.userAgent),
    browser: getBrowser(event.userAgent)
  }
  
  callback(null, result);
};

function isMobile(userAgent) {
  let pattern = new RegExp("/.*(iPhone OS|Android|BlackBerry).*/")

  return pattern.test(userAgent)
}

function getBrowser(userAgent) {
  if (userAgent.indexOf('Chrome') !== -1)
    return 'Google Chrome'

  if (userAgent.indexOf('Safari') !== -1)
    return 'Safari'

  return 'unknown'
}