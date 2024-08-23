import { Theme } from "@react-navigation/native";

export const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: 'rgb(10, 132, 255)',
        background: '#1a1a1a',
        card: 'rgb(18, 18, 18)',
        text: '#dadada',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
    }
}

export const DefaultTheme: Theme = {
    dark: false,
    colors: {
        primary: 'rgb(0, 122, 255)',
        background: '#dadada',
        card: 'rgb(255, 255, 255)',
        text: '#1a1a1a',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
};
