/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.5.7
 * Copyright (C) 2014 Oliver Nightingale
 * MIT Licensed
 * @license
 */
!function(){var e=function(t){var i=new e.Index;return i.pipeline.add(e.trimmer,e.stopWordFilter,e.stemmer),t&&t.call(i,i),i};e.version="0.5.7",/*!
   * lunr.utils
   * Copyright (C) 2014 Oliver Nightingale
   */
e.utils={},e.utils.warn=function(e){return function(t){e.console&&console.warn&&console.warn(t)}}(this),/*!
   * lunr.EventEmitter
   * Copyright (C) 2014 Oliver Nightingale
   */
e.EventEmitter=function(){this.events={}},e.EventEmitter.prototype.addListener=function(){var e=Array.prototype.slice.call(arguments),t=e.pop(),i=e;if("function"!=typeof t)throw new TypeError("last argument must be a function");i.forEach(function(e){this.hasHandler(e)||(this.events[e]=[]),this.events[e].push(t)},this)},e.EventEmitter.prototype.removeListener=function(e,t){if(this.hasHandler(e)){var i=this.events[e].indexOf(t);this.events[e].splice(i,1),this.events[e].length||delete this.events[e]}},e.EventEmitter.prototype.emit=function(e){if(this.hasHandler(e)){var t=Array.prototype.slice.call(arguments,1);this.events[e].forEach(function(e){e.apply(void 0,t)})}},e.EventEmitter.prototype.hasHandler=function(e){return e in this.events},/*!
   * lunr.tokenizer
   * Copyright (C) 2014 Oliver Nightingale
   */
e.tokenizer=function(e){if(!arguments.length||null==e||void 0==e)return[];if(Array.isArray(e))return e.map(function(e){return e.toLowerCase()});for(var t=e.toString().replace(/^\s+/,""),i=t.length-1;i>=0;i--)if(/\S/.test(t.charAt(i))){t=t.substring(0,i+1);break}return t.split(/(?:\s+|\-)/).filter(function(e){return!!e}).map(function(e){return e.toLowerCase()})},/*!
   * lunr.Pipeline
   * Copyright (C) 2014 Oliver Nightingale
   */
e.Pipeline=function(){this._stack=[]},e.Pipeline.registeredFunctions={},e.Pipeline.registerFunction=function(t,i){i in this.registeredFunctions&&e.utils.warn("Overwriting existing registered function: "+i),t.label=i,e.Pipeline.registeredFunctions[t.label]=t},e.Pipeline.warnIfFunctionNotRegistered=function(t){var i=t.label&&t.label in this.registeredFunctions;i||e.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",t)},e.Pipeline.load=function(t){var i=new e.Pipeline;return t.forEach(function(t){var n=e.Pipeline.registeredFunctions[t];if(!n)throw new Error("Cannot load un-registered function: "+t);i.add(n)}),i},e.Pipeline.prototype.add=function(){var t=Array.prototype.slice.call(arguments);t.forEach(function(t){e.Pipeline.warnIfFunctionNotRegistered(t),this._stack.push(t)},this)},e.Pipeline.prototype.after=function(t,i){e.Pipeline.warnIfFunctionNotRegistered(i);var n=this._stack.indexOf(t)+1;this._stack.splice(n,0,i)},e.Pipeline.prototype.before=function(t,i){e.Pipeline.warnIfFunctionNotRegistered(i);var n=this._stack.indexOf(t);this._stack.splice(n,0,i)},e.Pipeline.prototype.remove=function(e){var t=this._stack.indexOf(e);this._stack.splice(t,1)},e.Pipeline.prototype.run=function(e){for(var t=[],i=e.length,n=this._stack.length,o=0;i>o;o++){for(var s=e[o],r=0;n>r&&(s=this._stack[r](s,o,e),void 0!==s);r++);void 0!==s&&t.push(s)}return t},e.Pipeline.prototype.reset=function(){this._stack=[]},e.Pipeline.prototype.toJSON=function(){return this._stack.map(function(t){return e.Pipeline.warnIfFunctionNotRegistered(t),t.label})},/*!
   * lunr.Vector
   * Copyright (C) 2014 Oliver Nightingale
   */
e.Vector=function(){this._magnitude=null,this.list=void 0,this.length=0},e.Vector.Node=function(e,t,i){this.idx=e,this.val=t,this.next=i},e.Vector.prototype.insert=function(t,i){var n=this.list;if(!n)return this.list=new e.Vector.Node(t,i,n),this.length++;for(var o=n,s=n.next;void 0!=s;){if(t<s.idx)return o.next=new e.Vector.Node(t,i,s),this.length++;o=s,s=s.next}return o.next=new e.Vector.Node(t,i,s),this.length++},e.Vector.prototype.magnitude=function(){if(this._magniture)return this._magnitude;for(var e,t=this.list,i=0;t;)e=t.val,i+=e*e,t=t.next;return this._magnitude=Math.sqrt(i)},e.Vector.prototype.dot=function(e){for(var t=this.list,i=e.list,n=0;t&&i;)t.idx<i.idx?t=t.next:t.idx>i.idx?i=i.next:(n+=t.val*i.val,t=t.next,i=i.next);return n},e.Vector.prototype.similarity=function(e){return this.dot(e)/(this.magnitude()*e.magnitude())},/*!
   * lunr.SortedSet
   * Copyright (C) 2014 Oliver Nightingale
   */
e.SortedSet=function(){this.length=0,this.elements=[]},e.SortedSet.load=function(e){var t=new this;return t.elements=e,t.length=e.length,t},e.SortedSet.prototype.add=function(){Array.prototype.slice.call(arguments).forEach(function(e){~this.indexOf(e)||this.elements.splice(this.locationFor(e),0,e)},this),this.length=this.elements.length},e.SortedSet.prototype.toArray=function(){return this.elements.slice()},e.SortedSet.prototype.map=function(e,t){return this.elements.map(e,t)},e.SortedSet.prototype.forEach=function(e,t){return this.elements.forEach(e,t)},e.SortedSet.prototype.indexOf=function(e,t,i){var t=t||0,i=i||this.elements.length,n=i-t,o=t+Math.floor(n/2),s=this.elements[o];return 1>=n?s===e?o:-1:e>s?this.indexOf(e,o,i):s>e?this.indexOf(e,t,o):s===e?o:void 0},e.SortedSet.prototype.locationFor=function(e,t,i){var t=t||0,i=i||this.elements.length,n=i-t,o=t+Math.floor(n/2),s=this.elements[o];if(1>=n){if(s>e)return o;if(e>s)return o+1}return e>s?this.locationFor(e,o,i):s>e?this.locationFor(e,t,o):void 0},e.SortedSet.prototype.intersect=function(t){for(var i=new e.SortedSet,n=0,o=0,s=this.length,r=t.length,a=this.elements,l=t.elements;;){if(n>s-1||o>r-1)break;a[n]!==l[o]?a[n]<l[o]?n++:a[n]>l[o]&&o++:(i.add(a[n]),n++,o++)}return i},e.SortedSet.prototype.clone=function(){var t=new e.SortedSet;return t.elements=this.toArray(),t.length=t.elements.length,t},e.SortedSet.prototype.union=function(e){var t,i,n;return this.length>=e.length?(t=this,i=e):(t=e,i=this),n=t.clone(),n.add.apply(n,i.toArray()),n},e.SortedSet.prototype.toJSON=function(){return this.toArray()},/*!
   * lunr.Index
   * Copyright (C) 2014 Oliver Nightingale
   */
e.Index=function(){this._fields=[],this._ref="id",this.pipeline=new e.Pipeline,this.documentStore=new e.Store,this.tokenStore=new e.TokenStore,this.corpusTokens=new e.SortedSet,this.eventEmitter=new e.EventEmitter,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},e.Index.prototype.on=function(){var e=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,e)},e.Index.prototype.off=function(e,t){return this.eventEmitter.removeListener(e,t)},e.Index.load=function(t){t.version!==e.version&&e.utils.warn("version mismatch: current "+e.version+" importing "+t.version);var i=new this;return i._fields=t.fields,i._ref=t.ref,i.documentStore=e.Store.load(t.documentStore),i.tokenStore=e.TokenStore.load(t.tokenStore),i.corpusTokens=e.SortedSet.load(t.corpusTokens),i.pipeline=e.Pipeline.load(t.pipeline),i},e.Index.prototype.field=function(e,t){var t=t||{},i={name:e,boost:t.boost||1};return this._fields.push(i),this},e.Index.prototype.ref=function(e){return this._ref=e,this},e.Index.prototype.add=function(t,i){var n={},o=new e.SortedSet,s=t[this._ref],i=void 0===i?!0:i;this._fields.forEach(function(i){var s=this.pipeline.run(e.tokenizer(t[i.name]));n[i.name]=s,e.SortedSet.prototype.add.apply(o,s)},this),this.documentStore.set(s,o),e.SortedSet.prototype.add.apply(this.corpusTokens,o.toArray());for(var r=0;r<o.length;r++){var a=o.elements[r],l=this._fields.reduce(function(e,t){var i=n[t.name].length;if(!i)return e;var o=n[t.name].filter(function(e){return e===a}).length;return e+o/i*t.boost},0);this.tokenStore.add(a,{ref:s,tf:l})}i&&this.eventEmitter.emit("add",t,this)},e.Index.prototype.remove=function(e,t){var i=e[this._ref],t=void 0===t?!0:t;if(this.documentStore.has(i)){var n=this.documentStore.get(i);this.documentStore.remove(i),n.forEach(function(e){this.tokenStore.remove(e,i)},this),t&&this.eventEmitter.emit("remove",e,this)}},e.Index.prototype.update=function(e,t){var t=void 0===t?!0:t;this.remove(e,!1),this.add(e,!1),t&&this.eventEmitter.emit("update",e,this)},e.Index.prototype.idf=function(e){var t="@"+e;if(Object.prototype.hasOwnProperty.call(this._idfCache,t))return this._idfCache[t];var i=this.tokenStore.count(e),n=1;return i>0&&(n=1+Math.log(this.tokenStore.length/i)),this._idfCache[t]=n},e.Index.prototype.search=function(t){var i=this.pipeline.run(e.tokenizer(t)),n=new e.Vector,o=[],s=this._fields.reduce(function(e,t){return e+t.boost},0),r=i.some(function(e){return this.tokenStore.has(e)},this);if(!r)return[];i.forEach(function(t,i,r){var a=1/r.length*this._fields.length*s,l=this,h=this.tokenStore.expand(t).reduce(function(i,o){var s=l.corpusTokens.indexOf(o),r=l.idf(o),h=1,c=new e.SortedSet;if(o!==t){var u=Math.max(3,o.length-t.length);h=1/Math.log(u)}return s>-1&&n.insert(s,a*r*h),Object.keys(l.tokenStore.get(o)).forEach(function(e){c.add(e)}),i.union(c)},new e.SortedSet);o.push(h)},this);var a=o.reduce(function(e,t){return e.intersect(t)});return a.map(function(e){return{ref:e,score:n.similarity(this.documentVector(e))}},this).sort(function(e,t){return t.score-e.score})},e.Index.prototype.documentVector=function(t){for(var i=this.documentStore.get(t),n=i.length,o=new e.Vector,s=0;n>s;s++){var r=i.elements[s],a=this.tokenStore.get(r)[t].tf,l=this.idf(r);o.insert(this.corpusTokens.indexOf(r),a*l)}return o},e.Index.prototype.toJSON=function(){return{version:e.version,fields:this._fields,ref:this._ref,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},e.Index.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1);t.unshift(this),e.apply(this,t)},/*!
   * lunr.Store
   * Copyright (C) 2014 Oliver Nightingale
   */
