const dpr = window.devicePixelRatio;

const defaultImage = 'https://tello.imgix.net/placeholder.jpg';

export const buildImageUrl = ({ image, width, height }) => `
  ${image || defaultImage}?fit=crop&crop=entropy&h=${height}&w=${
  width
}&auto=enhance&dpr=${Math.round(dpr)} ${Math.round(width * dpr)}w
`;
