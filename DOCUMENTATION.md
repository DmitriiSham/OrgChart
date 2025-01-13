## Members

<dl>
<dt><a href="#setSvgWidth">setSvgWidth</a> : <code>number</code></dt>
<dd><p>Коэффициент для ширины SVG</p>
</dd>
<dt><a href="#chart">chart</a> : <code>d3.OrgChart</code></dt>
<dd><p>Объект диаграммы</p>
</dd>
<dt><a href="#index">index</a> : <code>number</code></dt>
<dd><p>Индекс текущего узла</p>
</dd>
<dt><a href="#compact">compact</a> : <code>number</code></dt>
<dd><p>Флаг компактного отображения</p>
</dd>
<dt><a href="#actNdCent">actNdCent</a> : <code>number</code></dt>
<dd><p>Индекс центра узла</p>
</dd>
<dt><a href="#nodeIds">nodeIds</a> : <code>Array</code></dt>
<dd><p>Массив идентификаторов узлов</p>
</dd>
<dt><a href="#depthLevel">depthLevel</a> : <code>number</code></dt>
<dd><p>Уровень глубины для отображения</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#setSvgHeight">setSvgHeight</a> : <code>number</code></dt>
<dd><p>Коэффициент для высоты SVG</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getOrgData">getOrgData()</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Функция для получения данных организационной структуры</p>
</dd>
<dt><a href="#downloadPdf">downloadPdf()</a></dt>
<dd><p>Функция для скачивания диаграммы в формате PDF</p>
</dd>
<dt><a href="#centerNode">centerNode()</a></dt>
<dd><p>Функция для центрирования узла на диаграмме</p>
</dd>
<dt><a href="#filterChart">filterChart(e)</a></dt>
<dd><p>Функция фильтрации диаграммы по значению из строки поиска</p>
</dd>
<dt><a href="#clearHighlighting">clearHighlighting()</a></dt>
<dd><p>Снимает все выделения с узлов</p>
</dd>
<dt><a href="#highlightMultipleBranches">highlightMultipleBranches()</a></dt>
<dd><p>Выделение всех ветвей до корня для нескольких узлов</p>
</dd>
<dt><a href="#expandToLowestLevel">expandToLowestLevel()</a></dt>
<dd><p>Раскрытие диаграммы на один уровень</p>
</dd>
<dt><a href="#collapseLowestLevel">collapseLowestLevel()</a></dt>
<dd><p>Сжатие диаграммы на один уровень</p>
</dd>
<dt><a href="#fullscreen">fullscreen(elem)</a></dt>
<dd><p>Переключение полноэкранного режима</p>
</dd>
<dt><a href="#removeHighlighted">removeHighlighted(nodeId)</a> ⇒ <code>d3.OrgChart</code></dt>
<dd><p>Снятие выделения с узла</p>
</dd>
<dt><a href="#expandAllCustom">expandAllCustom()</a></dt>
<dd><p>Раскрыть все узлы</p>
</dd>
<dt><a href="#collapseAllCustom">collapseAllCustom()</a></dt>
<dd><p>Свернуть все узлы</p>
</dd>
<dt><a href="#getAllNodes">getAllNodes()</a> ⇒ <code>Array</code></dt>
<dd><p>Получить все узлы диаграммы</p>
</dd>
<dt><a href="#toggleSearch">toggleSearch(event)</a></dt>
<dd><p>Переключение действия кнопки &quot;крестик&quot;</p>
</dd>
</dl>

<a name="setSvgWidth"></a>

## setSvgWidth : <code>number</code>
Коэффициент для ширины SVG

**Kind**: global variable  
<a name="chart"></a>

## chart : <code>d3.OrgChart</code>
Объект диаграммы

**Kind**: global variable  
<a name="index"></a>

## index : <code>number</code>
Индекс текущего узла

**Kind**: global variable  
<a name="compact"></a>

## compact : <code>number</code>
Флаг компактного отображения

**Kind**: global variable  
<a name="actNdCent"></a>

## actNdCent : <code>number</code>
Индекс центра узла

**Kind**: global variable  
<a name="nodeIds"></a>

## nodeIds : <code>Array</code>
Массив идентификаторов узлов

**Kind**: global variable  
<a name="depthLevel"></a>

## depthLevel : <code>number</code>
Уровень глубины для отображения

**Kind**: global variable  
<a name="setSvgHeight"></a>

## setSvgHeight : <code>number</code>
Коэффициент для высоты SVG

**Kind**: global constant  
<a name="getOrgData"></a>

## getOrgData() ⇒ <code>Promise.&lt;Object&gt;</code>
Функция для получения данных организационной структуры

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Промис с данными в формате JSON  
<a name="downloadPdf"></a>

## downloadPdf()
Функция для скачивания диаграммы в формате PDF

**Kind**: global function  
<a name="centerNode"></a>

## centerNode()
Функция для центрирования узла на диаграмме

**Kind**: global function  
<a name="filterChart"></a>

## filterChart(e)
Функция фильтрации диаграммы по значению из строки поиска

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Событие ввода в строку поиска |

<a name="clearHighlighting"></a>

## clearHighlighting()
Снимает все выделения с узлов

**Kind**: global function  
<a name="highlightMultipleBranches"></a>

## highlightMultipleBranches()
Выделение всех ветвей до корня для нескольких узлов

**Kind**: global function  
<a name="expandToLowestLevel"></a>

## expandToLowestLevel()
Раскрытие диаграммы на один уровень

**Kind**: global function  
<a name="collapseLowestLevel"></a>

## collapseLowestLevel()
Сжатие диаграммы на один уровень

**Kind**: global function  
<a name="fullscreen"></a>

## fullscreen(elem)
Переключение полноэкранного режима

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>HTMLElement</code> | Элемент, который переходит в полноэкранный режим |

<a name="removeHighlighted"></a>

## removeHighlighted(nodeId) ⇒ <code>d3.OrgChart</code>
Снятие выделения с узла

**Kind**: global function  
**Returns**: <code>d3.OrgChart</code> - Возвращает объект диаграммы с обновлениями  

| Param | Type | Description |
| --- | --- | --- |
| nodeId | <code>string</code> | Идентификатор узла |

<a name="expandAllCustom"></a>

## expandAllCustom()
Раскрыть все узлы

**Kind**: global function  
<a name="collapseAllCustom"></a>

## collapseAllCustom()
Свернуть все узлы

**Kind**: global function  
<a name="getAllNodes"></a>

## getAllNodes() ⇒ <code>Array</code>
Получить все узлы диаграммы

**Kind**: global function  
**Returns**: <code>Array</code> - Массив всех узлов  
<a name="toggleSearch"></a>

## toggleSearch(event)
Переключение действия кнопки "крестик"

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Событие нажатия на кнопку |

