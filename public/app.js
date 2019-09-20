$(".buttonNote").on("click", function() {
  var thisId = $(this).attr("data-id");
  $("#"+thisId).show()
});

$(document).on("click", ".savenote", function() {
  console.log(this)
  var thisId = $(this).attr("data-id");

  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $(`#titleinput-${thisId}`).val(),
      body: $(`#bodyinput-${thisId}`).val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $(`#titleinput-${thisId}`).val("");
  $(`#bodyinput-${thisId}`).val("");
  location.reload()
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
});

$(document).on("click", "#delete", function() {
    alert("deleted")
  var noteId = $(this).attr("data-noteid");
  var  articleId = $(this).attr("data-artid");
  console.log(noteId)
  $.ajax({
    method: "DELETE",
    url: "/deleteNote/"+noteId+"/"+ articleId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
    location.reload()
});
