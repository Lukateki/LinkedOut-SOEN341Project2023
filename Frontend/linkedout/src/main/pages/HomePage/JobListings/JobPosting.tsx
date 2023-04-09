import { Typography } from "@mui/material"
import React from "react"

const JobPosting = ({ jobPosting }) => {
    return (
        <article>
            <Typography variant={"h5"} component={"div"}>{jobPosting.title}</Typography>
            <Typography variant={"h6"} component={"div"}>{jobPosting.recruiter}</Typography>
            <Typography>{jobPosting.city}</Typography>
            <Typography>{jobPosting.id}</Typography>
            <Typography>Expires: {jobPosting.expiry_date}</Typography>
        </article>
    )
}
export default JobPosting