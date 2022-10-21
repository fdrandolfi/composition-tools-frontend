const Exit = ({ theme }) => {
  const darkTheme = '#101316';
  const lightTheme = '#fbfdff';
  const fillColor = theme && theme === 'dark' ? darkTheme : lightTheme;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      className="icon exit"
    >
      <path
        fill={fillColor}
        d="M16 17.6L2.95 31.64c-.45.48-1.18.46-1.62-.03a1.3 1.3 0 010-1.7L14.24 16 1.34 2.1a1.3 1.3 0 010-1.75 1.09 1.09 0 011.61 0L16 14.42 29.05.36a1.09 1.09 0 011.62 0 1.3 1.3 0 010 1.74L17.76 16l12.9 13.91a1.3 1.3 0 010 1.71c-.43.5-1.16.5-1.61.03L16 17.6z"
      />
    </svg>
  );
};

export default Exit;
