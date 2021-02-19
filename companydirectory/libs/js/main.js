$(window).on('load', function () {    
    if ($('#preloader').length) {      
        $('#preloader').delay(100).fadeOut('slow', function () {        
            $(this).remove();      
        });    
    }
});
$(document).ready(function() {

    $.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
        
            if (result.status.name == "ok") {
                $.each(result['data']['personnel'], function(index) {
                    var newCard1 = `<div class='card'><div><h4 class='name'>${result['data']['personnel'][index].lastName}, <br>${result['data']['personnel'][index].firstName}</h4><p class='dept'>${result['data']['personnel'][index].name}</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:${result['data']['personnel'][index].email}'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn userBtns' type='button' data-toggle='modal' data-target='#details${index}'>View details</button></div>`;
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data']['personnel'][index].lastName + ", " + result['data']['personnel'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data']['personnel'][index].name + "</td></tr><tr><th>Location</th><td>" + result['data']['personnel'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data']['personnel'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#empCards").append(newCard1);
                    $("#empCardModals").append(newDetails); 


                });

                $.each(result['data']['department'], function(index1) {
                    $('#selectDept').append($("<option>", {
                        value: result.data.department[index1].id,
                        text: result.data.department[index1].name
                    }));
                    $('#formDept').append($("<option>", {
                        value: result.data.department[index1].id,
                        text: result.data.department[index1].name
                    }));
                    $('#formDeleteDept').append($("<option>", {
                        value: result.data.department[index1].id,
                        text: result.data.department[index1].name
                    }));
                    var newCard2 = `<div class='card'><h4 class='name'>${result['data']['department'][index1].name}</h4><p class='loc'>${result['data']['department'][index1].location}</p><img src='img/users-group.png' alt='Profile pic' style='width:25%'><br><button id='empList' class='btn userBtns' type='button' data-toggle='modal' data-target='#empList${index1}'>Employee List</button></div>`;
                    var empList = "<div class='modal fade' id='empList"+index1+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content listModals'><div class='modal-header'><h5 class='modal-title'>Employee List</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table id='empListTable"+index1+"'class='table table-striped table-hover'><tr><th>Name</th></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#deptCards").append(newCard2);
                    $("#deptCardModals").append(empList);

                    $.each(result['data']['personnel'], function(index2) {
                        if (result.data.personnel[index2].department == index1+1) {
                            var tableData = `<tr><td>${result.data.personnel[index2].lastName}, ${result.data.personnel[index2].firstName}</td></tr>`;
                            $(`#empListTable${index1}`).append(tableData);
                        }
                    });
                    
                });

                $.each(result['data']['location'], function(index) {
                    $('#selectLoc').append($("<option>", {
                        value: result.data.location[index].id,
                        text: result.data.location[index].name
                    })); 
                    $('#formLoc').append($("<option>", {
                        value: result.data.location[index].id,
                        text: result.data.location[index].name
                    })); 
                    $('#formDeleteLoc').append($("<option>", {
                        value: result.data.location[index].id,
                        text: result.data.location[index].name
                    }));
                    
                    var newCard3 = `<div class='card'><h4 class='name'>${result['data']['location'][index].name}</h4><img src='img/globe.png' alt='Profile pic' style='width:25%'><br></br><button id='locDetails' class='btn' type='button' data-toggle='modal' data-target='#deptList${index}'>Department List</button></div>`;
                    var deptList = `<div class='modal fade' id='deptList${index}' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content listModals'><div class='modal-header'><h5 class='modal-title'>Department List</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table id='deptListTable${index}'class='table table-striped table-hover'><tr><th>Departments at location</th></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>`;
                    $("#locCards").append(newCard3);
                    $("#locCardModals").append(deptList);
                    $.each(result['data']['department'], function(index3) {
                        if (result.data.department[index3].locationID == index+1) {
                            var tableData2 = `<tr><td>${result.data.department[index3].name}</td></tr>`;
                            $(`#deptListTable${index}`).append(tableData2);
                        }
                    });
                    
                });
                
            };
        },
        
    });

    $('#empDiv').show();
    $('#deptDiv').hide();
    $('#locDiv').hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top1').fadeIn();
        } else {
            $('#back-to-top1').fadeOut();
        }
    });
    $('#back-to-top1').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top2').fadeIn();
        } else {
            $('#back-to-top2').fadeOut();
        }
    });
    $('#back-to-top2').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top3').fadeIn();
        } else {
            $('#back-to-top3').fadeOut();
        }
    });
    $('#back-to-top3').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
    
});



