!function(e){e.fn._vs.token={colorRange:function(){},init:function(e){this.colorRange=e.settings.chart.colorRange},ID:function(e){return e.settings.data.tokenPast+=1,e.settings.data.tokenPast},selectAll:function(e,t,n){var o=[],i=!1;o.flocculate=function(){var e=[];return o.forEach(function(t){q=t.flocculate(),e.push(q)}),e},o.attr=function(e,t,n){var i=[];return o.forEach(function(o){q=o.attr(e,t,n),i.push(q)}),i},o.b2dObj=function(){var e=[];return o.forEach(function(t){q=t.myobj,e.push(q)}),e},"undefined"==typeof n&&"undefined"==typeof t&&(i=!0);for(var a=e.tokens.length-1;a>=0;a--)(e.tokens[a].attr(t)==n||1==i)&&o.push(e.tokens[a]);return o},select:function(e,t,n){if(result=[],"undefined"==typeof n&&"undefined"==typeof t)return e.tokens;for(var o=e.tokens.length-1;o>=0;o--)if(e.tokens[o].attr(t)==n){result.push(e.tokens[o]);break}return"undefined"==typeof result[0]?!1:result[0]},addToken:function(e,t){var n={x:50,y:50,t:null,category:1,state:0,size:10,fillStyle:"###",strokeStyle:"rgba(0,0,0,0)",lineWidth:0,texture:void 0,shape:{type:"round"},userdata:{},callback:{},phy:{density:10,friction:0,restitution:0},targets:[],elbow:{}},o={};if(o.toString=function(){return"Token ID="+this.setting.ID},"undefined"==typeof t?(o.setting=n,o.setting.ID=this.ID(e)):(o.setting=t,"undefined"==typeof o.setting.phy&&(o.setting.phy=n.phy),"undefined"==typeof o.setting.t&&(o.setting.t=e.settings.stream.now),"undefined"==typeof o.setting.x&&(o.setting.x=e.settings.sedimentation.incoming.point[t.category].x+2*Math.random()),"undefined"==typeof o.setting.y&&(o.setting.y=e.settings.sedimentation.incoming.point[t.category].y+2*Math.random()),"undefined"==typeof o.setting.size&&(o.setting.size=e.settings.sedimentation.token.size.original),"undefined"==typeof o.setting.targets&&(o.setting.targets=[]),o.setting.ID=o.setting.ID=this.ID(e),"undefined"==typeof o.setting.state&&(o.setting.state=0),"undefined"==typeof o.setting.shape&&(o.setting.shape=n.shape)),o.myobj=this.create(e,o.setting),o.flocculate=function(){return e.tokens.indexOf(this),e.flocculate.destroyIt(e,this),this},o.attr=function(e,t,n){return"undefined"==typeof t?"undefined"!=typeof this[e]?this[e]():this.myobj.m_userData[e]:("undefined"!=typeof this[e]?this[e](t,n):this.myobj.m_userData[e]=t,this)},o.callback=function(e,t){return arguments.length?"function"==typeof this.myobj.m_userData.callback[e]?this.myobj.m_userData.callback[e](t):function(){console.log("callback undefined")}:this.myobj.m_userData.callback},o.size=function(e){if(null!=this.myobj&&this.attr("state")<2){if(!arguments.length)return this.myobj.m_shape.m_radius*this.myobj.m_userData.scale;this.myobj.m_shape.m_radius=e/this.myobj.m_userData.scale}},o.b2dObj=function(){return null!=this.myobj&&this.attr("state")<2?this.myobj:void 0},o.texture=function(e){if(!arguments.length)return this.myobj.m_userData.texture.img.src;console.log("texture",e);var t={};t.img=new Image,t.img.onload=function(){t.pattern=document.createElement("canvas").getContext("2d").createPattern(t.img,"repeat")},t.img.src=e,this.myobj.m_userData.texture=t},e.tokens.push(o),e.decay.tokens.push(o),"undefined"!=typeof this.myobj.m_userData.callback&&"function"==typeof this.myobj.m_userData.callback.suspension){var i=e.select("ID",o.setting.ID);this.myobj.m_userData.callback.suspension(i)}return o},create:function(e,t){t.scale=scale=e.settings.options.scale;var n=t.x/scale+.1*Math.random(),o=t.y/scale+.1*Math.random(),i=new Box2D.Dynamics.b2FixtureDef;i.density=.1,i.friction=0,i.restitution=0,"round"==t.shape.type?i.shape=new Box2D.Collision.Shapes.b2CircleShape(t.size/scale):"polygons"==t.shape.type?i=this.setPolygons(e,t,i):"box"==t.shape.type&&(i.shape=new Box2D.Collision.Shapes.b2PolygonShape,i.shape.SetAsBox(t.shape.width/scale,t.shape.height/scale));var a=new Box2D.Dynamics.b2BodyDef;if(a.type=Box2D.Dynamics.b2Body.b2_dynamicBody,a.position.x=t.x/scale,a.position.y=t.y/scale,this.myobj=e.world.CreateBody(a).CreateFixture(i),"undefined"!=typeof t.texture){var s=t.texture;s.img=new Image,s.img.onload=function(){s.pattern=document.createElement("canvas").getContext("2d").createPattern(s.img,"repeat")},s.img.src=s.src}if("undefined"!=typeof t.impulse&&this.applyImpulse(this.myobj,t.impulse.angle,t.impulse.power),"undefined"==typeof t.fillStyle&&(t.fillStyle=this.colorRange(t.category)),"undefined"==typeof t.lineWidth&&(t.lineWidth=0),"undefined"==typeof t.type&&(t.type="token"),"undefined"==typeof t.callback&&(t.callback={}),this.myobj.m_userData=t,this.myobj.attr=this.attr,this.myobj.m_userData.mouse={},this.myobj.m_userData.mouse.over=!1,this.myobj.m_userData.mouse.down=!1,this.myobj.m_userData.mouse.dragging=!1,this.myobj.m_userData.mouse.statebefore=!1,this.myobj.m_userData.state=1,0==t.targets.length&&"CircleLayout"==e.settings.chart.type&&(t.targets[0]={x:e.settings.sedimentation.incoming.target[t.category].x,y:e.settings.sedimentation.incoming.target[t.category].y}),t.targets.length>0){var r=new e.phy.b2MouseJointDef;r.bodyA=e.world.GetGroundBody(),r.bodyB=this.myobj.GetBody(),r.target.Set(n,o),r.collideConnected=!0,r.maxForce=50*this.myobj.GetBody().GetMass(),mouseJoint=e.world.CreateJoint(r),mouseJoint.SetTarget(new e.phy.b2Vec2(t.targets[0].x/scale,t.targets[0].y/scale))}return this.myobj},applyImpulse:function(e,t,n){var o=e.GetBody();o.ApplyImpulse(new Box2D.Common.Math.b2Vec2(Math.cos(t*(Math.PI/180))*n,Math.sin(t*(Math.PI/180))*n),o.GetWorldCenter())},setPolygons:function(e,t,n){n.shape=new Box2D.Collision.Shapes.b2PolygonShape,null==t.shape.points&&(t.shape.points=[{x:-1,y:-1},{x:1,y:-1},{x:-1,y:-1},{x:1,y:-1}]);for(var o=0;o<t.shape.points.length;o++){var i=new Box2D.Common.Math.b2Vec2;i.Set(t.shape.points[o].x/scale,t.shape.points[o].y/scale),t.shape.points[o]=i}return n.shape.SetAsArray(t.shape.points,t.shape.points.length),n},createDataBarBall:function(e,t,n,o,i){var a=new Box2D.Dynamics.b2FixtureDef;a.density=10,a.friction=.5,a.restitution=.2,a.shape=new Box2D.Collision.Shapes.b2CircleShape(o/e.settings.options.scale);var s=new Box2D.Dynamics.b2BodyDef;s.type=Box2D.Dynamics.b2Body.b2_dynamicBody,s.position.x=t/e.settings.options.scale,s.position.y=n/e.settings.options.scale;var r=e.world.CreateBody(s).CreateFixture(a);return r.m_userData={type:"BarChartBall",familyID:"family",fillColor:this.colorRange(i)},r},createBox:function(e,t,n,o,i,a,s,r){"undefined"==typeof r&&(r=!0);var l=new b2FixtureDef;r||(l.density=100),l.friction=.6,l.restitution=.3;var y=new b2BodyDef;y.type=b2Body.b2_staticBody,y.angle=a,l.shape=new b2PolygonShape,l.shape.SetAsBox(o/scale,i/scale),y.position.Set(t/scale,n/scale);var c=e.CreateBody(y).CreateFixture(l);return c.m_userData={type:"Wall",fillColor:s},console.log(c.m_userData),c},createBoxPie:function(e,t,n,o,i,a,s,r){var l=new b2BodyDef;l.type=Box2D.Dynamics.b2Body.b2_dynamicBody;var y=new Box2D.Dynamics.b2FixtureDef;y.shape=new b2PolygonShape,y.shape.SetAsBox(i/scale,a/scale),y.density=1e6,y.friction=.5,y.restitution=.2,l.position.Set(n/scale,o/scale),l.angle=0;var c=e.CreateBody(l).CreateFixture(y);return c.m_userData={type:"Wall",fillColor:r},c},createBox0D:function(e,t,n,o,i,a){"undefined"==typeof a&&(a=!0);var s=new b2BoxDef;s.restitution=-.6,s.friction=.3,a||(s.density=.01),s.extents.Set(o,i);var r=new b2BodyDef;return r.AddShape(s),r.position.Set(t,n),e.CreateBody(r)},createHiddenBox:function(e,t,n,o,i,a){"undefined"==typeof a&&(a=!0);var s=new b2BoxDef;s.restitution=.6,s.friction=.3,a||(s.density=1),s.extents.Set(o,i);var r=new b2BodyDef;r.AddShape(s),r.position.Set(t,n);var l=e.CreateBody(r);return l.m_shapeList.visibility="hidden",console.log(l),l},createBigBall:function(e,t,n){var o=new Box2D.Dynamics.b2FixtureDef;o.density=1e6,o.friction=.5,o.restitution=.2,o.shape=new Box2D.Collision.Shapes.b2CircleShape(20/30);var i=new Box2D.Dynamics.b2BodyDef;i.type=Box2D.Dynamics.b2Body.b2_dynamicBody,i.position.x=t,i.position.y=n;var a=e.CreateBody(i).CreateFixture(o);return a},createPieBox:function(t,n,o,i,a,s,r,l){l=e.extend(!0,{density:1e7,friction:1,restitution:.2,linearDamping:0,angularDamping:0,gravityScale:0,type:b2Body.b2_dynamicBody},l);var y=new b2BodyDef,c=new b2FixtureDef;c.density=l.density,c.friction=l.friction,c.restitution=l.restitution,c.shape=new b2PolygonShape,c.shape.SetAsBox(i/scale,a/scale),y.position.Set(n/scale,o/scale),y.linearDamping=l.linearDamping,y.angularDamping=l.angularDamping,y.angle=s,y.type=l.type;var u=t.CreateBody(y),d=u.CreateFixture(c);return d.m_userData={type:"box",familyID:null,fillColor:r},u},createDataBallTarget:function(e,t,n,o,i,a,s){var r=o/scale+.1*Math.random(),l=i/scale+.1*Math.random(),y=new Box2D.Dynamics.b2FixtureDef;y.density=.1,y.friction=0,y.restitution=0,y.shape=new Box2D.Collision.Shapes.b2CircleShape(a/scale);var c=new Box2D.Dynamics.b2BodyDef;c.type=Box2D.Dynamics.b2Body.b2_dynamicBody,c.position.x=r,c.position.y=l;var u=e.CreateBody(c).CreateFixture(y),d=new b2MouseJointDef;return d.bodyA=e.GetGroundBody(),d.bodyB=u.GetBody(),d.target.Set(r,l),d.collideConnected=!0,d.maxForce=50*u.GetBody().GetMass(),mouseJoint=e.CreateJoint(d),mouseJoint.SetTarget(new b2Vec2(t/scale,n/scale)),u.m_userData={type:"PieBall",familyID:s,fillColor:colorScale(s)},categorys[s].value+=1,categorys[s].joins.push(mouseJoint),u},createDataBallPie:function(e,t,n,o,i,a){console.log(t);var s=categorys[a].incomingPoint.x/scale+2*Math.random()/scale,r=categorys[a].incomingPoint.y/scale,l=new Box2D.Dynamics.b2FixtureDef;l.density=.1,l.friction=0,l.restitution=0,l.shape=new Box2D.Collision.Shapes.b2CircleShape(i/scale);var y=new Box2D.Dynamics.b2BodyDef;y.type=Box2D.Dynamics.b2Body.b2_dynamicBody,y.position.x=s,y.position.y=r;var c=e.CreateBody(y);c.m_userData={type:"PieBall",familyID:a,fillColor:categorys[a].color},listBodies.push(c);var u=c.CreateFixture(l),d=new b2MouseJointDef;return d.bodyA=e.GetGroundBody(),d.bodyB=u.GetBody(),d.target.Set(s,r),d.collideConnected=!0,d.maxForce=100*u.GetBody().GetMass(),mouseJoint=e.CreateJoint(d),mouseJoint.SetTarget(new b2Vec2(t.position.x/scale,t.position.y/scale)),u.m_userData={type:"PieBall",familyID:a,fillColor:colorScale(a)},categorys[a].value+=1,u},createDataBall:function(e,t,n,o){var i=new Box2D.Dynamics.b2FixtureDef;i.density=1,i.friction=.5,i.restitution=.2,i.shape=new Box2D.Collision.Shapes.b2CircleShape(o/e.settings.options.scale);var a=new Box2D.Dynamics.b2BodyDef;a.type=Box2D.Dynamics.b2Body.b2_dynamicBody,a.position.x=t,a.position.y=n;var s=e.world.CreateBody(a).CreateFixture(i);return s.m_userData={type:"PieBall",familyID:"family",fillColor:"rgb(200,0,0)"},s}}}(jQuery);