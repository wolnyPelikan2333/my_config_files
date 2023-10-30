(function (_, AvastWRC, EventEmitter) {
	'use strict';
	var PROTO = AvastWRC.PROTO;

	if (typeof (PROTO) === 'undefined') PROTO = {};

	var Burger = {
		GLOBAL: {
			RECORD_PROTOVERSION: 15,
			IDENTITY_GUID: "",
			PRODUCT_CODE: 93, //https://cml.avast.com/display/FF/Avast+Analytics+Product+Code
			PRODUCT_VARIANT: null, //Avast or AVG variant of safeprice: Avast = 0 AVG = 1
			PRODUCT_VERSION: "",
			PRODUCT_INTERNALVERSION: "",
			PRODUCT_PLATAFORM: 0,
			PRODUCT_PLATAFORMVERSION: "",
			INIT_ME_CALLED: false, //to know if we have all we need to send to burger
			ENV: 0
		},
		Gpb: {},
		Collection: {
			events: {
				BATCH_MAX_MESSAGES: 20,
				SEND_INTERVAL_TIME: 300000, //5 * 60 * 1000 5 min
				EVENT_MAX_RESEND: 1,
				HEARTBEAT_EVENT_MAX_RESEND: 1
			}
		},
		Query: {},
		sendInterval: null
	};

	Burger.initGlobalData = function (_data, _sendAll) {
		var data = _data;
		var sendAll = _sendAll;
		// localstorage for test || default
		Burger.GLOBAL.ENV = AvastWRC.storageCache.get("server_burger") || AvastWRC.storageCache.get("server") || 0;
		Burger.Collection.events.BATCH_MAX_MESSAGES = AvastWRC.storageCache.get("max_burger_messages") || 20;
		Burger.Collection.events.SEND_INTERVAL_TIME = AvastWRC.storageCache.get("send_burger_interval") || 300000;

		var burgerConfigs = (AvastWRC.Shepherd) ? AvastWRC.Shepherd.getBurgerSendInfo() : null;
		if (burgerConfigs) {
			// localstorage for test || shepherd || default
			Burger.Collection.events.BATCH_MAX_MESSAGES = AvastWRC.storageCache.get("max_burger_messages") || burgerConfigs.BATCH_MAX_MESSAGES || 20;
			Burger.Collection.events.SEND_INTERVAL_TIME = AvastWRC.storageCache.get("send_burger_interval") || burgerConfigs.SEND_INTERVAL_TIME || 300000;
			Burger.Collection.events.EVENT_MAX_RESEND = burgerConfigs.EVENT_MAX_RESEND || 1;
			Burger.Collection.events.HEARTBEAT_EVENT_MAX_RESEND = burgerConfigs.HEARTBEAT_EVENT_MAX_RESEND || 1;
		}

		console.log("BURGER-> sendData CONFIGS: Burger.GLOBAL.ENV", Burger.GLOBAL.ENV, "Burger.Collection.events.BATCH_MAX_MESSAGES: ", Burger.Collection.events.BATCH_MAX_MESSAGES, "Burger.Collection.events.SEND_INTERVAL_TIME: ", Burger.Collection.events.SEND_INTERVAL_TIME);

		if (Burger.GLOBAL.INIT_ME_CALLED) {
			console.log("BURGER-> mergeGlobalData other times", data);
			Burger.mergeGlobalData(data);
			if (sendAll && Burger.GLOBAL.sendInterval === null) {
				console.log("BURGER-> mergeGlobalData called because of onTabRemoved");
				Burger.getDataAndStartSending();
			}
		} else {
			console.log("BURGER-> initGlobalData: ", JSON.parse(JSON.stringify(Burger.GLOBAL)), "new data: ", data);
			Burger.GLOBAL.IDENTITY_GUID = data.guid || "";
			Burger.GLOBAL.PRODUCT_VARIANT = data.variant;
			Burger.GLOBAL.PRODUCT_VERSION = data.version;
			Burger.GLOBAL.PRODUCT_INTERNALVERSION = data.internal_version;
			Burger.GLOBAL.PRODUCT_PLATAFORM = data.platform;
			Burger.GLOBAL.PRODUCT_PLATAFORMVERSION = data.platform_version;
			Burger.GLOBAL.INIT_ME_CALLED = true;
			console.log("BURGER-> initGlobalData first time");
			Burger.getDataAndStartSending();
		}
	};

	Burger.getDataAndStartSending = function () {
		Burger.Storage.initValue();
		AvastWRC.Burger.Collection.setSendInterval();
	};

	Burger.mergeGlobalData = function (data) {
		console.log("BURGER-> mergeGlobalData: ", JSON.parse(JSON.stringify(Burger.GLOBAL)), "new data: ", data);
		if (Burger.GLOBAL.IDENTITY_GUID !== data.guid && data.guid !== "") Burger.GLOBAL.IDENTITY_GUID = data.guid;
		if (Burger.GLOBAL.PRODUCT_VARIANT !== data.variant) Burger.GLOBAL.PRODUCT_VARIANT = data.variant;
		if (Burger.GLOBAL.PRODUCT_VERSION !== data.version) Burger.GLOBAL.PRODUCT_VERSION = data.version;
		if (Burger.GLOBAL.PRODUCT_INTERNALVERSION !== data.internal_version) Burger.GLOBAL.PRODUCT_INTERNALVERSION = data.internal_version;
		if (Burger.GLOBAL.PRODUCT_PLATAFORM !== data.platform) Burger.GLOBAL.PRODUCT_PLATAFORM = data.platform;
		if (Burger.GLOBAL.PRODUCT_PLATAFORMVERSION !== data.platform_version) Burger.GLOBAL.PRODUCT_PLATAFORMVERSION = data.platform_version;
	};
	/**
	* Fuction to define Gpb type
	*/
	Burger.Gpb.GpbType = function (id, multilicity, typeFunc) {
		return {
			options: {},
			multiplicity: multilicity || PROTO.optional,
			type: typeFunc,
			id: id
		};
	};

	/* Gpb Definition helper */
	Burger.Gpb.GPBD = {
		bytes: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.bytes; });
		},
		string: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.string; });
		},
		bool: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.bool; });
		},
		sint32: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.sint32; });
		},
		sint64: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.sint64; });
		},
		int32: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.int32; });
		},
		int64: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.int64; });
		},
		Double: function (id, repeated) {
			return Burger.Gpb.GpbType(id, repeated, function () { return PROTO.Double; });
		},
		cType: Burger.Gpb.GpbType
	};

	Burger.Gpb.Request = PROTO.Message("Burger.Gpb.Request", {
		Envelope: PROTO.Message("Burger.Gpb.Request.Envelope", {
			record: Burger.Gpb.GPBD.cType(1, PROTO.repeated, function () { return Burger.Gpb.Request.Envelope.Record; }),

			Record: PROTO.Message("Burger.Gpb.Request.Envelope.Record", {
				proto_version: Burger.Gpb.GPBD.int32(8, PROTO.optional),
				event: Burger.Gpb.GPBD.cType(2, PROTO.repeated, function () { return Burger.Gpb.Request.Envelope.Event; }),
				identity: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Request.Envelope.Identity; }),
				product: Burger.Gpb.GPBD.cType(4, PROTO.optional, function () { return Burger.Gpb.Request.Envelope.Product; }),
				connection: Burger.Gpb.GPBD.cType(10, PROTO.optional, function () { return Burger.Gpb.Request.Envelope.Connection; })
			}),

			Event: PROTO.Message("Burger.Gpb.Request.Envelope.Event", {
				type: Burger.Gpb.GPBD.int32(1, PROTO.repeated),
				time: Burger.Gpb.GPBD.sint64(2, PROTO.optional),
				time_zone: Burger.Gpb.GPBD.sint32(5, PROTO.optional),
				blob: Burger.Gpb.GPBD.bytes(11, PROTO.optional),
				blob_type: Burger.Gpb.GPBD.int32(12, PROTO.optional),

			}),

			Identity: PROTO.Message("Burger.Gpb.Request.Envelope.Identity", {
				guid: Burger.Gpb.GPBD.string(9, PROTO.optional)

			}),

			Product: PROTO.Message("Burger.Gpb.Request.Envelope.Product", {
				code: Burger.Gpb.GPBD.int32(7, PROTO.optional),
				version: Burger.Gpb.GPBD.bytes(2, PROTO.optional),
				internal_version: Burger.Gpb.GPBD.int32(9, PROTO.optional),
				variant: Burger.Gpb.GPBD.int32(8, PROTO.optional),
				platform: Burger.Gpb.GPBD.cType(3, PROTO.optional, function () { return Burger.Gpb.Request.Envelope.Product.Platform; }),
				platform_version: Burger.Gpb.GPBD.string(4, PROTO.optional),

				Platform: PROTO.Enum("Burger.Gpb.Request.Envelope.Product.Platform", {
					WINDOWS: 1,
					OSX: 2,
					IOS: 3,
					LINUX: 4,
					ANDROID: 5
				}),
			}),

			Connection: PROTO.Message("Burger.Gpb.Request.Envelope.Connection", {
				origin: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Request.Envelope.Connection.Origin; }),
				send_time: Burger.Gpb.GPBD.int64(2, PROTO.optional),

				Origin: PROTO.Enum("Burger.Gpb.Request.Envelope.Connection.Origin", {
					CLIENT: 1

				})
			}),
		}),
	});

	Burger.Gpb.Response = PROTO.Message("Burger.Gpb.Response", {
	});

	Burger.Build = {

		recordMessage: function (eventsToSend) {
			var record = new Burger.Gpb.Request.Envelope.Record();
			record.proto_version = Burger.GLOBAL.RECORD_PROTOVERSION;
			record.event = eventsToSend;
			record.identity = this.identityMessage();
			record.product = this.productMessage();
			record.connection = this.connectionMessage();
			//console.log("recordMessage: " + JSON.stringify(record));
			return record;
		},

		connectionMessage: function () {
			var connection = new Burger.Gpb.Request.Envelope.Connection();
			connection.origin = Burger.Gpb.Request.Envelope.Connection.Origin.CLIENT;
			connection.send_time = PROTO.I64.fromNumber(Math.round((new Date()).getTime() / 1000));
			//console.log("connectionMessage: " + connection);
			return connection;
		},

		productMessage: function () {
			var product = new Burger.Gpb.Request.Envelope.Product();
			product.code = Burger.GLOBAL.PRODUCT_CODE;
			product.version = PROTO.encodeUTF8(Burger.GLOBAL.PRODUCT_VERSION); //bytes
			product.internal_version = Burger.GLOBAL.PRODUCT_INTERNALVERSION;
			product.variant = Burger.GLOBAL.PRODUCT_VARIANT;
			product.platform = Burger.Gpb.Request.Envelope.Product.Platform[Burger.GLOBAL.PRODUCT_PLATAFORM];
			product.platform_version = Burger.GLOBAL.PRODUCT_PLATAFORMVERSION;
			//console.log("productMessage: " + JSON.stringify(product));
			return product;
		},

		identityMessage: function () {
			var identity = new Burger.Gpb.Request.Envelope.Identity();
			if (!Burger.GLOBAL.IDENTITY_GUID || Burger.GLOBAL.IDENTITY_GUID === "") {
				if (AvastWRC && AvastWRC.CONFIG) {
					if (AvastWRC.CONFIG.providerType && AvastWRC.CONFIG.providerType !== "") {
						Burger.GLOBAL.IDENTITY_GUID = AvastWRC.CONFIG.providerType || "";
						console.log("BURGER-> identityMessage.guid: ", Burger.GLOBAL.IDENTITY_GUID, " use test guid setBurgerGuid-> ", AvastWRC.CONFIG.providerType);
					}
					if (AvastWRC.CONFIG.GUID && AvastWRC.CONFIG.GUID !== "") {
						Burger.GLOBAL.IDENTITY_GUID = AvastWRC.CONFIG.GUID || "";
						console.log("BURGER-> identityMessage.guid: ", Burger.GLOBAL.IDENTITY_GUID, " use avast guid setBurgerGuid-> ", AvastWRC.CONFIG.GUID);
					}
				}
			}

			identity.guid = Burger.GLOBAL.IDENTITY_GUID;

			if((Burger.GLOBAL.ENV === "2" || Burger.GLOBAL.ENV === "3") &&  identity.guid === ""){
				identity.guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
			}
			console.log("Burger -> identityMessage: " + JSON.stringify(identity));
			return identity;
		},

		eventMessage: function (cliEvent) {
			if (!cliEvent || !cliEvent.blob) return null;

			var blobEventInfo = Burger.GLOBAL.BLOB_EVENTS_INFO[cliEvent.type];
			if (blobEventInfo === undefined) return null;

			var eventData = new Burger.Gpb.Request.Envelope.Event();

			eventData.type.push(blobEventInfo.firstLevel);
			eventData.type.push(blobEventInfo.secondLevel);
			eventData.type.push(blobEventInfo.thirdLevel);
			eventData.blob_type = blobEventInfo.type;

			eventData.blob = cliEvent.blob;

			var now = new Date(); // in case there is no time on the event set the time (now)
			if (cliEvent.time && cliEvent.time_zone) {
				eventData.time = PROTO.I64.fromNumber(cliEvent.time);
				eventData.time_zone = cliEvent.time_zone;
			} else {
				eventData.time = PROTO.I64.fromNumber(Math.round(now.getTime() / 1000.0));
				eventData.time_zone = now.getTimezoneOffset();
			}


			//console.log("eventMessage: " + JSON.stringify(eventData));

			return eventData;
		}
	};

	Burger.Storage = {
		initValue: function () {
			var value = AvastWRC.storageCache.get("BE");
			if (!value) {
				Burger.Collection.events.eventList = [];
				this.setValue(Burger.Collection.events.eventList);
				console.log("BURGER-> no value in localstorage");
			} else if (value) {
				Burger.Collection.events.eventList = JSON.parse(value);
				console.log("BURGER-> " + Burger.Collection.events.eventList.length + " events restored from localstorage");
			}
		},
		setValue: function (value) {
			AvastWRC.storageCache.save("BE",JSON.stringify(value));
		}
	};

	Burger.Collection = {
		events: {
			eventList: []
		},
		addEvent: function (eventDetails) {
			if(!AvastWRC.bal.settings.get().userSPPoppupSettings.privacy.accepted){
				// the user don't want us to track events so we save emty list to reset everything we could have
				Burger.Storage.setValue([]);
				return;
			}
			var blob = Burger.Build.blobMessage(eventDetails);
			if (blob === null) {
				console.log("BURGER-> Error unable to bluild blob -- event details: " + eventDetails);
				return;
			}

			var eventDate = new Date();

			var cliEvent = {
				type: eventDetails.eventType,
				blob: blob,
				time: Math.round(eventDate.getTime() / 1000.0),
				time_zone: eventDate.getTimezoneOffset(),
				resended: 0
			};

			//console.log("BURGER-> addEvent: before adding", JSON.parse(JSON.stringify(Burger.Collection.events.eventList)));
			Burger.Collection.events.eventList.push(cliEvent);
			Burger.Storage.setValue(Burger.Collection.events.eventList);
			//console.log("BURGER-> addEvent: after adding", JSON.parse(JSON.stringify(Burger.Collection.events.eventList)));

		},

		sendEvents: function () {
			if(!AvastWRC.bal.settings.get().userSPPoppupSettings.privacy.accepted){
				// the user don't want us to track events so we save emty list to reset everything we could have
				// return and not send any event
				Burger.Storage.setValue([]);
				return;
			}
			console.log("BURGER-> sendEvents called");
			if (!Burger.GLOBAL.INIT_ME_CALLED) {
				console.log("BURGER-> Burger was not initialized yet, can't send events");
				return;
			}
			//copy elements to be send remove all those elemments
			//make the request to burger.
			var eventsToSend = [];
			var numberOfEvents = Burger.Collection.events.eventList.length;
			while (numberOfEvents > 0) {
				if (numberOfEvents < Burger.Collection.events.BATCH_MAX_MESSAGES) {
					eventsToSend = Burger.Collection.events.eventList.splice(0, numberOfEvents);
				}
				else {
					eventsToSend = Burger.Collection.events.eventList.splice(0, Burger.Collection.events.BATCH_MAX_MESSAGES);
				}

				Burger.Storage.setValue(Burger.Collection.events.eventList);

				console.log("BURGER-> about to send " + eventsToSend.length + " events ", JSON.parse(JSON.stringify(eventsToSend)), "and left: " + Burger.Collection.events.eventList.length, JSON.parse(JSON.stringify(Burger.Collection.events.eventList)));

				if (eventsToSend && eventsToSend.length !== 0) {

					var eventMessage = [], elem = {};

					for (var i = 0; i < eventsToSend.length; i++) {

						elem = Burger.Build.eventMessage(eventsToSend[i]);

						if (elem && !_.isEmpty(elem)) {

							eventMessage.push(elem);

							//console.log("BURGER-> Element: ", i, JSON.parse(JSON.stringify(String.fromCharCode.apply(JSON, Burger.Query.__MASTER__.baToab(elem.blob)))));
						}

						elem = {};
					}
					if (eventMessage && eventMessage.length > 0) {

						var record = Burger.Build.recordMessage(eventMessage);

						//console.log("Record: " + JSON.stringify(record));
						var queryOptions = {
							record: record,
							eventsToSend: eventsToSend
						};

						console.log("BURGER-> sending queryOptions: ", JSON.parse(JSON.stringify(queryOptions)), " events list: ", JSON.parse(JSON.stringify(Burger.Collection.events.eventList)));

						new Burger.Query.Envelope(queryOptions);
					}
				}

				numberOfEvents = Burger.Collection.events.eventList.length;
			}
		},

		addEventsOnError: function (eventsToRestore) {
			console.log("BURGER-> addEventsOnError: Events list before adding", JSON.parse(JSON.stringify(Burger.Collection.events.eventList)));
			if (eventsToRestore.length > 0) {
				for (var i = 0; i < eventsToRestore.length; i++) {
					if((eventsToRestore[i].type !== "HEARTBEAT" && eventsToRestore[i].resended < Burger.Collection.events.EVENT_MAX_RESEND) ||
					  (eventsToRestore[i].type === "HEARTBEAT" && eventsToRestore[i].resended < Burger.Collection.events.HEARTBEAT_EVENT_MAX_RESEND)) {
						eventsToRestore[i].resended = eventsToRestore[i].resended + 1;
						Burger.Collection.events.eventList.push(eventsToRestore[i]);
						Burger.Storage.setValue(Burger.Collection.events.eventList);
					}
				}
			}
			console.log("BURGER-> addEventsOnError: Events list after add", JSON.parse(JSON.stringify(Burger.Collection.events.eventList)));
		},

		setSendInterval: function (sendNow) {
			if (Burger.GLOBAL.sendInterval) {
				clearInterval(Burger.GLOBAL.sendInterval);
				Burger.GLOBAL.sendInterval = null;
			}
			Burger.GLOBAL.sendInterval = setInterval(() => {
				Burger.Collection.sendEvents();
			}, Burger.Collection.events.SEND_INTERVAL_TIME);

			Burger.Collection.sendEvents();
		},

	};

	Burger.Query = {
		HEADERS: {
			//"Accept": "binary",
			//dataType: 'binary',
			"Content-Type": "application/octet-stream",
			//"Connection": "keep-alive" // refused in Chrome
		},
		SERVER: {
			0: "https://analytics.ff.avast.com:443/receive3",
			1: "https://analytics-stage.ff.avast.com:443/receive3",
			2: "https://analytics-stage.ff.avast.com:443/receive3",
			3: "https://analytics-stage.ff.avast.com:443/receive3",
		},
	};
	Burger.Utils = {
		cleanText: function (inputText) {
            if (inputText && inputText !== "") {
                return inputText.replace(/↵/g, " ").replace(/\|+|\¦/g, "").replace(/[<>]/g, "").replace(/(\r\n)+|\r+|\n+|↵/ig, " ").trim();
            }
            else {
                return "";
            }
        },
	};
	Burger.Query.__MASTER__ = {
		completed: false,
		/**
		 * Initialize UrlInfo request.
		 * @return {[type]} [description]
		 */
		init: function () {
			this.headers = _.extend({}, Burger.Query.HEADERS, this.headers);
			// Populate proto message
			this.message();
			// Send it to server
			if (this.options.go) this.post();
		},
		headers: {},
		/**
		 * Set an option value
		 * @param {String} option Property name
		 * @param {}     value  Property value
		 */
		set: function (option, value) {
			this.options[option] = value;
			return this;
		},
		/**
		 * Get an option value
		 * @param  {String} option Property name
		 * @return {}           Property value
		 */
		get: function (option) {
			return this.options[option];
		},
		/**
		 * return json string of the message
		 * @return {Object} Json representation of the GPB message
		 */
		toJSON: function () {
			var protoJSON = function (p) {
				var res = {};
				for (var prop in p.values_) {
					if (p.values_[prop].length) {
						// repeated message
						res[prop] = [];
						for (var i = 0, j = p.values_[prop].length; i < j; i++) {
							res[prop].push(protoJSON(p.values_[prop][i]));
						}
					} else if (p.values_[prop].properties_) {
						// composite message

						res[prop] = {};
						for (var krop in p.values_[prop].values_) {
							if (p.values_[prop].values_[krop] instanceof PROTO.I64) {
								// convert PROTO.I64 to number
								res[prop][krop] = p.values_[prop].values_[krop].toNumber();
							} else {
								res[prop][krop] = p.values_[prop].values_[krop];
							}
						}
					} else {
						// value :: deprecated - remove it
						res[prop] = p.values_[prop];
					}
				}
				return res;
			};
			return protoJSON(this.response);
		},
		/**
		 * Send request to server
		 * @return {Object} Self reference
		 */
		post: function () {
			if (this.options.server.indexOf(":null") !== -1) {
				return this;
			}

			var buffer = this.getBuffer(this.request);
			//console.log("Request:", JSON.stringify(this.request.message_type_), this.options.server, JSON.stringify(this.request.values_));

			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open(this.options.method.toUpperCase(), this.options.server, true);
			xhr.responseType = "arraybuffer";
			xhr.withCredentials = false;
			xhr.timeout = this.options.timeout || 0; // default to no timeout

			for (var prop in this.headers) {
				xhr.setRequestHeader(prop, this.headers[prop]);
			}

			xhr.onload = function (e) {
				var status = 0;
				var errorCodes = [400, 401, 403, 405, 406, 408, 413, 414, 500];
				if (typeof e.srcElement !== "undefined") {
					status = e.srcElement.status;
				}
				else if (typeof e.target !== "undefined") {
					status = e.target.status;
				}
				var bodyEncodedInString = String.fromCharCode.apply(String, new Uint8Array(xhr.response));
				if (errorCodes.indexOf(status) > -1) {
					console.log("BURGER-> Response Status: " + status + " Error: " + bodyEncodedInString);
					Burger.Collection.addEventsOnError(self.options.eventsToSend);
					self.options.eventsToSend = [];
				}
				else {
					console.log("BURGER-> Response Status: " + status + " Message: " + bodyEncodedInString);
				}
				//self.callback(xhr.response);
			};
			xhr.onerror = function () {
				Burger.Collection.addEventsOnError(self.options.eventsToSend);
				self.options.eventsToSend = [];
			};
			xhr.ontimeout = function () {
				Burger.Collection.addEventsOnError(self.options.eventsToSend);
				self.options.eventsToSend = [];
			};

			xhr.send(buffer);

			return this;
		},
		/**
		 * Convert message to ArrayBuffer
		 * @param  {Object} message Message instance
		 * @return {Array}         Array Buffer
		 */
		getBuffer: function (message) {

			var stream = new PROTO.ByteArrayStream();
			message.SerializeToStream(stream);
			return this.baToab(stream.getArray());
		},
		/**
		 * Handle server response
		 * @param  {Array}   arrayBuffer Incoming message
		 * @return {void}
		 */
		callback: function (arrayBuffer) {
			var format = this.options.format;
			var res = null;
			if ('string' === format) {
				res = String.fromCharCode.apply(String, this.abToba(arrayBuffer));
			} else {
				console.log('BURGER-> Response:', JSON.stringify(res));
				this.parser(arrayBuffer);

				if (this.updateCache) { this.updateCache(); }

				if ('json' === format) {
					res = this.toJSON();
				}
				else if ('object' === format) {
					res = this.format();
				}
				else {
					res = this.response;
				}
			}

			console.log('BURGER-> Response:', JSON.stringify(res));
			this.options.callback(res);
			this.completed = true;
		},
		/**
		 * Handle error responses
		 * @param  {Object} xhr xmlhttp request object
		 * @return {void}
		 */
		error: function (xhr) {
			if (this.options.error) this.options.error(xhr);
		},
		/**
		 * Placeholder - each Instance can override this to format the message
		 * @return {[type]} [description]
		 */

		format: function () {
			return { error: "This call has now formatting message.", message: this.response };
		},
		/**
		 * parse arrayBuffer into a ProtoJS response
		 * @param  {Array} arrayBuffer
		 * @return {void}
		 */
		parser: function (arrayBuffer) {
			this.response.ParseFromStream(new PROTO.ByteArrayStream(this.abToba(arrayBuffer)));
		},
		/**
		 * ByteArray to ArrayBuffer
		 * @param  {Object} data [description]
		 * @return {Array}
		 */
		baToab: function (data) {
			var buf = new ArrayBuffer(data.length);

			var bytes = new Uint8Array(buf);
			for (var i = 0; i < bytes.length; i++) {
				bytes[i] = data[i] % 256;
			}

			return bytes;
		},
		/**
		 * ArrayBuffer to ByteArray
		 * @param  {Array} arrayBuffer [description]
		 * @return {Array}             [description]
		 */
		abToba: function (arrayBuffer) {
			if (arrayBuffer === null) return [];
			var bytes = new Uint8Array(arrayBuffer);
			var arr = [];
			for (var i = 0; i < bytes.length; i++) {
				arr[i] = bytes[i] % 256;
			}
			return arr;
		},
	};

	Burger.Query.Envelope = function (options) {
		if (!options) return false; // no record data

		this.options = _.extend({
			server: Burger.Query.SERVER[Burger.GLOBAL.ENV],
			method: "post",
			timeout: 10000, // 10s
			callback: _.noop,
			format: "object", // return response in JSON
			go: true, // true = trigger the request immediately
		}, options);

		this.request = new Burger.Gpb.Request.Envelope();
		this.response = new Burger.Gpb.Response();
		this.init();
	};

	Burger.Query.Envelope.prototype = _.extend({}, Burger.Query.__MASTER__, {
		/**
		 * build PROTO message
		 */
		message: function () {
			this.request.record.push(this.options.record);

			return this;
		},
	});

	_.extend(Burger, {
		/**
		* EventEmitter instance to hangle background layer events.
		* @type {Object}
		*/
		_ee: new EventEmitter({ wildcard: true, delimiter: ".", }),
		/**
		 * Register events with instance of EventEmitter.
		 * @param  {Object} callback to register with instance of eventEmitter
		 * @return {void}
		 */
		registerEvents: function (registerCallback, thisArg) {
			if (typeof registerCallback === "function") {
				registerCallback.call(thisArg, this._ee);
			}
		},
		// TODO mean to unregister the events
		/**
		 * Emit background event
		 * @param {String} event name
		 * @param {Object} [arg1], [arg2], [...] event arguments
		 */
		emitEvent: function () {
			// delegate to event emitter
			this._ee.emit.apply(this._ee, arguments);
		},
	});

	Burger.registerEvents(function (ee) {
		ee.on('burger.initme', Burger.initGlobalData); // to initialize some specific data and send all event if it is
		ee.on('burger.newEvent', Burger.Collection.addEvent); //every time an event occur add it to the list to be send
	});

	// export as AvastWRC.Burger
	AvastWRC.Burger = Burger;
}).call(this, _, AvastWRC, EventEmitter2);


