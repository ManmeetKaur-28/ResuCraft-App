import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export const htmlToPdf = async (htmlString) => {
    const executablePath = await chromium.executablePath;
    const browser = await puppeteer.launch({
        executablePath,
        args: [...chromium.args, "--no-sandbox"],
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
    });
    const page = await browser.newPage();

    await page.setContent(htmlString, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();
    return pdfBuffer;
};
