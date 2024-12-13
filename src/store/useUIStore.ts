import { create } from "zustand";
import { TreeNode } from "../utils/treeUtils";

interface UIStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTreeNode: TreeNode | null;
  selectedCompanyId: string | null;
  setSelectedTreeNode: (item: TreeNode | null) => void;
  setSelectedCompanyId: (item: string | null) => void;
  expandedNodes: Set<string>;
  toggleNodeExpansion: (nodeId: string) => void;
}

const useUIStore = create<UIStore>((set) => ({
  searchTerm: "",
  selectedCompanyId: null,
  selectedTreeNode: null,
  expandedNodes: new Set<string>(),

  /**
   * Updates the search term used for filtering nodes.
   * @param term The new search term.
   */
  setSearchTerm: (term) => set({ searchTerm: term }),

  /**
   * Sets the currently selected tree node.
   * @param node The TreeNode selected by the user.
   */
  setSelectedTreeNode: (node) => set({ selectedTreeNode: node }),

  /**
   * Sets the currently selected company ID.
   * @param companyId The ID of the company selected by the user.
   */
  setSelectedCompanyId: (companyId) => set({ selectedCompanyId: companyId }),

  /**
   * Toggles the expanded state of a node.
   * If the node is expanded, it collapses. Otherwise, it expands.
   * @param nodeId The ID of the node to toggle.
   */
  toggleNodeExpansion: (nodeId: string) => {
    set((state) => {
      const newSet = new Set(state.expandedNodes);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return { expandedNodes: newSet };
    });
  },
}));

export default useUIStore;
