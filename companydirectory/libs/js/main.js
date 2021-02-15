
$(document).ready(function() {

    $.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                $.each(result['data'], function(index) {
                    var newCard1 = `<div class='card col-2 filter dept${result['data'][index].department} loc${result['data'][index].locationID} ${result['data'][index].lastName}'><h4 class='name'>${result['data'][index].lastName}, <br>${result['data'][index].firstName}</h4><p class='dept'>${result['data'][index].name}</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:${result['data'][index].email}'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn' type='button' data-toggle='modal' data-target='#details${index}'>View details</button></div>`;
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data'][index].lastName + ", " + result['data'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data'][index].name + "</td></tr><tr><th>Location</th><td>" + result['data'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    
                    $("#empCards").append(newCard1);
                    
                    $("#empModals").append(newDetails); 

                });
                $("#allButton").trigger("click");
            };
        },
    });

    $.ajax({
        url: "libs/php/deptSearch.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            if (result.status.name == "ok") {
                $.each(result['data']['department'], function(index) {
                    $('#selectDept').append($("<option>", {
                        value: result.data.department[index].id,
                        text: result.data.department[index].name
                    }));
                    $('#formDept').append($("<option>", {
                        value: result.data.department[index].id,
                        text: result.data.department[index].name
                    }));
                    $('#formDeleteDept').append($("<option>", {
                        value: result.data.department[index].id,
                        text: result.data.department[index].name
                    }));
                    
                    var newCard2 = `<div class='card col-2 filter dept${result['data']['department'][index].id}'><h4 class='name'>${result['data']['department'][index].name}</h4><p class='loc'>${result['data']['department'][index].location}</p><img src='img/users-group.png' alt='Profile pic' style='width:25%'><br><button id='deptDetails' class='btn' type='button' data-toggle='modal' data-target='#deptDetails${index}'>Employee List</button></div>`;
                    $("#deptCards").append(newCard2);
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
                    var newCard3 = `<div class='card col-2 filter loc${result['data']['location'][index].id}'><h4 class='name'>${result['data']['location'][index].name}</h4><img src='img/globe.png' alt='Profile pic' style='width:25%'><br><button id='locDetails' class='btn' type='button' data-toggle='modal' data-target='#locDetails${index}'>Employee List</button></div>`;
                    $("#locCards").append(newCard3);
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
    $.ajax({
        url: "libs/php/nameSearch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#nameInput').val(),
            id: 0
        },

        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                $.each(result['data']['personnel'], function(index) {
                    filterSelection(result['data']['personnel'][index].lastName);
                });
            }
        },
    });
});

$('#selectDept').change(function() {
    var selected = $(this).val();
    $.ajax({
        url: "libs/php/deptSearch.php",
        type: 'POST',
        dataType: 'json',

        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                $.each(result['data']['department'], function(index) {
                    if (selected == result['data']['department'][index].id) {
                        filterSelection(`dept${result['data']['department'][index].id}`); 
                    };
                });
            };
        }
    });

});

$('#selectLoc').change(function() {
    var selected = $(this).val();
    $.ajax({
        url: "libs/php/deptSearch.php",
        type: 'POST',
        dataType: 'json',

        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                $.each(result['data']['location'], function(index) {
                    if (selected == result['data']['location'][index].id) {
                        filterSelection(`loc${result['data']['location'][index].id}`); 
                    };
                });
            };
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
            console.log(result);
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
            console.log(result);
            if (result.status.name == "ok") {
                $('#formFirstNameToDelete').val(result['data']['personnel'][0].firstName);
                $('#formLastNameToDelete').val(result['data']['personnel'][0].lastName);
                $('#empDepToDelete').val(result['data']['department'][0].name);
                $('#hiddenID').val(result['data']['personnel'][0].id);
            }
            
        },
    });
});

$('#submitDeleteEmpForm').submit(function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    alert("Are you sure you want to delete this employee permenantly?")
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

$('#submitDeleteDeptForm').submit(function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    alert("Are you sure you want to delete this department permenantly?")
    $.ajax({
        url: "libs/php/deleteDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: $('#formDeleteDept').val()
        }

    });
});



$('#editDetailsBtn').click(function() {
    $.ajax({
        url: "libs/php/deptSearch.php",
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
    filterSelection($(this).val());
    $('#selectDept').prop('selectedIndex',0);
    $('#selectLoc').prop('selectedIndex',0);
});

$('#selectView').change(function(){
    var selected = $(this).val();
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
    $("#allButton").trigger("click");
});



$('#editUser').on('hide.bs.modal', function (event) {
    $('.form-control').val("");
});

$('#addUser').on('hide.bs.modal', function (event) {
    $('.form-control').val("");
});



function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filter");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      removeClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
  }
  
  // Show filtered elements
  function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }
  
  // Hide elements that are not selected
  function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  };
  

  function nameInput() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('nameInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("nameDrop");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "block";
      } else {
        li[i].style.display = "none";
      }
    }
  }