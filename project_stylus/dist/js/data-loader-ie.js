if (!Array.prototype.map) {

    Array.prototype.map = function(callback, thisArg) {
  
      var T, A, k;
  
      if (this == null) {
        throw new TypeError(' this is null or not defined');
      }
  
      var O = Object(this);
  
      var len = O.length >>> 0;
  
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      if (arguments.length > 1) {
        T = thisArg;
      }
      A = new Array(len);
  
      k = 0;
  
      // 8. Пока k < len, будем повторять
      while (k < len) {
  
        var kValue, mappedValue;
        if (k in O) {
          kValue = O[k];
          mappedValue = callback.call(T, kValue, k, O);
          A[k] = mappedValue;
        }
        // d. Увеличим k на 1.
        k++;
      }
  
      // 9. Вернём A.
      return A;
    };
  }

  (function datasetModule(global, definition) { // non-exporting module magic dance
    'use strict';

    var
        amd = 'amd',
        exports = 'exports'; // keeps the method names for CommonJS / AMD from being compiled to single character variable

    if (typeof define === 'function' && define[amd]) {
        define(function definer() {
            return definition(global);
        });
    } else if (typeof module === 'function' && module[exports]) {
        module[exports] = definition(global);
    } else {
        definition(global);
    }
}(this, function datasetPolyfill(global) {
    'use strict';

    var
        attribute,
        attributes,
        counter,
        dash,
        dataRegEx,
        document = global.document,
        hasEventListener,
        length,
        match,
        mutationSupport,
        test = document.createElement('_'),
        DOMAttrModified = 'DOMAttrModified';

    function clearDataset(event) {
        delete event.target._datasetCache;
    }

    function toCamelCase(string) {
        return string.replace(dash, function (m, letter) {
            return letter.toUpperCase();
        });
    }

    function getDataset() {
        var
            dataset = {};

        attributes = this.attributes;
        for (counter = 0, length = attributes.length; counter < length; counter += 1) {
            attribute = attributes[counter];
            match = attribute.name.match(dataRegEx);
            if (match) {
                dataset[toCamelCase(match[1])] = attribute.value;
            }
        }

        return dataset;
    }

    function mutation() {
        if (hasEventListener) {
            test.removeEventListener(DOMAttrModified, mutation, false);
        } else {
            test.detachEvent('on' + DOMAttrModified, mutation);
        }

        mutationSupport = true;
    }

    if (test.dataset !== undefined) {
        return;
    }

    dash = /\-([a-z])/ig;
    dataRegEx = /^data\-(.+)/;
    hasEventListener = !!document.addEventListener;
    mutationSupport = false;

    if (hasEventListener) {
        test.addEventListener(DOMAttrModified, mutation, false);
    } else {
        test.attachEvent('on' + DOMAttrModified, mutation);
    }

    // trigger event (if supported)
    test.setAttribute('foo', 'bar');

    Object.defineProperty(global.Element.prototype, 'dataset', {
        get: mutationSupport
            ? function get() {
                if (!this._datasetCache) {
                    this._datasetCache = getDataset.call(this);
                }

                return this._datasetCache;
            } : getDataset
    });

    if (mutationSupport && hasEventListener) { // < IE9 supports neither
        // document.addEventListener('DOMAttrModified', clearDataset, false);
    }
}));
  
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }
      
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }


if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    };
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun/*, thisArg*/) {
      'use strict';
  
      if (this === void 0 || this === null) {
        throw new TypeError();
      }
  
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') {
        throw new TypeError();
      }
  
      var res = [];
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];
          if (fun.call(thisArg, val, i, t)) {
            res.push(val);
          }
        }
      }
  
      return res;
    };
  }


