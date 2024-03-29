"use strict";

//Description: this script will dynamically add locations of national parks to a dropdown and  park types to a 
// dropdown and then build a table of national parks based on selection of the user.
//Author:Cate Speakman


//this is for populating the location dropdown

$(function () {

    //this function will call the JSON file and populate the table based on the call to 
    //restful API

    $("#addCourseBtn").prop("href", "addCourses.html");

    let objs;
    $.getJSON("/api/categories", function (categories) {

        objs = categories;

        for (let i = 0; i < objs.length; i++) {

            let category = objs[i];
            //put category type into ddl

            let option = document.createElement("option");
            option.text = category.Category;
            option.value = category.Value;

            $("#categoryList").append(option);

        };//end of the for loop for populating dropdown from location


    })//ends Json function

    $("#categoryList").on("change", showList)
    $("#allCourses").on("click", showAllCourses)

})//ends ready function

//this function will call the JSON file and populated the table based on user selection within dropdown

function showList() {
    let objs;

    if ($("#categoryList").val() != "-1"){
    $.getJSON("/api/courses/bycategory/" + $('#categoryList').val(), function (courses) {

        objs = courses;
        $("#courseTable tbody").empty();

        for (let i = 0; i < objs.length; i++) {
            
                let courseRow = "<tr><td>" + objs[i].CourseId
                    + "</td><td>" + objs[i].Title
                    + "</td><td><a href='details.html?courseid=" + objs[i].CourseId + "'>Details</a>"
                    + "</td><td><a href='editCourse.html?courseid=" + objs[i].CourseId + "'>Edit</a>"
                    + "</td></tr>";
                $("#courseTable tbody").append(courseRow);
          

        }//ends for loop for populating table based on DDL selection
    });//ends JSON function
    }//ends if statement for category 
}//ends showList function

function showAllCourses() {
    let objs;

    $.getJSON("/api/courses/", function (courses) {

        objs = courses;
        $("#courseTable tbody").empty();

        for (let i = 0; i < objs.length; i++) {
            
                let courseRow = "<tr><td>" + objs[i].CourseId
                    + "</td><td>" + objs[i].Title
                    + "</td><td><a href='details.html?courseid=" + objs[i].CourseId + "'>Details</a>"
                    + "</td></tr>";
                $("#courseTable tbody").append(courseRow);
          

        }//ends for loop for populating table based on DDL selection
    });//ends JSON function
}//ends function for show all courses