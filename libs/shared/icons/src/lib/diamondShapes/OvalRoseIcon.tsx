const OvalRoseIcon = () => {
  const css = `.st0{fill:none;stroke:#231F20;stroke-linejoin:round;stroke-miterlimit:10;}
	.st1{fill:none;stroke:#231F20;stroke-width:0.5;stroke-linejoin:round;stroke-miterlimit:10;}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.8 59" role="img">
      <defs>
        <style>{css}</style>
      </defs>
      <g>
        <ellipse className="st1" cx="29.4" cy="29.5" rx="18.9" ry="29" />
        <g>
          <polygon
            className="st1"
            points="33.2,16.6 25.7,16.6 20.4,24.4 20.4,35.4 25.7,43.2 33.2,43.2 38.4,35.4 38.4,24.4 		"
          />
          <line className="st1" x1="22.2" y1="2.7" x2="36.6" y2="56.8" />
          <line className="st1" x1="12" y1="18.5" x2="46.8" y2="40.9" />
          <line className="st1" x1="12.2" y1="40.7" x2="46.5" y2="18.7" />
          <polygon
            className="st1"
            points="25.7,16.6 33.2,16.6 38.4,24.4 38.4,35.4 33.2,43.2 25.7,43.2 20.4,35.4 20.4,24.4 		"
          />
          <line className="st1" x1="36.6" y1="2.7" x2="22.2" y2="56.8" />
          <polygon
            className="st1"
            points="29.5,0.5 33.2,16.6 42.4,8.5 38.4,24.4 48.4,29.5 38.4,35.4 42.5,50.6 33.2,43.2 29.5,58.5 
			29.3,58.5 25.7,43.2 16.4,50.6 20.4,35.4 10.5,29.5 20.4,24.4 16.4,8.5 25.7,16.6 29.3,0.5 		"
          />
        </g>
      </g>
    </svg>
  );
};

export { OvalRoseIcon };
