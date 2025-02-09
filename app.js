const NZHUB = new nzhub({
	log: true
});

(async () => {
	await NZHUB.addNode({
		keyID: '0fa208709bdbe958016d4c72bf61c7a5',
		net: 'ALPHA',
		prot: 'https',
		host: 'jebance.ru',
		port: 28262
	});

	console.log(NZHUB.knownNodes);

	await NZHUB.addNet({ net: 'ALPHA', status: 'read' });

	console.log(await NZHUB.getNet('ALPHA'));

	NZHUB.cyclicNodesCheck();
	NZHUB.cyclicMessagesCheck();
	
	let messages = await NZHUB.getMessages();
	await messages.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
	console.log(messages);

let req = await NZHUB.sendMessage({
	net: 'ALPHA',
	message: `-----BEGIN PGP MESSAGE-----

wV4DnvIUAxOdiVsSAQdAX1UpS6hzW2iJHW1GJBAdvUYsUFa1rVaGL9b3PYQ7
ogMwrK+RAJJQ4q+KxEh844o0EnB6R95OXrxNAIaTF3TW5fSYCah5YuWYMK2s
Hf6zRwsX0sBJAfom93A4yTcfU2Atrz8iz3ZHjfYrqu2KMN7E6rFJokk09G58
lXQmKr6svriBctEbzU1J0msCjTvplb2+VJPRQi3WlDMLXCb34BFGG2M0SY3J
0PF628MJKijebZMX6O0l33jZNQcjjJaWsnvUyp34ageGuj2JC1c+9qD81Uu9
NvxQGrQPldyFLkDFcNH/RPMAciphspYiGVjg6uFbivDhzd8BcltrnCss2IfQ
h3iA/dsO6TMyVor8fygNlSEyGf9aaiW6cPKW84UVh318DzgJeuYz0FyJTwLf
/kL8xRs0He4uenDML98BiCCEQDOzGVefzf8t1vupneAcfgRawAebmF3li0Ao
4RvQYw==
=lW1H
-----END PGP MESSAGE-----`
});

	console.log(req);


})();
