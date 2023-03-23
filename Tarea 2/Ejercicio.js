//Haciendo uso de selenium o la herramienta de testing de su preferencia:
//- Abra google y realice la búsqueda de Aid for Aids.
//- Obtenga todos los resultados de búsqueda mostrados y valide cuantos pertenecen al dominio 
//[aidforaids.org](http://aidforaids.org/) (Puede enfocarse en los resultados de la primera página).
//-Valide que el número de resultados de [aidforaids.org](http://aidforaids.org/) sea mayor a cero.
//Navegue a cada enlace perteneciente al dominio de aidforaids.org encontrado y confirme que se muestre el título, 
//ingrese a uno de los items del menú de navegación superior (Debe ser diferente en cada iteración) y confirme que cargan sin generar algún error.

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    
    await driver.get('https://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Aid for Aids', Key.RETURN);

    await driver.wait(until.elementLocated(By.css('#search')));

    let results = await driver.findElements(By.css('.g'));
    let count = 0;

    for (let result of results) {
      let link = await result.findElement(By.css('a')).getAttribute('href');
      if (link.includes('aidforaids.org')) {
        count++;

        await driver.navigate().to(link);
        let pageTitle = await driver.getTitle();
        console.log(`Página ${count}: Título: ${pageTitle}`);

        let menuItems = await driver.findElements(By.css('.nav-primary li a'));
        if (menuItems.length > 0) {
          let randomIndex = Math.floor(Math.random() * menuItems.length);
          await menuItems[randomIndex].click();
          await driver.wait(until.urlContains(menuItems[randomIndex].getAttribute('href')), 5000);
          console.log(`Página ${count}: Menú: ${await driver.getTitle()}`);
        }
      }
    }
    
    if (count > 0) {
      console.log(`Se encontraron ${count} resultados que pertenecen al dominio aidforaids.org`);
    } else {
      console.log('No se encontraron resultados para el dominio aidforaids.org');
    }

  } finally {
    await driver.quit();
  }
})();
