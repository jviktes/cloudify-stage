/* eslint-disable no-console, no-process-exit */
// @ts-nocheck File not migrated fully to TS
module.exports = function(r) {
    r.register('files', 'GET', (req, res, next, helper) => {
    console.log("Dotaz:");
    helper.Request.doGet(`http://localhost:3000/array`)
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        dispatch(errorClusterStatus(err));
    });
});
}
module.exports = function(r) {
    r.register('quantity', 'GET', (req, res, next, helper) => {
    console.log("quantity");
    helper.Request.doGet(`http://localhost:3000/quantity`)
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        dispatch(errorClusterStatus(err));
    });
});
}
module.exports = function(r) {
    r.register('gsn', 'GET', (req, res, next, helper) => {
    console.log("gsn backend");
    const key="GSN_Business_services_cash";
    helper.Manager.doGet(`/secrets/${key}`)
    .then(data => {
        console.log(data);
        const gsnData =  JSON.parse(data.value); 
        res.send(gsnData);
    })
    .catch(err => {
        dispatch(errorClusterStatus(err));
    });
});
}