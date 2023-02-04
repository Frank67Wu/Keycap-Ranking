const puppeteer = require('puppeteer')
const fs = require('fs')
const axios = require('axios')

const ignore = ["CMYK", "Dark-Grey", "RGBY", "LED", "Spacekeys", "Camping" , "Burgundy R2", "Burgundy-R2", "Oblivion R2", "Oblivion-R2", , "9009 R3", "9009-R3", "8008", "Frost Witch", "Frost-Witch", "Wasabi", "Dolch R2", "Dolch-R2", "SKIDATA", "Shoko", "Bleach", "Dracula"]
const ignoreKeywords = ["Novel", "Add", "Extension", "Pack", "Mod", "Logo", "Accent", "R1"]

const removeRn = (arr, n) => {
    i = 0
    while (i < arr.length) {
        if (arr.includes(arr[i].replace("R" + n, "R" + n + 1))) {
            arr.splice(i, 1)
        }
    }
}

const scrape = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://matrixzj.github.io/docs/gmk-keycaps')

    const text = await page.evaluate(() => Array.from(document.querySelectorAll(".navigation-list-link"), element => element.textContent.replace('/', ' ')));
    const text2 = text.filter(e => !ignoreKeywords.some(el => e.includes(el)) && (!ignore.some(l => e.includes(l)) || e.includes("Modern") || e.includes("Camping R3") || e.includes("Camping-R3") || e.includes("Dracula-R2") || e.includes("Dracula R2") || e.includes("Wasabi-R2") || e.includes("Wasabi R2")))
    

    const links = await page.evaluate(() => Array.from(document.querySelectorAll(".navigation-list-link"), element => element.href));
    const links2 = links.filter(e => !ignoreKeywords.some(el => e.includes(el)) && (!ignore.some(l => e.includes(l)) || e.includes("Modern") || e.includes("Camping R3") || e.includes("Camping-R3") || e.includes("Dracula-R2") || e.includes("Dracula R2")|| e.includes("Wasabi-R2") || e.includes("Wasabi R2")))



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


    let dates = []
    let pictures = []
    for (i = 300; i < links2.length; i++) {
        console.log(i)

        await page.goto(links2[i])
        let tempdates = await page.evaluate(() => Array.from(document.querySelectorAll("div.main-content ul li"), element => element.innerText));
        let temppictures = await page.evaluate(() => Array.from(document.querySelectorAll("img"), element => element.currentSrc));
        pictures.push(temppictures[temppictures.length - 1])


        //let x = await page.goto(pictures[pictures.length - 1])
        //file = fs.createWriteStream('./images/' + text2[i] + '.png')
        /*file.write(await x.buffer(), (err) => {
            if (err) {console.log(err)}
        })*/
        dates.push(tempdates[7])
    }

    

    for (i = 300; i < links2.length ; i++) {
        let data = JSON.stringify({
            "name": text2[i],
            "gbStart": dates[i - 300].replace("GB Time: ", "").slice(0,10)
        })

        let config = {
            method: 'post',
            url: 'http://localhost:4000/api/keycaps/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };

        axios(config) 
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            
          })
          .catch(function (error) {
            console.log(error);
          });  
    }
    
    console.log("done")

}

scrape()



