import { Component } from "vue";

export type Config<T> = {
  columns: ColumnConfig<T>[];
  actions: ActionConfig<T>[];
};

export type ColumnConfig<T> = {
  field: keyof T;
  label: string;
};

type Props = { [key: string]: any };

export type ActionConfig<T> = {
  icon: { component: Component; props?: Props };
  click: (row: T, index: number) => void;
};
