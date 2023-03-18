import React from "react";

function Head(props) {
  function onClickHandler() {
    props.open(true);
  }

  return (
    <div className="flex justify-end items-center bg-white h-12">
      <button
        onClick={onClickHandler}
        className="h-10 mr-5 text-base font-medium px-4 py-2 text-white bg-primary rounded-lg"
      >
        Create
      </button>
    </div>
  );
}

export default Head;
