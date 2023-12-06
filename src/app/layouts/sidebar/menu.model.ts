export interface MenuItem {
    id?: number;
    label?: string;
    icon?: string;
    route?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
}
