// ==UserScript==
// @name            SE less underlines in chat
// @namespace       Reduces the underlines in chat. Links by regular users will still be underlined but bots that only post links will not. Tags and replies also have the underline striped
// @author          VLAZ
// @grant           GM.addStyle
// @grant           GM_addStyle
// @inject-into     page
// @match           *://chat.stackexchange.com/*
// @match           *://chat.meta.stackexchange.com/*
// @match           *://chat.stackoverflow.com/*
// @namespace       https://github.com/PurpleMagick/
// @run-at          document-end
// @version         1.0.0
// ==/UserScript==
(function() {
	const addStyle = typeof GM_addStyle !== "undefined"
		? GM_addStyle
		: GM.addSyle.bind(GM);

	const compare = new Intl.Collator("en", { usage: "search", sensitivity: "accent"}).compare;
	const currentDomain = window.location.hostname;

	function styleForDomain(domainFor, style) {
		if (compare(domainFor, currentDomain) !== 0)
			return;

		addStyle(style);
	}

	// for all chats
	addStyle(`
		/* remove underlines from tags */
		a:has(.ob-post-tag) {
		text-decoration: none !important;
		}

		/* remove underline from replies */
		a.reply-info {
			text-decoration: none !important;
		}
	`);

	styleForDomain("chat.stackoverflow.com", `
		/* strip underlines from messages from bots */
		.user-11995760 .messages a, /* DharmanBot */
		.user-7418352  .messages a, /* Guttenberg */
		.user-6817005  .messages a, /* Natty */
		.user-6294609  .messages a, /* Queen */
		.user-3735529  .messages a  /* SmokeDetector */
		{
			text-decoration: none !important;
		}
	`);

	styleForDomain("chat.stackexchange.com", `
		/* strip underlines from messages from bots */
		.user-478536 .messages a, /* metasmoke */
		.user-256700 .messages a, /* Natty */
		.user-120914 .messages a  /* SmokeDetector */
		{
			text-decoration: none !important;
		}
	`);

	styleForDomain("chat.meta.stackexchange.com", `
		/* strip underlines from messages from bots */
		.user-266345 .messages a /* SmokeDetector */
		{
			text-decoration: none !important;
		}
	`);
})();
