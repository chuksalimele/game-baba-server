Ns.GameHome={GAME_LOGIN_HTML:"game-login.html",GAME_VIEW_HTML:"game-view.html",GAME_VIEW_B_HTML:"game-view-b.html",GAME_WATCH_HTML:"game-watch.html",GAME_WAIT_HTML:"wait-player.html",Content:function(a){Ns.ui.UI.init(a)},showGameView:function(a){Ns.game.Match.currentUserMatch=a;Main.page.show({url:Ns.GameHome.GAME_VIEW_HTML,effect:"slideleft",duration:500,onBeforeShow:Ns.GameView.Content,data:a})},showGameViewB:function(a){Main.page.show({url:Ns.GameHome.GAME_VIEW_B_HTML,effect:"slideleft",duration:500,
onBeforeShow:Ns.GameViewB.Content,onShow:function(){document.getElementById("game-view-b-bluetooth-icon").style.display="none"},data:a});Main.dialog.show({title:"Play Robot",content:Ns.ui.UI.gameSettings(a.game_name),fade:!0,buttons:["CANCEL","PLAY"],closeButton:!1,modal:!0,action:function(a,c){"CANCEL"===c?Main.page.getUrl()===Ns.GameHome.GAME_VIEW_B_HTML?Main.page.back()&&this.hide():this.hide():this.hide()}})},showGameWatch:function(a){Main.page.show({url:Ns.GameHome.GAME_WATCH_HTML,effect:"slideleft",
duration:500,onBeforeShow:Ns.GameWatch.Content,data:a})},showBluetoothGame:function(a){Main.page.show({url:Ns.GameHome.GAME_VIEW_B_HTML,effect:"slideleft",duration:500,onBeforeShow:Ns.GameViewB.Content,onShow:function(){document.getElementById("game-view-b-bluetooth-icon").style.display="block"},data:{bluetooth:!0,game_name:a.game}});Main.dialog.show({title:"Play via bluetooth",content:'\x3cdiv id\x3d"bluetooth-dialog-continer"\x3e\x3c/div\x3e',width:.7*window.innerWidth,height:.5*window.innerHeight,
fade:!0,closeButton:!1,modal:!0,buttons:["CANCEL"],action:function(a,c){"CANCEL"===c&&(Main.page.getUrl()===Ns.GameHome.GAME_VIEW_B_HTML?Main.page.back()&&this.hide():this.hide())},onShow:function(){var b=this;Ns.game.Bluetooth.start({data:a,container:"bluetooth-dialog-continer",onReady:function(a){b.hide()}})}})},showTournamentDetails:function(a){Main.page.show({url:"tournament-details.html",effect:"slideleft",duration:500,onBeforeShow:Ns.view.Tournament.content,data:a})},showGroupDetails:function(a){Main.page.show({url:"group-details.html",
effect:"slideleft",duration:500,onBeforeShow:Ns.view.Group.content,data:a})},showPlayNotifications:function(a){Main.page.show({url:"play-notifications.html",effect:"slideleft",duration:500,onBeforeShow:Ns.view.PlayNotifications.content,data:a})},showInvitePlayers:function(a){},showContacts:function(a){Main.page.show({url:"game-contacts.html",effect:"slideleft",duration:500,onBeforeShow:Ns.view.Contacts.content,data:a})},showCreateGroup:function(a){},showCreateTournament:function(a){},showUserProfile:function(a){Main.page.show({url:"user-profile.html",
effect:"slideleft",duration:500,onBeforeShow:Ns.view.UserProfile.content,data:a})},showSettings:function(a){},showHelp:function(a){}};
Main.on("pagecreate",function(a){a.isIndexPage&&(Ns.Auth.login(),$("#game-select-chess").on("click",function(){Main.page.show({url:"game-home.html",effect:"slideleft",duration:500,onBeforeShow:Ns.GameHome.Content,data:"chess"})}),$("#game-select-draft").on("click",function(){Main.page.show({url:"game-home.html",effect:"slideleft",duration:500,onBeforeShow:Ns.GameHome.Content,data:"draft"})}),$("#game-select-ludo").on("click",function(){Main.page.show({url:"game-home.html",effect:"slideleft",duration:500,
onBeforeShow:Ns.GameHome.Content,data:"ludo"})}),$("#game-select-solitaire").on("click",function(){Main.page.show({url:"game-home.html",effect:"slideleft",duration:500,onBeforeShow:Ns.GameHome.Content,data:"solitaire"})}),$("#game-select-whot").on("click",function(){Main.page.show({url:"game-home.html",effect:"slideleft",duration:500,onBeforeShow:Ns.GameHome.Content,data:"whot"})}))});
Ns.GameView={leftPanelTitleComp:null,afterLeftContentHide:function(){Ns.GameView.leftPanelTitleComp&&(Ns.GameView.leftPanelTitleComp.innerHTML="")},showLeftContent:function(a){var b=document.getElementById("game-view-right-content");b.style.width="80%";b.style.right="-80%";b.style.display="block";a();Main.anim.to("game-view-right-content",500,{right:"0%"})},hideLeftContent:function(){var a=document.getElementById("game-view-right-content");"0%"===a.style.right&&(a.style.display="block",Main.anim.to("game-view-right-content",
500,{right:"-80%"},Ns.GameView.afterLeftContentHide))},Content:function(a){var b=document.getElementById("game-view-main"),c=document.getElementById("game-view-main-board"),d=document.getElementById("game-view-main-upper"),e=document.getElementById("game-view-main-lower");Ns.ui.GamePanel.ownGameView(a,b,function(a,b,f){c.style.width=a+"px";c.style.height=a+"px";d.style.width=c.style.width;d.style.height=b+"px";e.style.width=c.style.width;e.style.height=f+"px"});$("#game-view-back-btn").on("click",
function(){Main.page.back()})}};
Ns.GameViewB={leftPanelTitleComp:null,afterLeftContentHide:function(){Ns.GameViewB.leftPanelTitleComp&&(Ns.GameViewB.leftPanelTitleComp.innerHTML="")},showLeftContent:function(a){var b=document.getElementById("game-view-b-right-content");b.style.width="80%";b.style.right="-80%";b.style.display="block";a();Main.anim.to("game-view-b-right-content",500,{right:"0%"})},hideLeftContent:function(){var a=document.getElementById("game-view-b-right-content");"0%"===a.style.right&&(a.style.display="block",Main.anim.to("game-view-b-right-content",
500,{right:"-80%"},Ns.GameViewB.afterLeftContentHide))},Content:function(a){var b=document.getElementById("game-view-b-main"),c=document.getElementById("game-view-b-main-board"),d=document.getElementById("game-view-b-main-upper"),e=document.getElementById("game-view-b-main-lower");Ns.ui.GamePanel.ownGameViewB(a,b,function(a,b,f){c.style.width=a+"px";c.style.height=a+"px";d.style.width=c.style.width;d.style.height=b+"px";e.style.width=c.style.width;e.style.height=f+"px"});$("#game-view-b-back-btn").on("click",
function(){Main.page.back()})}};
Ns.GameWatch={leftPanelTitleComp:null,afterLeftContentHide:function(){Ns.GameWatch.leftPanelTitleComp&&(Ns.GameWatch.leftPanelTitleComp.innerHTML="")},showLeftContent:function(a){var b=document.getElementById("game-watch-right-content");b.style.width="80%";b.style.right="-80%";b.style.display="block";a();Main.anim.to("game-watch-right-content",500,{right:"0%"})},hideLeftContent:function(){var a=document.getElementById("game-watch-right-content");"0%"===a.style.right&&(a.style.display="block",Main.anim.to("game-watch-right-content",
500,{right:"-80%"},Ns.GameWatch.afterLeftContentHide))},Content:function(a){var b=document.getElementById("game-watch-main"),c=document.getElementById("game-watch-main-board"),d=document.getElementById("game-watch-main-upper"),e=document.getElementById("game-watch-main-lower");Ns.ui.GamePanel.watchGame(a,b,function(a,b,f){c.style.width=a+"px";c.style.height=a+"px";d.style.width=c.style.width;d.style.height=b+"px";e.style.width=c.style.width;e.style.height=f+"px"});$("#game-view-back-btn").on("click",
function(){Main.page.back()})}};Ns.GameGroup={Content:function(a){}};Ns.GameTournament={Content:function(a){},showPerformacesView:function(a){Main.page.show({url:"performance-view.html",effect:"slideleft",duration:500,onBeforeShow:Ns.view.Performance.content,data:a})}};Ns.GameUserProfile={Content:function(a){}};