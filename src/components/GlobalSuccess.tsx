'use client';

import { Alert, AlertTitle, Snackbar } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function GlobalSuccess() {
  const showModalSuccess = useUiStore((state) => state.showModalSuccess);

  const closeModalSuccess = useUiStore((state) => state.closeModalSuccess);

  const modalSuccessObject = useUiStore((state) => state.modalSuccessObject);

  return (
    <Snackbar
      sx={{ maxWidth: 533 }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={showModalSuccess}
      autoHideDuration={3000}
      onClose={closeModalSuccess}
    >
      <Alert variant="outlined" severity="success" sx={{ minWidth: 250, fontSize: 14 }} onClose={closeModalSuccess}>
        <AlertTitle sx={{ fontWeight: 700, fontSize: 14 }}>
          {modalSuccessObject && 'title' in modalSuccessObject ? modalSuccessObject.title : ''}
        </AlertTitle>
        {modalSuccessObject && 'description' in modalSuccessObject ? modalSuccessObject.description : ''}
      </Alert>
    </Snackbar>
  );
}
