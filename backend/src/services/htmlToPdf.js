import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const htmlToPdf = async (htmlString) => {
    const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath(),
        args: chromium.args,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
    });
    const page = await browser.newPage();

    await page.setContent(htmlString, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();
    return pdfBuffer;
};
