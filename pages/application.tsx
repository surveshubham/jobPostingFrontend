/** @format */

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const application = () => {
  const [user, setUser] = useState<any>();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [state, setState] = useState<any>();
  const [status, setStatus] = useState<any>();
  const [response, setResponse] = useState<any>("");
  const [appid, setAppid] = useState<any>();

  function openModal(appID: String) {
    setIsOpen(true);
    setAppid(appID);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    var type = localStorage.getItem("type");

    if (type == "Candidate") {
      setUser(type);
    } else {
      setUser(type);
    }

    const getAllLecture = async () => {
      const response = await fetch(`http://localhost:8080/api6/getAllApplication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const instr = await response.json();

      setState(instr.applications);
    };
    getAllLecture();
  }, []);

  const changeStatus = async () => {
    if (status == "Rejected") {
      if (response == "") {
        alert("Please write reason");
      }
    }

    const response2 = await fetch(`http://localhost:8080/api6/updateStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appID: appid,
        status: status,
        reason: response,
      }),
    });
    const instr = await response2.json();
    if (instr) {
      alert("Status change ");
    }
  };

  return (
    <>
      <div className="p-10">
        <div className="flex pb-5 space-x-4 text-center">
          <p className="text-2xl text-black font-bold ">All Applications</p>
          {user == "Admin" ? (
            <>
              <Link className="text-white px-2 py-1 bg-red-400" href={"/admin"}>
                All Jobs
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {state?.map((val: any, ind: any) => {
            return (
              <div className=" flex space-x-2 text-black border-2 p-5" key={ind}>
                <div>
                  {/* <p>{val.jobID}</p> */}
                  <p>AppID : {val.appID}</p>
                  <p>CandidateID : {val.candidateID}</p>
                  <p>JobID : {val.jobID}</p>
                  <p>Status : {val.status}</p>
                  {user == "Admin" ? (
                    <button
                      className={`bg-red-500 text-white self-start py-2 px-2 text-center mt-5 ${val.status == "Rejected" ? "disabled" : ""}`}
                      onClick={() => {
                        openModal(val.appID);
                      }}
                    >
                      Change Status
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Modal isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={closeModal} contentLabel="Example Modal">
          <div className="mx-auto max-w-7xl">
            <button className="text-3xl pb-10 font-bold" onClick={closeModal}>
              x
            </button>
            <p className="pb-10 text-3xl">Change Status</p>
            <form className=" mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  value={status}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Status
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  onChange={(e) => {
                    setResponse(e.target.value);
                  }}
                  value={response}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Response
                </label>
              </div>

              <div className="pt-5 ">
                <button className="bg-red-500 px-5 py-2 text-white font-bold" onClick={changeStatus}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default application;
