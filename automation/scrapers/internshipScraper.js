require('dotenv').config();

const { chromium } = require('playwright');

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function scrapeInternships() {

    const browser = await chromium.launch({
        headless: false,
        slowMo: 100
    });

    const page = await browser.newPage();

    await page.goto('https://remoteok.com/remote-dev-jobs', {
        waitUntil: 'domcontentloaded'
    });

    await page.waitForTimeout(5000);

    const jobs = await page.$$eval('tr.job', rows => {

        return rows.slice(0, 10).map(job => {

            const title =
                job.querySelector('h2')?.innerText || 'No Title';

            const company =
                job.querySelector('h3')?.innerText || 'No Company';

            const link =
                job.querySelector('a')?.href || 'No Link';

            return {
                title,
                company,
                apply_link: link,
                source: 'RemoteOK',
                category: 'Internship'
            };

        });

    });

    console.log(jobs);

    const { data, error } = await supabase
        .from('opportunities')
        .insert(jobs);

    if (error) {

        console.log('Database Insert Error:', error);

    } else {

        console.log('Jobs Inserted Successfully');

    }

    await browser.close();

}

scrapeInternships();