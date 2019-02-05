/* 2017-4-27 17:07:55 | 版权所有 火星科技 http://marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("leaflet"),require("esri-leaflet")):"function"==typeof define&&define.amd?define(["exports","leaflet","esri-leaflet"],t):t((e.L=e.L||{},e.L.esri=e.L.esri||{},e.L.esri.Geocoding=e.L.esri.Geocoding||{}),e.L,e.L.esri)}(this,function(e,d,r){"use strict";d="default"in d?d.default:d;var t=r.Task.extend({path:"find",params:{outSr:4326,forStorage:!1,outFields:"*",maxLocations:20},setters:{address:"address",neighborhood:"neighborhood",city:"city",subregion:"subregion",region:"region",postal:"postal",country:"country",text:"text",category:"category",token:"token",key:"magicKey",fields:"outFields",forStorage:"forStorage",maxLocations:"maxLocations"},initialize:function(e){(e=e||{}).url=e.url||_,r.Task.prototype.initialize.call(this,e)},within:function(e){return e=d.latLngBounds(e),this.params.bbox=r.Util.boundsToExtent(e),this},nearby:function(e,t){return e=d.latLng(e),this.params.location=e.lng+","+e.lat,this.params.distance=Math.min(Math.max(t,2e3),5e4),this},run:function(o,r){return this.options.customParam?(this.path="findAddressCandidates",this.params[this.options.customParam]=this.params.text,delete this.params.text):this.path=this.params.text?"find":"findAddressCandidates","findAddressCandidates"===this.path&&this.params.bbox&&(this.params.searchExtent=this.params.bbox,delete this.params.bbox),this.request(function(e,t){var s="find"===this.path?this._processFindResponse:this._processFindAddressCandidatesResponse,i=e?void 0:s(t);o.call(r,e,{results:i},t)},this)},_processFindResponse:function(e){for(var t=[],s=0;s<e.locations.length;s++){var i,o=e.locations[s];o.extent&&(i=r.Util.extentToBounds(o.extent)),t.push({text:o.name,bounds:i,score:o.feature.attributes.Score,latlng:d.latLng(o.feature.geometry.y,o.feature.geometry.x),properties:o.feature.attributes})}return t},_processFindAddressCandidatesResponse:function(e){for(var t=[],s=0;s<e.candidates.length;s++){var i=e.candidates[s];if(i.extent)var o=r.Util.extentToBounds(i.extent);t.push({text:i.address,bounds:o,score:i.score,latlng:d.latLng(i.location.y,i.location.x),properties:i.attributes})}return t}});function s(e){return new t(e)}var i=r.Task.extend({path:"reverseGeocode",params:{outSR:4326,returnIntersection:!1},setters:{distance:"distance",language:"langCode",intersection:"returnIntersection"},initialize:function(e){(e=e||{}).url=e.url||_,r.Task.prototype.initialize.call(this,e)},latlng:function(e){return e=d.latLng(e),this.params.location=e.lng+","+e.lat,this},run:function(i,o){return this.request(function(e,t){var s;s=e?void 0:{latlng:d.latLng(t.location.y,t.location.x),address:t.address},i.call(o,e,s,t)},this)}});function o(e){return new i(e)}var n=r.Task.extend({path:"suggest",params:{},setters:{text:"text",category:"category",countries:"countryCode",maxSuggestions:"maxSuggestions"},initialize:function(e){(e=e||{}).url||(e.url=_,e.supportsSuggest=!0),r.Task.prototype.initialize.call(this,e)},within:function(e){var t=(e=(e=d.latLngBounds(e)).pad(.5)).getCenter(),s=e.getNorthWest();return this.params.location=t.lng+","+t.lat,this.params.distance=Math.min(Math.max(t.distanceTo(s),2e3),5e4),this.params.searchExtent=r.Util.boundsToExtent(e),this},nearby:function(e,t){return e=d.latLng(e),this.params.location=e.lng+","+e.lat,this.params.distance=Math.min(Math.max(t,2e3),5e4),this},run:function(s,i){if(this.options.supportsSuggest)return this.request(function(e,t){s.call(i,e,t,t)},this);console.warn("this geocoding service does not support asking for suggestions")}});function a(e){return new n(e)}var l=r.Service.extend({initialize:function(e){(e=e||{}).url?(r.Service.prototype.initialize.call(this,e),this._confirmSuggestSupport()):(e.url=_,e.supportsSuggest=!0,r.Service.prototype.initialize.call(this,e))},geocode:function(){return s(this)},reverse:function(){return o(this)},suggest:function(){return a(this)},_confirmSuggestSupport:function(){this.metadata(function(e,t){e||(t.capabilities?-1<t.capabilities.indexOf("Suggest")?this.options.supportsSuggest=!0:this.options.supportsSuggest=!1:(this.options.supportsSuggest=!1,this.options.customParam=t.singleLineAddressField.name))},this)}});var u=d.Evented.extend({options:{zoomToResult:!0,useMapBounds:12,searchBounds:null},initialize:function(e,t){if(d.Util.setOptions(this,t),this._control=e,!t||!t.providers||!t.providers.length)throw new Error("You must specify at least one provider");this._providers=t.providers},_geocode:function(s,e,t){var i,o=0,r=[],n=d.Util.bind(function(e,t){o--,e||(t&&(r=r.concat(t)),o<=0&&(i=this._boundsFromResults(r),this.fire("results",{results:r,bounds:i,latlng:i?i.getCenter():void 0,text:s},!0),this.options.zoomToResult&&i&&this._control._map.fitBounds(i),this.fire("load")))},this);if(e)o++,t.results(s,e,this._searchBounds(),n);else for(var a=0;a<this._providers.length;a++)o++,this._providers[a].results(s,e,this._searchBounds(),n)},_suggest:function(e){this._providers.length;var t=d.Util.bind(function(i,o){return d.Util.bind(function(e,t){if(!e){var s;if(1,i.length<2)return this._suggestions.innerHTML="",void(this._suggestions.style.display="none");if(t.length)for(s=0;s<t.length;s++)t[s].provider=o;else this._control._renderSuggestions(t);if(o._lastRender!==i&&o.nodes){for(s=0;s<o.nodes.length;s++)o.nodes[s].parentElement&&this._control._suggestions.removeChild(o.nodes[s]);o.nodes=[]}t.length&&this._control._input.value===i&&(this._control.clearSuggestions(o.nodes),o._lastRender=i,o.nodes=this._control._renderSuggestions(t),this._control._nodes=[])}},this)},this);this._pendingSuggestions=[];for(var s=0;s<this._providers.length;s++){var i=this._providers[s],o=i.suggestions(e,this._searchBounds(),t(e,i));this._pendingSuggestions.push(o)}},_searchBounds:function(){return null!==this.options.searchBounds?this.options.searchBounds:!1===this.options.useMapBounds?null:!0===this.options.useMapBounds?this._control._map.getBounds():this.options.useMapBounds<=this._control._map.getZoom()?this._control._map.getBounds():null},_boundsFromResults:function(e){if(e.length){for(var t=d.latLngBounds([0,0],[0,0]),s=[],i=[],o=e.length-1;0<=o;o--){var r=e[o];i.push(r.latlng),r.bounds&&r.bounds.isValid()&&!r.bounds.equals(t)&&s.push(r.bounds)}for(var n=d.latLngBounds(i),a=0;a<s.length;a++)n.extend(s[a]);return n}},_getAttribution:function(){for(var e=[],t=this._providers,s=0;s<t.length;s++)t[s].options.attribution&&e.push(t[s].options.attribution);return e.join(", ")}});function h(e,t){return new u(e,t)}var c=l.extend({options:{label:"Places and Addresses",maxResults:5},suggestions:function(e,t,r){var s=this.suggest().text(e);return t&&s.within(t),this.options.countries&&s.countries(this.options.countries),this.options.categories&&s.category(this.options.categories),s.maxSuggestions(this.options.maxResults),s.run(function(e,t,s){var i=[];if(!e)for(;s.suggestions.length&&i.length<=this.options.maxResults-1;){var o=s.suggestions.shift();o.isCollection||i.push({text:o.text,magicKey:o.magicKey})}r(e,i)},this)},results:function(e,t,s,i){var o=this.geocode().text(e);return t&&o.key(t),o.maxLocations(this.options.maxResults),s&&o.within(s),this.options.forStorage&&o.forStorage(!0),o.run(function(e,t){i(e,t.results)},this)}});function p(e){return new c(e)}var g=d.Control.extend({includes:d.Mixin.Events,options:{position:"topleft",collapseAfterResult:!0,expanded:!1,allowMultipleResults:!0,placeholder:"Search for places or addresses",title:"Location Search"},initialize:function(e){d.Util.setOptions(this,e),e&&e.providers&&e.providers.length||(e||(e={}),e.providers=[p()]),this._geosearchCore=h(this,e),this._geosearchCore._providers=e.providers,this._geosearchCore.addEventParent(this);for(var t=0;t<this._geosearchCore._providers.length;t++)this._geosearchCore._providers[t].addEventParent(this);this._geosearchCore._pendingSuggestions=[],d.Control.prototype.initialize.call(e)},_renderSuggestions:function(e){var t;0<e.length&&(this._suggestions.style.display="block"),this._suggestions.style.maxHeight=this._map.getSize().y-this._suggestions.offsetTop-this._wrapper.offsetTop-10+"px";for(var s,i,o=[],r=[],n=0;n<e.length;n++){var a=e[n];if(!i&&1<this._geosearchCore._providers.length&&t!==a.provider.options.label&&((i=d.DomUtil.create("span","geocoder-control-header",this._suggestions)).textContent=a.provider.options.label,i.innerText=a.provider.options.label,t=a.provider.options.label,o.push(i)),s||(s=d.DomUtil.create("ul","geocoder-control-list",this._suggestions)),-1===r.indexOf(a.text)){var l=d.DomUtil.create("li","geocoder-control-suggestion",s);l.innerHTML=a.text,l.provider=a.provider,l["data-magic-key"]=a.magicKey}else for(var u=0;u<s.childNodes.length;u++)s.childNodes[u].innerHTML===a.text&&(s.childNodes[u]["data-magic-key"]+=","+a.magicKey);r.push(a.text)}return d.DomUtil.removeClass(this._input,"geocoder-control-loading"),o.push(s),o},_boundsFromResults:function(e){if(e.length){for(var t=d.latLngBounds([0,0],[0,0]),s=[],i=[],o=e.length-1;0<=o;o--){var r=e[o];i.push(r.latlng),r.bounds&&r.bounds.isValid()&&!r.bounds.equals(t)&&s.push(r.bounds)}for(var n=d.latLngBounds(i),a=0;a<s.length;a++)n.extend(s[a]);return n}},clear:function(){this._suggestions.innerHTML="",this._suggestions.style.display="none",this._input.value="",this.options.collapseAfterResult&&(this._input.placeholder="",d.DomUtil.removeClass(this._wrapper,"geocoder-control-expanded")),!this._map.scrollWheelZoom.enabled()&&this._map.options.scrollWheelZoom&&this._map.scrollWheelZoom.enable()},clearSuggestions:function(){if(this._nodes)for(var e=0;e<this._nodes.length;e++)this._nodes[e].parentElement&&this._suggestions.removeChild(this._nodes[e])},_setupClick:function(){d.DomUtil.addClass(this._wrapper,"geocoder-control-expanded"),this._input.focus()},disable:function(){this._input.disabled=!0,d.DomUtil.addClass(this._input,"geocoder-control-input-disabled"),d.DomEvent.removeListener(this._wrapper,"click",this._setupClick,this)},enable:function(){this._input.disabled=!1,d.DomUtil.removeClass(this._input,"geocoder-control-input-disabled"),d.DomEvent.addListener(this._wrapper,"click",this._setupClick,this)},getAttribution:function(){for(var e=[],t=0;t<this._providers.length;t++)this._providers[t].options.attribution&&e.push(this._providers[t].options.attribution);return e.join(", ")},onAdd:function(t){return r.Util.setEsriAttribution(t),this._map=t,this._wrapper=d.DomUtil.create("div","geocoder-control"),this._input=d.DomUtil.create("input","geocoder-control-input leaflet-bar",this._wrapper),this._input.title=this.options.title,this.options.expanded&&(d.DomUtil.addClass(this._wrapper,"geocoder-control-expanded"),this._input.placeholder=this.options.placeholder),this._suggestions=d.DomUtil.create("div","geocoder-control-suggestions leaflet-bar",this._wrapper),d.DomEvent.addListener(this._input,"focus",function(e){this._input.placeholder=this.options.placeholder,d.DomUtil.addClass(this._wrapper,"geocoder-control-expanded")},this),d.DomEvent.addListener(this._wrapper,"click",this._setupClick,this),d.DomEvent.addListener(this._suggestions,"mousedown",function(e){var t=e.target||e.srcElement;this._geosearchCore._geocode(t.innerHTML,t["data-magic-key"],t.provider),this.clear()},this),d.DomEvent.addListener(this._input,"blur",function(e){this.clear()},this),d.DomEvent.addListener(this._input,"keydown",function(e){d.DomUtil.addClass(this._wrapper,"geocoder-control-expanded");for(var t,s=this._suggestions.querySelectorAll(".geocoder-control-suggestion"),i=this._suggestions.querySelectorAll(".geocoder-control-selected")[0],o=0;o<s.length;o++)if(s[o]===i){t=o;break}switch(e.keyCode){case 13:i?(this._geosearchCore._geocode(i.innerHTML,i["data-magic-key"],i.provider),this.clear()):this.options.allowMultipleResults?(this._geosearchCore._geocode(this._input.value,void 0),this.clear()):d.DomUtil.addClass(s[0],"geocoder-control-selected"),d.DomEvent.preventDefault(e);break;case 38:i&&d.DomUtil.removeClass(i,"geocoder-control-selected");var r=s[t-1];i&&r?d.DomUtil.addClass(r,"geocoder-control-selected"):d.DomUtil.addClass(s[s.length-1],"geocoder-control-selected"),d.DomEvent.preventDefault(e);break;case 40:i&&d.DomUtil.removeClass(i,"geocoder-control-selected");var n=s[t+1];i&&n?d.DomUtil.addClass(n,"geocoder-control-selected"):d.DomUtil.addClass(s[0],"geocoder-control-selected"),d.DomEvent.preventDefault(e);break;default:for(var a=0;a<this._geosearchCore._pendingSuggestions.length;a++){var l=this._geosearchCore._pendingSuggestions[a];l&&l.abort&&!l.id&&l.abort()}}},this),d.DomEvent.addListener(this._input,"keyup",d.Util.throttle(function(e){var t=e.which||e.keyCode,s=(e.target||e.srcElement).value;return s.length<2?(this._suggestions.innerHTML="",this._suggestions.style.display="none",void d.DomUtil.removeClass(this._input,"geocoder-control-loading")):27===t?(this._suggestions.innerHTML="",void(this._suggestions.style.display="none")):void(13!==t&&38!==t&&40!==t&&this._input.value!==this._lastValue&&(this._lastValue=this._input.value,d.DomUtil.addClass(this._input,"geocoder-control-loading"),this._geosearchCore._suggest(s)))},50,this),this),d.DomEvent.disableClickPropagation(this._wrapper),d.DomEvent.addListener(this._suggestions,"mouseover",function(e){t.scrollWheelZoom.enabled()&&t.options.scrollWheelZoom&&t.scrollWheelZoom.disable()}),d.DomEvent.addListener(this._suggestions,"mouseout",function(e){!t.scrollWheelZoom.enabled()&&t.options.scrollWheelZoom&&t.scrollWheelZoom.enable()}),this._geosearchCore.on("load",function(e){d.DomUtil.removeClass(this._input,"geocoder-control-loading"),this.clear(),this._input.blur()},this),this._wrapper}});var f=r.FeatureLayerService.extend({options:{label:"Feature Layer",maxResults:5,bufferRadius:1e3,formatSuggestion:function(e){return e.properties[this.options.searchFields[0]]}},initialize:function(e){r.FeatureLayerService.prototype.initialize.call(this,e),"string"==typeof this.options.searchFields&&(this.options.searchFields=[this.options.searchFields]),this._suggestionsQuery=this.query(),this._resultsQuery=this.query()},suggestions:function(e,t,n){var s=this._suggestionsQuery.where(this._buildQuery(e)).returnGeometry(!1);return t&&s.intersects(t),this.options.idField&&s.fields([this.options.idField].concat(this.options.searchFields)),s.run(function(e,t,s){if(e)n(e,[]);else{this.options.idField=s.objectIdFieldName;for(var i=[],o=t.features.length-1;0<=o;o--){var r=t.features[o];i.push({text:this.options.formatSuggestion.call(this,r),magicKey:r.id})}n(e,i.slice(0,this.options.maxResults))}},this)},results:function(e,t,s,a){var i=this._resultsQuery;return t?(delete i.params.where,i.featureIds([t])):i.where(this._buildQuery(e)),s&&i.within(s),i.run(d.Util.bind(function(e,t){for(var s=[],i=0;i<t.features.length;i++){var o=t.features[i];if(o){var r=this._featureBounds(o),n={latlng:r.getCenter(),bounds:r,text:this.options.formatSuggestion.call(this,o),properties:o.properties,geojson:o};s.push(n),delete this._resultsQuery.params.objectIds}}a(e,s)},this))},orderBy:function(e,t){this._suggestionsQuery.orderBy(e,t)},_buildQuery:function(e){for(var t=[],s=this.options.searchFields.length-1;0<=s;s--){var i='upper("'+this.options.searchFields[s]+'")';t.push(i+" LIKE upper('%"+e+"%')")}return this.options.where?this.options.where+" AND ("+t.join(" OR ")+")":t.join(" OR ")},_featureBounds:function(e){var t=d.geoJson(e,{});if("Point"!==e.geometry.type)return t.getBounds();var s=t.getBounds().getCenter(),i=this.options.bufferRadius/40075017*360/Math.cos(180/Math.PI*s.lat),o=this.options.bufferRadius/40075017*360;return d.latLngBounds([s.lat-o,s.lng-i],[s.lat+o,s.lng+i])}});var v=r.MapService.extend({options:{layers:[0],label:"Map Service",bufferRadius:1e3,maxResults:5,formatSuggestion:function(e){return e.properties[e.displayFieldName]+" <small>"+e.layerName+"</small>"}},initialize:function(e){r.MapService.prototype.initialize.call(this,e),this._getIdFields()},suggestions:function(e,t,d){return this.find().text(e).fields(this.options.searchFields).returnGeometry(!1).layers(this.options.layers).run(function(e,t,s){var i=[];if(!e){var o=Math.min(this.options.maxResults,t.features.length);s.results=s.results.reverse();for(var r=0;r<o;r++){var n=t.features[r],a=s.results[r],l=a.layerId,u=this._idFields[l];n.layerId=l,n.layerName=this._layerNames[l],n.displayFieldName=this._displayFields[l],u&&i.push({text:this.options.formatSuggestion.call(this,n),magicKey:a.attributes[u]+":"+l})}}d(e,i.reverse())},this)},results:function(e,t,s,a){var i,l=[];if(t){var o=t.split(":")[0],u=t.split(":")[1];i=this.query().layer(u).featureIds(o)}else i=this.find().text(e).fields(this.options.searchFields).layers(this.options.layers);return i.run(function(e,t,s){if(!e){s.results&&(s.results=s.results.reverse());for(var i=0;i<t.features.length;i++){var o=t.features[i];if(u=u||s.results[i].layerId,o&&void 0!==u){var r=this._featureBounds(o);o.layerId=u,o.layerName=this._layerNames[u],o.displayFieldName=this._displayFields[u];var n={latlng:r.getCenter(),bounds:r,text:this.options.formatSuggestion.call(this,o),properties:o.properties,geojson:o};l.push(n)}}}a(e,l.reverse())},this)},_featureBounds:function(e){var t=d.geoJson(e,{});if("Point"!==e.geometry.type)return t.getBounds();var s=t.getBounds().getCenter(),i=this.options.bufferRadius/40075017*360/Math.cos(180/Math.PI*s.lat),o=this.options.bufferRadius/40075017*360;return d.latLngBounds([s.lat-o,s.lng-i],[s.lat+o,s.lng+i])},_layerMetadataCallback:function(o){return d.Util.bind(function(e,t){if(!e){this._displayFields[o]=t.displayField,this._layerNames[o]=t.name;for(var s=0;s<t.fields.length;s++){var i=t.fields[s];if("esriFieldTypeOID"===i.type){this._idFields[o]=i.name;break}}}},this)},_getIdFields:function(){this._idFields={},this._displayFields={},this._layerNames={};for(var e=0;e<this.options.layers.length;e++){var t=this.options.layers[e];this.get(t,{},this._layerMetadataCallback(t))}}});var m=l.extend({options:{label:"Geocode Server",maxResults:5},suggestions:function(e,t,r){if(this.options.supportsSuggest){var s=this.suggest().text(e);return t&&s.within(t),s.run(function(e,t,s){var i=[];if(!e)for(;s.suggestions.length&&i.length<=this.options.maxResults-1;){var o=s.suggestions.shift();o.isCollection||i.push({text:o.text,magicKey:o.magicKey})}r(e,i)},this)}return r(void 0,[]),!1},results:function(e,t,s,i){var o=this.geocode().text(e);return o.maxLocations(this.options.maxResults),s&&o.within(s),o.run(function(e,t){i(e,t.results)},this)}});var _="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/";e.WorldGeocodingServiceUrl=_,e.VERSION="2.2.3",e.Geocode=t,e.geocode=s,e.ReverseGeocode=i,e.reverseGeocode=o,e.Suggest=n,e.suggest=a,e.GeocodeService=l,e.geocodeService=function(e){return new l(e)},e.Geosearch=g,e.geosearch=function(e){return new g(e)},e.GeosearchCore=u,e.geosearchCore=h,e.ArcgisOnlineProvider=c,e.arcgisOnlineProvider=p,e.FeatureLayerProvider=f,e.featureLayerProvider=function(e){return new f(e)},e.MapServiceProvider=v,e.mapServiceProvider=function(e){return new v(e)},e.GeocodeServiceProvider=m,e.geocodeServiceProvider=function(e){return new m(e)}});