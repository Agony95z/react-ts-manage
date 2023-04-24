<template>
  <el-menu :default-active="route.path" router>
    <el-sub-menu v-for="item in menus" :key="item.path" :index="item.path">
      <template #title>
        <el-icon><component :is="item.meta?.icon"></component></el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item
        v-for="itemChild in item.children"
        :key="item.path + itemChild.path"
        :index="item.path + '/' + itemChild.path"
      >
        <el-icon><component :is="itemChild.meta?.icon"></component></el-icon>
        <span>{{ itemChild.meta?.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import _ from "lodash";
import { useRouter, useRoute } from "vue-router";
import type { RouteRecordName } from "vue-router";
import { useUsersStore } from "@/stores/users";

const router = useRouter();
const route = useRoute();

const userStore = useUsersStore();
const permission = userStore.infos.permission;

const menus = _.cloneDeep(router.options.routes).filter((v1) => {
  v1.children = v1.children?.filter(
    (v2) =>
      v2.meta?.menu &&
      (permission as (RouteRecordName | undefined)[]).includes(v2.name)
  );
  return (
    v1.meta?.menu &&
    (permission as (RouteRecordName | undefined)[]).includes(v1.name)
  );
});
</script>

<style scoped lang="scss">
.el-menu {
  height: calc(100vh - 60px);
  border: none;
  padding-top: 30px;
}
.el-menu-item.is-active {
  background: #e6f7ff;
  border-right: 3px solid #1890ff;
}
</style>
