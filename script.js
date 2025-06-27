let materiais = JSON.parse(localStorage.getItem('materiais')) || [];

function renderizarTabela() {
  const tabela = document.getElementById('tabela-materiais');
  tabela.innerHTML = '';

  materiais.forEach((material, index) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${material.nome}</td>
      <td>${material.quantidade}</td>
      <td>${material.categoria}</td>
      <td>
        <button onclick="editarMaterial(${index})">Editar</button>
        <button onclick="deletarMaterial(${index})">Deletar</button>
      </td>
    `;
    tabela.appendChild(linha);
  });

  localStorage.setItem('materiais', JSON.stringify(materiais));
}

document.getElementById('form-material').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const quantidade = document.getElementById('quantidade').value;
  const categoria = document.getElementById('categoria').value;

  materiais.push({ nome, quantidade, categoria });
  renderizarTabela();
  this.reset();
});

function deletarMaterial(index) {
  materiais.splice(index, 1);
  renderizarTabela();
}

function editarMaterial(index) {
  const material = materiais[index];
  document.getElementById('nome').value = material.nome;
  document.getElementById('quantidade').value = material.quantidade;
  document.getElementById('categoria').value = material.categoria;

  materiais.splice(index, 1); // Remove o material antigo
  renderizarTabela();
}

renderizarTabela();