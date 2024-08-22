/* eslint-disable react/prop-types */
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

const CategoryCard = ({ id, namaKategori, deskripsi, onEdit, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '16px' }}>
      <Typography level="h5" component="h2">
        {namaKategori}
      </Typography>
      <Typography level="body1" component="p">
        {deskripsi}
      </Typography>
      <div style={{ marginTop: '8px' }}>
        <Button variant="solid" color="primary" onClick={() => onEdit(id)} sx={{ mr: 2 }}>
          Edit
        </Button>
        <Button variant="solid" color="danger" onClick={() => onDelete(id)}>
          Hapus
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
