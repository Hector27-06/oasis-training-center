import { useEffect, useState } from "react";

import { adminService } from "../services/admin.service";

export function useAdminDashboard() {
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getDashboard()
      .then((response) => {
        setData(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    loading,
  };
}
