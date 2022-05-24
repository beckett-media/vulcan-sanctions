export default () => ({
  prod: {
    api_port: 5100,
    complyadvantage: {
      api_key: process.env.COMPLY_ADVANTAGE_API_KEY,
      base_url: 'https://api.us.complyadvantage.com',
      fuzziness: 0.8,
      sanction_types: ['sanction', 'warning', 'pep'],
    },
  },
  stage: {
    api_port: 4100,
    complyadvantage: {
      api_key: process.env.COMPLY_ADVANTAGE_API_KEY,
      base_url: 'https://api.us.complyadvantage.com',
      fuzziness: 0.8,
      sanction_types: ['sanction', 'warning', 'pep'],
    },
  },
  awsdev: {
    api_port: 3100,
    complyadvantage: {
      api_key: process.env.COMPLY_ADVANTAGE_API_KEY,
      base_url: 'https://api.us.complyadvantage.com',
      fuzziness: 0.8,
      sanction_types: ['sanction', 'warning', 'pep'],
    },
  },
  dev: {
    api_port: 3100,
    complyadvantage: {
      api_key: process.env.COMPLY_ADVANTAGE_API_KEY,
      base_url: 'https://api.us.complyadvantage.com',
      fuzziness: 0.8,
      sanction_types: ['sanction', 'warning', 'pep'],
    },
  },
});
