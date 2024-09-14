document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('passwords')) {
        document.getElementById('passwordTable').innerHTML = localStorage.getItem('passwords');
    }
});

document.getElementById('passwordForm').onsubmit = function(e) {
    e.preventDefault();
    
    const site = document.getElementById('site').value;
    const password = document.getElementById('password').value;
    const secretKey = 'secret-key';

    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    
    const row = `
        <tr>
            <td>${site}</td>
            <td><input type="password" value="${encryptedPassword}" readonly> <button class="show-hide" onclick="togglePassword(this)">Mostrar</button></td>
            <td><button onclick="deleteRow(this)">Excluir</button></td>
        </tr>`;
    
    document.getElementById('passwordTable').innerHTML += row;

    localStorage.setItem('passwords', document.getElementById('passwordTable').innerHTML);
    
    this.reset();
    document.getElementById('feedback').textContent = "Senha adicionada com sucesso!";
    setTimeout(() => document.getElementById('feedback').textContent = '', 3000);
};

function togglePassword(button) {
    const input = button.previousElementSibling;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? 'Ocultar' : 'Mostrar';
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    
    localStorage.setItem('passwords', document.getElementById('passwordTable').innerHTML);
}

// Função para imprimir a tabela
document.getElementById('printBtn').onclick = function() {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Imprimir Senhas</title>');
    printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 10px; border: 1px solid #ddd; } th { background-color: #f2f2f2; }</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h1>Senhas Salvas</h1>');
    printWindow.document.write(document.querySelector('table').outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};

