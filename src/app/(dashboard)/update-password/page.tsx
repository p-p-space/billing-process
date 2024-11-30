import { Card } from '@mui/material';
//Internal app
import { FormUpdatePassword } from '@/components';

export default function UpdatePasswordPage() {
  return (
    <Card sx={{ alignItems: 'center', maxWidth: 400 }}>
      <FormUpdatePassword />
    </Card>
  );
}
