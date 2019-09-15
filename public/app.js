$(document).on("click",".buttonNote", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});


$(document).on("click", ".buttonSaved", function() {
  $(this).animate({
    height: 'toggle'
  });
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {}
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});

$(document).on("click", ".buttonDelete", function() {
  $(this).animate({
    height: 'toggle'
  });
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "PUT",
    url: "/delete/" + thisId,
    data: {}
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
    location.reload()
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});

$(document).on("click", "#scrapeButton", function() {
  $(this).animate({
    height: 'toggle'
  });
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {}
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});