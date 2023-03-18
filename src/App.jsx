import React, { useState } from "react";
import "./App.css";
import Head from "./components/head";
import JobList from "./components/job-list";
import PopUpCard from "./components/pop-up-card";

function App() {
  let [createJob, setCreateJob] = useState(false);

  return (
    <React.Fragment>
      <Head open={setCreateJob}></Head>
      <JobList reload={createJob}></JobList>
      {createJob ? (
        <PopUpCard onSave={() => setCreateJob(false)}></PopUpCard>
      ) : null}
    </React.Fragment>
  );
}

export default App;
