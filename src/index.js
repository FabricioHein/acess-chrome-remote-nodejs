const puppeteer = require("puppeteer");
const ReverseMd5 = require("reverse-md5");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const linkPesquisa =
    "https://sei.anm.gov.br/sei/modulos/pesquisa/md_pesq_processo_pesquisar.php?acao_externa=protocolo_pesquisar&acao_origem_externa=protocolo_pesquisar&id_orgao_acesso_externo=0";
  const page = await browser.newPage();
  page.on("console", (msg) => console.log(msg.text()));

  await page.goto(linkPesquisa);
  var selectorPesquisa = "#txtProtocoloPesquisa";
  var numberProcess = "856072";

  await page.exposeFunction("rev", async (value) => {

    var descriptoMd =  ReverseMd5({
      lettersUpper: false,
      lettersLower: true,
      numbers: true,
      special: false,
      whitespace: true,
      maxLen: 12,
    });

    var text = descriptoMd(value);
    console.log(text.str)
    return text.str;
    
  });
  
  await page.evaluate(
    async (selectorPesquisa, numberProcess) => {
      window.md5;

      var inputElemPesquisa = document.querySelector("#txtProtocoloPesquisa");      
      var mdnCaptchaMd5 = document.querySelector("#hdnCaptchaMd5");
      var txtCaptcha = document.querySelector("#txtCaptcha");
      
      var hast = window.rev(mdnCaptchaMd5.value)
      
     
      inputElemPesquisa.value = numberProcess;

   
   
      // return myHash
    },
    selectorPesquisa,
    numberProcess
  );

  // await browser.close();
})();
