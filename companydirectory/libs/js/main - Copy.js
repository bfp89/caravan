$(document).ready(function() {

    $.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                $.each(result['data'], function(index) {
                    var newCard = "<div class='card filter " + result['data'][index].department.replace(/\s+/g, '') + " " + result['data'][index].location.replace(/\s+/g, '') + " " + result['data'][index].lastName + "'><h3 class='name'>" + result['data'][index].lastName + ', <br>' + result['data'][index].firstName + "</h3><p class='dept'>" + result['data'][index].department + "</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:" + result['data'][index].email + "'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn btn-primary' data-toggle='modal' data-target='#details"+index+"'>View details</button></div>";
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data'][index].lastName + ", " + result['data'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data'][index].department + "</td></tr><tr><th>Location</th><td>" + result['data'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-primary'>Save changes</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    
                    $("#cards").append(newCard);
                    $("#modals").append(newDetails); 

                });
                $("#allButton").trigger("click");
            };
        },
    });
});

$('#nameSearch').click(function() {
    $.ajax({
        url: "libs/php/nameSearch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#nameInput').val()
            
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

$('#editSearchBtn').click(function() {
    $.ajax({
        url: "libs/php/nameSearch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#editSearch').val(),
            id: $('#depToEdit').val()
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

$('#submitAdd').click(function() {
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

        // success: function(result) {
        //     console.log(result);
        //     if (result.status.name == "ok") {
                
        //     }
        // },
    });
});







$('#editFirstNameBtn').click(function() {
    $('#firstNameToEdit').removeAttr('disabled');
});

$('#editLastNameBtn').click(function() {
    $('#lastNameToEdit').removeAttr('disabled');
});

$('#editDepBtn').click(function() {
    var depSelect = "<select id='formEditDept' name='formEditDept' class='custom-select' required='required'><option value='' disabled selected>Select Department</option><option value='1'>HR</option><option value='2'>Sales</option><option value='3'>Marketing</option><option value='4'>Legal</option><option value='5'>Services</option><option value='6'>Research and Development</option><option value='7'>Product Management</option><option value='8'>Training</option><option value='9'>Support</option><option value='10'>Engineering</option><option value='11'>Accounting</option><option value='12'>Business Development</option></select>"
    $('#depToEdit').replaceWith(depSelect);
});

$('#editEmailBtn').click(function() {
    $('#emailToEdit').removeAttr('disabled');
});

$('#allButton').click(function() {
    filterSelection($(this).val());
});

$('.dropdown-item').click(function() {
    filterSelection($(this).val());
});

$('#editUser').on('hide.bs.modal', function (event) {
    $('.form-control').val("");
  })

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