(function (_, AvastWRC) {
	'use strict';
	var Burger = (AvastWRC.Burger) ? AvastWRC.Burger : {};
	var PROTO = (AvastWRC.PROTO) ? AvastWRC.PROTO : {};
	var SafeShopOfferGPB = (AvastWRC.gpb && AvastWRC.gpb.All && AvastWRC.gpb.All.SafeShopOffer) ? AvastWRC.gpb.All.SafeShopOffer : {};
	_.extend(Burger.GLOBAL, {
		BLOB_EVENTS_INFO: {
			//SPMPClientEvents$ClientEvent
			"SAFE_SHOP_DOMAIN_VISITED": { firstLevel: 55, secondLevel: 1, thirdLevel: 1, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.1
			"SHOW_BAR": { firstLevel: 55, secondLevel: 1, thirdLevel: 2, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.2
			"HIDE_ON_THIS_DOMAIN": { firstLevel: 55, secondLevel: 1, thirdLevel: 3, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.3
			"SHOW_ON_THIS_DOMAIN": { firstLevel: 55, secondLevel: 1, thirdLevel: 4, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.4
			"HIDE_ON_ALL_DOMAINS": { firstLevel: 55, secondLevel: 1, thirdLevel: 5, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.5
			"SHOW_ON_ALL_DOMAINS": { firstLevel: 55, secondLevel: 1, thirdLevel: 6, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.6
			"SHOW_HELP": { firstLevel: 55, secondLevel: 1, thirdLevel: 7, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.7
			"CLOSE_BAR": { firstLevel: 55, secondLevel: 1, thirdLevel: 8, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.8
			"BAR_SHOWN": { firstLevel: 55, secondLevel: 1, thirdLevel: 9, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.9
			"AVAST_WEBSITE": { firstLevel: 55, secondLevel: 1, thirdLevel: 10, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.10
			"RATE_GOOD": { firstLevel: 55, secondLevel: 1, thirdLevel: 11, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.11
			"NO_RATE": { firstLevel: 55, secondLevel: 1, thirdLevel: 12, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.12
			"RATE_BAD": { firstLevel: 55, secondLevel: 1, thirdLevel: 13, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.13
			"SHOW_ON_BOARDING": { firstLevel: 55, secondLevel: 1, thirdLevel: 14, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.14
			"HEARTBEAT": { firstLevel: 55, secondLevel: 1, thirdLevel: 15, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.15
			"AFSRC_MATCHING": { firstLevel: 55, secondLevel: 1, thirdLevel: 16, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.16
			"SHOW_SETTINGS_FROM_BAR": { firstLevel: 55, secondLevel: 1, thirdLevel: 17, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.17
			"SHOW_SETTINGS_FROM_CUSTOM_MENU": { firstLevel: 55, secondLevel: 1, thirdLevel: 18, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.18
			"BAR_SHOWN_AFTER_FIRST_REQUEST": { firstLevel: 55, secondLevel: 1, thirdLevel: 19, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.19
			"BAR_SHOWN_AFTER_SECOND_REQUEST": { firstLevel: 55, secondLevel: 1, thirdLevel: 20, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.20			
			"NOTIFICATIONS": { firstLevel: 55, secondLevel: 1, thirdLevel: 21, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.21			
			"NOTIFICATIONS_BAR": { firstLevel: 55, secondLevel: 1, thirdLevel: 22, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.22			
			"NOTIFICATIONS_MINIMIZED": { firstLevel: 55, secondLevel: 1, thirdLevel: 23, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.23			
			"MAIN_UI": { firstLevel: 55, secondLevel: 1, thirdLevel: 24, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.24			
			"EXTENSION_ICON": { firstLevel: 55, secondLevel: 1, thirdLevel: 25, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.25
			"SETTINGS_EVENTS": { firstLevel: 55, secondLevel: 1, thirdLevel: 26, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.26
			"FEEDBACK": { firstLevel: 55, secondLevel: 1, thirdLevel: 27, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.27
			"SOCIAL_CARD": { firstLevel: 55, secondLevel: 1, thirdLevel: 28, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.28
			"MINIMIZED_MAINUI": { firstLevel: 55, secondLevel: 1, thirdLevel: 29, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.29
			"SECURITY": { firstLevel: 55, secondLevel: 1, thirdLevel: 30, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.30
			"DEEP_INTEGRATION": { firstLevel: 55, secondLevel: 1, thirdLevel: 31, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.31
			"DIALOGS": { firstLevel: 55, secondLevel: 1, thirdLevel: 32, type: 1 }, //SPMPClientEvents$ClientEvent 55.1.31
			//SPMPClientEvents$PickedOfferEvent
			"OFFER_PICKED": { firstLevel: 55, secondLevel: 2, thirdLevel: 1, type: 1 }, //SPMPClientEvents$PickedOfferEvent 55.2.1
			//SPMPClientEvents$UserSettingsChanged
			"SAVE_SETTINGS": { firstLevel: 55, secondLevel: 5, thirdLevel: 1, type: 1 }, //SPMPClientEvents$UserSettingsChanged 55.5.1
			"OFFERS_RATING": { firstLevel: 55, secondLevel: 9, thirdLevel: 1, type: 1 }, //SPMPClientEvents$UserSettingsChanged 55.9.1
			"USER_REPORTS": { firstLevel: 55, secondLevel: 10, thirdLevel: 1, type: 1 } //SPMPClientEvents$UserReports 55.10.1
		}
	});
	_.extend(Burger.Gpb, {
		Blob: PROTO.Message("Burger.Gpb.Blob", {
			/**************************************************************************/
			/* Client Identity												  		  */
			/**************************************************************************/
			ClientInfo: SafeShopOfferGPB.ClientInfo,
			/**************************************************************************/
			/* ende Client Identity												  	  */
			/**************************************************************************/
			/**************************************************************************/
			/* Picked offer										  					  */
			/**************************************************************************/
			PickedOffer: PROTO.Message("Burger.Gpb.Blob.PickedOffer", {

				GeneralOffer: SafeShopOfferGPB.OfferResponse.GeneralOffer,

				Product: SafeShopOfferGPB.OfferResponse.Product,

				Accommodation: SafeShopOfferGPB.OfferResponse.Accommodation,

				Voucher: SafeShopOfferGPB.OfferResponse.Voucher,

				Redirect: SafeShopOfferGPB.OfferResponse.Redirect,

				Query: SafeShopOfferGPB.OfferResponse.Query,

				product: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Product; }),
				voucher: Burger.Gpb.GPBD.cType(2, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Voucher; }),
				accommodation: Burger.Gpb.GPBD.cType(3, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Accommodation; }),
				query: Burger.Gpb.GPBD.cType(4, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Query; }),
				redirect: Burger.Gpb.GPBD.cType(5, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Redirect; }),
				show_offer_notification: Burger.Gpb.GPBD.bool(6, PROTO.optional),
				list_position: Burger.Gpb.GPBD.int32(7, PROTO.optional),
				available_price_comparison: Burger.Gpb.GPBD.int32(8, PROTO.optional),
				context_voucher: Burger.Gpb.GPBD.cType(9, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Voucher; }),
			}),
			/**************************************************************************/
			/* ende Picked offer								  					  */
			/**************************************************************************/
			/**************************************************************************/
			/* BLOB-SPMP  	SafepriceMultiprovider Events  					 	      */
			/**************************************************************************/
			OfferRating: PROTO.Message("Burger.Gpb.Blob.OfferRating", {
				client: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Blob.ClientInfo; }),
				url: Burger.Gpb.GPBD.string(2, PROTO.optional),
				rating: Burger.Gpb.GPBD.int32(3, PROTO.optional),
				voucher: Burger.Gpb.GPBD.cType(4, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Voucher; }),
				context_voucher: Burger.Gpb.GPBD.cType(5, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer.Voucher; })
			}),
			/**************************************************************************/
			/* ende Rating Offers								  					  */
			/**************************************************************************/
			/**************************************************************************/
			/* BLOB-SPMP  	SafepriceMultiprovider Events  					 	      */
			/**************************************************************************/
			/* Container for client events 											  */
			ClientEvent: PROTO.Message("Burger.Gpb.Blob.ClientEvent", {

				AditionalInfo: PROTO.Message("Burger.Gpb.Blob.ClientEvent.AditionalInfo", {

					EventType: PROTO.Enum("Burger.Gpb.Blob.ClientEvent.AditionalInfo.EventType", {
						UNKNOWN_EVENT: 0,
						SHOWN: 1,
						CLICKED_SETTINGS: 2,
						CLICKED_MINIMIZE: 3,
						CLICKED_X: 4,
						CLICKED_CTA: 5,
						DRAGGED: 6,
						HIGHLIGHTED: 7,
						CLICKED_HELP: 8,
						CLICKED_LOGO: 9,
						CLICKED_OFFERS_TAB: 10,
						CLICKED_COUPONS_TAB: 11,
						CLICKED_OTHERS_TAB: 12,
						CLICKED_FAQS: 13,
						CLICKED_RATE_GOOD: 14,
						CLICKED_RATE_BAD: 15,
						CLICKED_ASK_ME_LATER: 16,
						CLICKED_F: 17,
						CLICKED_T: 18,
						CLICKED_CONTINUE: 19,
						FAILED_STRING_MATCHING: 20,
						FAILED_FIND_ELEMENT: 21,
						FAILED_INJECT: 22
					}),

					UiCategory: PROTO.Enum("Burger.Gpb.Blob.ClientEvent.AditionalInfo.UiCategory", {
						UNKNOWN_CATEGORY: 0,
						LOADING: 1, //not in use
						OFFERS: 2,
						COUPONS: 3,
						OFFERS_AND_COUPONS: 4,
						SPECIAL_DEALS: 5,
						SIMILAR_COUPONS: 6,
						ALTERNATIVE_HOTELS: 7,
						POPULAR_HOTELS: 8,
						DEAL_SEARCH: 9,
						OFFERS_TAB_HIGHLIGHTED: 10,
						COUPONS_TAB_HIGHLIGHTED: 11,
						OTHERS_TAB_HIGHLIGHTED: 12,
						COUPON_APPLIED_NOTIFICATION: 13,
						MAIN: 14,
						LIKE: 15,
						DISLIKE: 16,
						TOP: 17,
						BOTTOM: 18,
						BAD_SHOP: 19,
						PHISHING: 20,
						TOOLTIP_CLICK_X: 21,
						REPORT_TYPE: 22,
						REPORT_GENERAL: 23,
						REPORT_SHOP: 24,
						SETTINGS_TOOLTIP: 25,
						CHECKOUT_COUPONS: 26
					}),

					UiSource: PROTO.Enum("Burger.Gpb.Blob.ClientEvent.AditionalInfo.UiSource", {
						UNKNOWN: 0,
						MAIN_UI_OFFERS_TAB: 1, //not in use
						MAIN_UI_COUPONS_TAB: 2,
						CHECKOUT: 3
					}),

					event_type: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Blob.ClientEvent.AditionalInfo.EventType; }),
					ui_category: Burger.Gpb.GPBD.cType(2, PROTO.optional, function () { return Burger.Gpb.Blob.ClientEvent.AditionalInfo.UiCategory; }),
					ui_source: Burger.Gpb.GPBD.cType(3, PROTO.optional, function () { return Burger.Gpb.Blob.ClientEvent.AditionalInfo.UiSource; }),
					ui_id: Burger.Gpb.GPBD.string(4, PROTO.optional)
				}),

				client: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Blob.ClientInfo; }),
				url: Burger.Gpb.GPBD.string(2, PROTO.optional),
				aditional_info: Burger.Gpb.GPBD.cType(3, PROTO.optional, function () { return Burger.Gpb.Blob.ClientEvent.AditionalInfo; }),

			}),
			/*Client Event (Picked offer)											  */
			PickedOfferEvent: PROTO.Message("Burger.Gpb.Blob.PickedOfferEvent", {

				ClickType: PROTO.Enum("Burger.Gpb.Blob.PickedOfferEvent.ClickType", {
					UNDEFINED: 0,
					LEFT: 1,
					MIDDLE: 2,
					RIGHT: 3
				}),

				UiSource: PROTO.Enum("Burger.Gpb.Blob.PickedOfferEvent.UiSource", {
					UNKNOWN: 0,
					NOTIFICATION: 1,
					NOTIFICATION_BAR: 2,
					MAIN_UI_ITEM: 3,
					MAIN_UI_ITEM_APPLIED: 4,
					MINIMIZED_MAINUI_ITEM: 5,
					DEEP_INTEGRATION: 6,
					SEARCH: 7,
					CHECKOUT_MAINUI_ITEM: 8,
					MAINUI_EMPTYSEARCH: 9
				}),

				client: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Blob.ClientInfo; }),
				url: Burger.Gpb.GPBD.string(2, PROTO.optional),
				picked_offer: Burger.Gpb.GPBD.cType(3, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOffer; }),
				provider_id: Burger.Gpb.GPBD.string(4, PROTO.optional),
				query: Burger.Gpb.GPBD.string(5, PROTO.optional),
				best_offer: Burger.Gpb.GPBD.bool(6, PROTO.optional),
				clickType: Burger.Gpb.GPBD.cType(7, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOfferEvent.ClickType; }),
				ui_source: Burger.Gpb.GPBD.cType(8, PROTO.optional, function () { return Burger.Gpb.Blob.PickedOfferEvent.UiSource; }),
				ui_id: Burger.Gpb.GPBD.string(9, PROTO.optional)
			}),
			/* Container for settings events										  */
			UserSettingsChanged: PROTO.Message("Burger.Gpb.Blob.UserSettingsChanged", {
				client: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Blob.ClientInfo; }),
				new_settings: Burger.Gpb.GPBD.cType(2, PROTO.optional, function () { return Burger.Gpb.Blob.ClientInfo.UserSettings; }),
			}),
			/* Container for Users reports  										  */
			UserReports: PROTO.Message("Burger.Gpb.Blob.UserReports", {
				ReportReason: PROTO.Enum("Burger.Gpb.Blob.UserReports.ReportReason", {
					ORDERED_SOMETHING_DIFFERENT: 0,
					PAID_DID_NOT_GET: 1,
					OTHER: 2
				}),

				ShopReport: PROTO.Message("Burger.Gpb.Blob.UserReports.ShopReport", {
					shop_name: Burger.Gpb.GPBD.string(1, PROTO.optional),
					product_ordered: Burger.Gpb.GPBD.string(2, PROTO.optional),
					report_reason: Burger.Gpb.GPBD.cType(3, PROTO.repeated, function () { return Burger.Gpb.Blob.UserReports.ReportReason; }),
					text: Burger.Gpb.GPBD.string(4, PROTO.optional),
				}),

				GeneralReport: PROTO.Message("Burger.Gpb.Blob.UserReports.GeneralReport", {
					text: Burger.Gpb.GPBD.string(1, PROTO.optional),
				}),

				client: Burger.Gpb.GPBD.cType(1, PROTO.optional, function () { return Burger.Gpb.Blob.ClientInfo; }),
				url: Burger.Gpb.GPBD.string(2, PROTO.optional),
				shop_report: Burger.Gpb.GPBD.cType(3, PROTO.optional, function () { return Burger.Gpb.Blob.UserReports.ShopReport; }),
				general_report: Burger.Gpb.GPBD.cType(4, PROTO.optional, function () { return Burger.Gpb.Blob.UserReports.GeneralReport; })
			}),
		})
	});
	_.extend(Burger.Build, {
		browserInfo: function (browserInfo) {
			var _browserInfo = new Burger.Gpb.Blob.ClientInfo.Browser();
			_browserInfo.type = browserInfo.type;
			_browserInfo.version = browserInfo.version;
			_browserInfo.language = browserInfo.language;
			//console.log("browserInfo: " + JSON.stringify(_browserInfo));
			return _browserInfo;
		},

		extensionInfo: function (extensionInfo) {
			var _extensionInfo = new Burger.Gpb.Blob.ClientInfo.Extension();
			_extensionInfo.type = extensionInfo.type;
			_extensionInfo.version = extensionInfo.version;
			//console.log("extensionInfo: " + JSON.stringify(_extensionInfo));
			return _extensionInfo;
		},

		userSettings: function (userSettings) {
			if (!userSettings) return null;
			var _userSettings = new Burger.Gpb.Blob.ClientInfo.UserSettings();
			_userSettings.show_automatic = userSettings.show_automatic;
			_userSettings.advanced = new Burger.Gpb.Blob.ClientInfo.UserSettings.Advanced();
			_userSettings.advanced.offers_configs = new Burger.Gpb.Blob.ClientInfo.UserSettings.Advanced.OffersConfigs();
			_userSettings.advanced.offers_configs.offer_limit = userSettings.advanced.offers_configs.offer_limit;
			_userSettings.advanced.offers_configs.offers_visibility = userSettings.advanced.offers_configs.offers_visibility;
			_userSettings.advanced.offers_configs.accommodation_limit = userSettings.advanced.offers_configs.accommodation_limit;
			_userSettings.advanced.offers_configs.include_flag = userSettings.advanced.offers_configs.include_flag;

			_userSettings.advanced.coupons_configs = new Burger.Gpb.Blob.ClientInfo.UserSettings.Advanced.CouponsConfigs();
			_userSettings.advanced.coupons_configs.coupons_visibility = userSettings.advanced.coupons_configs.coupons_visibility;
			_userSettings.advanced.redirect_configs = new Burger.Gpb.Blob.ClientInfo.UserSettings.Advanced.RedirectConfigs();
			_userSettings.advanced.redirect_configs.redirect_visibility = userSettings.advanced.redirect_configs.redirect_visibility;
			_userSettings.custom_list = userSettings.custom_list;
			//console.log("user settings: " + JSON.stringify(_userSettings));
			return _userSettings;
		},
		userReportsMessage: function (eventDetails) {
			var userReports = new Burger.Gpb.Blob.UserReports();

			if (!eventDetails) return userReports;
			userReports.url = eventDetails.url ? eventDetails.url : "";
			if (eventDetails.type === "REPORT_GENERAL") {
				userReports.general_report = new Burger.Gpb.Blob.UserReports.GeneralReport();
				userReports.general_report.text = eventDetails.text;
			} else if (eventDetails.type === "REPORT_SHOP") {
				userReports.shop_report = new Burger.Gpb.Blob.UserReports.ShopReport();
				userReports.shop_report.shop_name = eventDetails.shopName;
				userReports.shop_report.product_ordered = eventDetails.productOrdered;
				userReports.shop_report.report_reason.push(Burger.Gpb.Blob.UserReports.ReportReason[eventDetails.reportReason]);
				if (Burger.Gpb.Blob.UserReports.ReportReason[eventDetails.reportReason] === 2) {
					userReports.shop_report.text = eventDetails.text;
				}
			}
			return userReports;
		},

		clientInfoMessage: function (clientInfo) {
			var _clientInfo = new Burger.Gpb.Blob.ClientInfo();
			_clientInfo.language = clientInfo.language;
			_clientInfo.referer = "";
			_clientInfo.transaction_id = clientInfo.transaction_id;
			_clientInfo.request_id = clientInfo.request_id;
			_clientInfo.extension_guid = clientInfo.extension_guid;
			_clientInfo.browser = this.browserInfo(clientInfo.browser);
			_clientInfo.extension = this.extensionInfo(clientInfo.extension);
			_clientInfo.campaign_id = clientInfo.campaign_id;
			_clientInfo.source_id = clientInfo.source_id;
			_clientInfo.user_settings = this.userSettings(clientInfo.user_settings);
			_clientInfo.install_time = PROTO.I64.fromNumber(clientInfo.install_time);
			//console.log("clientInfoMessage: " + JSON.stringify(_clientInfo));
			return _clientInfo;
		},

		buildAditionalInfoMessage: function (data) {
			if (!data || (data && !data.type && !data.category && !data.uiSource && data.ui_id)) {
				return null;
			}
			var aditionalInfo = new Burger.Gpb.Blob.ClientEvent.AditionalInfo();
			aditionalInfo.event_type = data.type ? Burger.Gpb.Blob.ClientEvent.AditionalInfo.EventType[data.type] : null;
			aditionalInfo.ui_category = data.category ? Burger.Gpb.Blob.ClientEvent.AditionalInfo.UiCategory[data.category] : null;
			aditionalInfo.ui_source = data.uiSource ? Burger.Gpb.Blob.ClientEvent.AditionalInfo.UiSource[data.uiSource] : null;
			aditionalInfo.ui_id = data.ui_id ? data.ui_id : null;
			return aditionalInfo;
		},

		buildCouponMessage: function () {
			var voucher = new Burger.Gpb.Blob.PickedOffer.Voucher();
			return voucher;
		},
		addCouponInfoToMessage: function (voucherMessage, info) {
			voucherMessage.title = Burger.Utils.cleanText(info.title || "");
			voucherMessage.url = info.url || "";
			voucherMessage.affiliate = info.affiliate || "";
			voucherMessage.value = info.value || 0;
			voucherMessage.expire_date = info.expireDate || "";
			voucherMessage.code = info.code || "";
			voucherMessage.text = Burger.Utils.cleanText(info.text || "");
			voucherMessage.free_shipping = info.freeShipping || 0;
			voucherMessage.type = info.type || 0;
			voucherMessage.provider_id = info.providerId || "";
			voucherMessage.affiliate_image = info.affiliateImage || "";
			voucherMessage.context_info = info.contextInfo || "";
			voucherMessage.affiliate_domain = info.affiliateDomain || "";
			voucherMessage.highlight = info.highlight || false
		},

		buildProductMessage: function (offer, offerCategory) {
			var product = new Burger.Gpb.Blob.PickedOffer.Product();
			product.offer = new Burger.Gpb.Blob.PickedOffer.GeneralOffer();
			if (offerCategory === "PRODUCT") {
				product.offer.title = Burger.Utils.cleanText(offer.title || "");
				product.offer.price = offer.price || 0;
				product.offer.formatted_price = offer.formattedPrice || "";
				product.offer.url = offer.url || "";
				product.offer.affiliate = offer.affiliate || "";
				product.offer.affiliate_domain = offer.affiliateDomain || "";
				product.availability = offer.availability || "";
				product.availability_code = offer.availabilityCode || "";
				product.saving = offer.saving || "";
				product.shipping = offer.shipping || "";
				product.offer.provider_id = offer.providerId || "";
			}
			return product;

		},

		buildAccommodationMessage: function (offer, offerCategory) {
			var accommodation = new Burger.Gpb.Blob.PickedOffer.Accommodation();
			accommodation.offer = new Burger.Gpb.Blob.PickedOffer.GeneralOffer();
			if (offerCategory === "ACCOMMODATION") {
				accommodation.offer.title = Burger.Utils.cleanText(offer.title || "");
				accommodation.offer.price = offer.price || 0;
				accommodation.offer.formatted_price = offer.formattedPrice || "";
				accommodation.offer.url = offer.url || "";
				accommodation.offer.affiliate = offer.affiliate || "";
				accommodation.offer.affiliate_domain = offer.affiliateDomain || "";
				accommodation.priority = offer.priority || 0;
				accommodation.address = offer.address || "";
				accommodation.stars = offer.originalStars || 0;
				accommodation.additional_fees = offer.additionalFees || 0;
				accommodation.price_netto = offer.priceNetto || 0;
				accommodation.saving = offer.saving || "";
				accommodation.type = offer.type || 0;
				accommodation.stars_precise = offer.starsPrecise || 0;
				accommodation.city = offer.city || "";
				accommodation.offer.provider_id = offer.providerId || "";
			}
			return accommodation;
		},

		buildRedirectMessage: function (offer, offerCategory) {
			var redirect = new Burger.Gpb.Blob.PickedOffer.Redirect();
			if (offerCategory === "REDIRECT") {
				redirect.title = Burger.Utils.cleanText(offer.title || "");
				redirect.url = offer.url || "";
				redirect.formatted_price = offer.formattedPrice || "";
				redirect.availability = offer.availability || "";
				redirect.button_text = offer.buttonText || 0;
				redirect.info_text = Burger.Utils.cleanText(offer.infoText || "");
				redirect.category = offer.category || 0;
				redirect.sub_category = offer.subCategory || 0;
				redirect.provider_id = offer.providerId || "";
				redirect.provider_redirect_id = offer.providerRedirectId || "";
			}
			return redirect;
		},

		pickedOfferMessage: function (offer, offerQuery, offerCategory) {

			var pickedOffer = new Burger.Gpb.Blob.PickedOffer();

			pickedOffer.product = this.buildProductMessage(offer, offerCategory);
			pickedOffer.voucher = this.buildCouponMessage();
			if (offerCategory === "VOUCHER") {
				this.addCouponInfoToMessage(pickedOffer.voucher, offer);
			}
			pickedOffer.context_voucher = this.buildCouponMessage();
			if (offerCategory === "CONTEXT_VOUCHER") {
				this.addCouponInfoToMessage(pickedOffer.context_voucher, offer);
			}
			pickedOffer.accommodation = this.buildAccommodationMessage(offer, offerCategory);
			pickedOffer.redirect = this.buildRedirectMessage(offer, offerCategory);

			pickedOffer.query = new Burger.Gpb.Blob.PickedOffer.Query();
			if (offerQuery) {
				pickedOffer.query.price = offerQuery.price || 0;
				pickedOffer.query.formatted_price = offerQuery.formatted_price || "";
			}

			pickedOffer.show_offer_notification = offer.showOffersNotification;

			pickedOffer.list_position = offer.listPosition;

			pickedOffer.available_price_comparison = offer.showPriceComparisonNotification;


			return pickedOffer;
		},

		blobMessage: function (eventDetails) {
			// safe price specific blob parameter			

			var blobEventInfo = Burger.GLOBAL.BLOB_EVENTS_INFO[eventDetails.eventType];
			if (blobEventInfo === undefined) {
				console.log("BURGER-> error blobMessage type not defined-- eventDetails: " + JSON.parse(JSON.stringify(eventDetails)));
				return null;
			}
			var blob;
			var offer = eventDetails.offer ? eventDetails.offer : null;
			var offerQuery = eventDetails.offerQuery ? eventDetails.offerQuery : null;
			var offerCategory = eventDetails.offerCategory ? eventDetails.offerCategory : "";
			if (blobEventInfo.secondLevel === 2 && offer !== null && offerCategory !== "") {
				blob = new Burger.Gpb.Blob.PickedOfferEvent();
				blob.picked_offer = this.pickedOfferMessage(offer, offerQuery, offerCategory);
				blob.provider_id = eventDetails.providerId ? eventDetails.providerId : "";
				blob.query = "";
				blob.best_offer = eventDetails.bestOffer ? eventDetails.bestOffer : "";
				blob.clickType = eventDetails.clickType ? eventDetails.clickType : 0;
				blob.ui_source = Burger.Gpb.Blob.PickedOfferEvent.UiSource[eventDetails.uiSource] || 0;
				blob.ui_id = eventDetails.ui_id ? eventDetails.ui_id : null;
				console.log("BURGER-> PickedOffer details: " + JSON.parse(JSON.stringify(eventDetails)));
				blob.url = eventDetails.url ? eventDetails.url : "";
			}
			else if (blobEventInfo.secondLevel === 1) {
				blob = new Burger.Gpb.Blob.ClientEvent();
				blob.url = eventDetails.url ? eventDetails.url : "";

				if (blobEventInfo.thirdLevel >= 21) {
					blob.aditional_info = this.buildAditionalInfoMessage(eventDetails);
				}
			}
			else if (blobEventInfo.secondLevel === 5) {
				blob = new Burger.Gpb.Blob.UserSettingsChanged();
				blob.new_settings = this.userSettings(eventDetails.newSettings);
			}
			else if (blobEventInfo.secondLevel === 9 && offer !== null && offerCategory !== "") {
				blob = new Burger.Gpb.Blob.OfferRating();
				blob.url = eventDetails.url ? eventDetails.url : "";
				blob.rating = eventDetails.ratedPositive;
				blob.voucher = this.buildCouponMessage();
				blob.context_voucher = this.buildCouponMessage();
				if (!offer.isContextCoupon) {
					this.addCouponInfoToMessage(blob.voucher, offer);
				} else {
					this.addCouponInfoToMessage(blob.context_voucher, offer);
				}
			}
			else if (blobEventInfo.secondLevel === 10) {
				blob = this.userReportsMessage(eventDetails);
			}
			else {
				//console.log("error on blobMessage type not recognized-- eventDetails: " + JSON.stringify(eventDetails) + " eventTypeSecondLevel: " + blobEventInfo.secondLevel);
				return null;
			}

			var clientInfo = eventDetails.clientInfo ? JSON.parse(JSON.stringify(eventDetails.clientInfo)) : null;
			if (clientInfo !== null) {
				if (blobEventInfo.secondLevel === 1 && clientInfo.user_settings) {
					clientInfo.user_settings = null;
				}
				blob.client = this.clientInfoMessage(clientInfo);
			}

			console.log("BURGER-> transactionID: ", eventDetails.clientInfo ? eventDetails.clientInfo.transaction_id : null, " event: ", eventDetails.eventType, " event Type: ", eventDetails.type, " event category: ", eventDetails.category, " blobMessage: ", blob);

			blob = Burger.Query.__MASTER__.abToba(AvastWRC.Query.__MASTER__.getBuffer(blob));
			return blob;
		}

	});
}).call(this, _, AvastWRC);