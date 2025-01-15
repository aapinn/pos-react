import React from 'react'

const SpinerComponent = () => {
  return (
    <div className="spinner-container">
      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .spinner {
          width: 56px;
          height: 56px;
          display: grid;
          border: 4.5px solid #0000;
          border-radius: 50%;
          border-right-color: #ff47fd;
          animation: spinner-a4dj62 1s infinite linear;
        }

        .spinner::before,
        .spinner::after {
          content: "";
          grid-area: 1/1;
          margin: 2.2px;
          border: inherit;
          border-radius: 50%;
          animation: spinner-a4dj62 2s infinite;
        }

        .spinner::after {
          margin: 8.9px;
          animation-duration: 3s;
        }

        @keyframes spinner-a4dj62 {
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>

      <div className="spinner"></div>
    </div>
  )
}

export default SpinerComponent
    