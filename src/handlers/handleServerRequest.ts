const response = {
  code: '200.000',
  message: 'process ok',
  data: 'todo bien',
};

export async function handleServerRequest() {
  try {
    return response;
  } catch (error) {
    console.error('Error handling request:', error);
    throw error;
  }
}
