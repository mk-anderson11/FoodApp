$(document).ready(function() {

  // Function to update the database
  function updateComments() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#CommentSection").html(everything);
    })
  }

  // Update comments as page loads
  updateComments();

  $("#Post").click(function() {


    var myobj = {Name: $("#Name").val(),Comment:$("#Comment").val()};
    jobj = JSON.stringify(myobj);

    var url = "comment";
    $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        // do nothing
      }
    })

    //$("#CommentSection").text(jobj);
    updateComments();
  });


});
