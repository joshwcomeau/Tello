const dpr = window.devicePixelRatio;

const defaultImage = 'https://tello.imgix.net/placeholder.jpg';

export const buildImageUrl = ({ image, width, height, size }) => (`
  ${image || defaultImage}?fit=crop&crop=entropy&w=${width}&h=${height}&auto=enhance&dpr=${dpr} ${size}w
`);
