import React from "react";
import { NODE_TYPES, TreeNode } from "../utils/treeUtils";
import LocationIcon from "../assets/location.png";
import AssetIcon from "../assets/asset.png";
import ComponentIcon from "../assets/component.png";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import useUIStore from "../store/useUIStore";

interface TreeViewProps {
  treeData: TreeNode[];
  onItemSelect: (item: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ treeData, onItemSelect }) => {
  const expandedNodes = useUIStore((state) => state.expandedNodes);
  const toggleNodeExpansion = useUIStore((state) => state.toggleNodeExpansion);

  const getIcon = (type: string) => {
    return type === NODE_TYPES.LOCATION
      ? LocationIcon
      : type === NODE_TYPES.ASSET
        ? AssetIcon
        : ComponentIcon;
  };

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes.has(node.id);
      const hasChildren = node.children.length > 0;

      return (
        <div key={node.id} className="flex flex-col items-start">
          <div className="flex items-center mb-2 cursor-pointer hover:text-blue-600">
            {hasChildren && (
              <span
                className="mr-2"
                onClick={() => toggleNodeExpansion(node.id)}
              >
                {isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                )}
              </span>
            )}

            <div
              className="flex items-center"
              onClick={() => onItemSelect(node)}
            >
              <img
                src={getIcon(node.type)}
                alt={`${node.type} icon`}
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm">{node.name}</span>
            </div>
          </div>

          {hasChildren && isExpanded && (
            <div className="pl-8">{renderTree(node.children)}</div>
          )}
        </div>
      );
    });
  };

  return <div className="p-4">{renderTree(treeData)}</div>;
};

export default TreeView;
