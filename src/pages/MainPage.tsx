import React from "react";
import useTreeStore from "../store/useTreeStore";
import TreeView from "../components/TreeView";
import RightPanel from "../components/RightPanel";
import { TreeNode } from "../utils/treeUtils";
import useUIStore from "../store/useUIStore";

const MainScreen: React.FC = () => {
  const treeData = useTreeStore((state) => state.treeData);
  const searchTerm = useUIStore((state) => state.searchTerm);
  const setSearchTerm = useUIStore((state) => state.setSearchTerm);
  const selectedTreeNode = useUIStore((state) => state.selectedTreeNode);
  const setSelectedTreeNode = useUIStore((state) => state.setSelectedTreeNode);

  // Filtra os dados da árvore com base no termo de pesquisa
  const filterTree = (nodes: TreeNode[]): TreeNode[] => {
    return nodes
      .filter((node) =>
        node.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((node) => ({
        ...node,
        children: filterTree(node.children),
      }));
  };

  const filteredTreeData = filterTree(treeData);

  const handleItemSelect = (item: TreeNode) => {
    setSelectedTreeNode(item);
  };

  return (
    <div className="flex h-screen">
      {/* Painel Esquerdo */}
      <div className="flex flex-col w-1/3 bg-white border-r">
        {/* Campo de busca */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Buscar Ativo ou Local"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto">
          <TreeView
            treeData={filteredTreeData}
            onItemSelect={handleItemSelect}
          />
        </div>
      </div>

      {/* Painel Direito */}
      <div className="w-2/3 p-4 bg-gray-50">
        <RightPanel selectedItem={selectedTreeNode} />
      </div>
    </div>
  );
};

export default MainScreen;
