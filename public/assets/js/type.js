function getType() {
  $.get("/type", function(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createTypeRow(data[i]));
    }
    renderTypeList(rowsToAdd);
  });
}

// function renderAuthorList(rows) {
//   authorList.children().not(":last").remove();
//   authorContainer.children(".alert").remove();
//   if (rows.length) {
//     console.log(rows);
//     authorList.prepend(rows);
//   }
//   else {
//     renderEmpty();
//   }
// }

// function handleDeleteButtonPress() {
//   var listItemData = $(this).parent("td").parent("tr").data("author");
//   var id = listItemData.id;
//   $.ajax({
//     method: "DELETE",
//     url: "/api/authors/" + id
//   })
// }