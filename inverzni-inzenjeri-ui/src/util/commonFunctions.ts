export const appendParams = (
  params: URLSearchParams,
  paramsForAppend: Record<string, string>
) => {
  Object.keys(paramsForAppend).forEach((key) => {
    if (
      paramsForAppend[key] !== undefined &&
      paramsForAppend[key] !== null &&
      paramsForAppend[key] !== ""
    ) {
      params.append(`${key}`, paramsForAppend[key]);
    }
  });
};

export const createFormData = (object: any): FormData => {
  let formData = new FormData();

  for (const [key, value] of Object.entries(object)) {
    if (!!value) {
      // @ts-ignore
      formData.append(key, value);
    }
  }

  return formData;
};
