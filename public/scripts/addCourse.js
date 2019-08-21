"use strict";
//Description:  this script will run the add a courses page
//Author:Cate Speakman

$(function () {

    //this function will call the JSON file and populate the table based on the call to 
    //restful API

    let objs;
    $.getJSON("/api/categories", function (categories) {

        objs = categories;

        for (let i = 0; i < objs.length; i++) {

            let category = objs[i];
            //put category type into ddl

            let option = document.createElement("option");
            option.text = category.Category;
            option.value = category.Category;
          
            $("#categoryList").append(option);

        };//end of the for loop for populating dropdown from location


    })//ends Json function


    //this onclick function will trigger form validation and will post the new course to be added provided
    //the form passes validation 

    $("#submitBtn").on("click", function () {


        let isValid = formValidation();

        if(isValid == false)
        {
            return false;
        }
       let str=$("#addCourseForm").serialize()
        $.post("/api/courses", $("#addCourseForm").serialize(), function (data) {
            window.location.href = "courses.html";
            alert("Add course successful");
        });

        return false;
    });//end of on click

})//ends ready function


function formValidation() {

    $("#errorMessages").empty();

    let errMsg = [];

    if ($("#courseId").val().trim() == "")
    {
        errMsg[errMsg.length] = "Course ID is required";
    }

    if ($("#title").val().trim() == "")
    {
        errMsg[errMsg.length] = "Title is required";
    }

    if ($("#startDate").val().trim() == "")
    {
        errMsg[errMsg.length] = "Start Date is required";
    }

    let dateReg = /^\d{2}\/\d{2}\/\d{2}$/
    if (dateReg.test($("#startDate").val()) == false)
    {
        errMsg[errMsg.length] = "Start Date must be MM/DD/YY formatd";
    }

if ($("#endDate").val().trim() == "")
    {
        errMsg[errMsg.length] = "End Date is required";
    }

    
    if (dateReg.test($("#endDate").val()) == false)
    {
        errMsg[errMsg.length] = "End Date must be MM/DD/YY formatd";
    }

    if ($("#meets").val().trim() == "")
    {
        errMsg[errMsg.length] = "Meets is required";
    }

    if ($("#fee").val().trim() == "")
    {
        errMsg[errMsg.length] = "Fee is required";
    }



    if (errMsg.length == 0) {
        return true;
    } 
    else {
        for (let i = 0; i < errMsg.length; i++) {
            $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
        }
        return false;
    }
}//ends on click function