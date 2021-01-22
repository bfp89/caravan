$(document).ready(function() {

    $.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                $.each(result['data'], function(index) {
                    var newCard = "<div class='card'><h3 class='name'>" + result['data'][index].lastName + ', <br>' + result['data'][index].firstName + "</h3><p class='dept'>" + result['data'][index].department + "</p><img src='img/employee-icon.png' alt='Profile pic' style='width:25%'><br><a id='email' href='mailto:" + result['data'][index].email + "'><i class='fa fa-envelope'></i>Email</a><br><button id='vDetails' class='btn btn-primary' data-toggle='modal' data-target='#details"+index+"'>View details</button></div>";
                    var newDetails = "<div class='modal fade' id='details"+index+"' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Employee Details</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div><table class='table table-striped table-hover'><tr><th>Name</th><td>" + result['data'][index].lastName + ", " + result['data'][index].firstName + "</td></tr><tr><th>Department</th><td>" + result['data'][index].department + "</td></tr><tr><th>Location</th><td>" + result['data'][index].location + "</td></tr><tr><th>Email</th><td>" + result['data'][index].email + "</td></tr></table></div></div><div class='modal-footer'><button type='button' class='btn btn-primary'>Save changes</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div></div></div>";
                    $("#cards").append(newCard);
                    $("#modals").append(newDetails);
                });
            };
        },
    });
});
