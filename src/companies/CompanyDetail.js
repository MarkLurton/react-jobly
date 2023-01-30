import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 */

const CompanyDetail = () => {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(
    function getCompanyAndJobsForUser() {
      async function getCompany() {
        try {
          setCompany(await JoblyApi.getCompany(handle));
        } catch (err) {
          console.debug(err.message);
        } finally {
          setIsLoaded(true);
        }
      }

      getCompany();
    },
    [handle]
  );

  if (!isLoaded) return <LoadingSpinner />;

  if (!company)
    return (
      <div className="CompanyDetail col-md-8 offset-md-2">
        <h4 style={{ "text-align": "center" }}>
          Sorry. No company matches for that handle.
        </h4>
      </div>
    );

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
};

export default CompanyDetail;