if (!window.JSON) {
    window.JSON = {
      parse: function(sJSON) { return eval('(' + sJSON + ')'); },
      stringify: function(vContent) {
        if (vContent instanceof Object) {
          var sOutput = '';
          if (vContent.constructor === Array) {
            for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ',', nId++);
            return '[' + sOutput.substr(0, sOutput.length - 1) + ']';
          }
          if (vContent.toString !== Object.prototype.toString) {
            return '"' + vContent.toString().replace(/"/g, '\\$&') + '"';
          }
          for (var sProp in vContent) {
            sOutput += '"' + sProp.replace(/"/g, '\\$&') + '":' + this.stringify(vContent[sProp]) + ',';
          }
          return '{' + sOutput.substr(0, sOutput.length - 1) + '}';
       }
       return typeof vContent === 'string' ? '"' + vContent.replace(/"/g, '\\$&') + '"' : String(vContent);
      }
    };
  }


  if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
      var style = document.createElement('style'), elements = [], element;
      document.documentElement.firstChild.appendChild(style);
      document._qsa = [];
  
      style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
      window.scrollBy(0, 0);
      style.parentNode.removeChild(style);
  
      while (document._qsa.length) {
        element = document._qsa.shift();
        element.style.removeAttribute('x-qsa');
        elements.push(element);
      }
      document._qsa = null;
      return elements;
    };
  }
  
  if (!document.querySelector) {
    document.querySelector = function (selectors) {
      var elements = document.querySelectorAll(selectors);
      return (elements.length) ? elements[0] : null;
    };
  }


 if (!Array.from) {
    Array.from = (function() {
      var toStr = Object.prototype.toString;
      var isCallable = function(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };
  
      // Свойство length метода from равно 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Положим C равным значению this.
        var C = this;
  
        // 2. Положим items равным ToObject(arrayLike).
        var items = Object(arrayLike);
  
        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }
  
        // 4. Если mapfn равен undefined, положим mapping равным false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. иначе
          // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }
  
          // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
        var len = toLength(items.length);
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
  
        // 16. Положим k равным 0.
        var k = 0;
        // 17. Пока k < len, будем повторять... (шаги с a по h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Положим putStatus равным Put(A, "length", len, true).
        A.length = len;
        // 20. Вернём A.
        return A;
      };
    }());
  }

  if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this);
        }
      });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


var table = document.querySelector('.table-styled tbody');

function getData (url, login, pass) {
    var auth = "Basic " + btoa(login + ":" + pass);

    var options = {
        credentials: 'include',
        headers: {
            'Authorization': auth
        },
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);

    xhr.send();
    
    return JSON.parse(xhr.responseText);

}

function getApData (floor, tower, apId) {
    var resp = getData(url, login, pass)
        
    var apartments = resp['apartments'];

    var targetApart = apartments.filter(function(apartment){return ((apartment.floor == floor) && (apartment.tower == tower) && (apartment.id == apId))});

    apartments.forEach(function(apartment){
        if(apartment.floor == floor && apartment.tower == tower){
            // console.log(apartment);
        }
    });

    sessionStorage.setItem('appId', targetApart[0].id);

    return targetApart[0];

}

function getFloorData (floor, tower) {
    
    var resp = getData(url, login, pass)

    var apartments = new Array();

    resp['apartments'].forEach(function(apartment){(apartment.floor == floor) && (apartment.tower == tower) ? apartments.push(apartment) : null})

    var freeApCount = apartments.filter(function(apartment){if(apartment.status == "Свободна"){return true;}}).length;

    var roomAms = new Array();

    apartments.forEach(function(apartment){
        roomAms.push(Number(apartment.rooms));
    });

    function uniq_fast(a) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for(var i = 0; i < len; i++) {
             var item = a[i];
             if(seen[item] !== 1) {
                   seen[item] = 1;
                   out[j++] = item;
             }
        }
        return out;
    }

    var uniqueRoomAms = uniq_fast(roomAms);

    var roomDada = '';
    var floorRoomCountInfo = new Array();

    uniqueRoomAms.forEach(function(item){
        var count = 0;
        apartments.forEach(function(apartment){
            if(item == Number(apartment.rooms)){
                count += 1;
            }
        });
        roomDada += '<li>' + item + ' к. - <span>' + count + '</span></li>';
        floorRoomCountInfo.push(item);
    });



    var info = {
        totalAp: apartments.length,
        freeAp: freeApCount,
        apInfo: roomDada,
        floorRoomCountInfo: floorRoomCountInfo,

        toString: function toString() {
            return "{\"totalAp\": \"".concat(this.totalAp, "\", \"freeAp\": \"").concat(this.freeAp, "\", \"apInfo\": \"").concat(this.apInfo, "\", \"floorRoomCountInfo\": \"").concat(this.floorRoomCountInfo, "\"}");
        }
    }
    
    sessionStorage.setItem('floor', floor);
    sessionStorage.setItem('tower', tower);
    sessionStorage.setItem('floorData', info.toString());

    return info;
}

