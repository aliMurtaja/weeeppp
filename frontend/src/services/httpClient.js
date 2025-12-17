import {
  getOverviewMock,
  getAppointmentsMock,
  getDrFirstMock,
  getReadyForDoctorMock,
} from './mockData';

// Front-end only "HTTP client" that mimics axios.get but serves in-memory data.
// This keeps the services/repository pattern intact while removing the need
// for any backend server during this POC.

function resolvePath(path) {
  switch (path) {
    case '/dashboard/overview':
      return getOverviewMock();
    case '/dashboard/appointments':
      return getAppointmentsMock;
    case '/dashboard/drfirst':
      return getDrFirstMock();
    case '/dashboard/ready-for-doctor':
      return getReadyForDoctorMock();
    default:
      throw new Error(`Unknown mock endpoint: ${path}`);
  }
}

const httpClient = {
  // Simulate axios.get signature: get(url, config)
  get: (path, config = {}) =>
    new Promise((resolve) => {
      const { params } = config;
      let data;

      const value = resolvePath(path);
      if (typeof value === 'function') {
        // For appointments we need the size param.
        data = value(params?.size);
      } else {
        data = value;
      }

      // Optional small delay to better mimic a real request.
      setTimeout(() => {
        resolve({ data });
      }, 100);
    }),
};

export default httpClient;

