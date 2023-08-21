import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import ElementPlus from "unplugin-element-plus/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
// https://vitejs.dev/config/

export default defineConfig(() => {
  return {
    server: {
      https: false,
      headers: {
        "Access-Control-Allow-Origin": "*", //必须设置跨域处理，非同源下主项目访问不到子项目， 会被拦截
      },
      hmr: {
        overlay: false,
      },
      proxy: {
        "/zerui-onvif/v1": {
          target: "http://192.168.10.106:8894",
          //是否https 接口
          // secure: true,
          changeOrigin: true,
          "^/zerui-onvif/v1/": "/zerui-onvif/v1/",
        },
        //
        "/device-manager/api": {
          target: "http://192.168.12.244:9031",
          //是否https 接口
          // secure: true,
          changeOrigin: true,
          "^/device-manager/api/": "/device-manager/api/",
        },
      },
    },
    plugins: [
      vue(),
      // basicSsl(),
      ElementPlus({
        useSource: true,
      }),
      viteMockServe({
        // default
        mockPath: "mock",
        enable: true,
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
        // inject?: 'body-last' | 'body-first'
        // customDomId: '__svg__icons__dom__',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ["vue", "vue-router"],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {},
        scss: {
          // 自定义element-plus样式文件
          // additionalData: `@use "@/style/modules/index.scss";`
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // build: {
    //   outDir: "dist/video-monitor", //指定输出路径
    //   chunkSizeWarningLimit: 1500,
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.includes("node_modules")) {
    //           const arr = id.toString().split("node_modules/")[1].split("/");
    //           switch (arr[0]) {
    //             case "@naturefw": // 自然框架
    //             case "@popperjs":
    //             case "@vue":
    //             case "element-plus": // UI 库
    //             case "@element-plus": // 图标
    //             case "pdfjs-dist":
    //               return "_" + arr[0];
    //             default:
    //               return "__vendor";
    //           }
    //         }
    //       },
    //       chunkFileNames: "static/js1/[name]-[hash].js",
    //       entryFileNames: "static/js2/[name]-[hash].js",
    //       assetFileNames: "static/[ext]/[name]-[hash].[ext]",
    //     },
    //     brotliSize: false, // 不统计
    //     target: "esnext",
    //     minify: "esbuild", // 混淆器，terser构建后文件体积更小
    //   },
    // },
  };
});
