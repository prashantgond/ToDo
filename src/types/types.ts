export interface TaskItems {
  id: number;
  taskName: string;
}

export interface Section {
  title: string;
  data: TaskItems[];
}
