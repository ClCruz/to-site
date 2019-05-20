// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
    if (!e.data) {
      return;
    }
  
    switch (e.data) {
      case 'skipWaiting':
        self.skipWaiting();
        break;
      default:
        // NOOP
        break;
    }
  });
  
  workbox.clientsClaim();
  
  // The precaching code provided by Workbox.
  // self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.suppressWarnings();
  workbox.precaching.precacheAndRoute([
    '/styles/example.ac29.css',
    ,
  {
    "revision": "0059650856756cd772649076ea3792e5",
    "url": "/assets/images/badge_ci.png"
  },
  {
    "revision": "e5e699094d37cca3b40a0d89edc2c72a",
    "url": "/assets/images/logo-amex.png"
  },
  {
    "revision": "5938f3e48edf9f2f376903a052f210c9",
    "url": "/assets/images/logo-aura.png"
  },
  {
    "revision": "0f629bcd1b73561062ff7d0cdb8574da",
    "url": "/assets/images/logo-boleto.png"
  },
  {
    "revision": "8e3c38c8357245fdba0bcfc5345ee5b8",
    "url": "/assets/images/logo-diners.png"
  },
  {
    "revision": "74d36ddafb3838344fdcb03db8477440",
    "url": "/assets/images/logo-discover.png"
  },
  {
    "revision": "cf9b9ab999aa333f66a455cbb1d2e171",
    "url": "/assets/images/logo-hipercard.png"
  },
  {
    "revision": "dc750125a2ee1e1f26e988e0a9cd784a",
    "url": "/assets/images/logo-jcb.png"
  },
  {
    "revision": "fe1cdf60ea5d3c82fb0a83a799c820d0",
    "url": "/assets/images/logo-mastercard.png"
  },
  {
    "revision": "edd1d246e6d2fe0b9511b38dbba5573e",
    "url": "/assets/images/logo-visa.png"
  },
  {
    "revision": "82b9c7a5a3f405032b1db71a25f67021",
    "url": "/assets/images/logo.png"
  },
  {
    "revision": "c6629bfc82fcd37d66f4a5c69cfbdce2",
    "url": "/assets/logo-arenaclub.jpeg"
  },
  {
    "revision": "4229586cd360553c07a090dc5056b34c",
    "url": "/assets/logo-b2.png"
  },
  {
    "revision": "06203b27757d57575f6a129af83dfde2",
    "url": "/assets/logo-espacokalah.jpeg"
  },
  {
    "revision": "c245c11afb97fe9069f14028b6bf1049",
    "url": "/assets/logo-alphaville.png"
  },
  {
    "revision": "28674a3b60ad7d6d64f93e208d1601af",
    "url": "/assets/images/badge_ic.jpg"
  },
  {
    "revision": "19ff319665814a462904635bdb619bf1",
    "url": "/assets/logo-bringressos.svg"
  },
  {
    "revision": "6f39a5a3df6f9a80875f4225fb5630c0",
    "url": "/assets/logo-ingressoparatodos-2.png"
  },
  {
    "revision": "4ddc215a23f5361acd2c8328c7268e23",
    "url": "/assets/logo-ingressoparatodos.png"
  },
  {
    "revision": "acd938589f0d8ffe6e6693c34ce8cf89",
    "url": "/assets/logo-coastfight.jpeg"
  },
  {
    "revision": "05d82298decf9eb57ab1668d4dbebb68",
    "url": "/assets/logo-cultingressos.png"
  },
  {
    "revision": "8678bd9929f6b765e0c46c27171ecb52",
    "url": "/assets/logo-dz9eventos.png"
  },
  {
    "revision": "0e20836249ea891c950f91b9731b8dc3",
    "url": "/assets/logo-famillyproducoes-footer.png"
  },
  {
    "revision": "cb807731f512d3f885fe3dccad135a5a",
    "url": "/assets/logo-hipocritas.png"
  },
  {
    "revision": "c00acedbe05b976294f69ae30f695820",
    "url": "/assets/logo-marketplayclub_bug.svg"
  },
  {
    "revision": "0e9bd6bbdabf61d486e181d7cdc753c4",
    "url": "/assets/logo-ingressaria.1.png"
  },
  {
    "revision": "33be836b22799da397c4701c58c2fe7d",
    "url": "/assets/logo-ingressaria.png"
  },
  {
    "revision": "12f0fd39ed9f1b8853e042b96647e04d",
    "url": "/assets/images/logo-elo.png"
  },
  {
    "revision": "aee80cb6cd698cb28c8fe3e378d4e745",
    "url": "/assets/logo-nestle.png"
  },
  {
    "revision": "9d6406a54277035077466806599abbd8",
    "url": "/assets/logo-famillyproducoes.jpg"
  },
  {
    "revision": "e9cde8869935c3bfb5f19ab366e747cd",
    "url": "/assets/logo-sazarte.jpeg"
  },
  {
    "revision": "52492cb304fdb85d196c1778843a9b82",
    "url": "/assets/logo-marketplayclub_old.svg"
  },
  {
    "revision": "ef275ccae30f3f2bc0f564343f7ef523",
    "url": "/assets/logo-marketplayclub_oldd.svg"
  },
  {
    "revision": "f085f388913217cb9e2f4ee5bb851059",
    "url": "/assets/logo-marketplayclub-footer.svg"
  },
  {
    "revision": "98fcd05ecfb3a2e527f502b1911370f2",
    "url": "/assets/logo-marketplayclub-footer2.svg"
  },
  {
    "revision": "965e606a091c2e592234188ace94f1ef",
    "url": "/assets/logo-teatroparatodos.png"
  },
  {
    "revision": "c5fa7b28dea137c3ad9af838c64df2f7",
    "url": "/assets/logo-marketplayclub.svg"
  },
  {
    "revision": "5fd55b5054bd3d4a1a699784c2170504",
    "url": "/assets/logo-teatrorenaissance.jpeg"
  },
  {
    "revision": "844989a6cc1a536a90b47cc1bff1375d",
    "url": "/assets/logo-teatrorenaissance.jpg"
  },
  {
    "revision": "fef6b9abc8a976e9565f5742ed80bda5",
    "url": "/assets/logo-coastfight.png"
  },
  {
    "revision": "bf23c9e1b13499db44d6ab0c4708cad4",
    "url": "/assets/logo-tixsme.png"
  },
  {
    "revision": "1611a209e8f8b93193f4fbcb60e9777e",
    "url": "/assets/logo-ingressopromo.png"
  },
  {
    "revision": "dca1be5cc14aba9641989283de89b0e7",
    "url": "/assets/loading.gif"
  },
  {
    "revision": "5380bbc6f54149fbeff8594bff9cd895",
    "url": "/assets/logo-famillyproducoes.png"
  },
  {
    "revision": "591345f128883ad3ab338bfcd58c46e9",
    "url": "/assets/logo-hiperionartes.png"
  },
  {
    "revision": "1bb5dfa64297f75f07ffadc47ec9fa7f",
    "url": "/assets/logo-itaucard.png"
  },
  {
    "revision": "29d3a7125e390e6ef7e156284abdecac",
    "url": "/assets/logo-jjrproducoes.png"
  },
  {
    "revision": "15dc34f82a682cf51d085163c088c3f4",
    "url": "/assets/logo-skauscombat.png"
  },
  {
    "revision": "b2364ce1a1a14312c16bb6f7628f8ca0",
    "url": "/assets/logo-spacemooneduca.jpeg"
  },
  {
    "revision": "d187b90ca634a244f4ee5e42ba17455e",
    "url": "/assets/logo-bilhetepromo.png"
  },
  {
    "revision": "d3314facf209d24090605b28b81ed99d",
    "url": "/assets/logo-tixsme-vertical.png"
  },
  {
    "revision": "db2603f84dd04d44aa0018cdc4240829",
    "url": "/assets/logo-topticket.jpeg"
  },
  {
    "revision": "9ea5d8b8d788b963688f351182e45667",
    "url": "/assets/logo-ingressostore.png"
  },
  {
    "revision": "b8388ad85483c63d74793563c86f8b85",
    "url": "/assets/logo-topticket.png"
  },
  {
    "revision": "d994f97495733974600f5dcd1d495784",
    "url": "/assets/logo-showsemsantos.jpeg"
  },
  {
    "revision": "b7434c18b67b7a60944c71677db18028",
    "url": "/assets/logo-tremendao.png"
  },
  {
    "revision": "80e09fd78c50cc8f4a83bffd7639dbf9",
    "url": "/assets/logo-teatromodulo.png"
  },
  {
    "revision": "1bded76790a265186b8ec34ebf93dcbc",
    "url": "/assets/logo-marketplayclub-footer.png"
  },
  {
    "revision": "aad79eaeec37e2553a0935a168b2ecee",
    "url": "/assets/logo-marketplayclub.png"
  },
  {
    "revision": "15c4741bbb9b944bdae35e463f8d8841",
    "url": "/assets/logo-meuingressopromo.png"
  },
  {
    "revision": "c446719f6b269301483a17c6aa76ac62",
    "url": "/assets/logo-cafeteatrorubi.png"
  },
  {
    "revision": "48644b8adf316303e26547e407185648",
    "url": "/assets/logo-ciadeingressos.jpeg"
  },
  {
    "revision": "f8f4cc6569d64c13943da8f9b35fcccd",
    "url": "/assets/logo-construcaoteatral.jpg"
  },
  {
    "revision": "15a4506c93edb0ce1dd477b1b03aa18b",
    "url": "/assets/pixote.png"
  },
  {
    "revision": "8bb9f8682b6547411582c70ec15a9b88",
    "url": "/assets/logo-topticket.jpg"
  },
  {
    "revision": "3e7292151b2f29d17aacb1d9ffddef7f",
    "url": "/assets/logo-viveremsantos.jpeg"
  },
  {
    "revision": "f6d14ed1917b45a977d0d8a8d3600f24",
    "url": "/assets/logo-aecloja.1.png"
  },
  {
    "revision": "eb6e4dd954c97644c6f29c59d72a9181",
    "url": "/assets/search-icon.png"
  },
  {
    "revision": "26ea8e275a02ee977a8d1b106567fca8",
    "url": "/assets/logo-megac.jpeg"
  },
  {
    "revision": "d8ff3ae90097c969e781d0fd9e9f46ad",
    "url": "/assets/images/banner_apresentacao.jpg"
  },
  {
    "revision": "2b535913882e69b3cd6a2a3926ca65b8",
    "url": "/assets/texture/logo-preto.png"
  },
  {
    "revision": "db2bc1eb6cbd639bf917653557615149",
    "url": "/assets/texture/logo-vertical-preto.png"
  },
  {
    "revision": "53e80cdda33cb387f52f50884a1a8928",
    "url": "/assets/logo-ciadeingressos.jpg"
  },
    {
      "revision": "c540d82594f76bcfe8831f7ea7521a76",
      "url": "/img/bg.svg"
    },
    {
      "revision": "4191243be0126950ca6c0a6ddecb15ab",
      "url": "/assets/texture/texture-bg.png"
    },
    {
      "revision": "1d54c1911843483a283a8746f583bab0",
      "url": "/assets/bg-tremendao.jpg"
    },
    {
      "revision": "e4dcbd1e8bea190a2b1f2be3fa11940c",
      "url": "/assets/bg-bailedopresidente.jpg"
    },
    {
      "revision": "8992249e8ef679420f3901256a1b9a33",
      "url": "/assets/bg-space.JPG"
    },
    {
      "revision": "0be9cb1c70f758e7b2f20feeaaed99d4",
      "url": "/assets/bg_eventoslitoral2.png"
    },
    {
      "revision": "3d051503576193168511f500ad423d05",
      "url": "/assets/bg-dz9.jpg"
    },
    {
      "revision": "6b51b3b928bf2ecd43e698eb4f6e1b53",
      "url": "/assets/bg-ingressoparatodos.jpg"
    },
    {
      "revision": "4dc7cbaed337c312c05e15357d1a6ead",
      "url": "/assets/bg_eventoslitoral.jpg"
    },
    {
      "revision": "0cfdb38af0e18ec6b1d835cf387bbfe2",
      "url": "/assets/bgeventoslitoral2.png"
    },
    {
      "revision": "8fa66daf020aeb5aab87932047bd2706",
      "url": "/assets/bg-hipocritas.jpg"
    },
    {
      "revision": "8fe071c5ffcfb9b7db21229e6ad80ed5",
      "url": "/assets/bg-space.png"
    },
    {
      "revision": "622a1be0687c8d47a7c798d58ef87404",
      "url": "/assets/bg-topticket.png"
    },
    {
      "revision": "0dfe9f923a2c18a400ff4fc7a0739a81",
      "url": "/assets/bgeventoslitoral.png"
    },
    {
      "revision": "928bd83c8eb932d8d44bbd8acae0b6d7",
      "url": "/assets/bg-arenaclub.jpg"
    },
    {
      "revision": "9be7046ccf6fe3a336a8a309070ab5d1",
      "url": "/assets/bg-azusa.jpg"
    },
    {
      "revision": "e564d36c854ccfb25718e36687e297d9",
      "url": "/assets/bg-arenaclub.jpeg"
    },
    {
      "revision": "1d03ec23e48e58982654ccc08acb4544",
      "url": "/assets/bg-alphaville.jpg"
    }

    // ... other entries ...
  ]);