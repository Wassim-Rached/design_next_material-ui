import fs from "fs";
import cheerio from "cheerio";
import axios from "axios";

const url = "https://yakusokunoneverland.fandom.com/wiki/List_of_Characters";

let page;

try {
  page = fs.readFileSync("page.html", "utf8");
} catch (error) {
  page = await axios(url).then((res) => res.data);
  fs.writeFileSync("page.html", page, {});
}

const $ = cheerio.load(page);

const rows = $("#mw-content-text .mw-parser-output")
  .map((i, row) => {
    const tbody = $(row).find("table tbody").text();
    fs.writeFileSync("page.html", page, {});
    console.log(tbody);
    const caracters = tbody.map((__, caracter) => {
      const who = $(caracter).find("th").text();
      return who;
    });

    return caracters;
  })
  .get();

console.log(caracters);
