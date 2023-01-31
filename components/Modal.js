import React, { Component } from "react";

export default class Modal extends Component {
  render() {
    const { showModal, setShowModal, children } = this.props;

    return (
      <>
        {showModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-auto bg-gray-900 bg-opacity-75">
            <div className="relative mx-auto max-w-sm p-8 bg-white rounded-lg shadow-xl">
              <button
                className="absolute top-0 right-0 p-3"
                onClick={() => setShowModal(false)}
              >
                <i className="fas fa-times fa-2x text-gray-500"></i>
              </button>
              {children}
            </div>
          </div>
        )}
      </>
    );
  }
}
