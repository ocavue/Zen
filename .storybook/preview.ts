import "../packages/index.css";
import { withThemeByClassName } from "@storybook/addon-styling";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
export const decorators = [
    withThemeByClassName({
        themes: {
            light: "",
            dark: "dark",
        },
        defaultTheme: "light",
    }),
];
