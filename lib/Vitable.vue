<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Config } from "./types/Config";

class VTableFactory<T = any> {
  define() {
    return defineComponent({
      props: {
        data: {
          type: Array as PropType<T[]>,
          required: true,
        },
        config: {
          type: Object as PropType<Config<T>>,
          required: true,
        },
      },
      emits: {
        clickRow: (row: T, index: number) => true,
      },
      setup(props, { emit }) {
        const onClickRow = (row: T, index: number) => {
          emit("clickRow", row, index);
        };

        return {
          onClickRow,
        };
      },
    });
  }
}

const main = new VTableFactory().define();

export function GenericVTable<T>() {
  return main as ReturnType<VTableFactory<T>["define"]>;
}

export default main;
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="(column, i) in config.columns" :key="i">
          {{ column.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, i) in data" :key="i" @click="onClickRow(row, i)">
        <td v-for="(column, j) in config.columns" :key="j">
          {{ row[column.field] }}
        </td>
        <td
          v-for="(action, j) in config.actions"
          :key="j"
          @click="action.click(row, i)"
        >
          <component :is="action.icon.component" v-bind="action.icon.props" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
