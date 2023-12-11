import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import Spinner from "../components/Spinner";

function truncateDescription(description, wordLimit) {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + " ..."; // Join the first wordLimit words and add an ellipsis
  } else {
    return description; // Return the original description if it's already shorter
  }
}

export default function LearningResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        setLoading(true);
        const resourcesRef = collection(firestore, "resources");
        const querySnapshot = await getDocs(resourcesRef);
        const resourceList = [];
        querySnapshot.forEach((doc) => {
          resourceList.push({ id: doc.id, data: doc.data() });
        });
        setResources(resourceList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    }
    fetchResources();
  }, []);

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <h1 className="text-4xl text-[#3F3F3F] font-bold mt-8 mb-4 text-center ">Learning Resources</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
{resources.map((resource) => (
  <div key={resource.id} className="bg-[#E1DFFD] bg-opacity-60 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-[#3F3F3F] mb-2">{resource.data.title}</h2>
      <p className="text-[#3F3F3F] mb-4">{truncateDescription(resource.data.description, 25)}</p>
      <a
  href={resource.data.link}
  target="_blank"
  rel="noreferrer"
  className="bg-blue-500 hover:bg-blue-600 text-[#f0f0f0] font-bold py-2 px-4 rounded inline-block transition duration-300 ease-in-out"
>
  Read More
</a>
    </div>
  </div>
))}


        </div>
      )}
    </div>
  );
}
