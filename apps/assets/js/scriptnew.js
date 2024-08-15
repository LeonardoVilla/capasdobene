const scriptURL = 'https://script.google.com/macros/s/AKfycbytD6we6zvOKY57p9rnZzbtpwSoKd8t3j0u99JpSmmdry_E0Pl9cUVscCWa-5S9yd_W/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
  e.preventDefault();

  // Captura dos dados pelos IDs
  //capa	capas	nomecapa	envio	pagamento	nomecliente	emailcliente	telefonecliente
  const data = {
    campo1: document.getElementsByName('capa')[0].value,
    campo2: document.getElementById('capas').value,
    campo3: document.getElementById('nomecapa').value,
    campo4: document.getElementById('envio').value,
    campo5: document.getElementById('pagamento').value,
    campo6: document.getElementById('nomecliente').value,
    campo7: document.getElementById('emailcliente').value,
    campo8: document.getElementById('telefonecliente').value,
    // Adicione outros campos conforme necessário
  };

  console.log(data);

  // Envio dos dados
  fetch(scriptURL, { method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => {
    alert("Dados Cadastrados com Sucesso!");
  })
  .catch(error => console.error('Error!', error.message));
});