function getFullFloorData(floor, tower){

    floor = floor || null;
    tower = tower || null;

    if(floor != null){
        getFloorData(floor, tower);
    }

    try {
        var roomList = document.querySelector('.js-room-list');
        while(roomList.firstChild){
            roomList.firstChild.remove();
        }

        var floorData = JSON.parse(sessionStorage.getItem('floorData'));

        var floorRoomCountInfo = floorData.floorRoomCountInfo.split(',');

        floorRoomCountInfo.forEach(function(floorRoomCount){
            var li = document.createElement("li");
            li.innerHTML = "<li><div class=\"check check-styled\"><label><input type=\"radio\" name=\"group-room\"><i></i><span class=\"number\">".concat(floorRoomCount, "</span>\u043A\u043E\u043C\u043D\u0430\u0442\u044B</label></div></li>");
            roomList.appendChild(li);
        });
        
    } catch(e){}

}

function fillPng(floor, tower){

    if(tower != 3){
        if(floor == 24 || floor == 23){
            document.querySelectorAll('.plan-help-penthouse').forEach(function(item){item.classList.add('active')});
            document.querySelector('.plan-help-container').style.display = "flex";
        }
        else{
            document.querySelector('.plan-help-tower').classList.add('active');
        }
    }
    else{
        document.querySelector('.plan-help-corpus').classList.add('active');
        window.addEventListener('resize', function(){
            if(window.innerWidth > 767){
                document.querySelector('.floor-plan').style.padding = "3.2rem 11.6rem 2.5rem";

            }
            else{
                document.querySelector('.floor-plan').style.padding = "0";
            }
        });
        if(window.innerWidth > 767){
            document.querySelector('.floor-plan').style.padding = "3.2rem 11.6rem 2.5rem";

        }
        else{
            document.querySelector('.floor-plan').style.padding = "0";
        }
    }

    var resp = getData(url, login, pass)
    var rec = function(resp){
        var apartments = resp['apartments'];

        var apartsPng = document.querySelectorAll('.plan-help.active .js-apartment-img');

        var floorAparts = apartments.filter(function(apartment){return (apartment.floor == floor && apartment.tower == tower)});

        floorAparts.forEach(function(apart, index){
            apartsPng[index].dataset.apid = apart.id;
            apartsPng[index].dataset.rooms = apart.rooms;

            apartsPng[index].classList.add('visible');
            
            if(floor == 24 || floor == 23){
                apartsPng[index + 10].dataset.apid = apart.id;
                apartsPng[index + 10].dataset.rooms = apart.rooms;

                apartsPng[index + 10].classList.add('visible');
            }
            if(apartsPng[index].classList.contains('visible')){

            }
        });
        if(floor == 24 || floor == 23){
            apartsPng.forEach(function(apart){
                if(apart.dataset.apid && apart.classList.contains('visible')){
                    apart.addEventListener('mouseover', function(event){
                        var target = event.target;

                        while(!target.classList.contains('js-apartment-img')){
                            target = target.parentNode;
                        }

                        var similarApartments = Array.from(apartsPng).filter(function(ap){return (ap.dataset.apid == target.dataset.apid)});

                        similarApartments.forEach(function(item){item.classList.add('active')});
                    });

                    apart.addEventListener('mouseleave', function(event){
                        var target = event.target;

                        while(!target.classList.contains('js-apartment-img')){
                            target = target.parentNode;
                        }

                        var similarApartments = Array.from(apartsPng).filter(function(ap){return (ap.dataset.apid == target.dataset.apid)});

                        similarApartments.forEach(function(item){item.classList.remove('active')});
                    });
                }
            });
        }
    }
    rec(resp);
}

