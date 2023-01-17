const puppeteer = require('puppeteer')

const scrape = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    console.log("HELLO")
    await page.goto('https://matrixzj.github.io/docs/gmk-keycaps')
    console.log("WFASD")
    

    
    console.log(page)

    
    
}

scrape()

