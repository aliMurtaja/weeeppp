import httpClient from './httpClient';

// Repository pattern: single place that knows how to talk to the Dashboard API.
// UI components ask this repository for domain objects instead of calling HTTP directly.
class DashboardRepository {
  async getOverview() {
    const { data } = await httpClient.get('/dashboard/overview');
    return data;
  }

  async getAppointments(size = 1000) {
    const { data } = await httpClient.get('/dashboard/appointments', {
      params: { size },
    });
    return data;
  }

  async getDrFirst() {
    const { data } = await httpClient.get('/dashboard/drfirst');
    return data;
  }

  async getReadyForDoctor() {
    const { data } = await httpClient.get('/dashboard/ready-for-doctor');
    return data;
  }
}

const dashboardRepository = new DashboardRepository();

export default dashboardRepository;