$('#nameSearch').click(function() {
    $('#selectDept').prop('selectedIndex',0);
    $('#selectLoc').prop('selectedIndex',0);
    $.ajax({
        url: "libs/php/nameSearch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#nameInput').val(),
        },

        success: function(result) {
            $('#empCards').html("");
            $('#empCardModals').html("");
        
            if (result.status.name == "ok") {
                $.each(result['data']['personnel'], function(index) {
                    var newCard1 = `<div class='card'><div><h4 class='name'>${result['data']['personnel'][index].lastName}, <br>${result['data']['personnel'][index].firstName}</h4><p class='dept'>${result['data']['personnel'][index].name}</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:${result['data']['personnel'][index].email}'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn userBtns' type='button' data-toggle='modal' data-target='#details${index}'>View details</button></div>`;
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data']['personnel'][index].lastName + ", " + result['data']['personnel'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data']['personnel'][index].name + "</td></tr><tr><th>Location</th><td>" + result['data']['personnel'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data']['personnel'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#empCards").append(newCard1);
                    $("#empCardModals").append(newDetails); 
                });
            }
        },
    });
});

$('#selectDept').change(function() {
    $('#selectLoc').prop('selectedIndex',0);
    $.ajax({
        url: "libs/php/getAllByDeptID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            deptID: $('#selectDept').val()
        },

        success: function(result) {
            $('#empCards').html("");
            $('#empCardModals').html("");
            $('#deptCards').html("");
            $('#deptCardModals').html("");
        
            if (result.status.name == "ok") {
                $.each(result['data']['personnel'], function(index) {
                    var newCard1 = `<div class='card'><div><h4 class='name'>${result['data']['personnel'][index].lastName}, <br>${result['data']['personnel'][index].firstName}</h4><p class='dept'>${result['data']['personnel'][index].name}</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:${result['data']['personnel'][index].email}'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn userBtns' type='button' data-toggle='modal' data-target='#details${index}'>View details</button></div>`;
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data']['personnel'][index].lastName + ", " + result['data']['personnel'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data']['personnel'][index].name + "</td></tr><tr><th>Location</th><td>" + result['data']['personnel'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data']['personnel'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#empCards").append(newCard1);
                    $("#empCardModals").append(newDetails); 
                    
                });
                $.each(result['data']['department'], function(index) {
                    var newCard2 = `<div class='card'><h4 class='name'>${result['data']['department'][index].name}</h4><p class='loc'>${result['data']['department'][index].location}</p><img src='img/users-group.png' alt='Profile pic' style='width:25%'><br><button id='empList' class='btn userBtns' type='button' data-toggle='modal' data-target='#empList${index}'>Employee List</button></div>`;
                    var empList = "<div class='modal fade' id='empList"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content listModals'><div class='modal-header'><h5 class='modal-title'>Employee List</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table id='empListTable"+index+"'class='table table-striped table-hover'><tr><th>Name</th></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#deptCards").append(newCard2);
                    $("#deptCardModals").append(empList);
                });
            };
        }
    });

});

$('#selectLoc').change(function() {
    $('#selectDept').prop('selectedIndex',0);
    $.ajax({
        url: "libs/php/getAllByLocID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            locID: $('#selectLoc').val()
        },

        success: function(result) {
            $('#empCards').html("");
            $('#empCardModals').html("");
            $('#locCards').html("");
            $('#locCardModals').html("");
        
            if (result.status.name == "ok") {
                $.each(result['data']['personnel'], function(index) {
                    var newCard1 = `<div class='card'><div><h4 class='name'>${result['data']['personnel'][index].lastName}, <br>${result['data']['personnel'][index].firstName}</h4><p class='dept'>${result['data']['personnel'][index].name}</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:${result['data']['personnel'][index].email}'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn userBtns' type='button' data-toggle='modal' data-target='#details${index}'>View details</button></div>`;
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data']['personnel'][index].lastName + ", " + result['data']['personnel'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data']['personnel'][index].name + "</td></tr><tr><th>Location</th><td>" + result['data']['personnel'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data']['personnel'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#empCards").append(newCard1);
                    $("#empCardModals").append(newDetails); 
                });
                
                $.each(result['data']['location'], function(index) {
                    var newCard3 = `<div class='card'><h4 class='name'>${result['data']['location'][index].name}</h4><img src='img/globe.png' alt='Profile pic' style='width:25%'><br></br><button id='locDetails' class='btn' type='button' data-toggle='modal' data-target='#deptList${index}'>Department List</button></div>`;
                    var deptList = `<div class='modal fade' id='deptList${index}' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content listModals'><div class='modal-header'><h5 class='modal-title'>Department List</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table id='deptListTable${index}'class='table table-striped table-hover'><tr><th>Departments at location</th></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>`;
                    $("#locCards").append(newCard3);
                    $("#locCardModals").append(deptList);
                });
            };
        }
    });
    $.ajax({
        url: "libs/php/getAllDeptByLoc.php",
        type: 'POST',
        dataType: 'json',
        data: {
            locID: $('#selectLoc').val()
        },

        success: function(result) {
            $('#deptCards').html("");
            $('#deptCardModals').html("");
        
            if (result.status.name == "ok") {
                $.each(result['data']['department'], function(index) {
                    var newCard2 = `<div class='card'><h4 class='name'>${result['data']['department'][index].name}</h4><p class='loc'>${result['data']['department'][index].location}</p><img src='img/users-group.png' alt='Profile pic' style='width:25%'><br><button id='empList' class='btn userBtns' type='button' data-toggle='modal' data-target='#empList${index}'>Employee List</button></div>`;
                    var empList = "<div class='modal fade' id='empList"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content listModals'><div class='modal-header'><h5 class='modal-title'>Employee List</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table id='empListTable"+index+"'class='table table-striped table-hover'><tr><th>Name</th></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#deptCards").append(newCard2);
                    $("#deptCardModals").append(empList);
                });
            }
        }
    });
});

