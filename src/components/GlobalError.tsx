'use client';

import { Alert, AlertTitle, Snackbar } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function GlobalError() {
  const showModalError = useUiStore((state) => state.showModalError);

  const closeModalError = useUiStore((state) => state.closeModalError);

  const modalErrorObject = useUiStore((state) => state.modalErrorObject);

  return (
    <Snackbar
      sx={{ maxWidth: 533 }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={showModalError}
      autoHideDuration={3000}
      onClose={closeModalError}
    >
      <Alert variant="outlined" severity="error" sx={{ minWidth: 250, fontSize: 14 }} onClose={closeModalError}>
        <AlertTitle sx={{ fontWeight: 700, fontSize: 14 }}>
          {modalErrorObject && 'title' in modalErrorObject ? modalErrorObject.title : ''}
        </AlertTitle>
        {modalErrorObject && 'description' in modalErrorObject ? modalErrorObject.description : ''}
      </Alert>
    </Snackbar>
  );
}
