import clienteAxios from '/src/config/axios';

const objectToFormData = (obj, form = new FormData(), namespace = '') => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) continue;
    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
      objectToFormData(obj[key], form, formKey);
    } else {
      form.append(formKey, obj[key]);
    }
  }

  return form;
};

const request = async (url, method = 'GET', sendData = null) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  let data = sendData;
  let headers = {
    Authorization: `Bearer ${token}`,
  };

  const hasFile = sendData && Object.values(sendData).some(
    val => val instanceof File || (Array.isArray(val) && val.some(v => v instanceof File))
  );

  if (hasFile) {
    data = objectToFormData(sendData);
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await clienteAxios({
      method,
      url: url,
      data: method !== 'GET' && method !== 'DELETE' ? data : null,
      headers,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      errors: error.response?.data?.errors || { message: 'Error de conexión' }
    };
  }
};

export default request;
