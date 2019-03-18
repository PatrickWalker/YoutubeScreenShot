const puppeteer = require('puppeteer');

(async () => {

const browser = await puppeteer.launch();

const page = await browser.newPage();
//take this from command line
const url = 'https://www.youtube.com/watch?v=N24fVEJyQKM';
const interval = 1000;
await page.goto(url);
const video = await page.$('.html5-video-player')
await page.content();

let count = 0;
const currentEl =  await page.$('span.ytp-time-current');
const durEl = await page.$('span.ytp-time-duration');
console.log('Processing : ' + url);

setTimeout(async () => {
    await page.click('.html5-video-player')
    await page.keyboard.press('C');
    await page.keyboard.press('Space');

}
,interval)

let timerId = setInterval(async () => {
    const curTime =  await page.evaluate(el => el.innerText, currentEl);
    const durTime =  await page.evaluate(el => el.innerText, durEl);
    if ( curTime >= durTime){
        console.log('Finished processing video');
        browser.close();
        clearInterval(timerId);
        return;
    }

    video.screenshot({path: './screenshots/screenshot' + count +  '.png'});
    count++;
}
, interval);



})();
