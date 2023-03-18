import React, { useReducer, useState } from "react";
import axios from "axios";

function PopUpCard(props) {
  let [step1Complete, setStep1Complete] = useState(false);
  let [step1State, step1dispatch] = useReducer(reducer, {
    job_title: "",
    company_name: "",
    industry: "",
    location: "",
    remote_type: "",
  });

  let [step1Error, step1ErrorDispatch] = useReducer(reducer, {
    jobTitleError: "",
    companyNameError: "",
    industryError: "",
  });

  let [step2State, step2dispatch] = useReducer(reducer, {
    experience_minimum: "",
    experience_maximum: "",
    salary_minimum: "",
    salary_maximum: "",
    total_employee: "",
    apply: "",
  });

  function reducer(state, args) {
    let newState = { ...state };
    newState[args["type"]] = args["value"];
    return newState;
  }

  function onNextHandler() {
    if (step1State.job_title == "")
      step1ErrorDispatch({
        type: "jobTitleError",
        value: "Job Title is required",
      });
    if (step1State.company_name == "")
      step1ErrorDispatch({
        type: "companyNameError",
        value: "Company Name is required",
      });
    if (step1State.industry == "")
      step1ErrorDispatch({
        type: "industryError",
        value: "Industry is required",
      });
    if (
      step1State.job_title != "" &&
      step1State.company_name != "" &&
      step1State.industry != ""
    ) {
      setStep1Complete(true);
    }
  }

  async function onSaveHandler() {
    let response = await axios.post(
      "https://641402aa844a8032dc121914.mockapi.io/jobs",
      {
        ...step1State,
        ...step2State,
      }
    );
    if (response.status == 201) {
      props.onSave();
    }
  }

  return (
    <div className=" fixed top-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center">
      {step1Complete ? (
        <div className="rounded-lg border border-gray-500 popUpCard p-8 bg-white">
          <div className=" flex justify-between">
            <p className="t text-xl font-normal">Create a job</p>
            <p className="t text-xl font-medium">Step 2</p>
          </div>
          <div>
            <p className="text-sm font-medium mt-6">Experience</p>
            <div className="flex w-full gap-1">
              <input
                type="number"
                onChange={(e) =>
                  step2dispatch({
                    type: "experience_minimum",
                    value: e.target.value,
                  })
                }
                value={step2State.experience_minimum}
                className=" mt-1 w-full px-2 py-3 h-9 text-sm"
                placeholder="Minimum"
              ></input>
              <input
                type="number"
                onChange={(e) =>
                  step2dispatch({
                    type: "experience_maximum",
                    value: e.target.value,
                  })
                }
                value={step2State.experience_maximum}
                className=" mt-1 w-full px-2 py-3 h-9 text-sm"
                placeholder="Maximum"
              ></input>
            </div>
            <p className="text-sm font-medium mt-6">Salary</p>
            <div className="flex w-full gap-1">
              <input
                type="number"
                onChange={(e) =>
                  step2dispatch({
                    type: "salary_minimum",
                    value: e.target.value,
                  })
                }
                value={step2State.salary_minimum}
                className=" mt-1 w-full px-2 py-3 h-9 text-sm"
                placeholder="Minimum"
              ></input>
              <input
                type="number"
                onChange={(e) =>
                  step2dispatch({
                    type: "salary_maximum",
                    value: e.target.value,
                  })
                }
                value={step2State.salary_maximum}
                className=" mt-1 w-full px-2 py-3 h-9 text-sm"
                placeholder="Maximum"
              ></input>
            </div>
            <p className="text-sm font-medium mt-6">Total employee</p>
            <input
              onChange={(e) =>
                step2dispatch({ type: "total_employee", value: e.target.value })
              }
              value={step2State.total_employee}
              className=" mt-1 w-full px-2 py-3 h-9 text-sm"
              placeholder="ex. 100"
            ></input>
            <p className="text-sm font-medium mt-6">Apply type</p>
            <div className="flex w-full gap-2 mt-1">
              <input
                onChange={(e) =>
                  step2dispatch({ type: "apply", value: e.target.value })
                }
                value="Quick apply"
                type="radio"
                name="apply"
              ></input>
              <label className="text-sm font-medium text-gray-500">
                Quick apply
              </label>
              <input
                className="ml-2"
                onChange={(e) =>
                  step2dispatch({ type: "apply", value: e.target.value })
                }
                value="External apply"
                type="radio"
                name="apply"
              ></input>
              <label className="text-sm font-medium text-gray-500">
                External apply
              </label>
            </div>
          </div>

          <button
            onClick={onSaveHandler}
            className="text-base float-right font-medium px-4 py-2 text-white bg-primary rounded-lg mt-24"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-500 popUpCard p-8 bg-white">
          <div className="flex justify-between">
            <p className="t text-xl font-normal">Create a job</p>
            <p className="t text-xl font-medium">Step 1</p>
          </div>
          <div className="mt-6 text-sm font-medium">
            Job title<span className="text-red-600">*</span>
          </div>
          <input
            onChange={(e) =>
              step1dispatch({ type: "job_title", value: e.target.value })
            }
            value={step1State.job_title}
            className=" mt-1 w-full px-2 py-3 h-9 text-sm"
            placeholder="ex. UX UI Designer"
          ></input>
          <p className="text-xs text-red-600">{step1Error.jobTitleError}</p>
          <p className="mt-6 text-sm font-medium">
            Company name<span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) =>
              step1dispatch({ type: "company_name", value: e.target.value })
            }
            value={step1State.company_name}
            className=" mt-1 w-full px-2 py-3 h-9 text-sm"
            placeholder="ex. Google"
          ></input>
          <p className="text-xs text-red-600">{step1Error.companyNameError}</p>
          <p className="mt-6 text-sm font-medium">
            Industry<span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) =>
              step1dispatch({ type: "industry", value: e.target.value })
            }
            value={step1State.industry}
            className=" mt-1 w-full px-2 py-3 h-9 text-sm"
            placeholder="ex. Information Technology"
          ></input>
          <p className="text-xs text-red-600">{step1Error.industryError}</p>
          <div className="mt-6 flex w-full gap-1">
            <div className="w-2/4">
              <p className="text-sm font-medium">Location</p>
              <input
                onChange={(e) =>
                  step1dispatch({ type: "location", value: e.target.value })
                }
                value={step1State.location}
                className=" mt-1 w-full px-2 py-3 h-9 text-sm"
                placeholder="ex. Chennai"
              ></input>
            </div>
            <div className="w-2/4">
              <p className="text-sm font-medium">Remote type</p>
              <input
                onChange={(e) =>
                  step1dispatch({ type: "remote_type", value: e.target.value })
                }
                value={step1State.remote_type}
                className=" mt-1 w-full px-2 py-3 h-9 text-sm"
                placeholder="ex. In-office"
              ></input>
            </div>
          </div>
          <button
            onClick={onNextHandler}
            className="text-base float-right font-medium px-4 py-2 text-white bg-primary rounded-lg mt-24"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PopUpCard;
