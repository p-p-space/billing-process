'use client';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
// Internal app
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

  const getApp = () => {
    const delApp: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/prueba`,
      method: 'get',
    };

    mutate(delApp);
  };

  const postApp = () => {
    const delApp: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/prueba`,
      method: 'post',
      dataRequest: { userName: 'yayita', password: '123' },
    };

    mutate(delApp);
  };

  const putApp = () => {
    const delApp: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/prueba`,
      method: 'put',
      dataRequest: { userId: 'dfgdfgdfhdfgdfgdf-456464dfg4564' },
    };

    mutate(delApp);
  };

  const patchApp = () => {
    const delApp: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/prueba`,
      method: 'patch',
      dataRequest: { name: 'Juan Pérez' },
    };

    mutate(delApp);
  };

  const delApp = () => {
    const delApp: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/prueba`,
      method: 'delete',
    };

    mutate(delApp);
  };

  const noFound = () => {
    const noFound: RequestContent = {
      pathUrl: `${apiPaths.cardsSolApi}/debit`,
      method: 'post',
      dataRequest: {
        cardNumber: '1234567890123456',
        expirationDate: '12/22',
        cvv: '  123',
      },
    };

    mutate(noFound);
  };

  const carDetail = () => {
    const carDetail: RequestContent = {
      pathUrl: `${apiPaths.cardsSolApi}/cards/${'4a6f51f0-25a7-4fe8-81fa-050b473ffb21'}`,
      method: 'get',
    };

    mutate(carDetail);
  };

  const getSuccess = () => {
    const dataGet: RequestContent = {
      pathUrl: `${apiPaths.customersApi}/onboarding/validate?consultantCode=000650714&countryCode=PE`,
      method: 'get',
    };

    mutate(dataGet);
  };

  const getFail = () => {
    const dataGet: RequestContent = {
      pathUrl: `${apiPaths.customersApi}/onboarding/validate?consultantCode=650714&countryCode=PE`,
      method: 'get',
    };

    mutate(dataGet);
  };

  const postSuccess = () => {
    const dataPOst: RequestContent = {
      pathUrl: `${apiPaths.customersApi}/users/credentials`,
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
      pathUrl: `${apiPaths.customersApi}/users/credentials`,
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
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={getApp}>
        GET aplication
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={postApp}>
        POST aplication
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={putApp}>
        PUT aplication
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={patchApp}>
        PATH aplication
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={delApp}>
        DELETE aplication
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={noFound}>
        No found services
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={carDetail}>
        card detail services
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={getSuccess}>
        GET success services
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={getFail}>
        GET fail services
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={postSuccess}>
        POST success services
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={postFail}>
        POST fail services
      </Button>
    </>
  );
}
