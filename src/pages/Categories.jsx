import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CategoryCard from '../components/Card';
import ModalTambahCategory from '../components/ModalAdd';
import ModalEditCategory from '../components/ModalEdit';
import DeleteCategoryModal from '../components/ModalDelete';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCreateNew = (category) => {
    axios.post('http://localhost:8080/categories', category)
      .then((response) => {
        setCategories([...categories, response.data]);
        setIsTambahModalOpen(false);
      })
      .catch((error) => {
        console.error('Error adding category:', error);
      });
  };

  const handleEdit = (category) => {
    axios.put(`http://localhost:8080/categories/${category.id}`, category)
      .then(() => {
        setCategories(categories.map(cat => cat.id === category.id ? category : cat));
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error('Error updating category:', error);
      });
  };

  const handleOpenDeleteModal = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = () => {
    const { id } = selectedCategory;
    axios.delete(`http://localhost:8080/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.id !== id));
        console.log(`Deleted category with id: ${id}`);
        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Daftar Kategori
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsTambahModalOpen(true)}
        sx={{ mb: 4 }}
      >
        Buat Baru
      </Button>
      <div>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            namaKategori={category.name}
            deskripsi={category.description}
            onEdit={() => {
              setSelectedCategory(category);
              setIsEditModalOpen(true);
            }}
            onDelete={() => handleOpenDeleteModal(category)} 
          />
        ))}
      </div>
      <ModalTambahCategory
        open={isTambahModalOpen}
        onClose={() => setIsTambahModalOpen(false)}
        onSubmit={handleCreateNew}
      />
      <DeleteCategoryModal
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
        categoryName={selectedCategory?.name || ''}
      />
      {selectedCategory && (
        <ModalEditCategory
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialValues={selectedCategory}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
};

export default CategoryPage;
