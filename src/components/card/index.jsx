import React from "react";
import icon from "../../assets/icon.png";

function Card(props) {
  return (
    <div className="card flex bg-white rounded-lg gap-2">
      <div>
        <img className="w-10 h-10 rounded mt-1" src={icon}></img>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl">{props.job.job_title}</p>
        <p>
          {props.job.company_name} - {props.job.industry}
        </p>
        <p className="text-gray-800">
          {props.job.location} ({props.job.remote_type})
        </p>
        <p className="mt-6">Part-Time(9.00 am - 5.00 pm IST)</p>
        <p className="mt-2">
          Experience ( {props.job.experience_minimum} -{" "}
          {props.job.experience_maximum} Years)
        </p>
        <p className="mt-2">
          INR (₹) {props.job.salary_minimum} - {props.job.salary_maximum} /
          Month
        </p>
        <p className="mt-2">{props.job.total_employee} employees</p>
        <div className="flex gap-6 mt-6">
          {props.job.apply == "Quick apply" ? (
            <button className="px-4 py-2 text-white bg-primary rounded-lg">
              Apply Now
            </button>
          ) : null}
          {props.job.apply == "External apply" ? (
            <button className="px-4 py-2 text-primary border border-primary rounded-lg">
              External Apply
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
