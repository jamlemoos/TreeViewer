export const NODE_TYPES = {
  LOCATION: "location",
  ASSET: "asset",
  COMPONENT: "component",
} as const;

type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

/**
 * Represents a location.
 */
interface Location {
  id: string;
  name: string;
  parentId: string | null;
}

/**
 * Represents an asset.
 */
interface Asset {
  id: string;
  name: string;
  parentId?: string | null; // Refers to another asset as parent
  locationId?: string | null; // Refers to a location as parent
  sensorType?: string; // If present, indicates it's a component
}

/**
 * Represents a hierarchical node in the tree.
 */
export interface TreeNode {
  id: string;
  name: string;
  type: NodeType;
  children: TreeNode[];
}

/**
 * Builds a hierarchical tree from locations and assets.
 *
 * @param locations - Array of locations, each with optional parent-child relationships.
 * @param assets - Array of assets, each potentially linked to a location or another asset.
 * @returns An array of root TreeNodes representing the tree structure.
 */
export const buildTree = (
  locations: Location[],
  assets: Asset[],
): TreeNode[] => {
  const nodeMap = new Map<string, TreeNode>();
  const rootNodes: TreeNode[] = [];

  /**
   * Create nodes for each location and add them to the nodeMap.
   * Locations with no parentId are identified as root nodes.
   */
  locations.forEach((loc) => {
    const node: TreeNode = {
      id: loc.id,
      name: loc.name,
      type: NODE_TYPES.LOCATION,
      children: [],
    };
    nodeMap.set(loc.id, node);

    if (!loc.parentId) {
      rootNodes.push(node);
    }
  });

  /**
   * Create nodes for each asset and add them to the nodeMap.
   * Assets are added as standalone nodes at this stage.
   */
  assets.forEach((asset) => {
    const node: TreeNode = {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? NODE_TYPES.COMPONENT : NODE_TYPES.ASSET,
      children: [],
    };
    nodeMap.set(asset.id, node);
  });

  /**
   * Establish parent-child relationships among locations.
   * If a location has a parentId, it is added as a child to its parent.
   */
  locations.forEach((loc) => {
    if (loc.parentId) {
      const parentNode = nodeMap.get(loc.parentId);
      const currentNode = nodeMap.get(loc.id);
      parentNode?.children.push(currentNode!);
    }
  });

  /**
   * Establish parent-child relationships among assets and components.
   * Assets can either belong to a location or another asset.
   * Components can belong to an asset or directly to a location.
   */
  assets.forEach((asset) => {
    const parentNode = asset.parentId
      ? nodeMap.get(asset.parentId) // Parent is another asset
      : asset.locationId
        ? nodeMap.get(asset.locationId) // Parent is a location
        : null;

    if (parentNode) {
      const currentNode = nodeMap.get(asset.id);
      parentNode.children.push(currentNode!);
    } else {
      // Assets/components without a parent are treated as root nodes
      rootNodes.push(nodeMap.get(asset.id)!);
    }
  });

  return rootNodes;
};
