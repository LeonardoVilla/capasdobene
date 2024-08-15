const scriptURL = 'https://script.google.com/macros/s/AKfycbytD6we6zvOKY57p9rnZzbtpwSoKd8t3j0u99JpSmmdry_E0Pl9cUVscCWa-5S9yd_W/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      alert("Dados Cadastrados com Sucessos!")
      console.log(new FormData(form))
    })
    .catch(error => console.error('Error!', error.message))
})

// URL do endpoint do seu script do Google Apps
//const scriptURL = 'https://script.google.com/macros/s/AKfycbytD6we6zvOKY57p9rnZzbtpwSoKd8t3j0u99JpSmmdry_E0Pl9cUVscCWa-5S9yd_W/exec';
//zonquinho
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
