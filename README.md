# nzhub
[nznub](https://jebance.github.io/nzhub/) is a class for frontend of application built on network New zone.

**Table of Contents**

- [nzhub](#nzhub)
	- [Getting started](#getting-started)
		- [Browser](#browser)
	- [API](#api)
	- [GET requests](#get-requests)
		- [Variables](#variables)
		- [addNet](#addNet)
		- [addNode](#addNode)
		- [cyclicNodesCheck](#cyclicNodesCheck)
		- [cyclicMessagesCheck](#cyclicmessagesCheck)
		- [getNet](#getNet)
		- [getMessages](#getMessages)
	- [Events](#events)
		- [newMessage](#newMessage)
	- [License](#license)


### nzhub

New Zone servers accept and replicate encrypted messages. nzhub allows your frontend application to interact with these servers. Updating the list of networks, nodes and messages inside. Data is stored in indexedDB.


### Getting started

#### Browser

Download nzhub.js and include it in the header of your html file.

```html
<script src="nzhub.js" defer></script>
```

Use the `new nzhub()` call to create a new object with all the listed methods.

```js
const NZHUB = new nzhub({
	timeForCyclicNodesCheck: 3000,		// The period for checking and updating nodes in milliseconds.
	timeForCyclicMessagesCheck: 3000,	// The period for checking and updating messages in milliseconds.
	log: true
});
```


### API

Use built-in methods and variables to interact with the New Zone network.

#### Variables

The main variables that store general information about the network state, known and loaded data:

`NZHUB.config` - used when creating an object and can be changed during the process.

`NZHUB.knownNets` - list of known networks and their read status. If it has the "read" status, then messages from this network will be synchronized with the local database. It has the following structure:
```js
{
    "ALPHA": {
        "net": "ALPHA",
        "status": false		// messages from this network will not be synchronized
    },
    "test": {
        "net": "test",
        "status": "read"	// messages from this network will be synchronized
    }
}
```

`NZHUB.knownNodes` - list of known nodes, their availability status and round-trip time. Has the following structure:
```js
{
    "0fa208709bdbe958016d4c72bf61c7a5": {
        "status": "active",								// exchange with this node is active
        "keyID": "0fa208709bdbe958016d4c72bf61c7a5",	// unique node identifier
        "net": "ALPHA",									// network of nodes
        "prot": "https",								// data transfer protocol
        "host": "jebance.ru",							// host or ip address of the node
        "port": 28262,									// port
        "time": 1739110711265,							// the current time of the node at the moment it received your request
        "autoDel": 0,									// time in seconds to automatically delete messages from a node. 0 = disabled
        "autoCheckNodes": 1000,							// time in milliseconds for automatic checking of other nodes for availability and list of known nodes
        "autoCheckMessages": 10000,						// time in milliseconds to automatically check other nodes for missed messages
        "firstMessage": {								// first known message
            "hash": "095f5a0566a3ff1dd76aad2400fdc938",	// message text hash
            "timestamp": 1733839298941					// message registration time on node
        },
        "lastMessage": {								// last known message
            "hash": "d9697d00d5ddca59028da211c97225ac",	// message text hash
            "timestamp": 1738798540888					// message registration time on node
        },
        "rtt": 156										// round-trip time in milliseconds
    },
    "cebbe3fb84d4977184ce954777528321": {
        "status": "blocked",							// exchange with this node is blocked
        "keyID": "cebbe3fb84d4977184ce954777528321",	// unique node identifier
        "net": "ALPHA",									// network of nodes
        "prot": "http",									// data transfer protocol
        "host": "194.87.214.40",						// host or ip address of the node
        "port": 28262,									// port
        "time": 1739110711569,							// the current time of the node at the moment it received your request
        "autoDel": 0,									// time in seconds to automatically delete messages from a node. 0 = disabled
        "autoCheckNodes": 1000,							// time in milliseconds for automatic checking of other nodes for availability and list of known nodes
        "autoCheckMessages": 10000,						// time in milliseconds to automatically check other nodes for missed messages
        "firstMessage": {								// first known message
            "hash": "095f5a0566a3ff1dd76aad2400fdc938",	// message text hash
            "timestamp": 1733839298941					// message registration time on node
        },
        "lastMessage": {								// last known message
            "hash": "d9697d00d5ddca59028da211c97225ac",	// message text hash
            "timestamp": 1738798540888					// message registration time on node
        },
        "rtt": 167										// round-trip time in milliseconds
    }
}
```

`NZHUB.knownMessages` - list of known messages stored in the local database. It has the following structure: `"message hash": "registration time on node"`
```js
{
    "ALPHA": {
        "095f5a0566a3ff1dd76aad2400fdc938": 1733839298941,
        "1e59394ac065fdd2c446eaa7ec2cb6b1": 1738578534657,
        "3f4b086b53567565061f7c9b1247acab": 1738577313443,
        "63dae3412e6bce006de61760b7ae92cf": 1737033651927,
        "70d3f070453be3c9cbebf6e83325ed80": 1737377847852,
        "755cf1b98c75c96a0b440ba0cadf3b0e": 1737461464210,
        "8adc487e0a2bc5537565c3c25da2cd94": 1738681088029,
        "8cc4b4f49b52d24a515e34733c615ccd": 1737202197983,
        "8d03e97aa504f42c2933395326f20af9": 1733839347377,
        "9c1282b430c1f20707f9b44566a18d60": 1738764498594,
        "a464b1b1e62f106837e0b8cfec723cbc": 1738764038433,
        "ac4b925d4b5cbdbe266b4681744dc1fe": 1733839318859,
        "b2d5f0b74cc92d8439f2dcdebe266669": 1737377676786,
        "c38c1a4f9d5ad59105839f5d1084cbdd": 1738576721942,
        "cad0dc9b695bc4124e2e097ba77c1346": 1738576722191,
        "d9697d00d5ddca59028da211c97225ac": 1738798540888,
        "dcd144e0d8caa30d1f30ce34898d4f97": 1738577381203,
        "e3ffc0c8d9cc447ecab3e5e577ef6803": 1737461752833,
        "f49138237d5be3689870fcfe7e6088fe": 1738577313212,
        "f6c643f3cb27c7d8464a7f3a19896cb6": 1737377759899,
        "f754d2a120c56dcfbf561e6fdea7391c": 1738681088022,
        "f7b655809c0110410b4cf5de7ac2dd55": 1737037308098
    }
}
```

#### addNet

`addNet` - adds or changes information about the node network. If the network is already known, the method should be used to change the synchronization status.

```js
NZHUB.addNet({
	net: 'ALPHA',
	status: 'read'
});
```

#### addNode

`addNode` - adds or changes information about a node. If the node is already known, the method should be used to change the synchronization status. Automatically adds the node's network to the list of known networks if it was previously missing.

```js
NZHUB.addNode({
	keyID: '0fa208709bdbe958016d4c72bf61c7a5',
	net: 'ALPHA',
	prot: 'https',
	host: 'jebance.ru',
	port: 28262,
	rtt: 10,
	status: 'active'
});
```

#### cyclicNodesCheck

`cyclicNodesCheck` - cyclic check of nodes after a period of time specified in the config.

```js
NZHUB.cyclicNodesCheck();
```

#### cyclicMessagesCheck

`cyclicMessagesCheck` - cyclic check of messages after a period of time specified in the config.

```js
NZHUB.cyclicMessagesCheck();
```

#### getNet

`getNet` - returns message synchronization status, node list, and active and blocked node counters.

```js
NZHUB.getNet('ALPHA');
```

```json
{
    "net": "ALPHA",
    "status": "read",
    "nodes": {
        "0fa208709bdbe958016d4c72bf61c7a5": {
            "status": "active",
            "keyID": "0fa208709bdbe958016d4c72bf61c7a5",
            "net": "ALPHA",
            "prot": "https",
            "host": "jebance.ru",
            "port": 28262,
            "time": 1739114073468,
            "autoDel": 0,
            "autoCheckNodes": 1000,
            "autoCheckMessages": 10000,
            "firstMessage": {
                "hash": "095f5a0566a3ff1dd76aad2400fdc938",
                "timestamp": 1733839298941
            },
            "lastMessage": {
                "hash": "d9697d00d5ddca59028da211c97225ac",
                "timestamp": 1738798540888
            },
            "rtt": 261
        },
        "cebbe3fb84d4977184ce954777528321": {
            "status": "active",
            "keyID": "cebbe3fb84d4977184ce954777528321",
            "net": "ALPHA",
            "prot": "http",
            "host": "194.87.214.40",
            "port": 28262,
            "time": 1739114073939,
            "autoDel": 0,
            "autoCheckNodes": 1000,
            "autoCheckMessages": 10000,
            "firstMessage": {
                "hash": "095f5a0566a3ff1dd76aad2400fdc938",
                "timestamp": 1733839298941
            },
            "lastMessage": {
                "hash": "d9697d00d5ddca59028da211c97225ac",
                "timestamp": 1738798540888
            },
            "rtt": 317
        }
    },
    "counts": {
        "active": 2,
        "blocked": 0
    }
}
```

#### getMessages

`getMessages` - returns an array of all messages from the specified network of nodes.

```js
NZHUB.getMessages({
	net: 'ALPHA',
	getAll: true,
	getIndex: false,
	getValue: false
});
```

```json
[
    {
        "hash": "095f5a0566a3ff1dd76aad2400fdc938",
        "timestamp": 1733839298941,
        "message": "-----BEGIN PGP MESSAGE-----\n\nlkdfmvldfjvmkfljdfvckdsmsdcvsdvcsdvcdsvdfgfdfdbvdfvb6zRoH6Ly\nKFowIojl8OwzQ6uI2D5boP+eq4PmcxLyRWY+YUvm/ydWp5Pldkfmljkvmsld\nWssddsvedrgvfSsrDUF6gk3Xhx51keQK4MLUr/LMzCIZdzXcoosu8dRg0yB4\nUUUTPF0vfhBkoMQJLkvxSnbdejfgnregjnroghFm3aIQEIcGlZaMLt/TA78w\nhzviZ2oJs9HmyZom88qUFz1ieC20tna8DgiosH8vfwmF+LH8nDm1Vsubiudj\nKApD6/lHcnJJ5XHVokBtx2H864eIc2JjwlPNKYgrHxe+2Jxoj6a+CgmiHGIl\nPsPeg1YsDf5xGdIlB1ksl3kF/URe\n=ciNI\n-----END PGP MESSAGE-----",
        "net": "ALPHA"
    },
    {
        "hash": "1e59394ac065fdd2c446eaa7ec2cb6b1",
        "timestamp": 1738578534657,
        "message": "-----BEGIN PGP MESSAGE-----\n\nwV4DiZfOfQqSUfQSAQdAoF4sOxzVmhsKKUodNwINicHjRYhzi1lY0unmc/dn\n8nAwALWcC6t2xkP0VRxPHOXHxSW5unDOJh15telRD61umeQmPeB1gGdjQiFc\n+sUamRGM0sBfAZ9gPY1QEZK1fNnwDrOeq+7K6hbweHqJW6srbu+c9gYUIjwl\nLhC9PYj5ozSzrxuVRsySeKBgHo2UUdZGSu+8LInJl3EfFSz5RswxjiHRL+xG\nsOOTH30moOvDA2Ucl6UW0kghLDYGLdCgmapLxETBkn0Wby1iTb/inFQVjzkc\ngbEBedQzyywiXe/9hMKRVT5gEyuHIeoZT7YIJ/rPUDx2kc2v3ePycPyWNK2x\n02XBooUsCAY0AZ+F0dFELHQtTF3fAsF3eTcFLuT4Gm5DlNADZHrK72b7j+V7\nlKIIRA8K6s+xcN1MXdcIKUoWyUCLhTUKWvLqsVM93jILk3ivlzcCNYxII3d8\nXhpCPoxLrzAiKsoQAmFOGbP26MxDxE7fFvo=\n=UUVp\n-----END PGP MESSAGE-----\n",
        "net": "ALPHA"
    },
    {
        "hash": "3f4b086b53567565061f7c9b1247acab",
        "timestamp": 1738577313443,
        "message": "-----BEGIN PGP MESSAGE-----\n\nwV4DiZfOfQqSUfQSAQdAIOpNWylzTdBiEKdgrQjz2B2kKVNoP0LbDuPY34ID\n8jkwW29lU5HNCxXUWVGCs3B+W0VNDrj6vosMsDDHQhyg/9Ji0uYC0kY/u6qk\n9p1KyFbB0sODASaJ0w8WKYpD2+dsVBwVakKQQaOHC7BzbxtZhSs07y/xcNfd\n0HS1c94qNzrC4CHk+72/TBwF4FTzc9w+5jYLhyMkPUqS38F5r50AznWyVfqM\nd6BtFfGbAnP7uUk2rewl/k/WMmQMvvqpmgL086v52HBF9QNIVgF2Aeyl8qes\nyNwMPOKf6roP2h2vmxzd6l5ONv2LtokoTTDH+0QSn6d92qum4aV2yxKr5O9g\nHK6KZEkzl7ZwknaSvRUiZDnuA8KYs6gHGp70pXO8NbK903E/NmSZx12DTovn\n6ou+joCFxIm9JuC9Gzwo+qDiEKhoFkXBIWxpHhgpMtGzWNrgZmYJ1vEbFCcf\nNmxROSklcmu/TZdkVY+VUwh1QPV13dFceRrhNHoaMkn/ndC69rc1CyPMPSm3\nWoJDB/v5krcodYJmgbiUPc3JbqI06Bl+0wT3ZpikBjouR/2Rk582CAw+0cti\nC3s/lXzQYIFOaTy2Go6h++k+cPbw82ZCVu18duSoVC44je2eyDIRcNfbDFNV\nXCAWADhugex36gLfc9HzhVaocCcr+vm+pI8H31ZRtASEu47LxqSWOJ1uukEE\nrOmIs0jzjCxsjpEt8D8r0KchvfvcCyJ7OB4fCHAaGqcYG824XCiu82KcIQb1\nkJ+jh9MnYPEB+UlhHhlyrgYRkZ1HBp/suM2oa3eGV3/fz3ki/jPV/5zGatWz\n/kskeMF627rMyTTIBW1lWwJXs2ChMolgEoYUjdFgJDpyvcHFTpDblGSMtBhv\nspeGb0veKqSwtJ3Q8i8ZmBLixhPjJ5f/AHp8pEf+L8F4lNFtwnbJToZwnhcw\nJL/F0xUK2HEEnlvwyr4c6u35lajiQiVaLewtj+xn2Of6yWTPY1TJ48hp0dAh\nuXNpjQPvV/NHEszRr7JuyRRnhsyc4T3j2+KhaZbwuTcTtv8q7ojjOTCA+bJg\nbt6e2h7NEgKOF7w3kvhcWCaSbLDP5AjW/Clctn6tV0SXuuPfv4u/q+VTKaur\n3yqmpXnC2l3FfF0Nw5oN/XYpsIMMuG+nqEskqP+uW+1PDEKa1xrFSkPCr8yf\nzEtMhRLlk3KAsK/PIZppB49pTQKcGAR+yeeN509PwKthuEs8VtD9lNGXbYF5\njp0WpGmO+eZsYki86kxCOQ7vpLioarajaW5PiIbIpBqNwuk4yjKCcGMrczfS\nJBg0BJgqENZFB5gnra5O6zP1RATXipcROsNFqATeQIvNnb3KVf+WvMzwePRx\nNYq4BWqBsxnzSb6R1CQckAwQ9b/U1tPxrHj+Y9sP97xxy5HjLdZxa2TiqiUO\n2hHhQhHRet03Na+qpmDMPmdJ3mjpg7cJopG7IltqnsEvH+r25Bezw3i59A5a\neLm8tiEjiBSECRblFWK0fH9lh7T+nGCrCxlwlTsfdke2s4OfhxtFy3d9IKyQ\nzkP2GcHv2hoI7ZSWp/UPBGfj4RY=\n=EVpK\n-----END PGP MESSAGE-----\n",
        "net": "ALPHA"
    }
]
```

For more flexible interaction, use the `dbInitMessages` function.

```js
(async () => {
	let params = {
		net: 'ALPHA',
		getAll: false,
		getIndex: 'timestamp',
		getValue: 1738578534657
	};

	let dbName = 'nz_' + params.net;

	let db = await NZHUB.dbInitMessages(dbName).then((db) => { return db; });
	let transaction = db.transaction('messages', 'readwrite');
	let messages = transaction.objectStore('messages');

	let messageIndex = messages.index(params.getIndex);

	let request = messageIndex.getAll(params.getValue);

	let x = new Promise((resolve, reject) => {
		request.onsuccess = function() { resolve(request.result); }
		request.onerror = function() { reject('Error: ' + openRequest.error); }
	});
	let result = await x.then((value) => { return value; }).catch((error) => console.log(`${error}`));

	console.log(result);
})();
```


### Events

All events are added to the "document" element.

#### newMessage

`newMessage` - returns the body of the message received from the node. To intercept this event, use the following code:

```js
document.addEventListener("newMessage", (event) => {
	console.log(event.detail);
});
```


### License

[GNU Lesser General Public License](https://www.gnu.org/licenses/lgpl-3.0.en.html) (3.0 or any later version).