function filterInit(minValSq, maxValSq, minValPr, maxValPr){
    var dragSliderSQ = document.querySelector('.DragSlider.DragSliderPl');
    var dragSliderPr = document.querySelector('.DragSlider.DragSliderPrice');


    dragSliderSQ.dataset.min = minValSq;
    dragSliderSQ.dataset.start = minValSq;

    dragSliderSQ.dataset.max = maxValSq;
    dragSliderSQ.dataset.end = maxValSq;

    dragSliderPr.dataset.min = minValPr;
    dragSliderPr.dataset.start = minValPr;

    dragSliderPr.dataset.max = maxValPr;
    dragSliderPr.dataset.end = maxValPr;

    $('.DragSlider').each(function(i, elem) {
        if(!$(this).hasClass('noUi-horizontal')){
            var El = $(elem),
            ElSlider = El[0],
            ElValue = El.closest('.DragSliderSection').find('.DragSliderValue'),
            ElMuch = El.closest('.DragSliderSection').find('.DragSliderMuch'),
            DataMin = parseInt(El.attr('data-min')),
            DataStart = parseInt(El.attr('data-start')),
            DataEnd = parseInt(El.attr('data-end')),
            DataMax = parseInt(El.attr('data-max'));

            El.closest('.DragSliderSection').find('.SliderGridMin').html(DataMin);
            El.closest('.DragSliderSection').find('.SliderGridMax').html(DataMax);

            if(isNaN(DataMin)) {var DataMin = 0;}
            if(isNaN(DataMinStart)) {var DataMinStart = DataMin;}
            if(isNaN(DataMax)) {var DataMax = 1000;}
            if(isNaN(DataMaxStart)) {var DataMaxStart = DataMax;}
    
            noUiSlider.create(ElSlider , {
                start: [DataStart, DataEnd],
                connect: true,
                tooltips: true,
                step: 1,
                range: {
                    'min': DataMin,
                    'max': DataMax,
                    
                },
                format: wNumb({
                    decimals: 0,
                    thousand: ' '
                })
            });

            ElSlider.noUiSlider.on('set', function(){
                filterTable();
            })
        }
        
    });
    
}


var showApPage = function(event){
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var tr = event.target;

    console.log(event);

    while(tr.tagName != 'TR'){
        tr = tr.parentNode;
    }

    var appId = Number(tr.querySelector('td .number').innerText);
    var floor = Number(tr.querySelectorAll('td')[4].innerText);


    sessionStorage.setItem('appId', appId);
    sessionStorage.setItem('floor', floor);
    

    window.location.assign(apartmentsPlan);
}

function fillTable(floorCount){    

    floorCount = floorCount || null;


    while (table.firstChild) {
        table.firstChild.remove();
    }

    var tower = Number(sessionStorage.getItem('tower'));

    var featuresListNode = document.querySelector('.list-check-line');
    var necessaryFeatures = [];
    if(window.location.href.includes('home-plan.html')){
        featuresListNode.querySelectorAll('label').forEach(function(label){
            if(label.querySelector('input').checked){
                necessaryFeatures.push(label.querySelector('span').innerText);
            }
        });
    }

    


    var resp = getData(url, login, pass)
    var squareArr = new Array();
    var priceArr = new Array();


    var rec = function(resp){
        if(typeof(floorCount) == 'number' || typeof(floorCount) == 'string'){
            for(var key in resp){
                if (typeof(resp[key]) == 'object' ){
                    if(key == 'apartments'){
                        resp[key].forEach(function(item){
                            if(item.status == "Свободна" && item.floor == floorCount && item.tower == tower){
                                var tr = document.createElement("tr");
                                tr.classList.add('table-styled__tr');
                                tr.classList.add('js-ap-page');
                                tr.classList.add('visible');
                                tr.innerHTML = "\n<td><div class=\"number\">".concat(item.id, "</div></td>\n<td>").concat(item.square, "</td>\n<td>").concat(item.rooms, "</td>\n<td>").concat(item.side, "</td>\n<td>").concat(item.floor, "</td>\n<td>\u0411\u0430\u0448\u043D\u044F ").concat(item.tower, "</td>\n<td>").concat(item.price, " \u0440.</td>\n");
                                if(item.tower == 3){
                                    tr.innerHTML = "\n<td><div class=\"number\">".concat(item.id, "</div></td>\n<td>").concat(item.square, "</td>\n<td>").concat(item.rooms, "</td>\n<td>").concat(item.side, "</td>\n<td>").concat(item.floor, "</td>\n<td>\u041A\u043E\u0440\u043F\u0443\u0441 1</td>\n<td>").concat(item.price, " \u0440.</td>\n");
                                }
                                table.appendChild(tr);
                            }
                        });
                    }
                    rec(resp[key]);
                }
                else{
                    return;
                }
            }
        }
    }

    rec(resp);
    
    var tr = document.querySelectorAll('.js-ap-page');
    tr.forEach(function(item){item.addEventListener('click', showApPage)});
}

