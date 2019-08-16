"use strict";
//Description: This script will dynamically populate the page with all course information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman



//this function is the ready function for jQuery that executes as the page loads
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let id = urlParams.get("id");

    $("#courseid").val(id);

//this posts the new student information to the server
    $("#saveBtn").on("click", function () {
        $.post("/api/register", $("#registerForm").serialize(), function (data) {
            window.location.href = "details.html?id="+ id;
        });

        return false;
    });//end of on click
});//end of ready function