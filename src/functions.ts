import {MockColor} from "./mock";

export const getRandomColorFromList = () => {
    return MockColor[Math.floor(Math.random() * MockColor.length)];
}

export const createRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${randomColor}`
}