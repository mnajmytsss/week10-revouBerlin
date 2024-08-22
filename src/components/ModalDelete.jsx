/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteCategoryModal = ({ open, handleClose, handleConfirmDelete, categoryName }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Konfirmasi Penghapusan"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Apakah Anda yakin ingin menghapus kategori <strong>{categoryName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Batal
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryModal;
