const PROPERTIES = {
    PROPERTY_1: "Штатных единиц - ",
    PROPERTY_2: "в т.ч. Вакансии - ",
    CUBE_PROPERTY_1: "Штатных единиц",
    CUBE_PROPERTY_2: "Вакансии",
};

const mainNodeId = 273000007002;

const setDescriptionDiv = (d) => `
    ${PROPERTIES.PROPERTY_1} ${d.data[PROPERTIES.CUBE_PROPERTY_1]}<br/> 
    ${PROPERTIES.PROPERTY_2} ${d.data[PROPERTIES.CUBE_PROPERTY_2]}
`;
