import {MockColor} from "./mock";

export const getRandomColorFromList = () => {
    return MockColor[Math.floor(Math.random() * MockColor.length)];
}