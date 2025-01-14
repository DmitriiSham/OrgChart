const ENV = require("../env.js");

OM.web("getOrgData", async (request) => {
    const om = await OM.connectAsync(
        ENV.HOST,
        ENV.WSS,
        ENV.TOKEN,
        ENV.MODEL_ID
    );
    // return JSON.stringify(await om.common.modelInfo().nameAsync())

    const multicubeRd = async (om, mc, view) => {
        const pivot = om.multicubes.multicubesTab().open(mc).pivot(view);
        const grid = await pivot.createAsync();
        const rd = grid.rawData();
        return rd;
    };
    const [rdRead, currentDate] = await Promise.all([
        multicubeRd(om, ENV.MULTICUBE_MAIN_COMMON)
            .then((rd) => rd.readerAsync())
            .then((rdRead) => rdRead.getRowsAsArray()),
        multicubeRd(om, ENV.MULTICUBE_DATE)
            .then((rd) => rd.readerAsync())
            .then((rdRead) => rdRead.getRowsAsObject())
            .then((rdReadObjects) => rdReadObjects[ENV.CUBE_CURRENT_DATE][0]),
    ]);
    return JSON.stringify([rdRead, currentDate]);
});
