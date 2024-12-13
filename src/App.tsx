import React, { useEffect } from "react";
import useTreeStore from "./store/useTreeStore";
import useUIStore from "./store/useUIStore";
import Header from "./components/Header";
import MainScreen from "./pages/MainPage";

const App = () => {
  const fetchCompanies = useTreeStore((state) => state.fetchCompanies);
  const fetchTreeData = useTreeStore((state) => state.fetchTreeData);
  const companies = useTreeStore((state) => state.companies);
  const selectedCompanyId = useUIStore((state) => state.selectedCompanyId);
  const setSelectedCompanyId = useUIStore(
    (state) => state.setSelectedCompanyId,
  );

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    if (selectedCompanyId) {
      fetchTreeData(selectedCompanyId);
    }
  }, [selectedCompanyId, fetchTreeData]);

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  const headerUnits = companies.map((company) => ({
    id: company.id,
    name: company.name,
    isActive: company.id === selectedCompanyId,
  }));

  return (
    <>
      <Header units={headerUnits} onUnitClick={handleCompanySelect} />
      <MainScreen />
    </>
  );
};

export default App;