$('#editSearchBtn').click(function() {
    $.ajax({
        url: "libs/php/nameSearch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#editSearch').val()
        },

        success: function(result) {
        
            if (result.status.name == "ok") {
                $('#firstNameToEdit').val(result['data']['personnel'][0].firstName);
                $('#lastNameToEdit').val(result['data']['personnel'][0].lastName);

                $('#depToEdit').val(result['data']['department'][0].name);
                $('#emailToEdit').val(result['data']['personnel'][0].email);
            }
            var lastName = result['data']['personnel'][0].lastName;
            $('#submitEdit').click(function() {
                $.ajax({
                    url: "libs/php/editEmployee.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        firstNameEdit: $('#firstNameToEdit').val(),
                        lastNameEdit: $('#lastNameToEdit').val(),
                        depEdit: $('#depToEdit').val(),
                        emailEdit: $('#emailToEdit').val(),
                        lastName: lastName
                    },
                })
            });
        },
    });
});

$('#deleteSearchBtn').click(function() {
    $.ajax({
        url: "libs/php/nameSearch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#deleteSearch').val()
        },

        success: function(result) {
        
            if (result.status.name == "ok") {
                $('#formFirstNameToDelete').val(result['data']['personnel'][0].firstName);
                $('#formLastNameToDelete').val(result['data']['personnel'][0].lastName);
                $('#empDepToDelete').val(result['data']['department'][0].name);
                $('#hiddenID').val(result['data']['personnel'][0].id);
            }
            
        },
    });
});
$('#deptDeleteCheck').click(function() {
    $.ajax({
        url: "libs/php/countEmployees.php",
        type: 'POST',
        dataType: 'json',
        data: {
            deptID: $('#formDeleteDept').val()
        },
        success: function(result) {        
            if (result.status.name == "ok") {
                if (result.data.employees[0].employees == 0){
                    bootbox.alert("There are no employees in this department, it is safe to delete.", function() {
                        $('#confirmDeleteDeptBtn').prop("disabled", false);
                    }) 
                } else {
                    bootbox.alert("There are existing employees in this department, please remove those employees first before attempting to delete.");
                };
            }
        }
    });
});
$('#formDeleteDept').change(function() {
    $('#confirmDeleteDeptBtn').prop("disabled", true);
});
$('#submitDeleteDeptForm').submit(function(e) {
    $.ajax({
        url: "libs/php/deleteDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: $('#formDeleteDept').val()
        }                    
    });
});

$('#locDeleteCheck').click(function() {
    $.ajax({
        url: "libs/php/countDepartments.php",
        type: 'POST',
        dataType: 'json',
        data: {
            locID: $('#formDeleteLoc').val()
        },
        success: function(result) {        
            if (result.status.name == "ok") {
                if (result.data.departments[0].departments == 0){
                    bootbox.alert("There are no departments at this location, it is safe to delete.", function() {
                        $('#confirmDeleteLocBtn').prop("disabled", false);
                    }) 
                } else {
                    bootbox.alert("There are existing department(s) at this location, please remove those department(s) first before attempting to delete.");
                };
            };
        }
    });
});
$('#formDeleteLoc').change(function() {
    $('#confirmDeleteLocBtn').prop("disabled", true);
});
$('#submitDeleteLocForm').submit(function() {
    $.ajax({
        url: "libs/php/deleteLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: $('#formDeleteLoc').val()
        }                    
    });
});


$('#submitDeleteEmpForm').submit(function() {
    $.ajax({
        url: "libs/php/deleteEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: $('#hiddenID').val()
        }
    });
});

