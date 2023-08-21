<template>
  <div class="svg_box">
    <svg aria-hidden="true">
      <use :href="symbolId" :fill="color" />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  width: {
    type: String,
    default: "1em",
  },
  height: {
    type: String,
    default: "1em",
  },
  // style: {
  //   type: Object,
  //   default: () => ({
  //     width: "2em",
  //     height: "2em",
  //   }),
  // },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="less" scoped>
.svg_box {
  margin-right: 8px;
  svg {
    width: v-bind("props.width");
    height: v-bind("props.height");
    vertical-align: -2px;
  }
}
</style>
