import React, { Fragment, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { HiOutlineThumbUp, HiOutlineThumbDown } from "react-icons/hi";

const Answers = ({ answer }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="flex items-start gap-4 ">
      {answer?.images
        ?.filter((img) => img !== "/image.svg")
        .map((img, index) => {
          return (
            <Fragment key={img}>
              {isViewerOpen && (
                <div className="relative z-[233484848]">
                  <ImageViewer
                    src={answer.images || []}
                    currentIndex={currentImage}
                    disableScroll={true}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                  />
                </div>
              )}
              <img
                key={img}
                src={img}
                alt={answer?.userDisplayName}
                onClick={() => openImageViewer(index)}
                className="h-10 cursor-zoom-in"
              />
            </Fragment>
          );
        })}
      <div className="flex items-center w-full justify-between mr-2 pt-1">
        <div>
          <p>
            <Link
              className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150"
              to={`/answer/${answer.id}`}
            >
              View answer
            </Link>
          </p>
        </div>
        <div className="flex space-x-3 relative">
          <button>
            <div className="text-2xl">
              <HiOutlineThumbUp />
              <div className="text-sm absolute left-5 top-4 bg- ">
                {answer.likes} {/* Display the actual number of likes */}
              </div>
            </div>
          </button>
          <button>
            <div className="text-2xl">
              <HiOutlineThumbDown />
              <div className="text-sm absolute left-14 top-4 bg- ">
                {answer.dislikes} {/* Display the actual number of dislikes */}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answers;
