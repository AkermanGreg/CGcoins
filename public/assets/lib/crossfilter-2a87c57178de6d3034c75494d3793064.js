!function(r){function n(r){return r}function t(r,n){for(var t=0,u=n.length,e=new Array(u);u>t;++t)e[t]=r[n[t]];return e}function u(r){function n(n,t,u,e){for(;e>u;){var f=u+e>>1;r(n[f])<t?u=f+1:e=f}return u}function t(n,t,u,e){for(;e>u;){var f=u+e>>1;t<r(n[f])?e=f:u=f+1}return u}return t.right=t,t.left=n,t}function e(r){function n(r,n,t){for(var e=t-n,f=(e>>>1)+1;--f>0;)u(r,f,e,n);return r}function t(r,n,t){for(var e,f=t-n;--f>0;)e=r[n],r[n]=r[n+f],r[n+f]=e,u(r,1,f,n);return r}function u(n,t,u,e){for(var f,o=n[--e+t],i=r(o);(f=t<<1)<=u&&(u>f&&r(n[e+f])>r(n[e+f+1])&&f++,!(i<=r(n[e+f])));)n[e+t]=n[e+f],t=f;n[e+t]=o}return n.sort=t,n}function f(r){function n(n,u,e,f){var o,i,a,c,l=new Array(f=Math.min(e-u,f));for(i=0;f>i;++i)l[i]=n[u++];if(t(l,0,f),e>u){o=r(l[0]);do(a=r(c=n[u])>o)&&(l[0]=c,o=r(t(l,0,f)[0]));while(++u<e)}return l}var t=e(r);return n}function o(r){function n(n,t,u){for(var e=t+1;u>e;++e){for(var f=e,o=n[e],i=r(o);f>t&&r(n[f-1])>i;--f)n[f]=n[f-1];n[f]=o}return n}return n}function i(r){function n(r,n,e){return(z>e-n?u:t)(r,n,e)}function t(t,u,e){var f,o=(e-u)/6|0,i=u+o,a=e-1-o,c=u+e-1>>1,l=c-o,v=c+o,h=t[i],s=r(h),d=t[l],g=r(d),p=t[c],y=r(p),b=t[v],w=r(b),A=t[a],m=r(A);s>g&&(f=h,h=d,d=f,f=s,s=g,g=f),w>m&&(f=b,b=A,A=f,f=w,w=m,m=f),s>y&&(f=h,h=p,p=f,f=s,s=y,y=f),g>y&&(f=d,d=p,p=f,f=g,g=y,y=f),s>w&&(f=h,h=b,b=f,f=s,s=w,w=f),y>w&&(f=p,p=b,b=f,f=y,y=w,w=f),g>m&&(f=d,d=A,A=f,f=g,g=m,m=f),g>y&&(f=d,d=p,p=f,f=g,g=y,y=f),w>m&&(f=b,b=A,A=f,f=w,w=m,m=f);var k=d,E=g,M=b,x=w;t[i]=h,t[l]=t[u],t[c]=p,t[v]=t[e-1],t[a]=A;var U=u+1,z=e-2,N=x>=E&&E>=x;if(N)for(var C=U;z>=C;++C){var S=t[C],q=r(S);if(E>q)C!==U&&(t[C]=t[U],t[U]=S),++U;else if(q>E)for(;;){var O=r(t[z]);{if(!(O>E)){if(E>O){t[C]=t[U],t[U++]=t[z],t[z--]=S;break}t[C]=t[z],t[z--]=S;break}z--}}}else for(var C=U;z>=C;C++){var S=t[C],q=r(S);if(E>q)C!==U&&(t[C]=t[U],t[U]=S),++U;else if(q>x)for(;;){var O=r(t[z]);{if(!(O>x)){E>O?(t[C]=t[U],t[U++]=t[z],t[z--]=S):(t[C]=t[z],t[z--]=S);break}if(z--,C>z)break}}}if(t[u]=t[U-1],t[U-1]=k,t[e-1]=t[z+1],t[z+1]=M,n(t,u,U-1),n(t,z+2,e),N)return t;if(i>U&&z>a){for(var R,O;(R=r(t[U]))<=E&&R>=E;)++U;for(;(O=r(t[z]))<=x&&O>=x;)--z;for(var C=U;z>=C;C++){var S=t[C],q=r(S);if(E>=q&&q>=E)C!==U&&(t[C]=t[U],t[U]=S),U++;else if(x>=q&&q>=x)for(;;){var O=r(t[z]);{if(!(x>=O&&O>=x)){E>O?(t[C]=t[U],t[U++]=t[z],t[z--]=S):(t[C]=t[z],t[z--]=S);break}if(z--,C>z)break}}}}return n(t,U,z+1)}var u=o(r);return n}function a(r){return new Array(r)}function c(r,n){return function(t){var u=t.length;return[r.left(t,n,0,u),r.right(t,n,0,u)]}}function l(r,n){var t=n[0],u=n[1];return function(n){var e=n.length;return[r.left(n,t,0,e),r.left(n,u,0,e)]}}function v(r){return[0,r.length]}function h(){return null}function s(){return 0}function d(r){return r+1}function g(r){return r-1}function p(r){return function(n,t){return n+ +r(t)}}function y(r){return function(n,t){return n-r(t)}}function b(){function r(r){var n=M,t=r.length;return t&&(E=E.concat(r),z=q(z,M+=t),S.forEach(function(u){u(r,n,t)})),b}function u(r){function u(n,u,e){I=n.map(r),J=Q(A(e),0,e),I=t(I,J);var f,o=T(I),i=o[0],a=o[1];for(f=0;i>f;++f)z[J[f]+u]|=L;for(f=a;e>f;++f)z[J[f]+u]|=L;if(!u)return G=I,H=J,W=i,void(X=a);var c=G,l=H,v=0,h=0;for(G=new Array(M),H=w(M,M),f=0;u>v&&e>h;++f)c[v]<I[h]?(G[f]=c[v],H[f]=l[v++]):(G[f]=I[h],H[f]=J[h++]+u);for(;u>v;++v,++f)G[f]=c[v],H[f]=l[v];for(;e>h;++h,++f)G[f]=I[h],H[f]=J[h]+u;o=T(G),W=o[0],X=o[1]}function o(r,n,t){V.forEach(function(r){r(I,J,n,t)}),I=J=null}function a(r){var n,t,u,e=r[0],f=r[1],o=[],i=[];if(W>e)for(n=e,t=Math.min(W,f);t>n;++n)z[u=H[n]]^=L,o.push(u);else if(e>W)for(n=W,t=Math.min(e,X);t>n;++n)z[u=H[n]]^=L,i.push(u);if(f>X)for(n=Math.max(e,X),t=f;t>n;++n)z[u=H[n]]^=L,o.push(u);else if(X>f)for(n=Math.max(W,f),t=X;t>n;++n)z[u=H[n]]^=L,i.push(u);return W=e,X=f,C.forEach(function(r){r(L,o,i)}),K}function b(r){return null==r?j():Array.isArray(r)?R(r):N(r)}function N(r){return a((T=c(k,r))(G))}function R(r){return a((T=l(k,r))(G))}function j(){return a((T=v)(G))}function B(r){for(var n,t=[],u=X;--u>=W&&r>0;)z[n=H[u]]||(t.push(E[n]),--r);return t}function D(r){function t(n,t,e,f){function c(){++Q===K&&(b=O(b,J<<=1),S=O(S,J),K=m(J))}var l,v,s,d,g,p,y=N,b=w(Q,K),A=B,k=F,x=Q,U=0,R=0;for(X&&(A=k=h),N=new Array(Q),Q=0,S=x>1?q(S,M):w(M,K),x&&(s=(v=y[0]).key);f>R&&!((d=r(n[R]))>=d);)++R;for(;f>R;){for(v&&d>=s?(g=v,p=s,b[U]=Q,(v=y[++U])&&(s=v.key)):(g={key:d,value:k()},p=d),N[Q]=g;!(d>p||(S[l=t[R]+e]=Q,z[l]&P||(g.value=A(g.value,E[l])),++R>=f));)d=r(n[R]);c()}for(;x>U;)N[b[U]=Q]=y[U++],c();if(Q>U)for(U=0;e>U;++U)S[U]=b[S[U]];l=C.indexOf(T),Q>1?(T=u,W=i):(1===Q?(T=o,W=a):(T=h,W=h),S=null),C[l]=T}function u(r,n,t){if(r!==L&&!X){var u,e,f,o;for(u=0,f=n.length;f>u;++u)z[e=n[u]]&P||(o=N[S[e]],o.value=B(o.value,E[e]));for(u=0,f=t.length;f>u;++u)(z[e=t[u]]&P)===r&&(o=N[S[e]],o.value=D(o.value,E[e]))}}function o(r,n,t){if(r!==L&&!X){var u,e,f,o=N[0];for(u=0,f=n.length;f>u;++u)z[e=n[u]]&P||(o.value=B(o.value,E[e]));for(u=0,f=t.length;f>u;++u)(z[e=t[u]]&P)===r&&(o.value=D(o.value,E[e]))}}function i(){var r,n;for(r=0;Q>r;++r)N[r].value=F();for(r=0;M>r;++r)z[r]&P||(n=N[S[r]],n.value=B(n.value,E[r]))}function a(){var r,n=N[0];for(n.value=F(),r=0;M>r;++r)z[r]&P||(n.value=B(n.value,E[r]))}function c(){return X&&(W(),X=!1),N}function l(r){var n=R(c(),0,N.length,r);return j.sort(n,0,n.length)}function v(r,n,t){return B=r,D=n,F=t,X=!0,I}function b(){return v(d,g,s)}function A(r){return v(p(r),y(r),s)}function k(r){function n(n){return r(n.value)}return R=f(n),j=e(n),I}function x(){return k(n)}function U(){return Q}var N,S,R,j,B,D,F,I={top:l,all:c,reduce:v,reduceCount:b,reduceSum:A,order:k,orderNatural:x,size:U},J=8,K=m(J),Q=0,T=h,W=h,X=!0;return arguments.length<1&&(r=n),C.push(T),V.push(t),t(G,H,0,M),b().orderNatural()}function F(){var r=D(h),n=r.all;return delete r.all,delete r.top,delete r.order,delete r.orderNatural,delete r.size,r.value=function(){return n()[0].value},r}var G,H,I,J,K={filter:b,filterExact:N,filterRange:R,filterAll:j,top:B,group:D,groupAll:F},L=1<<x++,P=~L,Q=i(function(r){return I[r]}),T=v,V=[],W=0,X=0;return S.unshift(u),S.push(o),x>U&&(z=O(z,U<<=1)),u(E,0,M),o(E,0,M),K}function o(){function r(r,n){var t;if(!h)for(t=n;M>t;++t)z[t]||(i=a(i,E[t]))}function n(r,n,t){var u,e,f;if(!h){for(u=0,f=n.length;f>u;++u)z[e=n[u]]||(i=a(i,E[e]));for(u=0,f=t.length;f>u;++u)z[e=t[u]]===r&&(i=c(i,E[e]))}}function t(){var r;for(i=l(),r=0;M>r;++r)z[r]||(i=a(i,E[r]))}function u(r,n,t){return a=r,c=n,l=t,h=!0,v}function e(){return u(d,g,s)}function f(r){return u(p(r),y(r),s)}function o(){return h&&(t(),h=!1),i}var i,a,c,l,v={reduce:u,reduceCount:e,reduceSum:f,value:o},h=!0;return C.push(n),S.push(r),r(E,0,M),e()}function a(){return M}var b={add:r,dimension:u,groupAll:o,size:a},E=[],M=0,x=0,U=8,z=N(0),C=[],S=[];return arguments.length?r(arguments[0]):b}function w(r,n){return(257>n?N:65537>n?C:S)(r)}function A(r){for(var n=w(r,r),t=-1;++t<r;)n[t]=t;return n}function m(r){return 8===r?256:16===r?65536:4294967296}b.version="1.0.3",b.permute=t;var k=b.bisect=u(n);k.by=u;var E=b.heap=e(n);E.by=e;var M=b.heapselect=f(n);M.by=f;var x=b.insertionsort=o(n);x.by=o;var U=b.quicksort=i(n);U.by=i;var z=32,N=a,C=a,S=a,q=n,O=n;"undefined"!=typeof Uint8Array&&(N=function(r){return new Uint8Array(r)},C=function(r){return new Uint16Array(r)},S=function(r){return new Uint32Array(r)},q=function(r,n){var t=new r.constructor(n);return t.set(r),t},O=function(r,n){var t;switch(n){case 16:t=C(r.length);break;case 32:t=S(r.length);break;default:throw new Error("invalid array width!")}return t.set(r),t}),r.crossfilter=b}(this);