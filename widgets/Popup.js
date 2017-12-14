// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","./support/widget","../core/accessorSupport/decorators","../core/lang","../core/Logger","../core/HandleRegistry","../core/watchUtils","./Widget","../widgets/support/widgetUtils","./Popup/PopupRenderer","./Popup/PopupViewModel","dojo/i18n!./Popup/nls/Popup","./Spinner","dojo/dom-geometry","dojo/keys"],function(e,t,o,i,n,r,a,s,p,u,l,d,c,h,f,g,_,v,b){function y(e,t){return void 0===t?F+"__"+e:F+"__"+e+"-"+t}function w(e){return e&&e.isInstanceOf&&e.isInstanceOf(d)}function m(e){return e&&"function"==typeof e.postMixInProperties&&"function"==typeof e.buildRendering&&"function"==typeof e.postCreate&&"function"==typeof e.startup}var k=e.toUrl("./Popup/images/default-action.svg"),M={iconLeftTriangleArrow:"esri-icon-left-triangle-arrow",iconRightTriangleArrow:"esri-icon-right-triangle-arrow",iconDockToTop:"esri-icon-maximize",iconDockToBottom:"esri-icon-dock-bottom",iconDockToLeft:"esri-icon-dock-left",iconDockToRight:"esri-icon-dock-right",iconClose:"esri-icon-close",iconUndock:"esri-icon-minimize",iconFeatureMenu:"esri-icon-layer-list",iconCheckMark:"esri-icon-check-mark",iconLoading:"esri-icon-loading-indicator",iconZoom:"esri-icon-zoom-in-magnifying-glass",rotating:"esri-rotating",disabled:"esri-disabled",base:"esri-popup",widget:"esri-widget",container:"esri-popup__position-container",main:"esri-popup__main-container",loadingContainer:"esri-popup__loading-container",shadow:"esri-popup--shadow",isDocked:"esri-popup--is-docked",isDockedTopLeft:"esri-popup--is-docked-top-left",isDockedTopCenter:"esri-popup--is-docked-top-center",isDockedTopRight:"esri-popup--is-docked-top-right",isDockedBottomLeft:"esri-popup--is-docked-bottom-left",isDockedBottomCenter:"esri-popup--is-docked-bottom-center",isDockedBottomRight:"esri-popup--is-docked-bottom-right",alignTopCenter:"esri-popup--aligned-top-center",alignBottomCenter:"esri-popup--aligned-bottom-center",alignTopLeft:"esri-popup--aligned-top-left",alignBottomLeft:"esri-popup--aligned-bottom-left",alignTopRight:"esri-popup--aligned-top-right",alignBottomRight:"esri-popup--aligned-bottom-right",isFeatureMenuOpen:"esri-popup--feature-menu-open",hasFeatureUpdated:"esri-popup--feature-updated",header:"esri-popup__header",headerButtons:"esri-popup__header-buttons",headerTitle:"esri-popup__header-title",headerTitleButton:"esri-popup__header-title--button",content:"esri-popup__content",featureButtons:"esri-popup__feature-buttons",button:"esri-popup__button",buttonDock:"esri-popup__button--dock",icon:"esri-popup__icon",iconDock:"esri-popup__icon--dock-icon",actions:"esri-popup__actions",action:"esri-popup__action",actionImage:"esri-popup__action-image",actionText:"esri-popup__action-text",pointer:"esri-popup__pointer",pointerDirection:"esri-popup__pointer-direction",navigation:"esri-popup__navigation",navigationButtons:"esri-popup__navigation-buttons",paginationPrevious:"esri-popup__pagination-previous",paginationNext:"esri-popup__pagination-next",paginationPreviousIconLTR:"esri-popup__pagination-previous-icon",paginationPreviousIconRTL:"esri-popup__pagination-previous-icon--rtl",paginationNextIconLTR:"esri-popup__pagination-next-icon",paginationNextIconRTL:"esri-popup__pagination-next-icon--rtl",paginationText:"esri-popup__pagination-page-text",featureMenu:"esri-popup__feature-menu",featureMenuList:"esri-popup__feature-menu-list",featureMenuItem:"esri-popup__feature-menu-item",featureMenuViewport:"esri-popup__feature-menu-viewport",featureMenuHeader:"esri-popup__feature-menu-header",featureMenuNote:"esri-popup__feature-menu-note",featureMenuSelected:"esri-popup__feature-menu-item--selected",featureMenuButton:"esri-popup__feature-menu-button",featureMenuTitle:"esri-popup__feature-menu-title"},x="zoom-to",C={buttonEnabled:!0,position:"auto",breakpoint:{width:544}},F="esri-popup",R="esri.widgets.Popup",P=p.getLogger(R),T=function(e){function t(t){var o=e.call(this)||this;return o._blurContainer=!1,o._containerNode=null,o._mainContainerNode=null,o._featureMenuNode=null,o._focusContainer=!1,o._focusDockButton=!1,o._focusFeatureMenuButton=!1,o._focusFirstFeature=!1,o._handleRegistry=new u,o._displayActionTextLimit=2,o._pointerOffsetInPx=16,o._spinner=null,o._closeFeatureMenuHandle=null,o.actions=null,o.alignment="auto",o.autoCloseEnabled=null,o.content=null,o.collapsed=!1,o.collapseEnabled=!0,o.dockEnabled=!1,o.featureCount=null,o.featureMenuOpen=!1,o.features=null,o.featureNavigationEnabled=!0,o.highlightEnabled=null,o.location=null,o.popupRenderers=[],o.promises=null,o.selectedFeature=null,o.selectedFeatureIndex=null,o.selectedPopupRenderer=null,o.spinnerEnabled=!0,o.title=null,o.updateLocationEnabled=null,o.view=null,o.viewModel=new f,o.visible=null,o}return o(t,e),t.prototype.postInitialize=function(){var e=this,t=l.pausable(this,"\n      viewModel.visible,\n      dockEnabled,\n      viewModel.selectedFeature\n    ",function(){return e._closeFeatureMenu()});this._closeFeatureMenuHandle=t,this.own(l.watch(this,"viewModel.screenLocation",function(){return e._positionContainer()}),l.watch(this,["viewModel.visible","dockEnabled"],function(){return e._toggleScreenLocationEnabled()}),l.watch(this,"viewModel.screenLocation",function(t,o){!!t!=!!o&&e.reposition()}),l.watch(this,"viewModel.features",function(t){return e._createPopupRenderers(t)}),l.watch(this,["viewModel.view.padding","viewModel.view.size","viewModel.visible","viewModel.waitingForResult","viewModel.location","alignment"],function(){return e.reposition()}),t,l.watch(this,"spinnerEnabled",function(t){return e._spinnerEnabledChange(t)}),l.watch(this,["title","content"],function(){return e._hasFeatureUpdated()}),l.watch(this,"viewModel.view.size",function(t,o){return e._updateDockEnabledForViewSize(t,o)}),l.watch(this,"viewModel.view",function(t,o){return e._viewChange(t,o)}),l.watch(this,"viewModel.view.ready",function(t,o){return e._viewReadyChange(t,o)}),l.watch(this,["viewModel.waitingForResult","viewModel.location"],function(){return e._displaySpinner()}),l.watch(this,["popupRenderers","viewModel.selectedFeatureIndex"],function(){return e._updatePopupRenderer()}),l.watch(this,"selectedPopupRenderer.viewModel.title",function(t){return e._setTitleFromPopupRenderer(t)}),l.watch(this,["selectedPopupRenderer.viewModel.content","selectedPopupRenderer.viewModel.waitingForContent"],function(){return e._setContentFromPopupRenderer()}),l.watch(this,"featureMenuOpen",function(t){return e._featureMenuOpenChanged(t)}),l.watch(this,"visible",function(t){return e._visibleChanged(t)}),l.on(this,"viewModel","trigger-action",function(t){return e._zoomToAction(t)}))},t.prototype.destroy=function(){this._destroyPopupRenderers(),this._destroySpinner(),this._handleRegistry.destroy(),this._handleRegistry=null},Object.defineProperty(t.prototype,"currentAlignment",{get:function(){return this._getCurrentAlignment()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"currentDockPosition",{get:function(){return this._getCurrentDockPosition()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dockOptions",{get:function(){return this._get("dockOptions")||C},set:function(e){var t=n({},C),o=this.get("viewModel.view.breakpoints"),i={};o&&(i.width=o.xsmall,i.height=o.xsmall);var r=n({},t,e),a=n({},t.breakpoint,i),s=r.breakpoint;s===!0?r.breakpoint=a:"object"==typeof s&&(r.breakpoint=n({},a,s)),this._set("dockOptions",r),this._setCurrentDockPosition(),this.reposition()},enumerable:!0,configurable:!0}),t.prototype.blur=function(){var e=this.visible;e||P.warn("Popup cannot be blurred while visible is false"),this._blurContainer=!0,this.scheduleRender()},t.prototype.clear=function(){},t.prototype.close=function(){this.visible=!1},t.prototype.focus=function(){var e=this.visible;e||P.warn("Popup cannot be focused while visible is false"),this._focusContainer=!0,this.scheduleRender()},t.prototype.next=function(){return null},t.prototype.open=function(e){var t={featureMenuOpen:!1,updateLocationEnabled:!1,promises:[]},o=n({visible:!0},t,e);o.featureMenuOpen&&this._closeFeatureMenuHandle.pause(),this.set(o),this._visibleChanged(!0)},t.prototype.previous=function(){return null},t.prototype.reposition=function(){this.renderNow(),this._positionContainer(),this._setCurrentAlignment()},t.prototype.triggerAction=function(e){return null},t.prototype.render=function(){var e=this,t=e.collapsed,o=e.collapseEnabled,i=e.dockEnabled,n=e.actions,a=e.featureMenuOpen,p=e.featureNavigationEnabled,u=e.popupRenderers,l=e.visible,d=this.viewModel,h=d.featureCount,f=d.promiseCount,_=d.pendingPromisesCount,v=d.selectedFeatureIndex,b=d.title,w=d.waitingForResult,m=h>1&&p,k=h>1&&a,x=o&&!k&&t,C=n&&n.length,F=m&&this._getPageText(h,v),R=this._renderContent(),P=c.isRtl(),T=this.get("selectedPopupRenderer")?this.get("selectedPopupRenderer.viewModel.waitingForContent")||this.get("selectedPopupRenderer.viewModel.content"):R,O=i?g.undock:g.dock,E=this,D=E.currentAlignment,N=E.currentDockPosition,L=_?r.tsx("div",{key:y("loading-container"),role:"presentation","class":M.loadingContainer,"aria-label":g.loading,title:g.loading},r.tsx("span",{"aria-hidden":"true","class":r.join(M.icon,M.iconLoading,M.rotating)})):null,A=(Oe={},Oe[M.iconFeatureMenu]=!k,Oe[M.iconClose]=k,Oe),I=r.tsx("span",{"aria-hidden":"true","class":M.icon,classes:A}),B=(Ee={},Ee[M.iconRightTriangleArrow]=P,Ee[M.paginationPreviousIconRTL]=P,Ee[M.iconLeftTriangleArrow]=!P,Ee[M.paginationPreviousIconLTR]=!P,Ee),S=r.tsx("span",{"aria-hidden":"true","class":M.icon,classes:B}),U=r.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._previous,onkeydown:this._previous,"class":r.join(M.button,M.paginationPrevious),"aria-label":g.previous,title:g.previous},S),H=(De={},De[M.iconLeftTriangleArrow]=P,De[M.paginationNextIconRTL]=P,De[M.iconRightTriangleArrow]=!P,De[M.paginationNextIconLTR]=!P,De),V=r.tsx("span",{"aria-hidden":"true","class":M.icon,classes:H}),j=r.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._next,onkeydown:this._next,"class":r.join(M.button,M.paginationNext),"aria-label":g.next,title:g.next},V),z=this.id+"-feature-menu",W=r.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._toggleFeatureMenu,onkeydown:this._toggleFeatureMenu,afterCreate:this._focusFeatureMenuButtonNode,afterUpdate:this._focusFeatureMenuButtonNode,"class":r.join(M.button,M.featureMenuButton),"aria-haspopup":"true","aria-controls":z,"aria-expanded":a,"aria-label":g.menu,title:g.menu},I),K=r.tsx("div",{"class":M.paginationText},F),q=m?r.tsx("div",{"class":M.navigationButtons},U,K,j,W):null,Z=this._wouldDockTo(),G=(Ne={},Ne[M.iconUndock]=i,Ne[M.iconDock]=!i,Ne[M.iconDockToRight]=!i&&("top-right"===Z||"bottom-right"===Z),Ne[M.iconDockToLeft]=!i&&("top-left"===Z||"bottom-left"===Z),Ne[M.iconDockToTop]=!i&&"top-center"===Z,Ne[M.iconDockToBottom]=!i&&"bottom-center"===Z,Ne),J=r.tsx("span",{"aria-hidden":"true",classes:G,"class":M.icon}),Q=this.get("dockOptions.buttonEnabled")?r.tsx("div",{role:"button","aria-label":O,title:O,tabIndex:0,bind:this,onclick:this._toggleDockEnabled,onkeydown:this._toggleDockEnabled,afterCreate:this._focusDockButtonNode,afterUpdate:this._focusDockButtonNode,"class":r.join(M.button,M.buttonDock)},J):null,X=o&&(T||C||m),Y=(Le={},Le[M.headerTitleButton]=X,Le),$=X?"button":"heading",ee=X?x?g.expand:g.collapse:"",te=this.id+"-popup-title",oe=b?r.tsx("h1",{"class":M.headerTitle,id:te,role:$,"aria-label":ee,title:ee,classes:Y,bind:this,tabIndex:X?0:-1,onclick:this._toggleCollapsed,onkeydown:this._toggleCollapsed,innerHTML:b}):null,ie=r.tsx("span",{"aria-hidden":"true","class":r.join(M.icon,M.iconClose)}),ne=r.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._close,onkeydown:this._close,"class":M.button,"aria-label":g.close,title:g.close},ie),re=r.tsx("header",{"class":M.header},oe,r.tsx("div",{"class":M.headerButtons},Q,ne)),ae=this.id+"-popup-content",se=T&&!x?r.tsx("article",{key:y("content-container"),id:ae,"class":M.content},R):null,pe=!x&&("bottom-left"===D||"bottom-center"===D||"bottom-right"===D||"top-left"===N||"top-center"===N||"top-right"===N),ue=!x&&("top-left"===D||"top-center"===D||"top-right"===D||"bottom-left"===N||"bottom-center"===N||"bottom-right"===N),le=k?null:r.tsx("div",{key:y("actions"),"class":M.actions},this._renderActions()),de=r.tsx("section",{key:y("navigation"),"class":M.navigation},L,q),ce=m||C?r.tsx("div",{key:y("feature-buttons"),"class":M.featureButtons},le,de):null,he=this._renderFeatureMenuNode(u,v,k,z);he&&this._closeFeatureMenuHandle.resume();var fe=s.substitute({total:u.length},g.selectedFeatures),ge=r.tsx("section",{key:y("menu"),"class":M.featureMenu},r.tsx("h2",{"class":M.featureMenuHeader},fe),r.tsx("nav",{"class":M.featureMenuViewport,afterCreate:this._featureMenuViewportNodeUpdated,afterUpdate:this._featureMenuViewportNodeUpdated},he)),_e=i?null:r.tsx("div",{key:y("pointer"),"class":M.pointer,role:"presentation"},r.tsx("div",{"class":r.join(M.pointerDirection,M.shadow)})),ve=(Ae={},Ae[M.alignTopCenter]="top-center"===D,Ae[M.alignBottomCenter]="bottom-center"===D,Ae[M.alignTopLeft]="top-left"===D,Ae[M.alignBottomLeft]="bottom-left"===D,Ae[M.alignTopRight]="top-right"===D,Ae[M.alignBottomRight]="bottom-right"===D,Ae[M.isDocked]=i,Ae[M.shadow]=!i,Ae[M.hasFeatureUpdated]=l,Ae[M.isDockedTopLeft]="top-left"===N,Ae[M.isDockedTopCenter]="top-center"===N,Ae[M.isDockedTopRight]="top-right"===N,Ae[M.isDockedBottomLeft]="bottom-left"===N,Ae[M.isDockedBottomCenter]="bottom-center"===N,Ae[M.isDockedBottomRight]="bottom-right"===N,Ae[M.isFeatureMenuOpen]=k,Ae),be=this.get("selectedFeature.layer.title"),ye=this.get("selectedFeature.layer.id"),we=(Ie={},Ie[M.shadow]=i,Ie),me=!!f,ke=!!h,Me=me?ke:!0,xe=l&&!w&&Me,Ce=pe?ge:null,Fe=ue?ge:null,Re=pe?ce:null,Pe=ue?ce:null,Te=xe?r.tsx("div",{key:y("container"),"class":M.container,classes:ve,"data-layer-title":be,"data-layer-id":ye,bind:this,afterCreate:this._positionContainer,afterUpdate:this._positionContainer},r.tsx("div",{"class":r.join(M.main,M.widget),classes:we,tabIndex:-1,"aria-role":"dialog","aria-labelledby":oe?te:"","aria-describedby":se?ae:"",bind:this,onkeyup:this._handleMainKeyup,afterCreate:this._mainContainerNodeUpdated,afterUpdate:this._mainContainerNodeUpdated},Re,Ce,re,se,Pe,Fe),_e):null;return r.tsx("div",{key:y("base"),"class":M.base,role:"presentation"},Te);var Oe,Ee,De,Ne,Le,Ae,Ie},t.prototype._visibleChanged=function(e){e&&(this._focusContainer=!0,this.scheduleRender())},t.prototype._featureMenuOpenChanged=function(e){e?this._focusFirstFeature=!0:this._focusFeatureMenuButton=!0,this.scheduleRender()},t.prototype._setTitleFromPopupRenderer=function(e){this.viewModel.title=e||""},t.prototype._setContentFromPopupRenderer=function(){this.viewModel.content=this.selectedPopupRenderer||null,this.scheduleRender()},t.prototype._handleFeatureMenuKeyup=function(e){var t=e.keyCode;t===b.ESCAPE&&(e.stopPropagation(),this.featureMenuOpen=!1)},t.prototype._handleFeatureMenuItemKeyup=function(e){var t=e.keyCode,o=this._featureMenuNode,i=this.get("features.length"),n=e.currentTarget,r=n["data-feature-index"];if(o){var a=o.querySelectorAll("li");if(t===b.UP_ARROW){e.stopPropagation();var s=r-1,p=(s+i)%i,u=a[p];return void u.focus()}if(t===b.DOWN_ARROW){e.stopPropagation();var l=r+1,p=(l+i)%i,d=a[p];return void d.focus()}if(t===b.HOME){e.stopPropagation();var c=a[0];return void c.focus()}if(t===b.END){e.stopPropagation();var h=a[a.length-1];return void h.focus()}}},t.prototype._handleMainKeyup=function(e){var t=e.keyCode;t===b.LEFT_ARROW&&(e.stopPropagation(),this.previous()),t===b.RIGHT_ARROW&&(e.stopPropagation(),this.next())},t.prototype._zoomToAction=function(e){e.action&&e.action.id===x&&this.viewModel.zoomToLocation()},t.prototype._spinnerEnabledChange=function(e){if(this._destroySpinner(),e){var t=this.get("viewModel.view");this._createSpinner(t)}},t.prototype._displaySpinner=function(){var e=this._spinner;if(e){var t=this.viewModel,o=t.location,i=t.waitingForResult;return i?void e.show({location:o}):void e.hide()}},t.prototype._getIconStyles=function(e){return{"background-image":e?"url("+e+")":""}},t.prototype._renderAction=function(e,t,o,i){var n=this,a=l.watch(e,["id","className","title","image","visible"],function(){return n.scheduleRender()});this._handleRegistry.add(a,i);var p=this.get("selectedFeature.attributes");e.id===x&&(e.title=g.zoom,this._handleRegistry.add(l.init(this,"view.animation.state",function(t){e.className="waiting-for-target"===t?r.join(M.icon,M.iconLoading,M.rotating):r.join(M.icon,M.iconZoom)}),i));var u=e.title,d=e.className,c=e.image||d?e.image:k,h=u&&p?s.substitute(p,u):u,f=d&&p?s.substitute(p,d):d,_=c&&p?s.substitute(p,c):c,v=f||M.icon,b=(C={},C[M.actionImage]=!!_,C),w=(F={},F[M.disabled]=-1!==v.indexOf(M.iconLoading),F),m=o<=this._displayActionTextLimit?r.tsx("span",{key:y("action-text-"+t+"-"+e.uid),"class":M.actionText},h):null;return e.visible?r.tsx("div",{key:y("action-"+t+"-"+e.uid),role:"button",tabIndex:0,title:h,"aria-label":h,classes:w,"class":r.join(M.button,M.action),bind:this,"data-action-index":t,onclick:this._triggerAction,onkeydown:this._triggerAction},r.tsx("span",{key:y("action-icon-"+t+"-"+e.uid+"-"+v),"aria-hidden":"true","class":v,classes:b,styles:this._getIconStyles(_)}),m):null;var C,F},t.prototype._renderActions=function(){var e=this,t="actions";this._handleRegistry.remove(t);var o=this.actions;if(o){var i=o.length,n=o.toArray(),r=n.map(function(o,n){return e._renderAction(o,n,i,t)});return r}},t.prototype._updatePopupRenderer=function(){var e=this.popupRenderers,t=this.viewModel.selectedFeatureIndex,o=e[t]||null;o&&!o.contentEnabled&&(o.contentEnabled=!0),this._set("selectedPopupRenderer",o)},t.prototype._destroyPopupRenderers=function(){this.popupRenderers.forEach(function(e){return e.destroy()}),this._set("popupRenderers",[])},t.prototype._createPopupRenderers=function(e){var t=this;this._destroyPopupRenderers();var o=[];e&&e.forEach(function(e){var i=new h({contentEnabled:!1,graphic:e,view:t.get("viewModel.view")});o.push(i)}),this._set("popupRenderers",o)},t.prototype._isScreenLocationWithinView=function(e,t){return e.x>-1&&e.y>-1&&e.x<=t.width&&e.y<=t.height},t.prototype._isOutsideView=function(e){var t=e.popupHeight,o=e.popupWidth,i=e.screenLocation,n=e.side,r=e.view;if(isNaN(o)||isNaN(t)||!r||!i)return!1;var a=r.padding;return"right"===n&&i.x+o/2>r.width-a.right?!0:"left"===n&&i.x-o/2<a.left?!0:"top"===n&&i.y-t<a.top?!0:"bottom"===n&&i.y+t>r.height-a.bottom?!0:!1},t.prototype._determineCurrentAlignment=function(){function e(e){return parseInt(e.replace(/[^-\d\.]/g,""),10)}var t=this,o=t._pointerOffsetInPx,i=t._containerNode,n=t._mainContainerNode,r=t.viewModel,a=r.screenLocation,s=r.view;if(!a||!s||!i)return"top-center";if(!this._isScreenLocationWithinView(a,s))return this._get("currentAlignment")||"top-center";var p=n?window.getComputedStyle(n,null):null,u=p?e(p.getPropertyValue("max-height")):0,l=p?e(p.getPropertyValue("height")):0,d=v.getContentBox(i),c=d.w+o,h=Math.max(d.h,u,l)+o,f=this._isOutsideView({popupHeight:h,popupWidth:c,screenLocation:a,side:"right",view:s}),g=this._isOutsideView({popupHeight:h,popupWidth:c,screenLocation:a,side:"left",view:s}),_=this._isOutsideView({popupHeight:h,popupWidth:c,screenLocation:a,side:"top",view:s}),b=this._isOutsideView({popupHeight:h,popupWidth:c,screenLocation:a,side:"bottom",view:s});return g?_?"bottom-right":"top-right":f?_?"bottom-left":"top-left":_?b?"top-center":"bottom-center":"top-center"},t.prototype._getCurrentAlignment=function(){var e=this,t=e.alignment,o=e.dockEnabled;if(o)return null;var i="auto"===t?this._determineCurrentAlignment():"function"==typeof t?t.call(this):t;return i},t.prototype._setCurrentAlignment=function(){this._set("currentAlignment",this._getCurrentAlignment())},t.prototype._setCurrentDockPosition=function(){this._set("currentDockPosition",this._getCurrentDockPosition())},t.prototype._getDockPosition=function(){var e=this.get("dockOptions.position"),t="auto"===e?this._determineCurrentDockPosition():"function"==typeof e?e.call(this):e;return t},t.prototype._getCurrentDockPosition=function(){return this.dockEnabled?this._getDockPosition():null},t.prototype._wouldDockTo=function(){return this.dockEnabled?null:this._getDockPosition()},t.prototype._renderFeatureMenuItemNode=function(e,t,o,i){var n=t===o,a=(u={},u[M.featureMenuSelected]=n,u),s=e.title||g.untitled,p=n?r.tsx("span",{key:y("feature-menu-selected-feature-"+o),title:g.selectedFeature,"aria-label":g.selectedFeature,"class":M.iconCheckMark}):null;return r.tsx("li",{role:"menuitem",tabIndex:-1,key:y("feature-menu-feature-"+o),classes:a,"class":M.featureMenuItem,title:s,"aria-label":s,bind:this,"data-feature-index":t,onkeyup:this._handleFeatureMenuItemKeyup,onclick:this._selectFeature,onkeydown:this._selectFeature},r.tsx("span",{"class":M.featureMenuTitle},s,p));var u},t.prototype._renderFeatureMenuNode=function(e,t,o,i){var n=this;return e.length>1?r.tsx("ol",{"class":M.featureMenuList,id:i,bind:this,afterCreate:this._featureMenuNodeUpdated,afterUpdate:this._featureMenuNodeUpdated,onkeyup:this._handleFeatureMenuKeyup,role:"menu"},e.map(function(e,i){return n._renderFeatureMenuItemNode(e,i,t,o)})):null},t.prototype._determineCurrentDockPosition=function(){var e=this.get("viewModel.view"),t=c.isRtl()?"top-left":"top-right";if(!e)return t;var o=e.padding||{left:0,right:0,top:0,bottom:0},i=e.width-o.left-o.right,n=e.get("breakpoints");return n&&i<=n.xsmall?"bottom-center":t},t.prototype._renderContent=function(){var e=this.get("viewModel.content"),t="content";return"string"==typeof e?r.tsx("div",{key:y(t+"-string"),innerHTML:e}):w(e)?r.tsx("div",{key:y(t+"-widget")},e.render()):e instanceof HTMLElement?r.tsx("div",{key:y(t+"-html-element"),bind:e,afterUpdate:this._attachToNode,afterCreate:this._attachToNode}):m(e)?r.tsx("div",{key:y(t+"-dijit"),bind:e.domNode,afterUpdate:this._attachToNode,afterCreate:this._attachToNode}):void 0},t.prototype._attachToNode=function(e){var t=this;e.appendChild(t)},t.prototype._positionContainer=function(e){if(void 0===e&&(e=this._containerNode),e&&(this._containerNode=e),e){var t=this.viewModel.screenLocation,o=v.getContentBox(e),i=this._calculatePositionStyle(t,o);i&&(e.style.top=i.top,e.style.left=i.left,e.style.bottom=i.bottom,e.style.right=i.right)}},t.prototype._calculateFullWidth=function(e){var t=this,o=t.currentAlignment,i=t._pointerOffsetInPx;return"top-left"===o||"bottom-left"===o||"top-right"===o||"bottom-right"===o?e+i:e},t.prototype._calculateAlignmentPosition=function(e,t,o,i){var n=this,r=n.currentAlignment,a=n._pointerOffsetInPx,s=i/2,p=o.height-t,u=o.width-e;return"bottom-center"===r?{top:t+a,left:e-s}:"top-left"===r?{bottom:p+a,right:u+a}:"bottom-left"===r?{top:t+a,right:u+a}:"top-right"===r?{bottom:p+a,left:e+a}:"bottom-right"===r?{top:t+a,left:e+a}:"top-center"===r?{bottom:p+a,left:e-s}:void 0},t.prototype._calculatePositionStyle=function(e,t){var o=this,i=o.dockEnabled,n=o.view;if(n){var r=n.padding;if(i)return{left:r.left?r.left+"px":"",top:r.top?r.top+"px":"",right:r.right?r.right+"px":"",bottom:r.bottom?r.bottom+"px":""};if(e&&t){var a=this._calculateFullWidth(t.w),s=this._calculateAlignmentPosition(e.x,e.y,n,a);if(s)return{top:void 0!==s.top?s.top+"px":"auto",left:void 0!==s.left?s.left+"px":"auto",bottom:void 0!==s.bottom?s.bottom+"px":"auto",right:void 0!==s.right?s.right+"px":"auto"}}}},t.prototype._viewChange=function(e,t){e&&t&&(this.close(),this.clear())},t.prototype._viewReadyChange=function(e,t){if(e){var o=this.get("viewModel.view");return void this._wireUpView(o)}t&&(this.close(),this.clear())},t.prototype._wireUpView=function(e){if(this._destroySpinner(),e){var t=this.spinnerEnabled;t&&this._createSpinner(e),this._setDockEnabledForViewSize(this.dockOptions)}},t.prototype._dockingThresholdCrossed=function(e,t,o){var i=e[0],n=e[1],r=t[0],a=t[1],s=o.width,p=o.height;return s>=i&&r>s||i>s&&s>=r||p>=n&&a>p||n>p&&p>=a},t.prototype._updateDockEnabledForViewSize=function(e,t){if(e&&t){var o=this.get("viewModel.view.padding")||{left:0,right:0,top:0,bottom:0},i=o.left+o.right,n=o.top+o.bottom,r=[],a=[];r[0]=e[0]-i,r[1]=e[1]-n,a[0]=t[0]-i,a[1]=t[1]-n;var s=this.dockOptions,p=s.breakpoint;this._dockingThresholdCrossed(r,a,p)&&this._setDockEnabledForViewSize(s),this._setCurrentDockPosition()}},t.prototype._hasFeatureUpdated=function(){var e=this._containerNode,t=this.viewModel.pendingPromisesCount,o=this.get("selectedPopupRenderer.viewModel.waitingForContent");!e||t||o||(e.classList.remove(M.hasFeatureUpdated),e.offsetHeight,e.classList.add(M.hasFeatureUpdated))},t.prototype._focusDockButtonNode=function(e){this._focusDockButton&&(this._focusDockButton=!1,e.focus())},t.prototype._mainContainerNodeUpdated=function(e){return this._mainContainerNode=e,this._focusContainer?(this._focusContainer=!1,void e.focus()):this._blurContainer?(this._blurContainer=!1,void e.blur()):void 0},t.prototype._featureMenuNodeUpdated=function(e){if(this._featureMenuNode=e,e&&this._focusFirstFeature){this._focusFirstFeature=!1;var t=e.querySelectorAll("li");if(t.length){var o=t[0];o.focus()}}},t.prototype._focusFeatureMenuButtonNode=function(e){this._focusFeatureMenuButton&&(this._focusFeatureMenuButton=!1,e.focus())},t.prototype._featureMenuViewportNodeUpdated=function(e){e&&(e.scrollTop=0)},t.prototype._toggleScreenLocationEnabled=function(){var e=this,t=e.dockEnabled,o=e.visible,i=e.viewModel;if(i){var n=o&&!t;i.screenLocationEnabled=n}},t.prototype._shouldDockAtCurrentViewSize=function(e){var t=e.breakpoint,o=this.get("viewModel.view.ui"),i=o.width,n=o.height;if(isNaN(i)||isNaN(n))return!1;var r=t.hasOwnProperty("width")&&i<=t.width,a=t.hasOwnProperty("height")&&n<=t.height;return r||a},t.prototype._setDockEnabledForViewSize=function(e){e.breakpoint&&(this.dockEnabled=this._shouldDockAtCurrentViewSize(e))},t.prototype._getPageText=function(e,t){return s.substitute({index:t+1,total:e},g.pageText)},t.prototype._destroySpinner=function(){this._spinner&&(this._spinner.destroy(),this._spinner=null)},t.prototype._createSpinner=function(e){e&&(this._spinner=new _({container:document.createElement("div"),view:e}),e.root.appendChild(this._spinner.container))},t.prototype._closeFeatureMenu=function(){this.featureMenuOpen=!1},t.prototype._toggleCollapsed=function(){this.collapsed=!this.collapsed},t.prototype._close=function(){this.close(),this.view&&this.view.focus()},t.prototype._toggleDockEnabled=function(){this.dockEnabled=!this.dockEnabled,this._focusDockButton=!0,this.scheduleRender()},t.prototype._toggleFeatureMenu=function(){this.featureMenuOpen=!this.featureMenuOpen},t.prototype._triggerAction=function(e){var t=e.currentTarget,o=t["data-action-index"];this.viewModel.triggerAction(o)},t.prototype._selectFeature=function(e){var t=e.currentTarget,o=t["data-feature-index"];isNaN(o)||(this.viewModel.selectedFeatureIndex=o),this._closeFeatureMenu()},t.prototype._next=function(){this.next()},t.prototype._previous=function(){this.previous()},i([a.aliasOf("viewModel.actions"),r.renderable()],t.prototype,"actions",void 0),i([a.property()],t.prototype,"alignment",void 0),i([a.aliasOf("viewModel.autoCloseEnabled")],t.prototype,"autoCloseEnabled",void 0),i([a.aliasOf("viewModel.content"),r.renderable()],t.prototype,"content",void 0),i([a.property(),r.renderable()],t.prototype,"collapsed",void 0),i([a.property(),r.renderable()],t.prototype,"collapseEnabled",void 0),i([a.property({readOnly:!0,dependsOn:["dockEnabled","alignment"]}),r.renderable()],t.prototype,"currentAlignment",null),i([a.property({readOnly:!0,dependsOn:["dockEnabled","dockOptions"]}),r.renderable()],t.prototype,"currentDockPosition",null),i([a.property(),r.renderable()],t.prototype,"dockOptions",null),i([a.property(),r.renderable()],t.prototype,"dockEnabled",void 0),i([a.aliasOf("viewModel.featureCount"),r.renderable()],t.prototype,"featureCount",void 0),i([a.property(),r.renderable()],t.prototype,"featureMenuOpen",void 0),i([a.aliasOf("viewModel.features"),r.renderable()],t.prototype,"features",void 0),i([a.property(),r.renderable()],t.prototype,"featureNavigationEnabled",void 0),i([a.aliasOf("viewModel.highlightEnabled")],t.prototype,"highlightEnabled",void 0),i([a.aliasOf("viewModel.location"),r.renderable()],t.prototype,"location",void 0),i([a.property({readOnly:!0}),r.renderable()],t.prototype,"popupRenderers",void 0),i([a.aliasOf("viewModel.promises")],t.prototype,"promises",void 0),i([a.aliasOf("viewModel.selectedFeature"),r.renderable()],t.prototype,"selectedFeature",void 0),i([a.aliasOf("viewModel.selectedFeatureIndex"),r.renderable()],t.prototype,"selectedFeatureIndex",void 0),i([a.property({readOnly:!0}),r.renderable()],t.prototype,"selectedPopupRenderer",void 0),i([a.property()],t.prototype,"spinnerEnabled",void 0),i([a.aliasOf("viewModel.title"),r.renderable()],t.prototype,"title",void 0),i([a.aliasOf("viewModel.updateLocationEnabled")],t.prototype,"updateLocationEnabled",void 0),i([a.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([a.property({type:f}),r.renderable(["viewModel.screenLocation","viewModel.screenLocationEnabled","viewModel.state","viewModel.pendingPromisesCount","viewModel.promiseCount","viewModel.waitingForResult"]),r.vmEvent(["triggerAction","trigger-action"])],t.prototype,"viewModel",void 0),i([a.aliasOf("viewModel.visible"),r.renderable()],t.prototype,"visible",void 0),i([a.aliasOf("viewModel.clear")],t.prototype,"clear",null),i([a.aliasOf("viewModel.next")],t.prototype,"next",null),i([a.aliasOf("viewModel.previous")],t.prototype,"previous",null),i([a.aliasOf("viewModel.triggerAction")],t.prototype,"triggerAction",null),i([r.accessibleHandler()],t.prototype,"_toggleCollapsed",null),i([r.accessibleHandler()],t.prototype,"_close",null),i([r.accessibleHandler()],t.prototype,"_toggleDockEnabled",null),i([r.accessibleHandler()],t.prototype,"_toggleFeatureMenu",null),i([r.accessibleHandler()],t.prototype,"_triggerAction",null),i([r.accessibleHandler()],t.prototype,"_selectFeature",null),i([r.accessibleHandler()],t.prototype,"_next",null),i([r.accessibleHandler()],t.prototype,"_previous",null),t=i([a.subclass(R)],t)}(a.declared(d));return T});