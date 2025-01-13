/**
 * Объект с константами, содержащими текстовые значения для отображения в графике.
 * @namespace PROPERTIES
 * @property {string} PROPERTY_1 - Текст для отображения штатных единиц.
 * @property {string} PROPERTY_2 - Текст для отображения вакансий.
 * @property {string} CUBE_PROPERTY_1 - Название куба для штатных единиц.
 * @property {string} CUBE_PROPERTY_2 - Название куба для вакансий.
 */
const PROPERTIES = {
    PROPERTY_1: "Штатных единиц - ",
    PROPERTY_2: "в т.ч. Вакансии - ",
    CUBE_PROPERTY_1: "Штатных единиц",
    CUBE_PROPERTY_2: "Вакансии",
};

/**
 * ID основного узла диаграммы.
 * @constant {number} mainNodeId - ID основного узла.
 */
const mainNodeId = 273000007002;

/**
 * Функция для формирования HTML-контента для описания узла.
 * @function
 * @param {Object} d - Данные узла диаграммы.
 * @param {Object} d.data - Данные, связанные с узлом.
 * @returns {string} HTML-контент для отображения.
 */
const setDescriptionDiv = (d) => `
    ${PROPERTIES.PROPERTY_1} ${d.data[PROPERTIES.CUBE_PROPERTY_1]}<br/>
    ${PROPERTIES.PROPERTY_2} ${d.data[PROPERTIES.CUBE_PROPERTY_2]}
`;