var filterTable = function(){

    while (table.firstChild) {
        table.firstChild.remove();
    }
    
    
    setTimeout(function(){
        var squareArr = new Array();
        var priceArr = new Array();
        var resp = getData(url, login, pass);

        var minSquare = document.querySelectorAll('.DragSliderPl .noUi-tooltip')[0].innerText.replace(/\s+/g, '');
        var maxSquare = document.querySelectorAll('.DragSliderPl .noUi-tooltip')[1].innerText.replace(/\s+/g, '');
        var minPrice = document.querySelectorAll('.DragSliderPrice .noUi-tooltip')[0].innerText.replace(/\s+/g, '');
        var maxPrice = document.querySelectorAll('.DragSliderPrice .noUi-tooltip')[1].innerText.replace(/\s+/g, '');

        var necessaryFeaturesList = Array.from(document.querySelectorAll('.list-check-line label')).filter(function(label){if(label.querySelector('input:checked')){ return true;}}).map(function(item){return item.querySelector('span').innerText;});

        var location = 0;
        var type = 0;

        switch (document.querySelector('.js-location+.jq-selectbox__select .jq-selectbox__select-text').innerText) {
            case "Все корпусы":
                location = 0;
                break;
            case "Башня 1":
                location = 1;
                break;
            case "Башня 2":
                location = 2;
                break;
            case "Корпус 1":
                location = 3;
                break;
        
            default:
                location = 0;
                break;
        }

        switch (document.querySelector('.js-objects+.jq-selectbox__select .jq-selectbox__select-text').innerText) {
            case "Все объекты":
                type = 0;
                break;
            case "1 комнатные":
                type = 1;
                break;
            case "2-х комнатные":
                type = 2;
                break;
            case "3-х комнатные":
                type = 3;
                break;
            case "4-х комнатные":
                type = 4;
                break;
            case "Пентхаусы":
                type = 5;
                break;
        
            default:
                type = 0;
                break;
        }

        var filterParams = {
            minPrice: Number(minPrice),
            maxPrice: Number(maxPrice),
            minSquare: Number(minSquare),
            maxSquare: Number(maxSquare),
            type: type,
            location: location,
            features: necessaryFeaturesList
        }

        resp['apartments'].forEach(function(item){
            if(item.status == "Свободна"){
                if((item.price <= filterParams.maxPrice) && (item.price >= filterParams.minPrice) && (item.square <= filterParams.maxSquare) && (item.square >= filterParams.minSquare) && (necessaryFeaturesList.filter(function(feature){return item.features.includes(feature)}).length == necessaryFeaturesList.length)){
                    var tr = document.createElement("tr");
                    tr.classList.add('table-styled__tr');
                    tr.classList.add('js-ap-page');
                    tr.classList.add('visible');
                    tr.innerHTML = "\n<td><div class=\"number\">".concat(item.id, "</div></td>\n<td>").concat(item.square, "</td>\n<td>").concat(item.rooms, "</td>\n<td>").concat(item.side, "</td>\n<td>").concat(item.floor, "</td>\n<td>\u0411\u0430\u0448\u043D\u044F ").concat(item.tower, "</td>\n<td>").concat(item.price, " \u0440.</td>\n");

                    if (item.tower == 3) {
                        tr.innerHTML = "\n<td><div class=\"number\">".concat(item.id, "</div></td>\n<td>").concat(item.square, "</td>\n<td>").concat(item.rooms, "</td>\n<td>").concat(item.side, "</td>\n<td>").concat(item.floor, "</td>\n<td>\u041A\u043E\u0440\u043F\u0443\u0441 1</td>\n<td>").concat(item.price, " \u0440.</td>\n");
                    }
                    if((filterParams.type == 0) || (filterParams.type == 5 && item.floor >= 23) || (filterParams.type == item.rooms)){
                        if((filterParams.location == 0) || (filterParams.location == item.tower)){
                            table.appendChild(tr);
                        }
                    }
                }
            }
        });
    
        var tr = document.querySelectorAll('.js-ap-page');
        tr.forEach(function(item){item.addEventListener('click', showApPage)});
        
    }, 550);

}

