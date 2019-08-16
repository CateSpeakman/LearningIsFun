"use strict";
//Description: This script will dynamically populate the page with all course information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman

$(function () {

    let urlParams = new URLSearchParams(location.search);
    let id = urlParams.get("id");

    $("#courseid").val(id);

    $("#saveBtn").on("click", function () {
        $.post("/api/register", $("#registerForm").serialize(), function (data) {
            window.location.href = "index.html"
        });

        return false;
    });//end of on click
});//end of ready function