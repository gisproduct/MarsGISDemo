/* 2018-9-7 16:14:50 | 版权所有 火星科技 http://marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
var thisWidget;function initWidgetView(t){thisWidget=t,$("#btn_plot_delall").click(function(){thisWidget.deleteAll(),plotEdit.stopEditing()});var e=!0;$("#btn_plot_isedit").click(function(){(e=!e)?($(this).removeClass("active"),$(this).children().removeClass("fa-lock").addClass("fa-unlock")):($(this).addClass("active"),$(this).children().removeClass("fa-unlock").addClass("fa-lock")),thisWidget.hasEdit(e)}),plotFile.initEvent(),plotEdit.loadConfig()}var plotFile={initEvent:function(){var i,n=this;$("#btn_plot_openfile").click(function(){i=!0,$("#input_plot_file").click()}),$("#btn_plot_openfile2").click(function(){i=!1,$("#input_plot_file").click()}),$("#btn_plot_savefile").click(function(){var t=thisWidget.getGeoJson();null==t||""==t?toastr.warning("当前未标绘任何数据！"):haoutil.file.downloadFile("标绘.json",t)}),$("#input_plot_file").change(function(t){var e=this.files[0],a=e.name;if("json"!=a.substring(a.lastIndexOf(".")+1,a.length).toLowerCase())return toastr.error("文件类型不合法,请选择json格式标注文件！"),void n.clearPlotFile();if(window.FileReader){var l=new FileReader;l.readAsText(e,"UTF-8"),l.onloadend=function(t){var e=this.result;thisWidget.jsonToLayer(e,i,!0),n.clearPlotFile()}}})},clearPlotFile:function(){window.addEventListener?document.getElementById("input_plot_file").value="":document.getElementById("input_plot_file").outerHTML+=""}},plotlist={bindSelList:function(){var i=this,n=$("#sel_plot_list");$.getJSON("config/plotlist.json",function(a){var t,e="";for(var l in a)e+='<option value="'+l+'">'+l+"("+a[l].length+")</option>",null==t&&(t=l);t&&(i.showPlotList(a[t]),n.attr("data-value",t)),n.html(e),n.select(),n.change(function(){var t=$(this).attr("data-value"),e=a[t];i.showPlotList(e)})})},_listData:null,showPlotList:function(t){this._listData=t;for(var e="",a=0;a<t.length;a++){var l,i=t[a];if(plotEdit.defval[i.type])l=(s=plotEdit.defval[i.type]).style.iconUrl;if(i.iconUrl&&(l=i.iconUrl),i.style&&i.style.iconUrl&&(l=i.style.iconUrl),l)e+=' <li onclick="plotlist.startPlot('+a+',this)"> <i title="'+i.name+'"  > <img src="../../'+l+'" style="max-width: 50px;max-height: 50px;" /></i></li>';else{var n,s,r="#000000";if(plotEdit.defval[i.type])n=(s=plotEdit.defval[i.type]).style.iconClass,r=s.style.color;i.iconClass&&(n=i.iconClass),i.style&&i.style.iconClass&&(n=i.style.iconClass),i.color&&(r=i.color),i.style&&i.style.color&&(r=i.style.color),n&&(e+='<li onclick="plotlist.startPlot('+a+',this)"><i title="'+i.name+'"  class="'+n+'" style="color:'+r+'"></i></li>')}}$("#plotlist").html(e)},_lastLi:null,startPlot:function(t,e){var a=$(e);a.addClass("markon"),this._lastLi&&this._lastLi.removeClass("markon"),this._lastLi=a;var l=this._listData[t],i=haoutil.system.clone(plotEdit.defval[l.type]||{});if(l.style)for(var n in l.style)i.style[n]=l.style[n];if(l.attr)for(var n in l.attr)i.attr[n]=l.attr[n];i.name=i.name||l.name,thisWidget.startDraw(i)},plotEnd:function(){this._lastLi&&this._lastLi.removeClass("markon")}},plotEdit={config:{},defval:{},loadConfig:function(){var s=this;$.getJSON("config/attr.json",function(t){for(var e in s.config=t){for(var a={},l=0;l<t[e].style.length;l++){a[(n=t[e].style[l]).name]=n.defval}var i={};for(l=0;l<t[e].attr.length;l++){var n;i[(n=t[e].attr[l]).name]=n.defval}s.defval[e]={type:e,name:t[e].name,style:a,attr:i}}plotlist.bindSelList()})},_last_attr:null,startEditing:function(t,e){this._last_attr=t;var a=this.config[t.type];this.updateLatlngsHtml(e);for(var l=[],i="plot_attr_style_",n='<tr><td class="nametd">类型：</td><td>'+(a.name||t.name)+"</td></tr>",s=0;s<a.style.length;s++){if("hidden"!=(d=a.style[s]).type){var r=d.name,o=t.style[r];(c=this.getAttrInput(i,r,o,d)).fun&&l.push({parname:i,name:r,value:o,edit:d,fun:c.fun}),n+='<tr  id="'+i+"tr_"+r+'" > <td class="nametd">'+d.label+"</td>  <td>"+c.html+"</td>  </tr>"}}$("#talbe_style").html(n),i="plot_attr_attr_",n="";for(s=0;s<a.attr.length;s++){var d;if("hidden"!=(d=a.attr[s]).type){var c;r=d.name,o=t.attr[r];(c=this.getAttrInput(i,r,o,d)).fun&&l.push({parname:i,name:r,value:o,edit:d,fun:c.fun}),n+='<tr  id="'+i+"tr_"+r+'" > <td class="nametd">'+d.label+"</td>  <td>"+c.html+"</td>  </tr>"}}$("#talbe_attr").html(n);for(s=0;s<l.length;s++){var p=l[s];p.fun(p.parname,p.name,p.value,p.edit)}tab2attr()},updateLatlngsHtml:function(t){var e="";if(t&&0!=t.length)if(1==t.length){e+=' <div class="mp_attr" style=" margin-top: 10px;"><table> <tr> <td class="nametd">经度：</td> <td><input id="plot_attr_jd_'+a+'" type="number" class="mp_input" readonly="readonly" value="'+(l=t[0]).lng.toFixed(6)+'"></td>  </tr> <tr>  <td class="nametd">纬度：</td> <td><input id="plot_attr_wd_'+a+'" type="number" class="mp_input" readonly="readonly" value="'+l.lat.toFixed(6)+'"></td> </tr>  </table> </div>'}else for(var a=0;a<t.length;a++){var l;e+='<div><div class="open"><i class="tree_icon">-</i>第'+(a+1)+'点</div><div class="mp_attr"><table> <tr> <td class="nametd">经度：</td> <td><input id="plot_attr_jd_'+a+'" type="number" class="mp_input" readonly="readonly" value="'+(l=t[a]).lng.toFixed(6)+'"></td>  </tr> <tr>  <td class="nametd">纬度：</td> <td><input id="plot_attr_wd_'+a+'" type="number" class="mp_input" readonly="readonly" value="'+l.lat.toFixed(6)+'"></td> </tr>  </table> </div> </div>'}else;$("#view_latlngs").html(e),$("#view_latlngs .open").click(changeOpenShowHide)},stopEditing:function(){tab2plot(),$("#talbe_style").html(""),$("#talbe_attr").html(""),this._last_attr=null},getAttrInput:function(t,e,a,l){a=a||"";var n=this,i="",s=null;switch(l.type){default:case"label":i=a;break;case"text":i='<input id="'+t+e+'" type="text" value="'+a+'"   class="mp_input" />',s=function(a,l,t,e){$("#"+a+l).on("input propertychange",function(t){var e=$(this).val();n.updateAttr(a,l,e)})};break;case"textarea":i='<textarea  id="'+t+e+'"     class="mp_input" style="height:50px;resize: none;" >'+(a=a.replace(new RegExp("<br />","gm"),"\n"))+"</textarea>",s=function(a,l,t,e){$("#"+a+l).on("input propertychange",function(t){var e=$(this).val();0==e.length&&(e="文字"),e=e.replace(/\n/g,"<br />"),n.updateAttr(a,l,e)})};break;case"number":i='<input id="'+t+e+'" type="number" value="'+a+'"    class="mp_input"/>',s=function(a,l,t,e){$("#"+a+l).on("input propertychange",function(t){var e=Number($(this).val());n.updateAttr(a,l,e)})};break;case"combobox":i='<select id="'+t+e+'" class="mp_select"    data-value="'+a+'" >';for(var r=0;r<l.data.length;r++){var o=l.data[r];i+='<option value="'+o.value+'">'+o.text+"</option>"}i+="</select>",s=function(e,a,t,l){$("#"+e+a).select(),$("#"+e+a).change(function(){var t=$(this).attr("data-value");n.updateAttr(e,a,t)})};break;case"radio":i='<input   name="'+t+e+'" type="radio" value="1"  '+(a?'checked="checked"':"")+' style="width:15px;" >是  &nbsp;&nbsp; <input  name="'+t+e+'" type="radio" value="2"  '+(a?"":'checked="checked"')+' style="width:15px;" >否',s=function(e,a,t,l){$('input:radio[name="'+e+a+'"]').change(function(){var t="1"==$(this).val();n.updateAttr(e,a,t),n.changeViewByAttr(e,l.impact,t)}),n.changeViewByAttr(e,l.impact,t)};break;case"color":i='<input id="'+t+e+'" type="text" class="mp_input" style="width: 100%;"  value="'+a+'" />',s=function(a,l,t,e){$("#"+a+l).minicolors({position:"bottom right",control:"saturation",change:function(t,e){n.updateAttr(a,l,t)}})};break;case"slider":i='<input id="'+t+e+'"  type="text" value="'+100*a+'" />',s=function(e,a,t,l){var i=.7*$(".mp_tab_card").width()-30;$("#"+e+a).progress(i),$("#"+e+a).change(function(){var t=Number($(this).val())/100;n.updateAttr(e,a,t)})}}return{html:i,fun:s}},changeViewByAttr:function(t,e,a){if(e&&0<e.length)for(var l=0;l<e.length;l++){var i=e[l];a?$("#"+t+"tr_"+i).show():$("#"+t+"tr_"+i).hide()}},updateAttr:function(t,e,a){switch(t){case"plot_attr_style_":this._last_attr.style[e]=a;break;case"plot_attr_attr_":this._last_attr.attr[e]=a}thisWidget.updateAttr2map(this._last_attr)}};