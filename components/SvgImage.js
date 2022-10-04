import PropTypes from "prop-types";

const SvgImage = (props) => {
  const { width, height, fill, className, viewBox, paths } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
    >
      {paths}
    </svg>
  );
};

SvgImage.propTypes = {
    width : PropTypes.number,
    height : PropTypes.number,
    fill : PropTypes.string,
    className : PropTypes.string,
    viewBox : PropTypes.string,
    paths : PropTypes.any
}

export default SvgImage;