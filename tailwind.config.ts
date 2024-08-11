import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greensage: '#98A869',
        greenfaded: '#ECF2D5',
        greendark: '#535C39',
        graydark: '#464646',
        whitebkg: '#E3E7E8'
      },
      backgroundImage: {
      },
    },
  },
  plugins: [],
};
export default config;
