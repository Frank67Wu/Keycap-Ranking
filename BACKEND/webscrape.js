const puppeteer = require('puppeteer')
const fs = require('fs')

const ignore = ["CMYK", "Dark-Grey", "RGBY", "LED"]
const ignoreKeywords = ["Novel", "Add", "Extension", "Pack", "Mod", "Logo", "Accent"]

const scrape = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://matrixzj.github.io/docs/gmk-keycaps')

    const text = await page.evaluate(() => Array.from(document.querySelectorAll(".navigation-list-link"), element => element.textContent));
    const text2 = text.filter(e => !ignoreKeywords.some(el => e.includes(el)) && !ignore.some(l => e.includes(l)) || e.includes("Modern"))
    

    const links = await page.evaluate(() => Array.from(document.querySelectorAll(".navigation-list-link"), element => element.href));
    const links2 = links.filter(e => !ignoreKeywords.some(el => e.includes(el)) && !ignore.some(l => e.includes(l)) || e.includes("Modern"))

    GMK = text2.findIndex(e => e == "GMK Standard Color Codes")
    text2.splice(0, GMK + 1)
    links2.splice(0, GMK + 1)
    DSA = text2.findIndex(e => e == "DSA Keycaps")
    text2.splice(DSA, text2.length)
    links2.splice(DSA, links2.length)
    

    let file = fs.createWriteStream('listOfKeycaps.txt')
    text2.forEach(e => file.write(e + '\n'))
    file = fs.createWriteStream('listOfLinks.txt')
    links2.forEach(e => file.write(e + '\n'))


    let data = []
    for (i = 0; i < 20; i++) {
        await page.goto(links2[i])
        let tempdata = await page.evaluate(() => Array.from(document.querySelectorAll("div.main-content ul li"), element => element.innerText));
        console.log(i)
        data.push(tempdata[7])
    }

    file = fs.createWriteStream('listOfGBtimes.txt')
    data.forEach(e => file.write(e + '\n'))


}

scrape()

