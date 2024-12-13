import React from "react";
import { TreeNode } from "../utils/treeUtils";

interface RightPanelProps {
  selectedItem: TreeNode | null;
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedItem }) => {
  if (!selectedItem) {
    return (
      <p className="text-gray-500">
        Selecione um item na árvore para ver os detalhes
      </p>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">{selectedItem.name}</h2>
      <p className="text-sm text-gray-600">Tipo: {selectedItem.type}</p>
      {selectedItem.children.length > 0 && (
        <p className="text-sm text-gray-600">
          Número de Sub-Itens: {selectedItem.children.length}
        </p>
      )}
    </div>
  );
};

export default RightPanel;
