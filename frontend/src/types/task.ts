export interface task {
    id: string;
    number: number;
    name: string;
    description: description[];
}

export interface description {
    id: string;
    type: "text" | "list" | "examples" | "const" | "image";
    items: string[] | DescriptionItem[];
    order: number;
}

export interface DescriptionItem {
    input: string;
    output: string;
    description: string;
}