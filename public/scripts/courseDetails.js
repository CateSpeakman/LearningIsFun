"use strict";
//Description: This script will dynamically populate the page with all course information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman


//this is the ready function for Jquery for the onload
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseid");
    $("#registerBtn").prop("href", "register.html?id=" + courseId);

    let obj;

//this function will pull the course ID and list the course details 

    $.getJSON("/api/courses/" + courseId, function (course) {

        obj = course;


        let courseIDRow = "<tr><td>" + "Course ID: "
            + "</td><td>" + obj.CourseId
            + "</td></tr>";
        $("#courseDetailsTable tbody").append(courseIDRow);

        let titleRow = "<tr><td>" + "Title: "
            + "</td><td>" + obj.Title
            + "</td></tr>";
        $("#courseDetailsTable tbody").append(titleRow);

        let locationRow = "<tr><td>" + "Location: "
            + "</td><td>" + obj.Location
            + "</td></tr>";
        $("#courseDetailsTable tbody").append(locationRow);

        let startDateRow = "<tr><td>" + "Start Date: "
            + "</td><td>" + obj.StartDate
            + "</td></tr>";
        $("#courseDetailsTable tbody").append(startDateRow);

        let endDateRow = "<tr><td>" + "End Date: "
            + "</td><td>" + obj.EndDate
            + "</td></tr>";
        $("#courseDetailsTable tbody").append(endDateRow);

        let meetsRow = "<tr><td>" + "Meets: "
            + "</td><td>" + obj.Meets
            + "</td></tr>";
        $("#courseDetailsTable tbody").append(meetsRow);

        let feeRow = "<tr><td id='numdaysRow'>" + "Fee: "
            + "</td><td>" + obj.Fee
            + "</td></tr>";
        $("#courseDetailsTable tbody").append(feeRow);


        //this if statement will look to see if any students are registered and if so display the list
        if (obj.Students.length == 0) {
            $("#studentListDiv").hide();
        }
        else {
            $("#studentListDiv").show();
        }
        for (let i = 0; i < obj.Students.length; i++) {
            console.log("we in");
            let studentRow = "<tr><td>" + obj.Students[i].StudentName
                + "</td><td>" + obj.Students[i].Email
                + "</td></tr>";
            $("#studentTable tbody").append(studentRow);

        }//ends for loop

    });//ends JSON function

});//ends the onload function           
