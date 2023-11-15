import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where, orderBy, getDocs } from "firebase/firestore";
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
import { BsBookmarkFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Answers from "../components/questions/Answers";
export default function Question() {
  const params = useParams();
  const [posting, setPosting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

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
        where("postId", "==", params.postingId),
      );      
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentsData = [];
      commentsSnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentsData);
    }
    async function fetchAnswer() {
      const answerQuery = query(
        collection(firestore, "answers"),
        where("postingId", "==", params.postingId),
        orderBy("timestamp", "desc")
      );

      const answerSnapshot = await getDocs(answerQuery);
      const answerData = [];
      answerSnapshot.forEach((doc) => {
        answerData.push({ id: doc.id, ...doc.data() });
      });
      setAnswers(answerData);
    }
    fetchComments();
    fetchAnswer();
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
  function onAnswer() {
    navigate(`/answer-question/${params.postingId}`);
  }

  if (loading) {
    return <Spinner />;
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp.seconds * 1000);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Remove "at" from the formatted date
    return formattedDate.replace("at", "");
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
  <div className="mx-auto bg-[#F9F9F9] m-4 max-w-6xl rounded-xl shadow-lg ">
        <div className="flex items-center space-x-10 m-4  justify-center">
              <div>

                  <div className="flex items-center space-x-5 ">
                    <p className="font-semibold">Subject:</p>
                    <p className="font-semibold">{posting.subject}</p>
                  </div>
                  <div className="flex items-center space-x-8 mt-3">
                    <p className="font-semibold">Class:</p>
                    <p className="font-semibold">{posting.course}</p>
                  </div>
                  
              </div>
              <div className="">

                <div className="flex items-center space-x-2 pt-8">
                  <p className="font-semibold">Question:</p>
                  <p className="font-semibold">{posting.question}</p>

                </div>
                      <div>
                      <button className=" mt-6 p-3  bg-slate-200 rounded-xl shadow-md hover:bg-slate-300 hover:shadow-md transition ease-in-out duration-200">
                        <BsBookmarkFill className="text-2xl text-[#88a8f8]" />
                      </button>
                      </div>
              </div>
              
        </div>

      {/*----------------------------------------SAVED BUTTON----------------------------------------- */}
      

  
  <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto rounded-lg shadow-lg bg-[#F9F9F9] lg:space-x-5">
    <div className="w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0">
    <div className="flex justify-between mr-2 mb-4">
        <p className=" font-bold text-xl pl-4">Answers</p>
        <button
          onClick={onAnswer}
          className="p-2 px-4  font-semibold bg-slate-200 rounded-xl text shadow-xs hover:bg-slate-300 hover:shadow-md transition ease-in-out duration-200"
        >
          Answer this question
        </button>
      </div>
      <div className="answers-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {answers.slice().reverse().map((answer, index) => {
          return (
            <div key={answer?.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <Link to= {`/profile/${answer?.userRef}`} className="font-bold text-lg">{answer?.userDisplayName}</Link>
                <p className="text-gray-500 text-sm">
                  {formatTimestamp(answer.timestamp)}
                </p>
              </div>
              <Answers answer={answer} />
              {/* <p className="text-lg">{answer?.answer}</p> */}
            </div>
          );
        })}
      </div>

      
    </div>
    <div className="w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0 ">
      
      <p className="font-bold text-xl mb-3">Comments</p>
      <div className="comments-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className=" p-2 m-2 text-lg rounded-lg border-2 w-full text-slate-500 hover:border-3 hover:border-slate-500 focus:border-slate-600 transition ease-in-out duration-300"
          />
          <button
            onClick={handleCommentSubmit}
            className="p-2 px-4 m-2 text-lg font-semibold bg-slate-200 rounded-xl text shadow-xs hover.bg-slate-300 hover.shadow-md transition ease-in-out duration-200"
          >
            Submit
          </button>
        </div>
        {comments.map((comment) => (
          <div key={comment?.id} className="mb-4 p-4 border rounded-lg">
            <div className="flex justify-between mb-2">
              <Link to = {`/profile/${comment.userId}`} className="font-bold text-lg">{comment?.userDisplayName}</Link>
              <p className="text-gray-500 text-sm">
                {comment.time
                  ? moment(comment.time, "MMMM D, YYYY h:mm A").format(
                      "MMMM D, YYYY h:mm A"
                    )
                  : ""}
              </p>
            </div>
            <p className="text-lg">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  </div>
</div>
  )}