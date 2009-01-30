(function($){
  /* md5.js - MD5 Message-Digest
   * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
   * Version: 2.0.0
   * LastModified: May 13 2002
   *
   * This program is free software.  You can redistribute it and/or modify
   * it without any warranty.  This library calculates the MD5 based on RFC1321.
   * See RFC1321 for more information and algorism.
   */
  var MD5={};(function(){var F=[0,3614090360,3905402710,606105819,3250441966,4118548399,1200080426,2821735955,4249261313,1770035416,2336552879,4294925233,2304563134,1804603682,4254626195,2792965006,1236535329,4129170786,3225465664,643717713,3921069994,3593408605,38016083,3634488961,3889429448,568446438,3275163606,4107603335,1163531501,2850285829,4243563512,1735328473,2368359562,4294588738,2272392833,1839030562,4259657740,2763975236,1272893353,4139469664,3200236656,681279174,3936430074,3572445317,76029189,3654602809,3873151461,530742520,3299628645,4096336452,1126891415,2878612391,4237533241,1700485571,2399980690,4293915773,2240044497,1873313359,4264355552,2734768916,1309151649,4149444226,3174756917,718787259,3951481745];var E=[[0,7,1],[1,12,2],[2,17,3],[3,22,4],[4,7,5],[5,12,6],[6,17,7],[7,22,8],[8,7,9],[9,12,10],[10,17,11],[11,22,12],[12,7,13],[13,12,14],[14,17,15],[15,22,16]];var D=[[1,5,17],[6,9,18],[11,14,19],[0,20,20],[5,5,21],[10,9,22],[15,14,23],[4,20,24],[9,5,25],[14,9,26],[3,14,27],[8,20,28],[13,5,29],[2,9,30],[7,14,31],[12,20,32]];var C=[[5,4,33],[8,11,34],[11,16,35],[14,23,36],[1,4,37],[4,11,38],[7,16,39],[10,23,40],[13,4,41],[0,11,42],[3,16,43],[6,23,44],[9,4,45],[12,11,46],[15,16,47],[2,23,48]];var B=[[0,6,49],[7,10,50],[14,15,51],[5,21,52],[12,6,53],[3,10,54],[10,15,55],[1,21,56],[8,6,57],[15,10,58],[6,15,59],[13,21,60],[4,6,61],[11,10,62],[2,15,63],[9,21,64]];function N(O,Q,P){return(O&Q)|(~O&P)}function M(O,Q,P){return(O&P)|(Q&~P)}function L(O,Q,P){return O^Q^P}function J(O,Q,P){return Q^(O|~P)}var A=[[N,E],[M,D],[L,C],[J,B]];function G(O){return String.fromCharCode(O&255)+String.fromCharCode((O>>>8)&255)+String.fromCharCode((O>>>16)&255)+String.fromCharCode((O>>>24)&255)}function H(O){return O.charCodeAt(0)|(O.charCodeAt(1)<<8)|(O.charCodeAt(2)<<16)|(O.charCodeAt(3)<<24)}function K(O){while(O<0){O+=4294967296}while(O>4294967295){O-=4294967296}return O}function I(W,g,R,Q,O){var V,U,T,S;var P,e,Y;var Z,X;V=Q[0];U=Q[1];T=Q[2];S=Q[3];P=O[0];e=O[1];Y=O[2];X=R(g[U],g[T],g[S]);Z=g[V]+X+W[P]+F[Y];Z=K(Z);Z=((Z<<e)|(Z>>>(32-e)));Z+=g[U];g[V]=K(Z)}MD5.digest=function(V){var Q,a,P,b;var Z,Y,W,X,O;var U,S,R;var T;P=[1732584193,4023233417,2562383102,271733878];Z=V.length;Y=Z&63;W=(Y<56)?(56-Y):(120-Y);if(W>0){V+="\x80";for(U=0;U<W-1;U++){V+="\x00"}}V+=G(Z*8);V+=G(0);Z+=W+8;Q=[0,1,2,3];a=[16];b=[4];for(R=0;R<Z;R+=64){for(U=0,S=R;U<16;U++,S+=4){a[U]=V.charCodeAt(S)|(V.charCodeAt(S+1)<<8)|(V.charCodeAt(S+2)<<16)|(V.charCodeAt(S+3)<<24)}for(U=0;U<4;U++){b[U]=P[U]}for(U=0;U<4;U++){X=A[U][0];O=A[U][1];for(S=0;S<16;S++){I(a,b,X,Q,O[S]);T=Q[0];Q[0]=Q[3];Q[3]=Q[2];Q[2]=Q[1];Q[1]=T}}for(U=0;U<4;U++){P[U]+=b[U];P[U]=K(P[U])}}return G(P[0])+G(P[1])+G(P[2])+G(P[3])};MD5.hexdigest=function(R){var Q,P,S;var O;O=MD5.digest(R);P="";for(Q=0;Q<16;Q++){S=O.charCodeAt(Q);P+="0123456789abcdef".charAt((S>>4)&15);P+="0123456789abcdef".charAt(S&15)}return P}})();

  $.fn.githubBadge = function(options){
    return this.each(function(index){
      var it = this, $this = $(this);
      it.opts = $.extend({}, $.fn.githubBadge.defaults, options);
      $.ajaxSetup({cache:true});

      $.each(it.opts.repos, function(index, repo) {
        $.getJSON('http://github.com/api/v1/json/' + repo.author + '/' + repo.name + '/commit/' +  (repo.branch||'master') + '?callback=?', function(data) {
          var container = $('<div>').attr('class', 'github-commit-container').appendTo($this);
          $('<a/>')
            .attr('class', 'github-repo-name')
            .attr('href', data.commit.url)
            .text(repo.author + '/' + repo.name)
            .wrap('<h3/>')
            .appendTo(container).append('<br/>')
          $('<img/>')
            .attr('class', 'github-committer-icon')
            .attr('src', 'http://www.gravatar.com/avatar/' + MD5.hexdigest(data.commit.committer.email) + '?s=60')
            .css({ 'float': 'left' })
            .appendTo(container);
          $('<a/>')
            .attr('class', 'github-commit-link')
            .attr('href', data.commit.url)
            .text(data.commit.committer.name + ' committed ' + data.commit.id.substring(0, 10))
            .appendTo(container)
            .append('<br/>');
          $('<span/>')
            .attr('class', 'github-commit-message')
            .text('"' + data.commit.message + '"')
            .appendTo(container)
            .append('<br/>');
          $('<span/>')
            .attr('class', 'github-commit-date')
            .text(new Date(data.commit.committed_date.replace(/^(\d+)\-(\d+)\-(\d+)T(\d+:\d+:\d+)([+\-].*)/, function() {
                var r = RegExp;
                return new Date(new Date([r.$1, r.$2, r.$3].join('/') + ' ' + r.$4 + ' ' + r.$5).getTime() +
                  + parseInt(r.$5.replace(/^([\+\-])(\d+):(\d+)$/, function() {
                      var r = RegExp;
                      return r.$1 + (Number(r.$2)*3600 + Number(r.$3)*60);
                    }))).toString()
              })).toString())
            .appendTo(container)
            .append('<br/>');
          $('<br/>').attr('clear', 'all').appendTo(container);
        });
      });
    });
  };
  $.fn.githubBadge.defaults = {
    repos:  [{ author: 'mattn', name: 'jquery-github-badge' }]
  };
})(jQuery);
