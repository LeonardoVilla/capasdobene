// URL do endpoint do seu script do Google Apps
const scriptURL = 'https://script.google.com/macros/s/AKfycbz-Me4gVhO2L9bVYv4h01kssWTTwbLkUp1vkREERPXGD4t0PB3rMYEaqAygR6RXu6Q/exec';

async function fetchData() {
  try {
    const response = await fetch(scriptURL);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados: ' + response.statusText);
    }
    const data = await response.json();
    displayData(data.saida);
  } catch (error) {
    console.error('Erro:', error);
  }
}

function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Limpa o conteúdo existente

  data.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.textContent = JSON.stringify(row);
    outputDiv.appendChild(rowDiv);
  });
}

/////////////
document.getElementById('getDataBtn').addEventListener('click', function() {
    fetch('https://script.google.com/macros/s/AKfycbz-Me4gVhO2L9bVYv4h01kssWTTwbLkUp1vkREERPXGD4t0PB3rMYEaqAygR6RXu6Q/exec') // Substitua pelo URL do seu script
      .then(response => response.json())
      .then(data => {
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  });

  ////////////////////
  // Função para tratar requisições GET
function doGet(e) {

    if (!e) {
      e = { parameter: { capas: '' } }; // Simulação de parâmetros
    }
  
    var capas = e.parameter.capas;
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('bene');
    var values = sheet.getDataRange().getValues();
  
    var saida = [];
    for (var i = 1; i < values.length; i++) {
      var row = {};
      row['Capas'] = values[i][1];
      row['Napa'] = values[i][2];
      row['Maca'] = values[i][3];
      row['Zapa'] = values[i][4];
      row['Chomba'] = values[i][5];
      row['Lompy'] = values[i][6];
      row['Pompa'] = values[i][7];
  
      saida.push(row);
    }
  
    if (capas != null) {
      var retornoDaSaida = saida.filter(obj => obj.Capas.toLowerCase().includes(capas.toLowerCase()));
      return ContentService.createTextOutput(JSON.stringify({ retornoDaSaida })).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ saida })).setMimeType(ContentService.MimeType.JSON);
  }
  
  
  // Função para tratar requisições POST
  function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const params = JSON.parse(e.postData.contents);
  
    // Inserir nova linha na planilha
    sheet.appendRow([params.coluna1, params.coluna2, params.coluna3, params.coluna4, params.coluna5, params.coluna6]);
  
    return ContentService.createTextOutput(JSON.stringify({ status: 'Sucesso' })).setMimeType(ContentService.MimeType.JSON);
  }

  ///////////////
  document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        capa: document.querySelector('input[name="flexRadioDefault"]:checked').value,
        nomecapa: document.getElementById('nomecapa').value,
        envio: document.getElementById('envio').value,
        pagamento: document.getElementById('pagamento').value,
        nomecliente: document.getElementById('nomecliente').value,
        emailcliente: document.getElementById('emailcliente').value,
        telefonecliente: document.getElementById('telefonecliente').value
    };
    console.log(formData);
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyCT08ZCbaICjYEjZlQ67PIvycHWtGlbTavI1p-YuNkb-XMtcMT9_uX26yRRWJERwuy/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

            
            
        });

        if (response.ok) {
            alert('Dados enviados com sucesso!');
        } else {
            alert('Erro ao enviar dados.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar dados.');
    }
});