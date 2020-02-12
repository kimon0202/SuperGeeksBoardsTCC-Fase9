export interface BoardModel {
  name: string;
  id: number;
  groups: Array<Group>;
  image: ImageObject;
}

export interface Group {
  name: string;
  id: number;
  entries: Array<Entry>;
}

export interface Entry {
  content: string;
  id: number;
}

export interface ImageObject {
  path: string;
  url: string;
}
