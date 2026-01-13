export interface Page {
  id: number;
  accountId: number;
  pageName: string;
  tdk?: string | null;
  desc?: string | null;
  components: Component[];
  componentData: ComponentData[];
}

export interface Component {
  id: string;
  accountId: number;
  type: string;
  pageId: number;
  options?: any; // Json type maps to any in TypeScript
  parentId?: string | null;
  disabled?: boolean;
  children?: Component[];
}

export interface ComponentData {
  id: number;
  user: string; // Usually user identifier (like email)
  pageId: number;
  props: any; // Json type maps to any in TypeScript
}
