import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Spinner from "../components/Spinner";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { doc, firestore, getDoc } from "./firebase";
import { useParams } from "react-router";
import { auth } from "./firebase"; // Import Firebase Authentication

export default function Question() {
  const params = useParams();
  const [posting, setPosting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchPosting() {
      const docRef = doc(firestore, "posts", params.postingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPosting(docSnap.data());
        setLoading(false);
      }
    }
    fetchPosting();
  }, [params.postingId]);

  useEffect(() => {
    async function fetchComments() {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", params.postingId)
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentsData = [];
      commentsSnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentsData);
    }
    fetchComments();
  }, [params.postingId]);

  const handleCommentSubmit = async () => {
    if (commentInput.trim() === "") {
      return;
    }

    // Get the current user's ID
    const userId = auth.currentUser.uid;

    // Fetch the user's additional data, including first name and last name
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userFirstName = userData.firstName;
        const userLastName = userData.lastName;
        const userDisplayName = `${userFirstName} ${userLastName}`;
        const currentDateTime = moment().format("MMMM D, YYYY h:mm A");
        const newComment = {
          text: commentInput,
          postId: params.postingId,
          question: posting.question,
          time: currentDateTime,
          userId, // Include the user's ID
          userDisplayName, // Include the user's display name
        };

        const docRef = await addDoc(
          collection(firestore, "comments"),
          newComment
        );
        setComments([...comments, { id: docRef.id, ...newComment }]);
        setCommentInput("");
      } else {
        console.error("User data not found.");
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="gray-backg">
      <div className="p-4 max-w-4xl lg:mx-auto rounded-lg shadow-lg bg-[#F9F9F9] lg:space-x-5">
        <div className="w-full">
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: "progressbar" }}
            effect="fade"
            modules={[EffectFade, Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => {
              setCurrentImageIndex(swiper.activeIndex);
            }}
          >
            {posting.images.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full overflow-hidden h-[600px]"
                  style={{
                    background: `url(${posting.images[index]}) center no-repeat`,
                    backgroundSize: "contain",
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-[#F9F9F9] lg:space-x-5">
        <div className="w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0">
          <div className="flex items-center space-x-5">
            <p className="font-semibold">Subject:</p>
            <p className="font-semibold">{posting.subject}</p>
          </div>
          <div className="flex items-center space-x-8 mt-3">
            <p className="font-semibold">Class:</p>
            <p className="font-semibold">{posting.course}</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <p className="font-semibold">Question:</p>
            <p className="font-semibold">{posting.question}</p>
          </div>
        </div>
        <div className="w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0">
          <p className="text-center font-bold text-xl mb-3">Answers</p>
          {/* Code for Answers HERE!!!!! */}
          <p className="text-center font-bold text-xl mb-3">Comments</p>

          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="p-2 m-2 text-lg rounded-lg border-2 w-full text-slate-500 hover:border-3 hover:border-slate-500 focus:border-slate-600 transition ease-in-out duration-300"
            />
            <button onClick={handleCommentSubmit} className="p-2 px-4 m-2 text-lg font-semibold bg-slate-200 rounded-xl text shadow-xs hover:bg-slate-300 hover:shadow-md transition ease-in-out duration-200">Submit</button>
          </div>
          {comments.map((comment) => (
            <div key={comment?.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="font-bold text-lg">{comment?.userDisplayName}</p>
                <p className="text-gray-500 text-sm">
            
  {comment.time
    ? moment(comment.time, 'MMMM D, YYYY h:mm A').format('MMMM D, YYYY h:mm A')
    : ''}
</p>

              </div>
              <p className="text-lg">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
