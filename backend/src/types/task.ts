export interface task {
    id: string;
    number: number;
    name: string;
    description: description[];
}

export interface description {
    type: "text" | "list" | "examples" | "const" | "image";
    items:
        | string[]
        | {
              input: string;
              output: string;
              description: string;
          }[];
    order: number;
}
