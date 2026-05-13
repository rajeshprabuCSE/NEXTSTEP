const { chromium } = require('playwright');

async function testAutomation() {

    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto('https://example.com');

    console.log("Website Opened Successfully");

    await browser.close();

}

testAutomation();