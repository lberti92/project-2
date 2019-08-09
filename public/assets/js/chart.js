new Chart(document.getElementById("pie-chart"), {
  type: 'pie',
  data: {
    labels: ["Woody/Nutty", "Caramel", "Herbal Spice", "Citrus", "Floral", "Fruity", "Vanilla", "None/Mild"],
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
      console.log(item[0]._index);
      var index = item[0]._index;
      function getFlavor() {

        var flavorChoice;

        switch (index.toString()) {
          case "0":
            console.log(true);
            return flavorChoice = "Woody-Nutty";
          case "1":
            return flavorChoice = "Caramel";
          case "2":
            return flavorChoice = "Herbal-Spice";
          case "3":
            return flavorChoice = "Citrus";
          case "4":
            return flavorChoice = "Floral";
          case "5":
            return flavorChoice = "Fruity";
          case "6":
            return flavorChoice = "Vanilla";
          case "7":
            return flavorChoice = "None-Mild";
        }
      }
      console.log(getFlavor());
      // $.get(`/api/flavors/${getFlavor()}`, function (data) {
      //   console.log(`/api/flavors/${getFlavor()}`);
      //   console.log("data from the backend", data);
      // });
      window.location = `${getFlavor()}`;
    }
  }
});