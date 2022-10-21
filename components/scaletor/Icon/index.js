import icons from './icons';

const IconWrapper = ({ id }) => (icons[id] ? icons[id] : null);

export default IconWrapper;
