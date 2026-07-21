const impostosLucroPreumido = {
    ICMS:0.20,
    PIS:0.0065,
    COFINS:0.030,
    IRPJ:0.15,
    CSLL:0.09,
    presunsaoServico:0.32,//presunção para serviço serve também para Csll
    presunsaoComercio:0.08,//presunção para comercio
    presuncaoComercioCsll: 0.12,//presunção para o csll de comercio 
}


//Calculo do ICMS
function somaIcms(faturamentoLp){
     return Number(faturamentoLp * impostosLucroPreumido.ICMS)
    
} 
const icmsFaturamento = document.getElementById('faturamento')
const butonCalculoIcms = document.getElementById('bntCalcular')
const resulIcms = document.getElementById('resultadoIcms')

butonCalculoIcms.addEventListener('click', () => {
resulIcms.innerText =`Imposto: R$ ${somaIcms(icmsFaturamento.value).toFixed(2)}`
})


//Calculo dos imposos federais Lucro Presumido
function somarImpostoFederalLP(faturamentoLp){
   const VaPIS = faturamentoLp * impostosLucroPreumido.PIS;
     const VaCOFINS = faturamentoLp * impostosLucroPreumido.COFINS;
       return{
         pis: VaPIS,
           cofins: VaCOFINS,
  }
}
const pisCofinFatu = document.getElementById('fatuPisCofins')
const bottonPisCofins = document.getElementById('bntPisCofins')
const resulPisCofins = document.getElementById('resultadoPisCofins')

bottonPisCofins.addEventListener('click', () => {
    const resultado = somarImpostoFederalLP(pisCofinFatu.value)
    resulPisCofins.innerText = `Imposto: R$ ${resultado.pis.toFixed(2)} | Valor COFINS: R$ ${resultado.cofins.toFixed(2)}`
})


//Calculo impostos do IRPJ
//precisa ser informado o faturamento do trimestre
function calculoIrpjLp(fatuTrimestreLp, atividade) {
   if(atividade === "comercio"){
     let baseCalculo = fatuTrimestreLp * impostosLucroPreumido.presunsaoComercio;
       let VaIRPJ = baseCalculo * impostosLucroPreumido.IRPJ;
         let adicionalIRPJ = 0;
           if (baseCalculo > 60000) {
              adicionalIRPJ = (baseCalculo - 60000) * 0.10;
             }
               let VaToIrpj = VaIRPJ + adicionalIRPJ;//Valor total a pagar mais o adic de 10%
                 return VaToIrpj;

   } else if (atividade === "servico") {
     let baseCalculo = fatuTrimestreLp * impostosLucroPreumido.presunsaoServico;
       let VaIRPJ = baseCalculo * impostosLucroPreumido.IRPJ;
         let adicionalIRPJ = 0;
           if (baseCalculo > 60000) {
             adicionalIRPJ = (baseCalculo - 60000) * 0.10;
           }
               let VaToIrpj = VaIRPJ + adicionalIRPJ;//Valor total a pagar C/S os 10%
                 return VaToIrpj;
   } 
}

const fatuTrimestre = document.getElementById('faturamentoTri')
const atividade = document.getElementById('atividade')
const bntIrpj = document.getElementById('botaoIrpj')
const resulIrpj = document.getElementById('resultadoIrpj')

 bntIrpj.addEventListener('click', () => {
  const valorFaturamento = parseFloat(fatuTrimestre.value);

  const resultado = calculoIrpjLp(valorFaturamento, atividade.value);
  resulIrpj.textContent = `Imposto: R$ ${resultado.toFixed(2)}`;
});


//Calculo do CSLL
function calculoCsll(fatuTrimestreLp, atividade){
   if (atividade === "servico"){
     let baseCalculo = fatuTrimestreLp * impostosLucroPreumido.presunsaoServico;
       let valorCsll = baseCalculo * impostosLucroPreumido.CSLL;
           return valorCsll;

             } else if (atividade === "comercio") {
               let baseCalculo = fatuTrimestreLp * impostosLucroPreumido.presuncaoComercioCsll;
                 let ValorCsll = baseCalculo * impostosLucroPreumido.CSLL;
                   return ValorCsll;
                     } 
}

const faturaCsll = document.getElementById('faturamentoCsll')
const atividadeCsll= document.getElementById('atividadeCsll')
const bntCsll = document.getElementById('botaoCsll')
const resultadoCsll = document.getElementById('resultadoCsll')

 bntCsll.addEventListener('click', () => {
  const valorFaturamento = parseFloat(faturaCsll.value);

  const resultado = calculoCsll(valorFaturamento, atividade.value);
  resultadoCsll.textContent = `Imposto: R$ ${resultado.toFixed(2)}`;
});


function somarIsento (isentos){
  return Number(isentos) * 0.00925.toFixed(2)
}

const faturaIsento = document.getElementById('valorIsentos')
const bntIsen = document.getElementById('bntIsentos')
const valorPg = document.getElementById('valorPagar')

bntIsen.addEventListener('click', () => {
 valorPg.innerText = `Imposto: R$ ${somarIsento(faturaIsento.value)}`
})