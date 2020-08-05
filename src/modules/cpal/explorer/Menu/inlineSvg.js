import React from "react"

const InlineSvg = ({ type, classes = "" }) => {
  const getSvg = type => {
    switch (type) {
      // declare stroke color in CSS, as defining here cannot be overridden
      case "right-arrow":
        return (
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.4747 2.96005L10.4747 3.48131L0.633169 3.48131L0.633169 2.96005L5.55395 2.96005L7.14432 2.96005L8.84694 3.05313L8.84694 2.99728L8.5397 2.81167C8.05179 2.51692 7.63343 2.12011 7.31331 1.64846L7.1448 1.40018C6.93351 1.08888 6.76776 0.748994 6.65257 0.390824L6.52688 -1.71703e-07L7.93015 -1.10671e-07C7.93015 -1.10671e-07 8.03744 0.611831 8.22951 1.0053C8.30036 1.15044 8.38514 1.31314 8.47412 1.47836C8.8862 2.2435 9.62674 2.7699 10.4747 2.96005Z" />
            <path d="M10.4747 4.05372L10.4747 3.46333L0.633169 3.46333L0.633169 4.05372L5.55395 4.05372L7.14432 4.05372L8.84694 3.96105L8.84694 4.01665L8.54041 4.201C8.05203 4.49471 7.63296 4.89057 7.31194 5.36144L7.14667 5.60385C6.93415 5.91556 6.76736 6.2561 6.65138 6.6151L6.52688 7.00049L7.93015 7.00049C7.93015 7.00049 8.03744 6.3914 8.22951 5.9997C8.29982 5.85632 8.38384 5.69573 8.47207 5.53255C8.88539 4.76818 9.62664 4.24303 10.4747 4.05372Z" />
          </svg>
        )
      case "down-chevron":
        return (
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.354774"
              y1="5.88546"
              x2="6.59531"
              y2="12.126"
              stroke="#181818"
            />
            <line
              x1="5.88644"
              y1="12.1272"
              x2="12.127"
              y2="5.88662"
              stroke="#181818"
            />
          </svg>
        )
      case "x":
        return (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.707031"
              width="15"
              height="1"
              transform="rotate(45 0.707031 0)"
            />
            <rect
              y="10.6064"
              width="15"
              height="1"
              transform="rotate(-45 0 10.6064)"
            />
          </svg>
        )

      default:
        break
    }
  }

  classes += " inline-svg " + type
  return <div className={classes}>{getSvg(type)}</div>
}

export default InlineSvg
