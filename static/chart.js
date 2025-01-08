/**
 * Коэффициент для высоты SVG.
 * @type {number}
 */
const setSvgHeight = 0.9;

/**
 * Коэффициент для ширины SVG.
 * @type {number}
 */
var setSvgWidth = 0.93;

/**
 * Экземпляр диаграммы.
 * @type {Object}
 */
var chart;

/**
 * Индекс текущего элемента.
 * @type {number}
 */
var index = 0;

/**
 * Флаг компактного режима.
 * @type {number}
 */
var compact = 0;

/**
 * Центрированный узел.
 * @type {number}
 */
var actNdCent = 0;

/**
 * Массив идентификаторов узлов.
 * @type {Array}
 */
var nodeIds = [];

/**
 * Уровень глубины для раскрывшихся узлов.
 * @type {number}
 */
var depthLevel = 1;

/**
 * Асинхронная функция для получения данных оргструктуры.
 * @returns {Promise<Object>} Объект с данными организации.
 */
async function getOrgData() {
    const data = await fetch(
        "https://am11.optimacros.com/app/27a00272-de36-4fe1-b354-1f23481c78e4/getOrgData"
    )
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

/**
 * Инициализация диаграммы при загрузке данных.
 * @param {Array} dataFlattened - Развернутые данные для диаграммы.
 */
getOrgData().then((dataFlattened) => {
    const currentDate = document.getElementById("current-date");
    currentDate.innerHTML = `Организационная структура на ${dataFlattened[1]}`;
    chart = new d3.OrgChart()
        .container(".chart-container") // Контейнер для диаграммы
        .data(dataFlattened[0]) // Загрузка данных для построения диаграммы
        .svgHeight(window.innerHeight * setSvgHeight)
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
                    <div style="font-family: 'Inter', sans-serif;background-color:#FFFFFF;display: flex;width:270px;height:140px;border-radius:10px;border: 1px solid #E4E2E9;flex-direction: column;justify-content: space-around;align-items: center;">
                        <div style="text-align: center;padding-left: 1em;padding-right: 1em;font-weight: bold;">${
                            d.data.name
                        }</div>
                        <div style="color: #716E7B;align-self: start;padding-left: 1em;"> ${setDescriptionDiv(
                            d
                        )}</div>
                    </div>
                    `;
        })
        .onNodeClick((d) => {
            if (d) {
                if (nodeIds.indexOf(d) !== -1) {
                    nodeIds.splice(nodeIds.indexOf(d), 1);
                    removeHighlighted(d).render();
                } else {
                    nodeIds.push(d);
                    chart.setHighlighted(d).render();
                }
                console.log(nodeIds);
            } else {
                console.error(
                    "Node ID не найден или структура данных неверна:",
                    d
                );
            }
        })
        .render()
        .fit();
});

/**
 * Функция для скачивания диаграммы в формате PDF.
 */
function downloadPdf() {
    const date = new Date(Date.now()).toLocaleString("ru-RU");
    chart.exportImg({
        scale: 7,
        save: false,
        onLoad: (base64) => {
            // orient "landscape"
            var pdf = new jspdf.jsPDF("landscape");
            var img = new Image();
            img.src = base64;
            img.onload = function () {
                const pageWidth = pdf.internal.pageSize.getWidth(); // Ширина страницы
                const imgWidth = pageWidth - 10; // Поля отступа (по 5px с каждой стороны)
                const imgHeight = (img.height / img.width) * imgWidth; // Высота пропорционально ширине

                pdf.addImage(
                    img,
                    "JPEG",
                    5, // Горизонтальный отступ
                    5, // Вертикальный отступ
                    imgWidth, // Ширина изображения
                    imgHeight, // Высота изображения
                    undefined,
                    "FAST" // Указываем высокую производительность
                );
                pdf.save(`chart ${date}.pdf`);
            };
        },
    });
}

/**
 * Центрирует узел и перерисовывает диаграмму.
 */
function centerNode() {
    chart.setCentered(mainNodeId).render();
}

/**
 * Функция для фильтрации диаграммы по поисковому запросу.
 * @param {Event} e - Событие ввода данных в поисковую строку.
 */
function filterChart(e) {
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
            d._highlighted = true;
            d._expanded = true;
            nodeIds.push(d.id);
        }
    });
    chart.data(data).render().fit();
}

/**
 * Функция для снятия выделения с узлов.
 */
function clearHighlighting() {
    chart.clearHighlighting();
    nodeIds.length = 0;
}

/**
 * Функция для выделения связи узла до root.
 */
function highlightMultipleBranches() {
    nodeIds.forEach((nodeId) => {
        chart.setUpToTheRootHighlighted(nodeId);
    });
    chart.render().fit();
}

/**
 * Раскрывает один уровень узлов.
 */
function expandToLowestLevel() {
    const allNodes = getAllNodes();
    // Определяем максимальную глубину узлов
    const maxDepth = Math.max(...allNodes.map((node) => node.depth));
    if (allNodes.length > 0) {
        depthLevel = depthLevel >= maxDepth ? maxDepth : (depthLevel += 1);
        allNodes.forEach((d) => {
            if (d.depth <= depthLevel) {
                d.data._expanded = true;
            }
        });
    }
    chart.render().fit();
}

/**
 * Скрывает один уровень узлов.
 */
function collapseLowestLevel() {
    const allNodes = getAllNodes();
    if (allNodes.length > 0) {
        allNodes.forEach((d) => {
            if (d.depth >= depthLevel) {
                d.data._expanded = false;
            }
        });
        depthLevel = depthLevel < 1 ? depthLevel : (depthLevel -= 1);
    }
    if (depthLevel === 0) {
        chart.collapseAll();
    }
    chart.render().fit();
}

/**
 * Включает полноэкранный режим для элемента.
 * @param {Element} elem - Элемент для включения в полноэкранный режим.
 */
function fullscreen(elem) {
    const attrs = chart.getChartState();
    const el = d3.select(elem || attrs.container).node();
    // Функция для обработки изменений полноэкранного режима
    const onFullscreenChange = () => {
        const fsElement =
            document.fullscreenElement ||
            document.mozFullscreenElement ||
            document.webkitFullscreenElement;
        if (fsElement === el) {
            // Если вошли в полноэкранный режим, изменяем высоту svg
            setTimeout(() => {
                attrs.svg.attr("height", window.innerHeight - 40);
            }, 500);
        } else {
            // Если вышли из полноэкранного режима, возвращаем исходную высоту
            attrs.svg.attr("height", attrs.svgHeight);
            // Удаляем обработчик, когда выходим из fullscreen
            document.removeEventListener(
                "fullscreenchange",
                onFullscreenChange
            );
        }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    if (document.fullscreenElement === el) {
        document.exitFullscreen();
    } else {
        // Если элемент не в fullscreen, заходим
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    }
}

/**
 * Снимает выделение с узла.
 * @param {number} nodeId - Идентификатор узла.
 * @returns {Object} Объект диаграммы для цепочки вызовов.
 */
function removeHighlighted(nodeId) {
    const attrs = chart.getChartState();
    const allNodes = getAllNodes();
    const node = allNodes.filter(
        (d) => attrs.nodeId(d.data).toString() === nodeId.toString()
    )[0];
    if (!node) {
        console.log(
            `ORG CHART - HIGHLIGHT - Node with id (${nodeId})  not found in the tree`
        );
        return chart;
    }
    const ancestors = node.ancestors();
    ancestors.forEach((d) => (d.data._expanded = true));
    node.data._highlighted = false;
    node.data._expanded = true;
    return chart;
}

/**
 * Раскрывает все узлы.
 */
function expandAllCustom() {
    const { allNodes, root, data } = chart.getChartState();
    allNodes.forEach((d) => (d.data._expanded = true));
    chart.render().fit();
    // Определяем максимальную глубину узлов
    const maxDepth = Math.max(...allNodes.map((node) => node.depth));
    if (allNodes.length > 0) {
        depthLevel = maxDepth;
    }
}

/**
 * Скрывает все узлы.
 */
function collapseAllCustom() {
    chart.collapseAll().fit();
    depthLevel = 0;
}

/**
 * Возвращает все узлы диаграммы.
 * @returns {Array} Массив всех узлов.
 */
function getAllNodes() {
    const attrs = chart.getChartState();
    attrs.generateRoot = d3
        .stratify()
        .id((d) => attrs.nodeId(d))
        .parentId((d) => attrs.parentNodeId(d));
    attrs.root = attrs.generateRoot(attrs.data);
    const allNodes = attrs.root.descendants();
    return allNodes;
}

/**
 * Обработчик для действия на поисковой строке.
 */
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search");
    if (searchButton) {
        console.log("DOM загружен");
        searchButton.addEventListener("mousedown", (event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        searchButton.addEventListener("click", toggleSearch);
    } else {
        console.error("Элемент search не найден");
    }
});

/**
 * Переключает действие кнопки "крестик".
 * @param {Event} event - Событие клика по кнопке.
 */
function toggleSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    const input = document.getElementById("searchInput_test");
    input.focus();
    if (input.value) input.value = "";
    else input.blur();
}
