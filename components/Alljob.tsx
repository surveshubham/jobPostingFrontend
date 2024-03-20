/** @format */

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const Alljob = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [state, setState] = useState<any>();
  const [user, setUser] = useState<any>();
  const [company, setCompany] = useState<any>();
  const [title, setTitle] = useState<any>();
  const [details, setDetails] = useState<any>();
  const [exp, setExp] = useState<any>();
  const [category, setCategory] = useState<any>();

  //skills tags and jobtypes
  const [skills, setskills] = useState(['']);
  const [tags, settags] = useState(['']);
  const [jobType, setjobType] = useState(['']);
  const [addData, setAddData] = useState([{ key: '', value: '' }]);

  function openModal() {
    setIsOpen(true);
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
      const response = await fetch(`http://localhost:8080/api5/getAllJobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const instr = await response.json();
      setState(instr.jobs);

    };
    getAllLecture();
  }, []);

  const createApplication = async (jobId: String) => {
    let canID = localStorage.getItem("canID");

    const response = await fetch(`http://localhost:8080/api6/createApplication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobID: jobId,
        candidateID: canID,
      }),
    });
    const res = await response.json();
    alert("Applied Successfully");
  };

  const createJob = async () => {
    const response = await fetch(`http://localhost:8080/api5/createJob`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        company: company,
        details: details,
        expReq: exp,
        category: category,
        jobType: jobType,
        tags: tags,
        skills: skills,
        additionalField: addData,
      }),
    });

    const res = await response.json();
  };


  const matchSkills = async (jobID : any) => {
    let canID = localStorage.getItem("canID");
    const response = await fetch(`http://localhost:8080/api4/matchpdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        canID: canID,
        jobID: jobID
      }),
    });

    const res = await response.json();
    console.log(res.percentageMatch)
    let per = res.percentageMatch;
    if(per == null){
      alert ("oops no skills match")
    }else{
      let finalPercentage = Math.floor(per)
      alert("Total skills match for this job is " + finalPercentage + " Percentage");
    }
   
  };



  // Function to handle changes in input fields
  const handleChange = (index: any, value: string, type: string) => {

    if (type == "Skills") {
      const newskills = [...skills];
      newskills[index] = value;
      setskills(newskills);
    }

    else if (type == "Tags") {
      const newtags = [...tags];
      newtags[index] = value;
      settags(newtags);
    }

    else if (type == "JobType") {
      const newjobtype = [...jobType];
      newjobtype[index] = value;
      setjobType(newjobtype);
    }



  };

  // Function to add a new input field
  const addInputField = (type: any) => {
    if (type == "Skills") {
      setskills([...skills, '']);
    }

    else if (type == "Tags") {
      settags([...tags, '']);
    }

    else if (type == "JobType") {
      setjobType([...jobType, '']);
    }

    else if (type == "AddData") {
      setAddData([...addData, { key: '', value: '' }]);
    }

  };

  // Function to remove an input field
  const removeInputField = (index: any, type: any) => {

    if (type == "Skills") {
      const newskills = [...skills];
      newskills.splice(index, 1);
      setskills(newskills);
    }

    else if (type == "Tags") {
      const newtags = [...tags];
      newtags.splice(index, 1);
      settags(newtags);
    }

    else if (type == "JobType") {
      const newjobtype = [...jobType];
      newjobtype.splice(index, 1);
      setjobType(newjobtype);
    }

    else if (type == "AddData") {
      const newFormData = [...addData];
      newFormData.splice(index, 1);
      setAddData(newFormData);
    }

  };


  const handleChange2 = (index: any, key: any, value: any) => {
    const newFormData = [...addData];
    newFormData[index] = { key, value };
    setAddData(newFormData);
  };





  return (
    <>
      <div className="p-10">
        <div className="flex pb-5 space-x-4 text-center">
          <p className="text-2xl text-black font-bold ">All jobs</p>
          {user == "Admin" ? (
            <>
              <button className="text-white font-bold px-2 py-1 bg-red-400" onClick={openModal}>
                +
              </button>
              <Link className="text-white px-2 py-1 bg-red-400" href={"/application"}>
                All Application
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
                  <p>comapny : {val.company}</p>
                  <p>Title : {val.title}</p>
                  <p>Details : {val.details}</p>
                  <p>Exp Req : {val.expReq}</p>
                  <p>Category : {val.category}</p>
                  {user == "Candidate" ? (
                    <>
                      <button
                        className="bg-red-500 text-white self-start py-2 w-20 text-center mt-5"
                        onClick={() => {
                          createApplication(val.jobID);
                        }}
                      >
                        Apply
                      </button>
                      <br></br>
                      <button
                        className="bg-red-500 text-white self-start py-2 w-44 text-center mt-5"
                        onClick={() => {
                          matchSkills(val.jobID);
                        }}
                      >
                        Match Skills
                      </button>
                    </>
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
            <p className="pb-10 text-3xl">Add new Job</p>
            <form className=" mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                  value={company}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Comapny
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                  value={details}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Details
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  onChange={(e) => {
                    setExp(e.target.value);
                  }}
                  value={exp}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Exp Req
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  value={category}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Category
                </label>
              </div>


              <div className="flex space-x-5">
                {/* skills div start here */}
                <div>
                  <div className="flex space-x-2 py-3">
                    <p>Skills</p>
                    <button type="button" className="bg-red-500 px-2 font-bold text-white" onClick={() => { addInputField("Skills") }}>+</button>
                  </div>
                  {skills.map((value, index) => (
                    <div key={index} className="mt-2">
                      <input
                        className="border-2 p-2"
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value, "Skills")}
                        placeholder="Enter an skill"
                      />
                      <button type="button" className="border-2 p-2 bg-red-500 font-bold text-white" onClick={() => removeInputField(index, "Skills")}>x</button>
                    </div>
                  ))}
                </div>

                {/* tags div start here */}
                <div>
                  <div className="flex space-x-2 py-3">
                    <p>Tag</p>
                    <button type="button" className="bg-red-500 px-2 font-bold text-white" onClick={() => { addInputField("Tags") }}>+</button>
                  </div>
                  {tags.map((value, index) => (
                    <div key={index} className="mt-2">
                      <input
                        className="border-2 p-2"
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value, "Tags",)}
                        placeholder="Enter an Tag"
                      />
                      <button type="button" className="border-2 p-2 bg-red-500 font-bold text-white" onClick={() => removeInputField(index, "Tags")}>x</button>
                    </div>
                  ))}
                </div>

                {/* tags div start here */}
                <div>
                  <div className="flex space-x-2 py-3">
                    <p>Job Type</p>
                    <button type="button" className="bg-red-500 px-2 font-bold text-white" onClick={() => { addInputField("JobType") }}>+</button>
                  </div>
                  {jobType.map((value, index) => (
                    <div key={index} className="mt-2">
                      <input
                        className="border-2 p-2"
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value, "JobType")}
                        placeholder="Enter Job Type"
                      />
                      <button type="button" className="border-2 p-2 bg-red-500 font-bold text-white" onClick={() => removeInputField(index, "JobType")}>x</button>
                    </div>
                  ))}
                </div>


                <div>
                  <div>
                    <div className="flex space-x-2 py-3">
                      <p>Additional Fields</p>
                      <button type="button" className="bg-red-500 px-2 font-bold text-white" onClick={() => { addInputField("AddData") }}>+</button>
                    </div>


                    {addData.map((data, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          className="border-2 p-2"
                          value={data.key}
                          onChange={(e) => handleChange2(index, e.target.value, addData[index].value)}
                          placeholder="Key"
                        />
                        <input
                          type="text"
                          className="border-2 p-2"
                          value={data.value}
                          onChange={(e) => handleChange2(index, addData[index].key, e.target.value)}
                          placeholder="Value"
                        />
                        <button type="button" className="border-2 p-2 bg-red-500 font-bold text-white" onClick={() => removeInputField(index, "AddData")}>x</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 ">
                <button className="bg-red-500 px-5 py-2 text-white font-bold" onClick={createJob}>
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

export default Alljob;