$('#submitAddForm').submit(function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    $.ajax({
        url: "libs/php/insertNewEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: $('#formFirstName').val(),
            lastName: $('#formLastName').val(),
            email: $('#formEmail').val(),
            depID: $('#formDept').val()
        },

    });
});

$('#submitAddDeptForm').submit(function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    $.ajax({
        url: "libs/php/insertNewDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#formDeptName').val(),
            locationID: $('#formLoc').val()
        },

    });
});



$('#submitAddLocForm').submit(function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    $.ajax({
        url: "libs/php/insertNewLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#formLocName').val()
        },

    });
});


$('#editDetailsBtn').click(function() {
    $.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            if (result.status.name == "ok") {
                var depSelect = "<select id='depToEdit' class='custom-select' required='required'><option value='' disabled selected>Select Department</option></select>"
                $('#depToEdit').replaceWith(depSelect);
                $.each(result['data']['department'], function(index) {
                    $('#depToEdit').append($("<option>", {
                        value: result.data.department[index].id,
                        text: result.data.department[index].name
                    }));
                });
            }
        },
    });
    $('#firstNameToEdit').removeAttr('disabled');
    $('#lastNameToEdit').removeAttr('disabled');
    $('#emailToEdit').removeAttr('disabled');
});

$('#allButton').click(function() {
    $('#selectDept').prop('selectedIndex',0);
    $('#selectLoc').prop('selectedIndex',0);
    $.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            $('#empCards').html("");
            $('#deptCards').html("");
            $('#locCards').html("");
            $('#empCardModals').html("");
            $('#deptCardModals').html("");
            $('#locCardModals').html("");
        
            if (result.status.name == "ok") {
                $.each(result['data']['personnel'], function(index) {
                    var newCard1 = `<div class='card'><div><h4 class='name'>${result['data']['personnel'][index].lastName}, <br>${result['data']['personnel'][index].firstName}</h4><p class='dept'>${result['data']['personnel'][index].name}</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:${result['data']['personnel'][index].email}'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn userBtns' type='button' data-toggle='modal' data-target='#details${index}'>View details</button></div>`;
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data']['personnel'][index].lastName + ", " + result['data']['personnel'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data']['personnel'][index].name + "</td></tr><tr><th>Location</th><td>" + result['data']['personnel'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data']['personnel'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#empCards").append(newCard1);
                    $("#empCardModals").append(newDetails); 


                });
                $.each(result['data']['department'], function(index1) {
                    var newCard2 = `<div class='card'><h4 class='name'>${result['data']['department'][index1].name}</h4><p class='loc'>${result['data']['department'][index1].location}</p><img src='img/users-group.png' alt='Profile pic' style='width:25%'><br><button id='empList' class='btn userBtns' type='button' data-toggle='modal' data-target='#empList${index1}'>Employee List</button></div>`;
                    var empList = "<div class='modal fade' id='empList"+index1+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content listModals'><div class='modal-header'><h5 class='modal-title'>Employee List</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table id='empListTable"+index1+"'class='table table-striped table-hover'><tr><th>Name</th></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#deptCards").append(newCard2);
                    $("#deptCardModals").append(empList);

                });

                $.each(result['data']['location'], function(index) {
                    var newCard3 = `<div class='card'><h4 class='name'>${result['data']['location'][index].name}</h4><img src='img/globe.png' alt='Profile pic' style='width:25%'><br></br><button id='locDetails' class='btn' type='button' data-toggle='modal' data-target='#deptList${index}'>Department List</button></div>`;
                    var deptList = `<div class='modal fade' id='deptList${index}' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content listModals'><div class='modal-header'><h5 class='modal-title'>Department List</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table id='deptListTable${index}'class='table table-striped table-hover'><tr><th>Departments at location</th></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>`;
                    $("#locCards").append(newCard3);
                    $("#locCardModals").append(deptList);

                    
                });
            }
        },
        
    });
});

$('#selectView').change(function(){
    var selected = $(this).val();
    $('#selectDept').prop('selectedIndex',0);
    $('#selectLoc').prop('selectedIndex',0);
    $('#allButton').trigger("click");
    if (selected == 1){
        $('#empDiv').show();
        $('#deptDiv').hide();
        $('#locDiv').hide();
    } else if (selected == 2){
        $('#empDiv').hide();
        $('#deptDiv').show();
        $('#locDiv').hide();
    } else if (selected == 3){
        $('#empDiv').hide();
        $('#deptDiv').hide();
        $('#locDiv').show();

    }
});



$('#editUser').on('hide.bs.modal', function (event) {
    $('.form-control').val("");
});

$('#addUser').on('hide.bs.modal', function (event) {
    $('.form-control').val("");
});
