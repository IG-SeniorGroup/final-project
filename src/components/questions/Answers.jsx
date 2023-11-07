import React, { Fragment, useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

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
    <div className="flex items-start gap-4">
      {answer?.images
        ?.filter((img) => img != "/image.svg")
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
    </div>
  );
};

export default Answers;
