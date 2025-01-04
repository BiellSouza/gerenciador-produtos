import React, { useState } from "react";
import Card from "../components/CardsFunctions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar IDs únicos

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
  const [productList, setProductList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    categoria: "",
    quantidade: "",
    preco: "",
  });
  const [currentEditProduct, setCurrentEditProduct] = useState(null);

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
        product.id === currentEditProduct.id
          ? { ...currentEditProduct }
          : product
      )
    );
    setEditModalOpen(false);
  };

//   const handleDelete = () => {
//     setProductList((prev) =>
//       prev.filter((product) => product.id !== productToDelete.id)
//     );
//     setDeleteModalOpen(false); // Fecha o modal após a exclusão
//   };

  return (
    <div
      id="next-section"
      className="flex flex-col justify-center items-center min-h-screen"
    >
      <div className="flex flex-wrap gap-4 w-full justify-center">
        <Card
          title={<p>Adicionar Item</p>}
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
              xmlns="http://www.w3.org/2000/svg"
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
              xmlns="http://www.w3.org/2000/svg"
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
        </Box>
      </Modal>

      {/* Modal de Exclusão de Produto */}
      {/* <Modal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        aria-labelledby="modal-delete-title"
        aria-describedby="modal-delete-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-delete-title" variant="h6" component="h2">
            Tabela de Produtos - Exclusão
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
                  <td className="border border-gray-300 p-2">{product.categoria}</td>
                  <td className="border border-gray-300 p-2">{product.quantidade}</td>
                  <td className="border border-gray-300 p-2">{product.preco}</td>
                  <td className="border justify-center items-center border-gray-300 p-2">
                    <Button
                      className="w-full"
                      onClick={() => setProductToDelete(product)} // Definir o produto para exclusão
                      variant="contained"
                      color="error"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={closeDeleteModal}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete} // Chama a função de exclusão
              variant="contained"
              color="error"
            >
              Excluir Produto
            </Button>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
}

export default Dashboard;
