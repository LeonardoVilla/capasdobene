// Função para tratar requisições GET
function doGet(e) {
  if (!e) {
    e = { parameter: { capas: '' } }; // Simulação de parâmetros, para evitar alerta de erro ao clicar em Executar
  }
  var equipe = e.parameter.equipe;
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = 'Sheet1';
  var sheet = doc.getSheetByName(sheetName);


  if (sheet === null) {
    Logger.log("Planilha '" + sheetName + "' não encontrada.");
    // Lista todas as planilhas disponíveis para verificação
    var sheets = doc.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      Logger.log("Planilha disponível: " + sheets[i].getName());
    }
    // Retorna uma mensagem de erro
    return ContentService.createTextOutput(JSON.stringify({ error: "Planilha '" + sheetName + "' não encontrada." })).setMimeType(ContentService.MimeType.JSON);
  }

  var values = sheet.getDataRange().getValues();
  var saida = [];

  const agora = new Date();

  // Obtém uma string ISO 8601 (ex: "2024-07-12T15:30:25.000Z")
  const dataHoraISO = agora.toISOString();

  for (var i = 1; i < values.length; i++) {
    var row = {};
    row['data'] = values[i][0];
    row['capa'] = values[i][1];
    row['capas'] = values[i][2];
    row['nomecapa'] = values[i][3];
    row['envio'] = values[i][4];
    row['pagamento'] = values[i][5];
    row['nomecliente'] = values[i][6];
    row['emailcliente'] = values[i][7];
    row['telefonecliente'] = values[i][8];  // Possivelmente um erro, deveria ser values[i][7]?

    saida.push(row);
  }

  if (equipe != null) {
    var retornoDaSaida = saida.filter(obj => obj.Equipe && obj.Equipe.toLowerCase().includes(equipe.toLowerCase()));
    return ContentService.createTextOutput(JSON.stringify({ retornoDaSaida })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ saida })).setMimeType(ContentService.MimeType.JSON);
}
