"use strict";

/* ================================================================
   SCALEFORM HUD v3 — JS только для динамических операций.
   Все статические стили — в scaleform.css
   ================================================================ */

var IMG = "https://raw.githubusercontent.com/sanyaleks2012-lab/storage/main/";

function F(ctx, id) { return ctx.FindChildTraverse(id); }
function FC(el, cls) { return el.FindChildrenWithClassTraverse(cls); }

/* ─── Set health/armor icons via SetImage (CSS не умеет) ─── */
function ApplyIconOverrides(ctx) {
	FC(ctx, "hud-HA-icon--health").forEach(function(hi) {
		hi.SetImage(IMG + "hpIconSC.png");
	});
	FC(ctx, "hud-HA-icon--armor").forEach(function(si) {
		si.SetImage(IMG + "arIconSC.png");
	});
}

/* ─── Death notice icon tweaks (transform/uiScale из CSS не работает) ─── */
function ApplyDeathNoticeIcons(ctx) {
	FC(ctx, "DeathNoticeIcon").forEach(function(dn) {
		if (dn.id === "Weapon") {
			dn.style.verticalAlign = "top";
			dn.style.transform     = "translateY(5px)";
			dn.style.uiScale       = "51%";
		} else {
			dn.style.height        = "20px";
			dn.style.verticalAlign = "top";
			dn.style.transform     = "translateY(0px) scaleY(.8) scaleX(.8)";
			dn.style.uiScale       = "100%";
		}
	});
	// Collapse extra icons
	var dn = F(ctx, "HudDeathNotice");
	if (dn) {
		var nsi = F(dn, "NoScopeIcon");
		if (nsi) nsi.style.visibility = "collapse";
		var tsi = F(dn, "ThroughSmokeIcon");
		if (tsi) tsi.style.visibility = "collapse";
		var abi = F(dn, "AttackerBlindIcon");
		if (abi) abi.style.visibility = "collapse";
		var dom = F(dn, "Domination");
		if (dom) dom.style.visibility = "collapse";
	}
}

/* ─── Team counter text (нужно установить после создания) ─── */
function ApplyTeamCounterText(ctx) {
	var tc = F(ctx, "HudTeamCounter");
	if (!tc) return;
	var aliveT  = F(tc, "AliveTextT");
	var aliveCT = F(tc, "AliveTextCT");
	if (aliveT)  { aliveT.style.fontFamily = "Stratum2"; aliveT.style.color = "#e6e6e680"; }
	if (aliveCT) { aliveCT.style.fontFamily = "Stratum2"; aliveCT.style.color = "#e6e6e680"; }
	var wT  = F(tc, "ScoreT");
	var wCT = F(tc, "ScoreCT");
	if (wT)  wT.style.fontFamily = "Stratum2 Bold Monodigit";
	if (wCT) wCT.style.fontFamily = "Stratum2 Bold Monodigit";
	var timer = F(tc, "TimerText");
	if (timer) timer.style.fontFamily = "Stratum2 Bold Monodigit";
}

/* ─── Chat ─── */
function ApplyChat(ctx) {
	var chatHist = F(ctx, "ChatHistoryText");
	if (chatHist) {
		chatHist.style.fontFamily    = "Stratum2";
		chatHist.style.fontSize      = "18px";
		chatHist.style.fontWeight    = "lighter";
		chatHist.style.letterSpacing = "0px";
		chatHist.style.backgroundColor = "#000000CC";
	}
	var chatEntry = F(ctx, "ChatTextEntryBox");
	if (chatEntry) {
		chatEntry.style.fontFamily    = "Stratum2";
		chatEntry.style.fontSize      = "18px";
		chatEntry.style.fontWeight    = "lighter";
		chatEntry.style.letterSpacing = "0px";
	}
	FC(ctx, "AlertText").forEach(function(s) {
		s.style.backgroundColor = "gradient( linear, 100% 0%, 0% 0%, from( #00000000 ), color-stop( 0.7, #00000077 ), to( #00000077 ) )";
		s.style.textShadow      = "1px 1px 2px #00000055";
		s.style.fontFamily      = "Stratum2";
		s.style.fontWeight      = "normal";
		s.style.fontSize        = "21.5px";
		s.style.letterSpacing   = ".43px";
		s.style.paddingLeft     = "28px";
		s.style.paddingBottom   = "0px";
		s.style.textOverflow    = "noclip";
		s.style.whiteSpace      = "nowrap";
		s.style.width           = "1200px";
	});
}

/* ─── Money BG ─── */
function ApplyMoneyBG(ctx) {
	var hudMoney = F(ctx, "HudMoney");
	if (!hudMoney) return;
	var moneyBg = F(hudMoney, "MoneyBG");
	if (moneyBg) {
		moneyBg.style.backgroundImage     = "url(" + IMG + "moneySC.png)";
		moneyBg.style.backgroundColor     = "#00000000";
		moneyBg.style.backgroundSize      = "200% 100%";
		moneyBg.style.backgroundRepeat    = "no-repeat";
		moneyBg.style.backgroundImgOpacity = "0.95";
	}
}

// ─── MAIN ───────────────────────────────────────────────────────
(function () {
	var ctx = $.GetContextPanel();
	if (!ctx) return;

	// Delay to ensure all panels exist
	$.Schedule(0.5, function() {
		ApplyIconOverrides(ctx);
		ApplyDeathNoticeIcons(ctx);
		ApplyTeamCounterText(ctx);
		ApplyChat(ctx);
		ApplyMoneyBG(ctx);
	});
})();
