import { create } from "zustand";
import { buildTree, TreeNode } from "../utils/treeUtils";
import { fetchCompanies, fetchLocations, fetchAssets } from "../services/api";

interface Company {
  id: string;
  name: string;
}

interface TreeStore {
  treeData: TreeNode[];
  isLoading: boolean;
  error: string | null;
  companies: Company[];
  fetchCompanies: () => Promise<void>;
  fetchTreeData: (companyId: string) => Promise<void>;
  resetTree: () => void;
}

const useTreeStore = create<TreeStore>((set) => ({
  treeData: [],
  isLoading: false,
  error: null,
  companies: [],

  /**
   * Fetches the list of companies and updates the state.
   */
  fetchCompanies: async () => {
    try {
      set({ isLoading: true, error: null });
      const companies = await fetchCompanies();
      set({ companies, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An unknown error occurred",
        isLoading: false,
      });
    }
  },

  /**
   * Fetches the tree data for a specific company and updates the state.
   * @param companyId The ID of the company.
   */
  fetchTreeData: async (companyId) => {
    try {
      set({ isLoading: true, error: null });
      const [locations, assets] = await Promise.all([
        fetchLocations(companyId),
        fetchAssets(companyId),
      ]);
      const tree = buildTree(locations, assets);
      set({ treeData: tree, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An unknown error occurred",
        isLoading: false,
      });
    }
  },

  /**
   * Resets the tree state to its initial values.
   */
  resetTree: () => set({ treeData: [], isLoading: false, error: null }),
}));

export default useTreeStore;
