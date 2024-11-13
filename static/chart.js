const PROPERTY_1 = "Штатных единиц - ";
const PROPERTY_2 = "в т.ч. Вакансии - ";
const CUBE_PROPERY_1 = "Штатных единиц";
const CUBE_PROPERY_2 = "Вакансии";
const mainNodeId = 273000007002;
const svgHeight = 0.9;
var chart;
var index = 0;
var compact = 0;
var actNdCent = 0;
var nodeIds = [];

async function getOrgData() {
    const data = await fetch("./getOrgData")
        .then((result) => {
            if (result.ok) {
                return result.json();
            }
            console.log(result);
            return Promise.reject(new Error(result.statusText));
        })
        .then((json) => {
            if (json && json.length > 0) {
                return json;
            } else {
                console.log(json.length);
                return Promise.reject(new Error("Empty JSON object!"));
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении orgData:", error.message);
            return {};
        });

    return data;
}

getOrgData().then((dataFlattened) => {
    const currentDate = document.getElementById("current-date");
    currentDate.innerHTML = `Организационная структура на ${dataFlattened[1]}`;
    chart = new d3.OrgChart()
        .container(".chart-container") // Контейнер для диаграммы
        .data(dataFlattened[0]) // Загрузка данных для построения диаграммы
        .svgHeight(window.innerHeight * svgHeight)
        .nodeHeight((d) => 140) // Высота узла
        .nodeWidth((d) => 270) // Ширина узла
        .childrenMargin((d) => 90) // Отступ между детьми
        .compactMarginBetween((d) => 50) // Отступ между родителем и детьми
        .compactMarginPair((d) => 50) // Отступ в компактной компоновке
        .neightbourMargin((a, b) => 75) // Отступ между соседними узлами
        .siblingsMargin((d) => 100) // Отступ между братьями и сестрами
        .buttonContent(({ node, state }) => {
            // Кнопка для раскрытия/сворачивания узлов
            return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
                node.children
                    ? `<i class="fas fa-angle-up"></i>`
                    : `<i class="fas fa-angle-down"></i>`
            }</span> ${node.data._directSubordinates}  </div>`;
        })
        .linkUpdate(function (d, i, arr) {
            // Настройка линий соединения узлов
            d3.select(this)
                .attr("stroke", (d) =>
                    d.data._upToTheRootHighlighted ? "#FDCD56" : "#212529"
                ) // Цвет линии
                .attr("stroke-width", (d) =>
                    d.data._upToTheRootHighlighted ? 5 : 1
                ); // Толщина линии
            if (d.data._upToTheRootHighlighted) d3.select(this).raise(); // Перемещаем выделенные линии выше
        })
        .nodeUpdate(function (d, i, arr) {
            d3.select(this)
                .select(".node-rect")
                .attr("stroke", (d) =>
                    d.data._highlighted || d.data._upToTheRootHighlighted
                        ? "#FDCD56"
                        : "none"
                )
                .attr(
                    "stroke-width",
                    d.data._highlighted || d.data._upToTheRootHighlighted
                        ? 10
                        : 1
                );
        })
        .nodeContent(function (d, i, arr, state) {
            // Контент узла
            return `
                    <div style="
                        font-family: 'Inter', sans-serif;
                        background-color:#FFFFFF;
                        display: flex;
                        width:270px;
                        height:140px;
                        border-radius:10px;
                        border: 1px solid #E4E2E9;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                    "> 
                        <div style="                    
                        text-align: center;
                        padding-left: 1em;
                        padding-right: 1em;
                        font-weight: bold;
                        ">${d.data.name}</div>
                        <div style="
                        color: #716E7B;                        
                        align-self: start;
                        padding-left: 1em;
                        "> ${PROPERTY_1} ${d.data[CUBE_PROPERY_1]}<br/> ${PROPERTY_2} ${d.data[CUBE_PROPERY_2]}</div>
                        </div>
                    </div>
                    `;
        })
        .onNodeClick((d) => {
            if (d) {
                nodeIds.push(d);
                chart.setHighlighted(d).render();
                console.log(nodeIds);
            } else {
                console.error(
                    "Node ID не найден или структура данных неверна:",
                    d
                );
            }
        })
        .render(); // Отрисовка диаграммы
});

function downloadPdf() {
    chart.exportImg({
        save: false,
        onLoad: (base64) => {
            var pdf = new jspdf.jsPDF();
            var img = new Image();
            img.src = base64;
            img.onload = function () {
                pdf.addImage(
                    img,
                    "JPEG",
                    5,
                    5,
                    595 / 3,
                    ((img.height / img.width) * 595) / 3
                );
                pdf.save("chart.pdf");
            };
        },
    });
}

function centerNode() {
    chart.setCentered(mainNodeId).render(); // Центрируем узел и перерисовываем диаграмму
}
window.addEventListener("resize", () => {
    chart.svgHeight(window.innerHeight * svgHeight).render(); // Обновление высоты при изменении размера окна
});

function filterChart(e) {
    // Get input value
    const value = e.srcElement.value;
    // Clear previous higlighting
    chart.clearHighlighting();
    nodeIds.length = 0;
    // Get chart nodes
    const data = chart.data();
    // Mark all previously expanded nodes for collapse
    data.forEach((d) => (d._expanded = false));
    // Loop over data and check if input value matches any name
    data.forEach((d) => {
        if (value != "" && d.name.toLowerCase().includes(value.toLowerCase())) {
            // If matches, mark node as highlighted
            d._highlighted = true;
            d._expanded = true;
            nodeIds.push(d.id);
            console.log(nodeIds);
        }
    });
    // Update data and rerender graph
    chart.data(data).render().fit();
    // console.log('filtering chart', e.srcElement.value);
}

function clearHighlighting() {
    chart.clearHighlighting();
    nodeIds.length = 0;
}

function highlightMultipleBranches() {
    nodeIds.forEach((nodeId) => {
        chart.setUpToTheRootHighlighted(nodeId);
    });
    chart.render().fit();
}
