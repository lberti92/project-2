new Chart(document.getElementById("pie-chart"), {
  type: 'pie',
  data: {
    labels: ["Woody/Nutty", "Caramel", "Herbal/Spice", "Citrus", "Floral", "Fruity", "Vanilla", "None/Mild"],
    datasets: [{
      label: "List of Flavors",
      backgroundColor: ["#6E2C00", "#F8C471", "#C0392B", "#FFA500", "#BB8FCE", "#FF1493", "#FEF9E7", "#85929E"],
      data: [450, 450, 450, 450, 450, 450, 450, 450]
    }]
  },
  options: {
    legend: {
      display: false,
    },  
   //this tells us which array index is clicked on ex: Herbal Spice is 2
    "onClick": function (event, item) {
      event.preventDefault();
      console.log(item[0]._index);
      $.ajax({

        type:"GET",
        url:'/api/flavors'
      
    });
  }
}
});