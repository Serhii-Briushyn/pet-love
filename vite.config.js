import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: { sourcemap: true },
    resolve: {
        alias: {
            "@components": "/src/components",
            "@constants": "/src/constants",
            "@helpers": "/src/helpers",
            "@hooks": "/src/hooks",
            "@middlewares": "/src/middlewares",
            "@pages": "/src/pages",
            "@store": "/src/store",
            "@styles": "/src/styles",
            "@utils": "/src/utils",
            "@validation": "/src/validation",
        },
    },
});
