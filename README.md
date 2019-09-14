## Preview

![](https://raw.githubusercontent.com/bearkfear/web-scraping-with-cloud-functions/master/images/1.png)

## About

This is a super amazing integration where I use Puppeteer (Google Chrome Headless) to Scrap the Web and Google Firebase Cloud Functions (GFCF), the page that I used on this example is: [imdb page](https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250). 

Observations: Firebase does not allow redirection of external links in the Spark plan. So to make it work you need a bigger plan. I recommend Blaze (page what to use)

## Get Started

npm dependencies:

- npm
- firebase-tools
- run `npm i` on functions folder

To run local: `npm run serve`

To run on server: `firebase deploy`

Need run `firebase-login` and intialize a project with **TypeScript**
