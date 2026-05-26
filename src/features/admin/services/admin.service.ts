const mockDashboard = {
  totalUsers: 248,
  activeMemberships: 186,
  monthlyIncome: 24580,
  newUsers: 12,
};

export const adminService = {
  async getDashboard() {
    return mockDashboard;
  },

  async getUsers() {
    return [];
  },

  async getMemberships() {
    return [];
  },

  async getInventory() {
    return [];
  },

  async getReports() {
    return [];
  },
};
