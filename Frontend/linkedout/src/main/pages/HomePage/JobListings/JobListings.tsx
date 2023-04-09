import React from "react"
import JobPosting from "./JobPosting"

const JobListings = ({ searchResults }) => {

    const results = searchResults.map(jobPosting => <JobPosting key={jobPosting.id} jobPosting={jobPosting} />)
    const content = results?.length ? results : <article><p>No Matching Job Posting</p></article>
    
    return (
        <main>{content}</main>
    )
}
export default JobListings