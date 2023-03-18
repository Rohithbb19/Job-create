import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../card";

function JobList(props) {
  let [jobs, setJobs] = useState([]);

  async function get() {
    let response = await axios.get(
      "https://641402aa844a8032dc121914.mockapi.io/jobs"
    );
    setJobs(response.data);
  }

  useEffect(() => {
    get();
  }, [props.reload]);

  return (
    <div className="mx-auto mt-4 min-[1660px]:w-[1680px]">
      <div className="flex flex-wrap gap-4 justify-center min-[1660px]:justify-start">
        {jobs.map((job) => (
          <Card job={job}></Card>
        ))}
      </div>
    </div>
  );
}

export default JobList;
