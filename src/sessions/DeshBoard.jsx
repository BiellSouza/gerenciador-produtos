import React, { useState } from "react";
import Card from "../components/CardsFunctions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { v4 as uuidv4 } from "uuid"; //Biblioteca para gerar IDs únicos

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isOpenTableModal, setTableModalOpen] = useState(false);
  const [isTableModalUpdateOpen, setTableModalUpdateOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeletModalOpen, setDeletModalOpen] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);


  const [editModalOpen, setEditModalButtonOpen] = useState(false); // Controle do modal
  const [productList, setProductList] = useState([]);

  const [isFilteredResultsModalOpen, setIsFilteredResultsModalOpen] =
    useState(false); // Para o modal de produtos filtrados

  const [addproductList, setAddProductList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    categoria: "",
    quantidade: "",
    preco: "",
  });

  const openAddModal = () => {
    setFormData({
      id: uuidv4(),
      nome: "",
      categoria: "",
      quantidade: "",
      preco: "",
    });
    setAddModalOpen(true);
  };

  const closeAddModal = () => setAddModalOpen(false);

  const openTableModal = () => setTableModalOpen(true);
  const closeTableModal = () => setTableModalOpen(false);

  const openTableModalUpdate = () => setTableModalUpdateOpen(true);
  const closeTableModalUpdate = () => setTableModalUpdateOpen(false);

  const openDeletModal = () => setDeletModalOpen(true);
  const closeDeletModal = () => setDeletModalOpen(false);

  const openEditModal = (product) => {
    setCurrentEditProduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProductList((prev) => [...prev, formData]);
    setAddModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setProductList((prev) =>
      prev.map((product) =>
        product.id === currentEditProduct.id ? currentEditProduct : product
      )
    );
    setEditModalOpen(false);
  };

  const handleEditOpen = (product) => {
    setCurrentEditProduct(product); // Define o produto sendo editado
    setEditModalOpen(true); // Abre o modal de edição
  };

  const [filters, setFilters] = useState({
    nome: '',
    categoria: '',
    precoMin: '',
    precoMax: '',
  });
  

  // Função para excluir itens
  const handleDelete = (id) => {
    setProductList((prev) => prev.filter((product) => product.id !== id));
  };

  // Abrir o modal de filtro
  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  // Fechar o modal de filtro
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  // Filtrar produtos e abrir o modal de resultados
  const handleFilter = () => {
    const filtered = productList.filter((product) => {
      return (
        (filters.nome === "" ||
          product.nome.toLowerCase().includes(filters.nome.toLowerCase())) &&
        (filters.categoria === "" ||
          product.categoria
            .toLowerCase()
            .includes(filters.categoria.toLowerCase())) &&
        (filters.precoMin === "" ||
          product.preco >= parseFloat(filters.precoMin)) &&
        (filters.precoMax === "" ||
          product.preco <= parseFloat(filters.precoMax))
      );
    });
    setFilteredProducts(filtered);
    setIsFilterModalOpen(false); // Fecha o modal de filtros
    setIsFilteredResultsModalOpen(true); // Abre o modal de resultados
  };

  // Fechar o modal de resultados filtrados
  const closeFilteredResultsModal = () => {
    setIsFilteredResultsModalOpen(false);
    setFilteredProducts([]); // Limpar resultados filtrados, se necessário
  };

  return (
    <div
      id="next-section"
      className="flex flex-col justify-center items-center min-h-screen pb-[200px] tela6:pb-[50px]"
    >
      <div className="flex flex-wrap gap-4 w-full justify-center">
        <Card
          title={<p>Adicionar Item</p>}
          icon={
            <svg
              xmlns="http:www.w3.org/2000/svg"
              width="101"
              height="101"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus"
              onClick={openAddModal}
              style={{ cursor: "pointer" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          }
        />
        <Card
          title={<p>Listar Itens</p>}
          icon={
            <svg
              xmlns="http:www.w3.org/2000/svg"
              width="101"
              height="101"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus"
              onClick={openTableModalUpdate}
              style={{ cursor: "pointer" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          }
        />
        <Card
          title={<p>Atualizar Item</p>}
          icon={
            <svg
              xmlns="http:www.w3.org/2000/svg"
              width="101"
              height="101"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus"
              onClick={openEditModal}
              style={{ cursor: "pointer" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          }
        />
        <Card
          title={<p>Excluir Item</p>}
          icon={
            <svg
              xmlns="http:www.w3.org/2000/svg"
              width="101"
              height="101"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus card-4"
              onClick={openDeletModal}
              style={{ cursor: "pointer" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          }
        />
        <Card
          title={<p>Filtrar Item</p>}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="101"
              height="101"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus card-4"
              onClick={openFilterModal}
              style={{ cursor: "pointer" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          }
        />
      </div>
      {/* Modal de Adicionar Item */}
      <Modal
        open={isAddModalOpen}
        onClose={closeAddModal}
        aria-labelledby="modal-add-title"
        aria-describedby="modal-add-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-add-title" variant="h6" component="h2">
            Adicionar Novo Produto
          </Typography>
          <form className="flex flex-col gap-4 mt-4">
            <label>
              Nome do Produto:
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>
            <label>
              Categoria:
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>
            <label>
              Quantidade:
              <input
                type="number"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>
            <label>
              Preço:
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>
            <div className="flex justify-end gap-2">
              <Button
                onClick={closeAddModal}
                variant="contained"
                color="secondary"
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} variant="contained" color="primary">
                Salvar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      {/* Modal da Tabela Listar Itens */}
      <Modal
        open={isTableModalUpdateOpen}
        onClose={closeTableModalUpdate}
        aria-labelledby="modal-table-title"
        aria-describedby="modal-table-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-table-title" variant="h6" component="h2">
            Tabela de Produtos
          </Typography>
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nome</th>
                <th className="border border-gray-300 p-2">Categoria</th>
                <th className="border border-gray-300 p-2">Quantidade</th>
                <th className="border border-gray-300 p-2">Preço</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 p-2">{product.id}</td>
                  <td className="border border-gray-300 p-2">{product.nome}</td>
                  <td className="border border-gray-300 p-2">
                    {product.categoria}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.quantidade}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.preco}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>

      {/* Modal de Edição */}
      <Modal
        open={isEditModalOpen}
        onClose={closeEditModal}
        aria-labelledby="modal-table-title"
        aria-describedby="modal-table-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-table-title" variant="h6" component="h2">
            Tabela de Produtos
          </Typography>
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nome</th>
                <th className="border border-gray-300 p-2">Categoria</th>
                <th className="border border-gray-300 p-2">Quantidade</th>
                <th className="border border-gray-300 p-2">Preço</th>
                <th className="border border-gray-300 p-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 p-2">{product.id}</td>
                  <td className="border border-gray-300 p-2">{product.nome}</td>
                  <td className="border border-gray-300 p-2">
                    {product.categoria}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.quantidade}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.preco}
                  </td>
                  <td className="border justify-center items-center border-gray-300 p-2">
                    <Button
                      className="w-full"
                      onClick={() => openEditModal(product)}
                      variant="contained"
                      color="primary"
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Se um produto estiver sendo editado, exibe o formulário de edição */}
          {currentEditProduct && (
            <Box mt={4}>
              <Typography id="modal-table-description" variant="h6">
                Editar Produto
              </Typography>
              <form className="flex flex-col gap-4 mt-4">
                <input
                  className="border border-gray-300 p-2"
                  name="nome"
                  value={currentEditProduct.nome}
                  onChange={handleEditChange}
                  placeholder="Nome"
                />
                <input
                  className="border border-gray-300 p-2"
                  name="categoria"
                  value={currentEditProduct.categoria}
                  onChange={handleEditChange}
                  placeholder="Categoria"
                />
                <input
                  className="border border-gray-300 p-2"
                  name="quantidade"
                  type="number"
                  value={currentEditProduct.quantidade}
                  onChange={handleEditChange}
                  placeholder="Quantidade"
                />
                <input
                  className="border border-gray-300 p-2"
                  name="preco"
                  type="number"
                  value={currentEditProduct.preco}
                  onChange={handleEditChange}
                  placeholder="Preço"
                />
                <Button
                  className="w-full"
                  onClick={handleEditSave}
                  variant="contained"
                  color="secondary"
                >
                  Salvar Alterações
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal
        open={isDeletModalOpen}
        onClose={closeDeletModal}
        aria-labelledby="modal-table-title"
        aria-describedby="modal-table-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-table-title" variant="h6" component="h2">
            Tabela de Produtos
          </Typography>
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nome</th>
                <th className="border border-gray-300 p-2">Categoria</th>
                <th className="border border-gray-300 p-2">Quantidade</th>
                <th className="border border-gray-300 p-2">Preço</th>
                <th className="border border-gray-300 p-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 p-2">{product.id}</td>
                  <td className="border border-gray-300 p-2">{product.nome}</td>
                  <td className="border border-gray-300 p-2">
                    {product.categoria}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.quantidade}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.preco}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Button
                      className="w-full"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>

      {/* Modal de Filtro */}
      {/* Modal de Filtro */}
      <Modal
        open={isFilterModalOpen}
        onClose={closeFilterModal}
        aria-labelledby="modal-filter-title"
        aria-describedby="modal-filter-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-filter-title" variant="h6" component="h2">
            Filtrar Produtos
          </Typography>
          <form className="flex flex-col gap-4 mt-4">
            <label>
              Nome do Produto:
              <input
                type="text"
                name="nome"
                value={filters.nome}
                onChange={(e) =>
                  setFilters({ ...filters, nome: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </label>
            <label>
              Categoria:
              <input
                type="text"
                name="categoria"
                value={filters.categoria}
                onChange={(e) =>
                  setFilters({ ...filters, categoria: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </label>
            <label>
              Preço Mínimo:
              <input
                type="number"
                name="precoMin"
                value={filters.precoMin}
                onChange={(e) =>
                  setFilters({ ...filters, precoMin: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </label>
            <label>
              Preço Máximo:
              <input
                type="number"
                name="precoMax"
                value={filters.precoMax}
                onChange={(e) =>
                  setFilters({ ...filters, precoMax: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </label>
            <div className="flex justify-end gap-2">
              <Button
                onClick={closeFilterModal}
                variant="contained"
                color="secondary"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleFilter}
                variant="contained"
                color="primary"
              >
                Filtrar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Modal de Produtos Filtrados */}
      <Modal
        open={isFilteredResultsModalOpen}
        onClose={closeFilteredResultsModal}
        aria-labelledby="modal-filter-results-title"
        aria-describedby="modal-filter-results-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-filter-results-title"
            variant="h6"
            component="h2"
          >
            Produtos Filtrados
          </Typography>
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nome</th>
                <th className="border border-gray-300 p-2">Categoria</th>
                <th className="border border-gray-300 p-2">Preço</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 p-2">{product.id}</td>
                  <td className="border border-gray-300 p-2">{product.nome}</td>
                  <td className="border border-gray-300 p-2">
                    {product.categoria}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.preco}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={closeFilteredResultsModal}
              variant="contained"
              color="secondary"
            >
              Fechar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;
