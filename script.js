
// Função para gerar PIX
async function gerarPIX() {
    const value = document.getElementById('value').value;
    const valueInCentavos = value * 100; // Convertendo para centavos

    // Dados para a requisição da API PushinPay
    const data = {
        value: valueInCentavos,
        webhook_url: "https://seu-site.com/webhook",  // Substitua pelo seu URL de webhook
        split_rules: []  // Regras de divisão, se necessário
    };

    try {
        const response = await fetch('https://api.pushinpay.com.br/api/pix/cashIn', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer SEU_TOKEN',  // Substitua pelo seu token da API
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.qr_code_base64) {
            // Exibir o QR Code
            document.getElementById('qrCodeContainer').innerHTML = `<img src="data:image/png;base64,${result.qr_code_base64}" alt="QR Code PIX">`;
            document.getElementById('pixCode').value = result.qr_code;
        } else {
            alert("Erro ao gerar o pagamento via PIX.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na comunicação com a API.");
    }
}
