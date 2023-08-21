<template>
  record
  <!-- <el-input :input-style="style" v-model.number="value"></el-input> -->
  <input v-model.number="foo.text" type="text" />
</template>

<script lang="ts" setup>
const foo = reactive<{ text: number }>({
  text: 0,
});
const style = {
  width: "200px",
  // "background-color": "red",
  height: "40px",
};
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
