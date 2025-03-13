//import React from "react";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";

const Certificate = ({ userName, score, onClose }) => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const downloadCertificate = () => {
    const certificateElement = document.getElementById("certificate");
    if (!certificateElement) return;

    html2canvas(certificateElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${userName.replace(/\s+/g, "_")}_certificate.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div
          id="certificate"
          className="bg-white p-8 rounded-lg border-8 border-double border-gray-300"
        >
          <div className="text-center">
            {/* Logo Circle */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold text-xs">codERA</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-serif mb-6">
              Certificate of Accomplishment
            </h1>
            <div className="bg-gray-900 text-white py-2 px-8 inline-block rounded-full mb-8">
              Problem Solving (Basic)
            </div>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">PRESENTED TO</p>
              <p className="text-3xl font-serif italic mb-2">{userName}</p>
            </div>

            <p className="text-gray-600 mb-8">
              The bearer of this certificate has passed the problem-solving
              tests.
            </p>

            <div className="flex justify-between items-end mt-16">
              <div>
                <p className="text-gray-600">Earned on: {currentDate}</p>
                <p className="text-gray-500 text-sm">
                  ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <div className="mb-2"></div>
                <p className="font-semibold">&lt;/CodERA&gt;</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
          <button
            onClick={downloadCertificate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
Certificate.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Certificate;
