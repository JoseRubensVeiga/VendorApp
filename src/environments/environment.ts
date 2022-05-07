const baseURL = 'https://api.vendor.planos.in/api/v1';

export const environment = {
  production: false,

  api: {
    auth: `${baseURL}/auth`,
    settings: `${baseURL}/settings`,
    proposal: `${baseURL}/proposta`,
  },
};
