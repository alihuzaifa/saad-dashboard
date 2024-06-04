export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};
export type SideNavItemGroup = {
    title: string;
    menuList: SideNavItem[]
}

export type Section = {
    name: string;
    id: number;
}
export type Product = {
    images?: {
        id: number;
        product_id: number;
        url: string;
    }[];
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    offer: boolean
};
export type ImageType = {
    id: number;
    product_id: number;
    url: string;
};