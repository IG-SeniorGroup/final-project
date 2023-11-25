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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Learning Resources</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                {resource.data.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {truncateDescription(resource.data.description, 25)}
              </p>
              <a
                href={resource.data.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
