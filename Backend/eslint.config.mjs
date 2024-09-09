import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**"], // Ignore node_modules
    languageOptions: {
      globals: {
        process:true,
        browser: true,
        node: true,
        ...globals.browser, // Other global variables like 'window', 'document', etc.
      },
    },
    ...pluginJs.configs.recommended, // Extend recommended settings
    
  },
];
