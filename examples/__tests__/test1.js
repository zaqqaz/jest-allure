const { Severity } = require("jest-allure/dist/Reporter");

const timeout = 5000;

describe(
    '/ (Home Page)',
    () => {
        let page;

        beforeAll(async () => {
            page = await global.__BROWSER__.newPage();
            await page.goto('https://google.com');
        }, timeout);

        afterAll(async () => {
            await page.close();
        });

        it('should load without error', async () => {
            reporter
                .description("Home Page test suite")
                .story("GOOGL-01")
                .severity(Severity.Critical)
                .testId('TEST-01');

            const text = await page.evaluate(() => document.body.textContent);

            reporter.startStep("Check that home page contain google");
            expect(text).toContain('google');
            reporter.endStep();

            reporter.startStep("Make a screenshot");
            const screenshot = await page.screenshot();
            reporter.addAttachment("Home Page", screenshot, "image/png");
            reporter.endStep();
        })
    },
    timeout
);
