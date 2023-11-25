import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import Spinner from "../components/Spinner";
import { useParams } from 'react-router';

function ResourceDetails( ) {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
    const params = useParams();
    console.log(params.id);

  useEffect(() => {
    async function fetchResourceDetails() {
      try {
        setLoading(true);
        const resourceRef = doc(firestore, "resources", params.id); // Access the resource ID from the route parameters
        const docSnap = await getDoc(resourceRef);
        if (docSnap.exists()) {
          setResource(docSnap.data());
          setLoading(false);
        } else {
          console.log("No such resource!");
        }
      } catch (error) {
        console.error("Error fetching resource details:", error);
      }
    }
    fetchResourceDetails();
  }, [params.id]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {loading ? (
        <Spinner />
      ) : resource ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
          <p className="text-gray-600 mb-4">{resource.description}</p>
          <div className="flex items-center justify-between">
            {/* <span className="text-gray-500">Category: {resource.category}</span> */}
            <span className="text-gray-500">
              Published: {new Date(resource.timestamp?.seconds * 1000).toLocaleDateString()}
            </span>
          </div>
          {/* You can add more structured information as needed */}
        </div>
      ) : (
        <p>No resource found!</p>
      )}
    </div>
  );
}

export default ResourceDetails;
