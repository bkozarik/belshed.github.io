// var url = 'http://dream-towers.ru/SAPI/objects/';
var url = './js/data.json';
var login = 'dt';
var pass = '123456';

var floorPlan = "floor";
var apartmentsPlan = "../apartments-plan";

if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)){
    var scriptNode_loader = document.createElement('script');
    scriptNode_loader.setAttribute('src', 'js/data-loader-ie.js');

    var scriptNode_scripts = document.createElement('script');
    scriptNode_scripts.setAttribute('src', 'js/scripts-ie.js');

    
    document.body.appendChild(scriptNode_loader);
    document.body.appendChild(scriptNode_scripts);
}
else{
    var scriptNode_loader = document.createElement('script');
    scriptNode_loader.setAttribute('src', 'js/data-loader-normal.js');

    var scriptNode_scripts = document.createElement('script');
    scriptNode_scripts.setAttribute('src', 'js/scripts-normal.js');

    
    document.body.appendChild(scriptNode_loader);
    document.body.appendChild(scriptNode_scripts);

}


