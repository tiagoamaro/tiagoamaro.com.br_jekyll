// emfed v1.6.0 - client-side Mastodon feed embed
// Source: https://github.com/sampsyo/emfed (Unlicense)

/**
 * Fetch recent toots for a user, given their Mastodon URL.
 */
export async function getToots(userURL, accountId, limit, excludeReplies, excludeReblogs) {
    const url = new URL(userURL);
    // Either use the account id specified or look it up based on the username
    // in the link.
    const userId = accountId ??
        (await (async () => {
            // Extract username from URL.
            const parts = /@(\w+)$/.exec(url.pathname);
            if (!parts) {
                throw "not a Mastodon user URL";
            }
            const username = parts[1];
            // Look up user ID from username.
            const lookupURL = Object.assign(new URL(url), {
                pathname: "/api/v1/accounts/lookup",
                search: `?acct=${username}`,
            });
            return (await (await fetch(lookupURL)).json())["id"];
        })());
    // Fetch toots.
    const tootURL = Object.assign(new URL(url), {
        pathname: `/api/v1/accounts/${userId}/statuses`,
        search: `?limit=${limit ?? 5}&exclude_replies=${!!excludeReplies}&exclude_reblogs=${!!excludeReblogs}`,
    });
    return await (await fetch(tootURL)).json();
}
export async function getPostAndReplyToots(userURL, id, excludeReplies, excludePost) {
    let toots = [];
    if (excludePost === false) {
        // fetch Toot
        const tootURL = Object.assign(new URL(userURL), {
            pathname: `/api/v1/statuses/${id}`
        });
        toots = [(await (await fetch(tootURL)).json())];
    }
    if (excludeReplies === false) {
        // fetch replyToots
        const replyTootURL = Object.assign(new URL(userURL), {
            pathname: `/api/v1/statuses/${id}/context`
        });
        toots = [...toots, ...(await (await fetch(replyTootURL)).json())['descendants']];
    }
    return toots;
}