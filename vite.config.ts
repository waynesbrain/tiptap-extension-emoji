import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    // assetsInlineLimit: 0, // Consider if CSS gets inline?
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "tiptap-extension-emoji",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        /^@tiptap\//,
        // "@tiptap/core",
        // "@tiptap/pm",
        // "@tiptap/suggestion",
      ],
      /* To inspect source paths as-imported, use this:
      external: (source, importer, isResolved) => {
        console.log(source, { importer, isResolved });
        const externals: (string | RegExp)[] = [
          // ...copy from above
        ];
        return externals.some((external) => {
          return (external instanceof RegExp)
            ? external.test(source)
            : external === source;
        });
      },
      */
      // output: {
      //   globals: {
      //     react: "React",
      //     "react-dom": "ReactDOM",
      //   },
      // },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    /**
     * Bundle type declarations into a single index.d.ts file.
     * See https://github.com/vitejs/vite/issues/2049
     */
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
