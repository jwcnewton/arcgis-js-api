// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/decorateHelper","../../../core/accessorSupport/decorators","../../../core/HandleRegistry","../../../core/watchUtils","../../../core/promiseUtils","../../../request","../../layers/LayerView","../support/projectionUtils","../support/orientedBoundingBox","./support/LayerViewUpdatingPercentage","../lib/glMatrix","./i3s/I3SBinaryReader","./i3s/I3SUtil","./i3s/PointRenderer","./i3s/PagedNodeIndex","./i3s/LoDUtil","./i3s/LEPCC","dojo/Deferred","dojo/promise/all","dojo/errors/CancelError","../webgl-engine/lib/RenderSlot"],function(e,t,r,n,i,o,d,a,s,u,l,p,h,c,f,_,g,y,v,m,w,b,x,N){function P(){return u}function C(e,t){void 0===t&&(t="RGB");for(var r=0;r<e.length;r++){var n=e[r];if(n.name===t&&null!=n.attributeValues&&"UInt8"===n.attributeValues.valueType&&3===n.attributeValues.valuesPerElement)return n}return null}function k(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(n.name===t)return n}return null}function R(e){var t=[];return e.forEach(function(e){return t.push(e)}),t}function V(e){var t=null,r=e.renderer,n=!1;r&&"pointCloudUniqueValueRenderer"===r.type?t=k(e.attributeStorageInfo,r.field):r&&"pointCloudStretchRenderer"===r.type?t=k(e.attributeStorageInfo,r.field):r&&"pointCloudClassBreaksRenderer"===r.type?t=k(e.attributeStorageInfo,r.field):r&&"pointCloudRGBRenderer"===r.type?(t=C(e.attributeStorageInfo,r.field),n=null!=t):(t=C(e.attributeStorageInfo),n=null!=t);var i=null!=t?"embedded-elevation"===t.encoding:r&&"elevation"===r.field.toLowerCase();return i&&(t=null),{renderer:r,attributeInfo:t,useElevation:i,isRGBAttribute:n}}function A(e,t,r,n){var i=e.renderer,o=e.attributeInfo,d=e.useElevation,a=e.isRGBAttribute,s=d?I(r):t&&f.readBinaryAttribute(o,t,n);if(t&&a)return s;if(t&&i&&"pointCloudUniqueValueRenderer"===i.type){for(var u=i.colorUniqueValueInfos,l=new Uint8Array(3*n),p=B(i.fieldTransformType),h=0;n>h;h++)for(var c=p?p(s[h]):s[h],_=c+"",g=0;g<u.length;g++)if(u[g].values.indexOf(_)>=0){l[3*h]=u[g].color[0],l[3*h+1]=u[g].color[1],l[3*h+2]=u[g].color[2];break}return l}if((t||d)&&i&&"pointCloudStretchRenderer"===i.type){for(var y=i.stops,l=new Uint8Array(3*n),p=B(i.fieldTransformType),h=0;n>h;h++){var c=p?p(s[h]):s[h],v=y.length-1;if(c<y[0].value)l[3*h]=y[0].color[0],l[3*h+1]=y[0].color[1],l[3*h+2]=y[0].color[2];else if(c>=y[v].value)l[3*h]=y[v].color[0],l[3*h+1]=y[v].color[1],l[3*h+2]=y[v].color[2];else for(var g=1;g<y.length;g++)if(c<y[g].value){var m=(c-y[g-1].value)/(y[g].value-y[g-1].value);l[3*h]=y[g].color[0]*m+y[g-1].color[0]*(1-m),l[3*h+1]=y[g].color[1]*m+y[g-1].color[1]*(1-m),l[3*h+2]=y[g].color[2]*m+y[g-1].color[2]*(1-m);break}}return l}if((t||d)&&i&&"pointCloudClassBreaksRenderer"===i.type){for(var w=i.colorClassBreakInfos,l=new Uint8Array(3*n),p=B(i.fieldTransformType),h=0;n>h;h++)for(var c=p?p(s[h]):s[h],g=0;g<w.length;g++)if(c>=w[g].minValue&&c<=w[g].maxValue){l[3*h]=w[g].color[0],l[3*h+1]=w[g].color[1],l[3*h+2]=w[g].color[2];break}return l}return null}function I(e){for(var t=e.length/3,r=new Float64Array(t),n=0;t>n;n++)r[n]=e[3*n+2];return r}function B(e){return null==e||"none"===e?null:"lowFourBit"===e?function(e){return 15&e}:"highFourBit"===e?function(e){return(240&e)>>4}:"absoluteValue"===e?function(e){return Math.abs(e)}:"moduloTen"===e?function(e){return e%10}:null}var S=8,F=8,Q=c.vec4d.create(),L=function(e){function t(){e.apply(this,arguments),this.maximumPointCount=4e6,this._renderer=null,this._rendererAdded=!1,this._renderedNodes=new Set,this._updateViewNeeded=!0,this._idleUpdatesEnabled=!0,this._lodFactor=1,this._handles=new o,this._indexQueue=[],this._workQueue=[],this._idleQueue=[],this._indexPagesLoading=new Map,this._loadingNodes=new Map,this._totalWork=0,this._index=null,this._nodeIdArray=[]}return r(t,e),Object.defineProperty(t.prototype,"pointScale",{get:function(){var e=this.layer.renderer&&this.layer.renderer.pointSizeAlgorithm;return e&&"pointCloudSplatAlgorithm"===e.type?e.scaleFactor:1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverseDensity",{get:function(){var e=96;return this.layer.renderer?1*e/this.layer.renderer.pointsPerInch:5},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_clippingBox",{get:function(){var e=[];return l.extentToBoundingBox(this.view.clippingArea,e,this.view.renderSpatialReference)?e:null},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;_.checkPointCloudLayerValid(this.layer),_.checkPointCloudCompatibleWithView(this.layer,this.view),this._initRenderer();var t=this._initNodePages(),r={idleBegin:function(){return e._idleBegin()},idleEnd:function(){return e._idleEnd()},needsUpdate:function(){return!0},idleFrame:function(t){return e._idleFrame(t)}};t.then(function(){e._handles.add(d.init(e,"suspended",function(t){t?e.view.resourceController.deregisterIdleFrameWorker(e):e.view.resourceController.registerIdleFrameWorker(e,r)}))}),this._handles.add(d.watch(this,"_clippingBox",function(){return e._updateViewNeeded=!0})),this._handles.add(d.watch(this.layer,"renderer",function(){return e._rendererChanged()})),this.addResolvingPromise(t)},t.prototype.destroy=function(){this.view.resourceController.deregisterIdleFrameWorker(this),this._handles.destroy(),this._destroyRenderer()},t.prototype._initRenderer=function(){var e=this;this._renderer=new g,this._handles.add(d.init(this,"_clippingBox",function(t){e._renderer.clippingBox=t})),this._handles.add(d.init(this,"suspended",function(t){e._setPointsVisible(!t)})),this._handles.add(d.init(this,"pointScale",function(t){e._renderer.scaleFactor=t})),this._handles.add(d.init(this,["inverseDensity","maximumPointCount"],function(){e._updateViewNeeded=!0})),this._handles.add(d.init(this.view,"qualitySettings.sceneService.pointCloud.lodFactor",function(t){e._lodFactor=t,e._updateViewNeeded=!0}))},t.prototype._destroyRenderer=function(){this._setPointsVisible(!1)},t.prototype._setPointsVisible=function(e){e&&!this._rendererAdded?(this.view._stage.addExternalRenderer([N.OPAQUE_EXTERNAL],this._renderer),this._rendererAdded=!0):!e&&this._rendererAdded&&(this.view._stage.removeExternalRenderer(this._renderer),this._rendererAdded=!1)},t.prototype._rendererChanged=function(){var e=this;this._renderedNodes.forEach(function(t){return e._removeFromRenderer(t)}),this._updateViewNeeded=!0},t.prototype.displayNodes=function(e){this.cancelLoading(),this._workQueue=v.nodeDiff(R(this._renderedNodes),e,this._index),v.sortFrontToBack(this._workQueue,this.view._stage.getCamera().viewForward,this._index),this._totalWork=this._computeWork(),this._updateLoading()},t.prototype.cancelLoading=function(){var e=[];this._loadingNodes.forEach(function(t){return e.push(t)}),this._loadingNodes.clear();for(var t=0,r=e;t<r.length;t++){var n=r[t];n.cancel()}this._totalWork=0,this._updateLoading()},t.prototype._idleBegin=function(){this._idleUpdatesEnabled&&(this._updateViewNeeded=!1,this.updateViewWhenIdle())},t.prototype._idleEnd=function(){this.cancelLoading()},t.prototype._idleFrame=function(e){if(this._idleUpdatesEnabled){for(this._updateViewNeeded&&!e.done()&&(this._updateViewNeeded=!1,this.updateViewWhenIdle());this._indexQueue.length>0&&!e.done();)this._processIndexQueue();for(;this._workQueue.length>0&&this._canSchedule(this._workQueue[0])&&!e.done();)this._processWorkQueue();for(;this._idleQueue.length>0&&!e.done();){var t=this._idleQueue.shift();t.resolve()}}},t.prototype._schedule=function(){var e=new w;return this._idleQueue.push(e),e.promise},t.prototype._processIndexQueue=function(){var e=this,t=this._indexQueue.shift();this._indexPagesLoading.set(t,this._loadNodePage(t)),this._indexPagesLoading.get(t).then(function(r){e._index.addPage(t,r),e._updateViewNeeded=!0}).always(function(){e._indexPagesLoading["delete"](t)})},t.prototype._canSchedule=function(e){if(this._loadingNodes.size>=F)return!1;for(var t=0;t<e.remove.length;t++)if(!this._renderedNodes.has(e.remove[t]))return!1;return!0},t.prototype._processWorkQueue=function(){var e=this,t=this._workQueue.shift();if(0!==t.load.length){var r=t.load.length>S&&1===t.remove.length;if(r){var n=v.splitWorkEntry(t,this._index);t=n[0];for(var i=1;i<n.length;i++)this._workQueue.push(n[i])}b(t.load.map(function(t){return e._loadingNodes.has(t)||e._loadingNodes.set(t,e.loadNode(t)),e._loadingNodes.get(t)})).then(function(r){for(var n=0;n<t.load.length;n++)e._addToRenderer(t.load[n],r[n]);for(var n=0;n<t.remove.length;n++)e._removeFromRenderer(t.remove[n])}).always(function(){for(var r=0;r<t.load.length;r++)e._loadingNodes["delete"](t.load[r]);e._updateLoading()}),this._updateLoading()}else for(var i=0;i<t.remove.length;i++)this._removeFromRenderer(t.remove[i])},t.prototype._computeWork=function(){for(var e=0,t=0;t<this._workQueue.length;t++)e+=this._workQueue[t].load.length;return e+=this._loadingNodes.size,e+=(this._indexQueue.length+this._indexPagesLoading.size)*this._index.pageSize,e+=this._updateViewNeeded?100:0},Object.defineProperty(t.prototype,"updating",{get:function(){var e=this._computeWork();return e>0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updatingPercentageValue",{get:function(){var e=this._computeWork();return 100*Math.max(0,this._totalWork-e)/this._totalWork},enumerable:!0,configurable:!0}),t.prototype._updateLoading=function(){this.notifyChange("updating"),this.notifyChange("updatingPercentageValue")},t.prototype._initNodePages=function(){var e=this;return this._index=new y(this.layer.spatialReference,this.view.renderCoordsHelper.spatialReference,this.layer.store.index.nodePerIndexBlock),this._traverseVisible=this._index.createVisibilityTraverse(),this._loadNodePage(0).then(function(t){e._index.addPage(0,t)})},t.prototype._loadNodePage=function(e){var t=e*this._index.pageSize,r=this.layer.parsedUrl.path+"/nodepages/"+t;return this._requestJSON(r).then(function(e){return e.data.nodes})},t.prototype.updateViewWhenIdle=function(){for(var e=this.inverseDensity/this._lodFactor,t=this.maximumPointCount*this._lodFactor,r=this._computeNodesForMinimumDensity(e),n=this._computePointCount(r),i=Math.sqrt(n/(.75*t));n>t;)e*=i,r=this._computeNodesForMinimumDensity(e),n=this._computePointCount(r),i=Math.sqrt(2);this.displayNodes(r)},t.prototype._computePointCount=function(e){for(var t=0,r=0;r<e.length;r++){var n=this._index.getNode(e[r]);n&&(t+=n.pointCount)}return t},t.prototype._computeNodesForMinimumDensity=function(e){var t=this,r=this.view._stage.getCamera(),n=r.frustumPlanes,i=this._clippingBox,o=r.viewForward,d=c.vec3d.dot(o,r.eye),a=c.vec4d.set4(o[0],o[1],o[2],-d,Q),s=r.perPixelRatio,u=e*e,l=this._nodeIdArray;return l.length=0,this._traverseVisible({frustumPlanes:n,clippingBox:i},{predicate:function(e,r,n){if(!n)return!1;if(0===r.childCount)return l.push(e),!1;var i=t._index.getRenderObb(e),o=t._computeAveragePixelArea(i,r.effectiveArea,r.pointCount,a,s);return u>=o?(l.push(e),!1):!0},pageMiss:function(e,r){l.push(e),t._indexQueue.indexOf(r)<0&&t._indexQueue.push(r)}}),l},t.prototype._computeAveragePixelArea=function(e,t,r,n,i){var o=p.minimumDistancePlane(e,n),d=t/(o*o)/(4*i*i);return d/r},t.prototype.loadNode=function(e){var t=this,r=this._index.getNode(e),n=V(this.layer),i=null,o=null;return this._schedule().then(function(){var d=null!=r.resourceId?r.resourceId:e;return i=t.loadGeometry(d),n.attributeInfo&&(o=t.loadAttribute(d,n.attributeInfo)),b([i,o])}).then(function(e){var i=e[0],o=e[1],d=t.layer.store.defaultGeometrySchema,a=t.readGeometry(d,i),s=A(n,o,a,r.pointCount);return t._schedule().then(function(){return{positions:a,rgb:s}})}).then(function(r){var n=r.positions,i=r.rgb,o=c.vec3.create(t._index.getRenderCenter(e)),d=t._transformCoordinates(n,o),a={origin:d.origin,points:d.points,rgb:i};return a}).otherwise(function(e){return e instanceof x&&(i&&i.cancel(),o&&o.cancel()),a.reject(e)})},t.prototype.readGeometry=function(e,t){if(null==e.encoding||""===e.encoding){for(var r=f.createGeometryDataIndex(t,e,!1),n=f.createTypedView(t,r.vertexAttributes.position),i=r.header.fields,o=[i.offsetX,i.offsetY,i.offsetZ],d=[i.scaleX,i.scaleY,i.scaleZ],a=n.length/3,s=new Float64Array(3*a),u=0;a>u;u++)s[3*u]=n[3*u]*d[0]+o[0],s[3*u+1]=n[3*u+1]*d[1]+o[1],s[3*u+2]=n[3*u+2]*d[2]+o[2];return s}return"lepcc-xyz"===e.encoding?m.decodeXYZ(t).result:void 0},t.prototype.loadGeometry=function(e){var t=this.layer.parsedUrl.path+"/nodes/"+e+"/geometries/0";return this._requestBinary(t).then(function(e){return e.data})},t.prototype.loadAttribute=function(e,t){var r=this.layer.parsedUrl.path+"/nodes/"+e+"/attributes/"+t.key;return this._requestBinary(r).then(function(e){return e.data})},t.prototype._requestJSON=function(e){return s(e,{query:{f:"json",token:this.layer.token},responseType:"json"})},t.prototype._requestBinary=function(e){return s(e,{query:{token:this.layer.token},responseType:"array-buffer"})},t.prototype._removeFromRenderer=function(e){this._renderedNodes.has(e)&&(this._renderer.removeNode(""+e),this._renderedNodes["delete"](e))},t.prototype._addToRenderer=function(e,t){if(!this._renderedNodes.has(e)){this._renderedNodes.add(e);var r=this._index.getNode(e),n=.5*Math.sqrt(r.effectiveArea/r.pointCount),i=t.rgb;if(null==i){i=new Uint8Array(3*r.pointCount);for(var o=0;o<i.length;o++)i[o]=255}this._renderer.addNode({id:""+e,coordinates:t.points,origin:t.origin,pointRadius:n,rgb:i})}},t.prototype._transformCoordinates=function(e,t){var r=e.length/3,n=this.layer.spatialReference,i=this.view.renderCoordsHelper.spatialReference;if(!l.bufferToBuffer(e,n,0,e,i,0,r))throw Error("Can't reproject");for(var o=new Float32Array(3*r),d=0;r>d;d++)o[3*d]=e[3*d]-t[0],o[3*d+1]=e[3*d+1]-t[1],o[3*d+2]=e[3*d+2]-t[2];return{points:o,origin:t}},t.prototype.getStats=function(){var e=this;return{"Rendered Nodes":this._renderedNodes.size,"Rendered Points":R(this._renderedNodes).reduce(function(t,r){return t+e._index.getNode(r).pointCount},0),"Loading Nodes":this._loadingNodes.size,"Index Queue":this._indexQueue.length,"Work Queue":this._workQueue.length}},n([i.property()],t.prototype,"view",void 0),n([i.property()],t.prototype,"layer",void 0),n([i.property({readOnly:!0,dependsOn:["layer.renderer.pointSizeAlgorithm"]})],t.prototype,"pointScale",null),n([i.property({readOnly:!0,dependsOn:["layer.renderer.pointsPerInch"]})],t.prototype,"inverseDensity",null),n([i.property()],t.prototype,"maximumPointCount",void 0),n([i.property({readOnly:!0,dependsOn:["view.clippingArea"]})],t.prototype,"_clippingBox",null),n([i.property()],t.prototype,"updating",null),n([i.property()],t.prototype,"updatingPercentageValue",null),t=n([i.subclass("esri.views.3d.layers.PointCloudLayerView3D")],t)}(i.declared(P(),h));return L});