document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var data = {};
    formData.forEach((value, key) => (data[key] = value));

    fetch('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbyCT08ZCbaICjYEjZlQ67PIvycHWtGlbTavI1p-YuNkb-XMtcMT9_uX26yRRWJERwuy/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Dados inseridos com sucesso!');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao inserir dados.');
        });
});
