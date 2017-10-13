'use strict'

var expect = require('chai').expect;
var LambdaTester = require( 'lambda-tester' );
var userAgentParser = require('./index');

describe('Detect mobile device browsers in a simple JS function', function() {

  [
    { 
      testName: "chrome - mobile",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36",
      expectedResult: {
        isMobile: true,
        browser: "Google Chrome"
      }
    },
    {
      testName: "chrome - desktop",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
      expectedResult: {
        isMobile: false,
        browser: "Google Chrome"
      }
    },
    { 
      testName: "safari - mobile",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
      expectedResult: {
        isMobile: true,
        browser: "Safari"
      }
    },
    {
      testName: "safari - desktop",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
      expectedResult: {
        isMobile: false,
        browser: "Safari"
      }
    },
    {
      testName: "safari - blackberry",
      userAgent: "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+",
      expectedResult: {
        isMobile: true,
        browser: "Safari"
      }
    }
  ].forEach(function(testData) {
    it('should return '+ testData.expectedResult.isMobile +' for user-agent: ' + testData.testName, function() {
      return LambdaTester( userAgentParser.handler )
        .event({ userAgent: testData.userAgent })
        .expectResult((result) => {
          expect(result).to.eql(testData.expectedResult)
        });
      });
  });

  it('should return error when user agent is not provided', function() {
    return LambdaTester( userAgentParser.handler )
      .event({})
      .expectError( ( err ) => {
        expect(err.message).to.equal('userAgent is not provided')
      });
  });

});