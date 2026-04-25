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
        alert("Por favor, deem um nome ao vosso grupo!");
        return;
    }

    // Validação simples (A senha secreta)
    if (codigo.includes("printf") && codigo.includes("scanf") && codigo.includes("main")) {
        alert(`💥 KABUM! 💥\n\nOlá Grupo ${nome}! O vosso programa rodou perfeitamente.`);
        gerarCertificado(nome);
        
        // --- O GRANDE FINAL ---
        // Esconde o terminal e mostra a tela de conclusão
        document.getElementById('fase-terminal').style.display = 'none';
        document.getElementById('fase-conclusao').style.display = 'block';
        
    } else {
        alert("⚠️ Erro na compilação: O código parece incompleto ou com erros de sintaxe C. Revejam as peças!");
    }
});

// Botão para reiniciar a missão para o próximo grupo
document.getElementById('btn-reiniciar').addEventListener('click', function() {
    location.reload(); // Recarrega a página voltando tudo ao zero
});

// Geração do Certificado em PDF
function gerarCertificado(nomeGrupo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4'); // 'l' para paisagem (landscape)

    // Moldura Azul
    doc.setDrawColor(0, 51, 153);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Título da Instituição
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 51, 153);
    doc.text("UNIVERSIDADE ESTÁCIO", 148, 40, null, null, "center");
    
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text("PROGRAMA DE EXTENSÃO UNITÁRIA - ABP", 148, 50, null, null, "center");

    // Corpo do Certificado
    doc.setFont("times", "italic");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Certificamos que o grupo", 148, 80, null, null, "center");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text(nomeGrupo.toUpperCase(), 148, 105, null, null, "center");

    doc.setFont("times", "normal");
    doc.setFontSize(18);
    doc.text("concluiu com êxito o desafio de Programação de Software Básico", 148, 130, null, null, "center");
    doc.text("integrando lógica física e execução em linguagem C.", 148, 140, null, null, "center");

    // Assinatura e Projeto
    doc.setFontSize(12);
    doc.text("__________________________", 148, 170, null, null, "center");
    doc.text("Coordenação de Projetos - Monte Sinai", 148, 178, null, null, "center");

    doc.save(`Certificado_Estacio_${nomeGrupo}.pdf`);
}
