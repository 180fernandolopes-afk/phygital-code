// Inicia o Drag and Drop (SortableJS)
const listaBlocos = document.getElementById('blocos-lista');
new Sortable(listaBlocos, {
    animation: 150,
    ghostClass: 'sortable-ghost'
});

// A ordem correta das IDs que definimos no HTML
const ordemCorreta = ["1", "2", "3", "4", "5", "6"];

// Botão de Validar o Puzzle
document.getElementById('btn-validar').addEventListener('click', function() {
    // Pega todos os blocos na ordem atual
    const itens = listaBlocos.querySelectorAll('li');
    let ordemAtual = [];
    
    itens.forEach(item => {
        ordemAtual.push(item.getAttribute('data-id'));
    });

    // Compara as listas
    if (JSON.stringify(ordemAtual) === JSON.stringify(ordemCorreta)) {
        alert("✅ Lógica Perfeita! Sistema destravado.");
        document.getElementById('fase-puzzle').style.display = 'none';
        document.getElementById('fase-terminal').style.display = 'block';
    } else {
        alert("⚠️ Erro de sintaxe lógica. Tente reorganizar as peças!");
    }
});

// Botão de Compilar no Terminal
document.getElementById('btn-compilar').addEventListener('click', function() {
    const codigo = document.getElementById('codigo-input').value;
    const nome = document.getElementById('nome-grupo').value;

    if(nome === "") {
        alert("Por favor, dê um nome ao seu grupo!");
        return;
    }

    // Uma validação simples pra ver se eles digitaram o básico
    if (codigo.includes("printf") && codigo.includes("scanf") && codigo.includes("main")) {
        alert(`💥 KABUM! 💥\n\nOlá Grupo ${nome}! Seu programa rodou perfeitamente.`);
        gerarCertificado(nome);
    } else {
        alert("Erro na compilação: O código parece incompleto ou com erros de sintaxe C.");
    }
});

// Geração do Certificado em PDF
function gerarCertificado(nomeGrupo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(0, 102, 204);
    doc.text("CERTIFICADO DE INVENTOR", 105, 40, null, null, "center");
    
    doc.setFontSize(16);
    doc.setTextColor(51, 51, 51);
    doc.text(`Certificamos que o ${nomeGrupo}`, 105, 80, null, null, "center");
    doc.text("montou e compilou seu primeiro Software Básico em C", 105, 95, null, null, "center");
    
    doc.setFontSize(12);
    doc.text("Projeto Phygital Code - Extensão Universitária", 105, 130, null, null, "center");

    // Baixa o arquivo automaticamente
    doc.save(`Certificado_${nomeGrupo}.pdf`);
}
