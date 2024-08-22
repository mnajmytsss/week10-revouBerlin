/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nama kategori diperlukan'),
  description: Yup.string().required('Deskripsi diperlukan'),
});

const ModalTambahCategory = ({ open, onClose, onSubmit }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          borderRadius: '8px', 
          boxShadow: 24, 
          p: 4 
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Tambah Kategori Baru
        </Typography>
        <Formik
          initialValues={{ name: '', description: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field 
                  name="name" 
                  placeholder="Nama Kategori" 
                  style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
                />
                {errors.name && touched.name && (
                  <div style={{ color: 'red' }}>{errors.name}</div>
                )}
              </div>
              <div>
                <Field 
                  name="description" 
                  placeholder="Deskripsi" 
                  as="textarea" 
                  rows="4" 
                  style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
                />
                {errors.description && touched.description && (
                  <div style={{ color: 'red' }}>{errors.description}</div>
                )}
              </div>
              <Button type="submit" variant="contained" color="primary">
                Tambah
              </Button>
              <Button onClick={onClose} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                Batal
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ModalTambahCategory;
