function formatarDataHora() {
    const agora = new Date();

    // Obtém o ano, mês, dia, hora e minuto
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');

    // Formata a string no formato YYYY-MM-DDTHH:MM
    return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
}

// Obtém o valor formatado
const dataHoraFormatada = formatarDataHora();

// Define o valor do campo input
document.getElementById('dataHora').value = dataHoraFormatada;
