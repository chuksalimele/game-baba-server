Ns.GameHome={GAME_LOGIN_HTML:"game-login-ld.html",GAME_VIEW_HTML:"game-view-ld.html",GAME_VIEW_B_HTML:"game-view-b-ld.html",GAME_WATCH_HTML:"game-watch-ld.html",GAME_WAIT_HTML:"wait-player-ld.html",showGameView:function(b){Ns.Match.currentUserMatch=b;document.getElementById("home-game-panel").innerHTML=Ns.ui.UI.gameViewHtml;Ns.GameView.Content(b)},showGameViewB:function(b){Main.dialog.show({title:"Play Robot",content:Ns.ui.UI.gameSettings(b.game_name),fade:!0,buttons:["CANCEL","PLAY"],closeButton:!1,
modal:!0,action:function(d,a){"PLAY"===a&&(document.getElementById("home-game-panel").innerHTML=Ns.ui.UI.gameViewBHtml,document.getElementById("game-view-b-bluetooth-icon").style.display="none",Ns.GameViewB.Content(b));this.hide()}})},showGameWatch:function(b){document.getElementById("home-game-panel").innerHTML=Ns.ui.UI.gameWatchHtml;Ns.GameWatch.Content(b)},Content:function(b){Ns.ui.UI.init(b);(function(){function b(){c.style.position="absolute";c.style.top=0;c.style.bottom=0;Main.device.isXLarge()?
(a.style.width="25%",c.style.position="absolute",c.style.top=0,c.style.bottom=0,c.style.left=a.style.width,c.style.width="75%"):(a.style.width="40%",c.style.position="absolute",c.style.top=0,c.style.bottom=0,c.style.left=a.style.width,c.style.width="60%")}var a=document.getElementById("home-main"),c=document.getElementById("home-game-panel");b();Main.dom.removeListener(window,"orientationchange",b);Main.dom.addListener(window,"orientationchange",b)})()},showBluetoothGame:function(){var b=.3*window.innerWidth;
Main.dialog.show({title:"Play via bluetooth",content:'\x3cdiv id\x3d"bluetooth-dialog-continer"\x3e\x3c/div\x3e',width:300>b?300:b,height:.5*window.screen.height,fade:!0,closeButton:!1,modal:!0,buttons:["CANCEL"],action:function(b,a){"CANCEL"===a&&this.hide()},onShow:function(){var b=this;Ns.Bluetooth.start({data:Ns.ui.UI.selectedGame,container:"bluetooth-dialog-continer",onReady:function(a){document.getElementById("home-game-panel").innerHTML=Ns.ui.UI.gameViewBHtml;document.getElementById("game-view-b-bluetooth-icon").style.display=
"block";Ns.GameViewB.Content(a);b.hide()}})}})},showTournamentDetails:function(b){Main.card.to({container:"#home-main",url:"tournament-details.html",fade:!0,data:b,onShow:Ns.view.Tournament.content})},showGroupDetails:function(b){Main.card.to({container:"#home-main",url:"group-details.html",fade:!0,data:b,onShow:Ns.view.Group.content})},showNotifications:function(){Main.card.to({container:"#home-main",url:"notifications.html",fade:!0,data:Ns.ui.UI.selectedGame,onShow:Ns.view.Notifications.content})},
showInvitePlayers:function(){},showContacts:function(){Main.card.to({container:"#home-main",url:"game-contacts.html",fade:!0,data:Ns.ui.UI.selectedGame,onShow:Ns.view.Contacts.content})},showCreateGroup:function(){},showCreateTournament:function(){},showUserProfile:function(b){Main.card.to({container:"#home-main",url:"user-profile.html",fade:!0,data:b,onShow:Ns.view.UserProfile.content})},showSettings:function(){},showHelp:function(){}};
Main.on("pagecreate",function(b){b.isIndexPage&&(Main.device.styleDesktopScrollbar(b.isIndexPage),Ns.Auth.login(),$("#game-select-chess").on("click",function(){Main.page.show({url:"game-home-ld.html",effect:"fade",duration:500,onBeforeShow:Ns.GameHome.Content,data:"chess"})}),$("#game-select-draft").on("click",function(){Main.page.show({url:"game-home-ld.html",effect:"fade",duration:500,onBeforeShow:Ns.GameHome.Content,data:"draft"})}),$("#game-select-ludo").on("click",function(){Main.page.show({url:"game-home-ld.html",
effect:"fade",duration:500,onBeforeShow:Ns.GameHome.Content,data:"ludo"})}),$("#game-select-solitaire").on("click",function(){Main.page.show({url:"game-home-ld.html",effect:"fade",duration:500,onBeforeShow:Ns.GameHome.Content,data:"solitaire"})}),$("#game-select-whot").on("click",function(){Main.page.show({url:"game-home-ld.html",effect:"fade",duration:500,onBeforeShow:Ns.GameHome.Content,data:"whot"})}))});
Ns.GameView={rightPanelTitleComp:null,afterRightContentHide:function(){Ns.GameView.rightPanelTitleComp&&(Ns.GameView.rightPanelTitleComp.innerHTML="")},showRightContent:function(b){if(Main.device.isXLarge()){var d=document.getElementById("game-view-main");d.style.width="60%";var a=document.getElementById("game-view-right-content");a.style.width="40%";a.style.display="block";(a=Ns.ui.GamePanel.gameAreaDimension(d))&&Ns.GameView.resizeMain(a.board_size,a.upper_height,a.lower_height);b()}else a=document.getElementById("game-view-right-content"),
a.style.width="65%",a.style.right="-65%",a.style.display="block",b(),Main.anim.to("game-view-right-content",500,{right:"0%"})},hideRightContent:function(){if(Main.device.isXLarge()){document.getElementById("game-view-main").style.width="100%";var b=document.getElementById("game-view-right-content");b.style.display="none";Ns.GameView.afterRightContentHide()}else b=document.getElementById("game-view-right-content"),"0%"===b.style.right&&(b.style.display="block",Main.anim.to("game-view-right-content",
500,{right:"-65%"},Ns.GameView.afterRightContentHide))},resizeMain:function(b,d,a){var c=document.getElementById("game-view-main-board"),e=document.getElementById("game-view-main-upper"),f=document.getElementById("game-view-main-lower");c.style.width=b+"px";c.style.height=b+"px";e.style.width=c.style.width;e.style.height=d+"px";f.style.width=c.style.width;f.style.height=a+"px"},Content:function(b){var d=document.getElementById("game-view-main"),a=document.getElementById("game-view-right-content");
Ns.ui.GamePanel.ownGameView(b,d,Ns.GameView.resizeMain,function(){Main.device.isXLarge()?(this.element.style.width="60%",this.element.style.height="100%",a.style.width="40%",a.style.right="0%",a.style.display="block"):(this.element.style.width="100%",this.element.style.height="100%",a.style.width="65%",a.style.display="block",a.style.right="-"+a.style.width,Ns.GameView.afterRightContentHide())})}};
Ns.GameViewB={rightPanelTitleComp:null,afterRightContentHide:function(){Ns.GameViewB.rightPanelTitleComp&&(Ns.GameViewB.rightPanelTitleComp.innerHTML="")},showRightContent:function(b){if(Main.device.isXLarge()){var d=document.getElementById("game-view-b-main");d.style.width="60%";var a=document.getElementById("game-view-b-right-content");a.style.width="40%";a.style.display="block";(a=Ns.ui.GamePanel.gameAreaDimension(d))&&Ns.GameViewB.resizeMain(a.board_size,a.upper_height,a.lower_height);b()}else a=document.getElementById("game-view-b-right-content"),
a.style.width="65%",a.style.right="-65%",a.style.display="block",b(),Main.anim.to("game-view-b-right-content",500,{right:"0%"})},hideRightContent:function(){if(Main.device.isXLarge()){document.getElementById("game-view-b-main").style.width="100%";var b=document.getElementById("game-view-b-right-content");b.style.display="none";Ns.GameViewB.afterRightContentHide()}else b=document.getElementById("game-view-b-right-content"),"0%"===b.style.right&&(b.style.display="block",Main.anim.to("game-view-b-right-content",
500,{right:"-65%"},Ns.GameViewB.afterRightContentHide))},resizeMain:function(b,d,a){var c=document.getElementById("game-view-b-main-board"),e=document.getElementById("game-view-b-main-upper"),f=document.getElementById("game-view-b-main-lower");c.style.width=b+"px";c.style.height=b+"px";e.style.width=c.style.width;e.style.height=d+"px";f.style.width=c.style.width;f.style.height=a+"px"},Content:function(b){var d=document.getElementById("game-view-b-main"),a=document.getElementById("game-view-b-right-content");
Ns.ui.GamePanel.ownGameViewB(b,d,Ns.GameViewB.resizeMain,function(){Main.device.isXLarge()?(this.element.style.width="60%",this.element.style.height="100%",a.style.width="40%",a.style.right="0%",a.style.display="block"):(this.element.style.width="100%",this.element.style.height="100%",a.style.width="65%",a.style.display="block",a.style.right="-"+a.style.width,Ns.GameViewB.afterRightContentHide())})}};
Ns.GameWatch={rightPanelTitleComp:null,afterRightContentHide:function(){Ns.GameWatch.rightPanelTitleComp&&(Ns.GameWatch.rightPanelTitleComp.innerHTML="",Ns.GameWatch.isShowRightPanel=!1)},showRightContent:function(b){if(Main.device.isXLarge()){var d=document.getElementById("game-watch-main");d.style.width="60%";var a=document.getElementById("game-watch-right-content");a.style.width="40%";a.style.display="block";(a=Ns.ui.GamePanel.gameAreaDimension(d))&&Ns.GameWatch.resizeMain(a.board_size,a.upper_height,
a.lower_height);b()}else d=document.getElementById("game-watch-main"),d.style.width="100%",a=document.getElementById("game-watch-right-content"),a.style.width="65%",a.style.right="-65%",a.style.display="block",b(),Main.anim.to("game-watch-right-content",500,{right:"0%"});Ns.GameWatch.isShowRightPanel=!0},hideRightContent:function(){if(Main.device.isXLarge()){document.getElementById("game-watch-main").style.width="100%";var b=document.getElementById("game-watch-right-content");b.style.display="none";
Ns.GameWatch.afterRightContentHide()}else b=document.getElementById("game-watch-right-content"),"0%"===b.style.right&&(b.style.display="block",Main.anim.to("game-watch-right-content",500,{right:"-65%"},Ns.GameWatch.afterRightContentHide))},resizeMain:function(b,d,a){var c=document.getElementById("game-watch-main-board"),e=document.getElementById("game-watch-main-upper"),f=document.getElementById("game-watch-main-lower");c.style.width=b+"px";c.style.height=b+"px";e.style.width=c.style.width;e.style.height=
d+"px";f.style.width=c.style.width;f.style.height=a+"px"},Content:function(b){var d=document.getElementById("game-watch-main"),a=document.getElementById("game-watch-right-content");Ns.ui.GamePanel.watchGame(b,d,Ns.GameWatch.resizeMain,function(){Main.device.isXLarge()?(this.element.style.width="60%",this.element.style.height="100%",a.style.width="40%",a.style.right="0%",a.style.display="block"):(this.element.style.width="100%",this.element.style.height="100%",a.style.width="65%",a.style.display="block",
a.style.right="-"+a.style.width,Ns.GameWatch.afterRightContentHide())})}};Ns.GameGroup={Content:function(b){}};Ns.GameTournament={Content:function(b){},showPerformacesView:function(b){Main.card.to({container:"#home-main",url:"performance-view.html",fade:!0,data:b,onShow:Ns.view.Performance.content})}};Ns.GameUserProfile={Content:function(b){}};