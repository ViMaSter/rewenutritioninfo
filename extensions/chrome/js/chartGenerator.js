let nutritionTable;
const pieSize = 20;

const tableToJson = (table) => {
    const rows = Array.from(table.rows);
    rows.shift();
    return Object.fromEntries(rows.map(row => [row.cells[0].innerText, parseFloat(row.cells[1].innerText)]))
}

const onLoadChartJS = () => {
    nutritionTable.style.display = "inline-block";

    // create context
    const pieCanvas = document.createElement("canvas");
    const size = parseInt((document.documentElement.clientWidth / 100) * pieSize);
    pieCanvas.width = size;
    pieCanvas.height = size;
    pieCanvas.style.width = size + "px";
    pieCanvas.style.height = size + "px";
    pieCanvas.style.display = "inline-block";
    pieCanvas.style.verticalAlign = "top";
    nutritionTable.parentNode.insertBefore(pieCanvas, nutritionTable.nextSibling);

    const rawNutritionData = tableToJson(nutritionTable);
    const converted = {
		"Kohlenhydrate":
		{
			color: "#061DCC",
			value: rawNutritionData.Kohlenhydrate,
		},
		"Fett":
		{
			color: "#CC061D",
			value: rawNutritionData.Fett * 2,
		},
		"Eiweiß":
		{
			color: "#1DCC06",
			value: rawNutritionData.Eiweiß
		},
    };

    // create pie
    var myPieChart = new Chart(pieCanvas.getContext("2d"), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: Object.values(converted).map(entry=>entry.value),
                backgroundColor: Object.values(converted).map(entry=>entry.color)
			}],
			labels: Object.keys(converted)
        },
        options: {
            responsive: false,
            aspectRatio: 1,
            animation: {
                duration: 0 // general animation time
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    });
};

const init = () => {
    // find table
    nutritionTable = document.querySelector(".pdr-NutritionTable");
    if (nutritionTable == null) {
        return;
    }

    // load chart JS
    const script = document.createElement('script');
    script.onload = onLoadChartJS;
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js";
    nutritionTable.parentNode.insertBefore(script, nutritionTable.nextSibling);
}

init();