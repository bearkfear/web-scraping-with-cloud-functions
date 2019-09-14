import * as functions from 'firebase-functions';
import * as express from 'express';
import * as puppeteer from 'puppeteer';
const app = express();


/**
 * This function not works on Spark Plan (firebase)
 */

/**
 * Middleware: Get all routes and request to load browser
 */
app.all("*", async (req, res, next) => {

    // note: --no-sandbox is required in this env.
    // Could also launch chrome and reuse the instance
    // using puppeteer.connect();

    res.locals.browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })
    next();
})

app.get("/scrap", async function (request, response) {

    /**
     * Getting instance from middleware
     */
    const browser = response.locals.browser;

    try {
        /**
         * Creating a new tab on browser
         */
        const page = await browser.newPage();
        /**
         * Access to page requested
         */
        await page.goto('https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250');

        /**
         * Evaluating the page and got informations from there
         */
        const titles = await page.evaluate(function () {
            return Array.from(document.querySelectorAll("tbody.lister-list>tr>td.titleColumn>a")).map(item => item.innerHTML.trim())
        })

        /**
         * When success: return all titles
         */
        response.send({ titles });
    } catch (e) {
        /**
         * Send the error to client (server-side-error)
         */
        response.status(500).send({error: e.toString()});
    }

    /**
     * Close the browser
     */
    await browser.close();
})


/**
 * It's not necessary but i think is better prevent when got more access.
 */
const opts: functions.RuntimeOptions = {
    /**
     * The memmory of the function
     */
    memory: "2GB",
    /**
     * Time to end the request
     */
    timeoutSeconds: 60
}

/**
 * Exporting api like a function
 */
export const api = functions.runWith(opts).https.onRequest(app);