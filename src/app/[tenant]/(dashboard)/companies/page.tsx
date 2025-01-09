'use client';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
// Internal App
import { apiPaths } from '@/constans';
import { useBrowserRequest } from '@/hooks';
import { RequestContent } from '@/interfaces';

export default function CompaniesPage() {
  const { createBrowserRequest } = useBrowserRequest();

  const { mutate } = useMutation({
    mutationFn: createBrowserRequest,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const noFound = () => {
    const noFound: RequestContent = {
      pathUrl: `${apiPaths.cardSolutionPath}/debit`,
      method: 'post',
      dataRequest: {
        cardNumber: '1234567890123456',
        expirationDate: '12/22',
        cvv: '  123',
      },
    };

    mutate(noFound);
  };

  const getSuccess = () => {
    const dataGet: RequestContent = {
      pathUrl: `${apiPaths.customerPath}/onboarding/validate?consultantCode=000650714&countryCode=PE`,
      method: 'get',
    };

    mutate(dataGet);
  };

  const getFail = () => {
    const dataGet: RequestContent = {
      pathUrl: `${apiPaths.customerPath}/onboarding/validate?consultantCode=650714&countryCode=PE`,
      method: 'get',
    };

    mutate(dataGet);
  };

  const postSuccess = () => {
    const dataPOst: RequestContent = {
      pathUrl: `${apiPaths.customerPath}/users/credentials`,
      method: 'post',
      dataRequest: {
        userId: 'b2da31b6-15d6-4fd7-bbb4-4485bb9dba7e',
        password: '+JxyYGdP0ZMs8ZM33cn/PQ==',
      },
    };

    mutate(dataPOst);
  };

  const postFail = () => {
    const dataPOst: RequestContent = {
      pathUrl: `${apiPaths.customerPath}/users/credentials`,
      method: 'post',
      dataRequest: {
        userId: 'b2da31b6-15d6-4fd7-bbb4-2585bb9dba7e',
        password: '+JxyYGdP0ZMs8ZM33cn/PQ==',
      },
    };

    mutate(dataPOst);
  };

  return (
    <>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={noFound}>
        No found
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={getSuccess}>
        GET success
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={getFail}>
        GET fail
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={postSuccess}>
        POST success
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={postFail}>
        POST fail
      </Button>
    </>
  );
}
