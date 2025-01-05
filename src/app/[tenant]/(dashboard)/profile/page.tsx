import { Box, Card } from '@mui/material';
//Internal app
import { FormProfile, UserInfoProfile } from '@/components';

export default function ProfilePage() {
  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: 'primary.light',
          borderBottom: 0,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <UserInfoProfile />
        </Box>
      </Card>
      <Card sx={{ maxWidth: 400, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 0 }}>
        <FormProfile />
      </Card>
    </>
  );
}
