/* eslint-disable no-console */

//import { register } from 'register-service-worker';

navigator.serviceWorker.register(`${process.env.BASE_URL}service-worker.js`)
					.then(reg => {
						reg.onupdatefound = () => {
							const installingWorker = reg.installing;
							installingWorker.onstatechange = () => {
								switch (installingWorker.state) {
									case 'installed':
										if (navigator.serviceWorker.controller) {
											// new update available
                      //alert("new");
                      reg.update();
                      location.reload(true);
										} else {
											// no update available
											//alert("notnew");
										}
										break;
								}
							};
						};
					})
					.catch(err => console.error('[SW ERROR]', err));