e.Store=function(){this.store={},this.length=0},e.Store.load=function(t){var i=new this;return i.length=t.length,i.store=Object.keys(t.store).reduce(function(i,n){return i[n]=e.SortedSet.load(t.store[n]),i},{}),i},e.Store.prototype.set=function(e,t){this.has(e)||this.length++,this.store[e]=t},e.Store.prototype.get=function(e){return this.store[e]},e.Store.prototype.has=function(e){return e in this.store},e.Store.prototype.remove=function(e){this.has(e)&&(delete this.store[e],this.length--)},e.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},/*!
   * lunr.stemmer
   * Copyright (C) 2014 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */
e.stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},t={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},i="[^aeiou]",n="[aeiouy]",o=i+"[^aeiouy]*",s=n+"[aeiou]*",r="^("+o+")?"+s+o,a="^("+o+")?"+s+o+"("+s+")?$",l="^("+o+")?"+s+o+s+o,h="^("+o+")?"+n,c=new RegExp(r),u=new RegExp(l),d=new RegExp(a),f=new RegExp(h),p=/^(.+?)(ss|i)es$/,g=/^(.+?)([^s])s$/,m=/^(.+?)eed$/,v=/^(.+?)(ed|ing)$/,y=/.$/,w=/(at|bl|iz)$/,S=new RegExp("([^aeiouylsz])\\1$"),b=new RegExp("^"+o+n+"[^aeiouwxy]$"),x=/^(.+?[^aeiou])y$/,_=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,C=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,E=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,k=/^(.+?)(s|t)(ion)$/,N=/^(.+?)e$/,O=/ll$/,T=new RegExp("^"+o+n+"[^aeiouwxy]$"),$=function(i){var n,o,s,r,a,l,h;if(i.length<3)return i;if(s=i.substr(0,1),"y"==s&&(i=s.toUpperCase()+i.substr(1)),r=p,a=g,r.test(i)?i=i.replace(r,"$1$2"):a.test(i)&&(i=i.replace(a,"$1$2")),r=m,a=v,r.test(i)){var $=r.exec(i);r=c,r.test($[1])&&(r=y,i=i.replace(r,""))}else if(a.test(i)){var $=a.exec(i);n=$[1],a=f,a.test(n)&&(i=n,a=w,l=S,h=b,a.test(i)?i+="e":l.test(i)?(r=y,i=i.replace(r,"")):h.test(i)&&(i+="e"))}if(r=x,r.test(i)){var $=r.exec(i);n=$[1],i=n+"i"}if(r=_,r.test(i)){var $=r.exec(i);n=$[1],o=$[2],r=c,r.test(n)&&(i=n+e[o])}if(r=C,r.test(i)){var $=r.exec(i);n=$[1],o=$[2],r=c,r.test(n)&&(i=n+t[o])}if(r=E,a=k,r.test(i)){var $=r.exec(i);n=$[1],r=u,r.test(n)&&(i=n)}else if(a.test(i)){var $=a.exec(i);n=$[1]+$[2],a=u,a.test(n)&&(i=n)}if(r=N,r.test(i)){var $=r.exec(i);n=$[1],r=u,a=d,l=T,(r.test(n)||a.test(n)&&!l.test(n))&&(i=n)}return r=O,a=u,r.test(i)&&a.test(i)&&(r=y,i=i.replace(r,"")),"y"==s&&(i=s.toLowerCase()+i.substr(1)),i};return $}(),e.Pipeline.registerFunction(e.stemmer,"stemmer"),/*!
   * lunr.stopWordFilter
   * Copyright (C) 2014 Oliver Nightingale
   */
