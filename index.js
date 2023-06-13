import puppeteer from "puppeteer";
import fs from "fs/promises";

// Abrir pagina web.
const openWebPage = async () => {
  // Inicializa puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  // Abre nuevas instancia navegador
  const page = await browser.newPage();

  await page.goto("https://example.com/");

  await browser.close();
};

// openWebPage();

// Capturar pantalla pagina web.
const captureScreen = async () => {
  // Inicializa puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  // Abre nuevas instancia navegador
  const page = await browser.newPage();

  await page.goto("https://example.com/");
  await page.screenshot({ path: "example.png" });

  await browser.close();
};

// captureScreen();

// Navegar de una pagina a otra dando clicks.
const navigateTo = async () => {
  // Inicializa puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  // Abre nuevas instancia navegador
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");
  await page.click("a[href='/login']");
  await new Promise((r) => setTimeout(r, 5000));

  await browser.close();
};

// navigateTo();

// Analizar y mostrar los elementos de una pagina.
const getDataFromWeb = async () => {
  // Inicializa puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  // Abre nuevas instancia navegador
  const page = await browser.newPage();

  await page.goto("https://example.com/");

  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const description = document.querySelector("p").innerText;
    const link = document.querySelector("a").innerText;

    return {
      title,
      description,
      link,
    };
  });

  console.log(result);

  await browser.close();
};

// getDataFromWeb();

// Manejar datos dinamicos de una pagina.
const handleDynamicData = async () => {
  // Inicializa puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  // Abre nuevas instancia navegador
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    const data = [...quotes].map((quote) => {
      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.innerText
      );

      return {
        text,
        author,
        tags,
      };
    });
    return data;
  });

  // console.log(result);
  await fs.writeFile("frases.json", JSON.stringify(result, null, 2));

  await browser.close();
};

handleDynamicData();