getFullFloorData();


if(window.location.href.endsWith('home-plan.html') || window.location.href.endsWith('plan') || window.location.href.endsWith('plan/') && !window.location.href.includes('apartments-plan')){
    var resp = getData(url, login, pass);

    var squareArr = new Array();
    var priceArr = new Array();

    resp['apartments'].forEach(function(item){
        if(item.status == "Свободна"){
            squareArr.push(item.square);
            priceArr.push(item.price);
        }
    });

    var minSquare = squareArr.reduce(function(a, b){return Math.min(a, b)});
    var maxSquare = squareArr.reduce(function(a, b){return Math.max(a, b)});
    var minPrice = priceArr.reduce(function(a, b){return Math.min(a, b)});
    var maxPrice = priceArr.reduce(function(a, b){return Math.max(a, b)});
    
    filterInit(minSquare, maxSquare, minPrice, maxPrice);

    filterTable();

    document.querySelectorAll('.js-filter-trigger').forEach(function(input){input.addEventListener('change', filterTable)});
    
}
else if(window.location.href.includes(floorPlan)){

    var currFloor, currTower;

    if(isNaN(Number(document.querySelector('.floor-plan').dataset.floor)) == false){
        currFloor = Number(document.querySelector('.floor-plan').dataset.floor);
        currTower = Number(document.querySelector('.floor-plan').dataset.tower);
        
        sessionStorage.setItem('floor', currFloor);
        sessionStorage.setItem('tower', currTower);
    }
    else{
        currFloor = Number(sessionStorage.getItem('floor'));
        currTower = Number(sessionStorage.getItem('tower'));
    }

    fillPng(currFloor, currTower);
    fillTable(currFloor);

    document.querySelectorAll('.js-mini-corpuse')[currTower - 1].classList.add('active');

    var filterInputs = document.querySelectorAll('.js-room-list input');
    filterInputs.forEach(function(input){input.addEventListener('change', function(){
        var chosenRoomAmount = Number(input.parentNode.querySelector('.number').innerText);

        document.querySelectorAll('.js-apartment-img').forEach(function(img){
            img.classList.remove('active');

            if(Number(img.dataset.rooms) == chosenRoomAmount){
                img.classList.add('active');
            }
        });
    })});
    
}
else if(window.location.href.includes(apartmentsPlan.replace(/[./]/g, ''))){
    
    var currFloor, currAp, currTower;

    if(isNaN(Number(document.querySelector('.room-one').dataset.ap)) == false){
        currFloor = Number(document.querySelector('.room-one').dataset.floor);
        currTower = Number(document.querySelector('.room-one').dataset.tower);
        currAp = Number(document.querySelector('.room-one').dataset.ap);

        sessionStorage.setItem('floor', currFloor);
        sessionStorage.setItem('tower', currTower);
        sessionStorage.setItem('appId', currAp);
    }
    else{
        currAp = Number(sessionStorage.getItem('appId'));
        currFloor = Number(sessionStorage.getItem('floor'));
        currTower = Number(sessionStorage.getItem('tower'));
    }

    document.querySelector('.section-title h1').innerText = "Квартира №" + currAp;

    document.querySelector('.room-name span').innerText = currFloor;

    var apartment = getApData(currFloor, currTower, currAp);
        
    document.querySelector('.js-room-img').setAttribute('src', apartment.png_path);
    document.querySelector('.js-load').setAttribute('href', apartment.doc_png_path);
    document.querySelector('.js-rooms').innerText = apartment.rooms;
    document.querySelector('.js-square').innerText = apartment.square;
    document.querySelector('.js-features').innerText = apartment.features;
    document.querySelector('.js-isReady').innerText = apartment.isReady;
    document.querySelector('.js-price').innerText = apartment.price;
    document.querySelector('.js-description').innerText = apartment.description;
}

document.querySelectorAll('.js-scroll-link').forEach(function(link){
    link.addEventListener('click', function(){
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
        document.querySelectorAll('.js-scroll-link').forEach(function(item){item.classList.toggle('active')});    

        document.querySelector(event.target.getAttribute('href')).scrollIntoView({block:"start",behavior:"smooth"});
    });
});