e.stopWordFilter=function(t){return-1===e.stopWordFilter.stopWords.indexOf(t)?t:void 0},e.stopWordFilter.stopWords=new e.SortedSet,e.stopWordFilter.stopWords.length=119,e.stopWordFilter.stopWords.elements=["","a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"],e.Pipeline.registerFunction(e.stopWordFilter,"stopWordFilter"),/*!
   * lunr.trimmer
   * Copyright (C) 2014 Oliver Nightingale
   */
e.trimmer=function(e){return e.replace(/^\W+/,"").replace(/\W+$/,"")},e.Pipeline.registerFunction(e.trimmer,"trimmer"),/*!
   * lunr.stemmer
   * Copyright (C) 2014 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */
e.TokenStore=function(){this.root={docs:{}},this.length=0},e.TokenStore.load=function(e){var t=new this;return t.root=e.root,t.length=e.length,t},e.TokenStore.prototype.add=function(e,t,i){var i=i||this.root,n=e[0],o=e.slice(1);return n in i||(i[n]={docs:{}}),0===o.length?(i[n].docs[t.ref]=t,void(this.length+=1)):this.add(o,t,i[n])},e.TokenStore.prototype.has=function(e){if(!e)return!1;for(var t=this.root,i=0;i<e.length;i++){if(!t[e[i]])return!1;t=t[e[i]]}return!0},e.TokenStore.prototype.getNode=function(e){if(!e)return{};for(var t=this.root,i=0;i<e.length;i++){if(!t[e[i]])return{};t=t[e[i]]}return t},e.TokenStore.prototype.get=function(e,t){return this.getNode(e,t).docs||{}},e.TokenStore.prototype.count=function(e,t){return Object.keys(this.get(e,t)).length},e.TokenStore.prototype.remove=function(e,t){if(e){for(var i=this.root,n=0;n<e.length;n++){if(!(e[n]in i))return;i=i[e[n]]}delete i.docs[t]}},e.TokenStore.prototype.expand=function(e,t){var i=this.getNode(e),n=i.docs||{},t=t||[];return Object.keys(n).length&&t.push(e),Object.keys(i).forEach(function(i){"docs"!==i&&t.concat(this.expand(e+i,t))},this),t},e.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}},function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.lunr=t()}(this,function(){return e})}();