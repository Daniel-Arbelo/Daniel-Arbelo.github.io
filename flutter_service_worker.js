'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "0a8e127060b48716ffb21d7a39f607a5",
".git/config": "36ac5ba948de7fc23fd454334e0fc436",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "0ae7b82575d49623df248514a22ae9ac",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "771b2012b30faba349d70fa53b33ee93",
".git/logs/refs/heads/main": "b6f89912fb0fe3e6d8b0fed0add12ddb",
".git/logs/refs/remotes/origin/main": "734d5339c3ff9844639d1dded6a28011",
".git/objects/03/e7470c60fd50763013f57cc10d5245c9477ab0": "b162fefd61e8791f3d75cd13b5df0367",
".git/objects/06/548989ff0b554229fb13af8d89184ac192248e": "0e523025b485f4fb486c8d7784aa17bc",
".git/objects/08/390bffe154377f2f8691c2156c3184d30a971b": "4b0843fe0a311709880c36d4fcf5f947",
".git/objects/0f/c344c7e8b9e32ea1ad91f30ded22556352d7bf": "a8a30f28869f7378465338066f34d80d",
".git/objects/10/29b35d3a73aa72e79782d3066fd2be4e308b86": "f67e0202119ce4fa5aef9919ee636df3",
".git/objects/14/5f0a5d00bc8c31a9389311c8ebc8045f2e1b6b": "85a1fd0a768a6db8a6368144cc9d79a5",
".git/objects/17/ddd14142e2906bae92287c7cf1c69e0ece10e1": "ea3bc4d621413a43f608c3d34615d3bd",
".git/objects/18/eb401097242a0ec205d5f8abd29a4c5e09c5a3": "4e08af90d04a082aab5eee741258a1dc",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/1f/67c0a1861faa983bc9b48a5edc63a161180980": "5880547dad42bf76b7321cd1f876bf8b",
".git/objects/20/1afe538261bd7f9a38bed0524669398070d046": "82a4d6c731c1d8cdc48bce3ab3c11172",
".git/objects/20/63d740c78213d1db0e302f0d2a53bf3c7e36e3": "c830c4a0b8ee44c0e96f4a5a50fa6948",
".git/objects/20/cb2f80169bf29d673844d2bb6a73bc04f3bfb8": "b807949265987310dc442dc3f9f492a2",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/objects/2a/0dc6d0568b6daa9414bafeb3017869a2163281": "e32e7d2bcad4dd7d676f0ba210477037",
".git/objects/30/63d2128c9db47a24b8d621c58706bceae3d4f2": "d1afc4f84de5a08d47047a906129a294",
".git/objects/38/1e3d59f0e11f38899438542fcaf8dafd259e52": "c7a81fa8381cff5020caa24d408a17e2",
".git/objects/3a/b823e2f192b7ddb6f2b798fcee3729afe24aa9": "14424e6197df57a79a48ed1b624c29a2",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/49/29c094ae5c6702d981b8ce9d2606b47b23500a": "8f17c259ce84a644fa752f2b89e4c8bc",
".git/objects/49/adebdb511c8c293b28db3f6792e5bac28cdc32": "ba6a3971e7f06834fd6ec3844372ce17",
".git/objects/4b/825dc642cb6eb9a060e54bf8d69288fbee4904": "75589287973d2772c2fc69d664e10822",
".git/objects/4e/e6a8da8a1adad054e8fe57d25251c932a8a5e6": "5002b65b1a6e56b55b2770f1b098eb20",
".git/objects/50/dc0c19bff49009c38eb4fbe80fe41e45bf9da6": "319c5859416e131495df79b7185f368d",
".git/objects/52/a1bc6e3fb3f6f3481a4adc8d1f7c0dd88c7273": "dbe66772ffe9b7abc64a5dba831070c2",
".git/objects/54/02094d42f548385f0931ce4ce741dab5682296": "4458e8835c0416dbfd194e7604e8afe2",
".git/objects/54/c4272e25416dd981cf16897122ed782acaeaf9": "04155d0023ebaddf17d6205107a8c074",
".git/objects/58/356635d1dc89f2ed71c73cf27d5eaf97d956cd": "f61f92e39b9805320d2895056208c1b7",
".git/objects/58/b007afeab6938f7283db26299ce2de9475d842": "6c6cbea527763bb3cdff2cecfee91721",
".git/objects/5a/82b7b1aa57eccc6477de56a0c10e4db265539f": "601fe41dc89cff9386f34e93d54c0fdd",
".git/objects/62/c89ee094658c7a9465824fdb42793a64ea557b": "133cd5da638f245b079d9e9cdc29ae38",
".git/objects/6e/0456affabb8d54c920f54712089b5810e6f44e": "7391e5a5e125964351f843c439a5575c",
".git/objects/71/3f932c591e8f661aa4a8e54c32c196262fd574": "66c6c54fbdf71902cb7321617d5fa33c",
".git/objects/82/29740b027d304d5940f719b48971396b5948ce": "383d3184a4bf4616602342bd9207725b",
".git/objects/84/d478fa013f5022372c1f19f92b443bec357556": "f467456358ea55fc9e046d7ba88977b5",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8d/b6114a11b0d023fd9a99e90d5153d4af900211": "d1fd8d428e8d89858c4289e705403b89",
".git/objects/92/419f68d6139bbd0027344e573d34caa78d1627": "8e315a1e26a6c8d35f74c09118efcc41",
".git/objects/93/d6eaaff43211eacb03d62985a6df2e0bc3f2c9": "3211edb4b25b395769e0e146f9751a04",
".git/objects/94/f7d06e926d627b554eb130e3c3522a941d670a": "77a772baf4c39f0a3a9e45f3e4b285bb",
".git/objects/97/a04578ab567dc67093e626adaca68044aa2cf5": "f5281c0e954a09fe7db763a8ca7d690c",
".git/objects/9a/1928bf0cf19171897a31a7504df7a88bd64c26": "39ce93b49e904ea43b39baa501afac7c",
".git/objects/a6/ece12ff67581f1bd544b2443718278466f21b6": "9a433648dbedf0792bbb00b9640521c9",
".git/objects/ae/9f8368c7cde0b1d7919c4f73b991636634b319": "854134a8346aa72101257c88fa38a2d6",
".git/objects/b3/ebbd38f666d4ffa1a394c5de15582f9d7ca6c0": "23010709b2d5951ca2b3be3dd49f09df",
".git/objects/b5/d1b764f8528219e4139d229587e9bdd0095259": "03b6c179bba96c7e7f4fcdc5c2bb3a64",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b7/ace50a0141c6ae11bd879da6bb81e2286b6ed4": "9eaa6a8b6269ad7bec3bcc3bb3de4c64",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/bc/468b72cf0f79d69384c84a0659a708740e905e": "fed9355319dc4330d07cae9c868eeb9d",
".git/objects/c1/008009725b0c04cf9aa8ceb1a292f89e625129": "67bef29b82cee39c4fc339d558b96c08",
".git/objects/c9/bf8af1b92c723b589cc9afadff1013fa0a0213": "632f11e7fee6909d99ecfd9eeab30973",
".git/objects/cb/e584d27c4756cb2030096327c5a5e8bdfe8e12": "4660f71ff07b0e79e383fe337500abda",
".git/objects/d1/098e7588881061719e47766c43f49be0c3e38e": "f17e6af17b09b0874aa518914cfe9d8c",
".git/objects/d3/62f9ed797758dcb10efd6f1bb94eeb67d8ed6f": "9efddc6b160389ba440caee4bb29e6c5",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/e3/4651320010639ff6bb8e1677578000fd708c83": "36803abdc18c162f3facc625e18b811c",
".git/objects/e6/f9de05bfa46d3f4e85c967df888d2d383c0436": "e33e11917cc2395dd57d56a1b19dfab0",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f8/0978da17d877b29590621d883463034c4e4edc": "c4a37617c6157ab28ab55665eafc861b",
".git/objects/fa/155d43d2cae18d7c97df212ebe1491134625bd": "5f3685cf06880cd3fda053345174b0c4",
".git/objects/fa/656a066649fd119ef3ca9db505a8bea672ce14": "c293fdcb54814edbeb0ac0ca69f4bcab",
".git/objects/fd/e2307f36eb6d5f0a1c5b86dab911bfafdade5a": "363a370a7de62889624084451f6b4473",
".git/refs/heads/main": "2ec321640e93aef42df1b237d8671de0",
".git/refs/remotes/origin/main": "2ec321640e93aef42df1b237d8671de0",
"assets/AssetManifest.bin": "4e0a5e293d23a0e428d26f76840a8985",
"assets/AssetManifest.bin.json": "66320d0e0b4545c96be934b7735f81c9",
"assets/AssetManifest.json": "bfff5477747d554969d33a75289b399d",
"assets/assets/images/check.svg": "4ddb80428828fac29119c3b67999401f",
"assets/assets/logos/AppLogo.png": "4e178f5f450e77cbe5525a27d80e96dd",
"assets/assets/logos/AppLogoFondo.png": "9cf00f64e91d6159bdac4420698cd7b1",
"assets/assets/logos/cabildo.png": "7792bf2c6ee573377e4a50c7735859c7",
"assets/assets/logos/cabildo_negro.png": "3f18d96ac76768b92d8dca0d25715f81",
"assets/assets/logos/escudo_cabildo.png": "4f1e112cff57907ecf922b36b65a413c",
"assets/assets/logos/taonilla.png": "e4d4883463c65b9af1ce5dd5291bb852",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "5da1b547fc1a673809335df626de362b",
"assets/NOTICES": "9775b230aa82b0ad86b6f281c00b09d2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "82d08daf8dfc8bae5982aeb102ad302b",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "b380745cb7abb28b878c6aa1d6f2e4c3",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/play_store_512.png": "6315c2e48c81c4b04edc2210938269fc",
"index.html": "2c4d73a98a5bc67218cd5310e35cf28c",
"/": "2c4d73a98a5bc67218cd5310e35cf28c",
"main.dart.js": "1ea004e88155d248926cbb7c799fc732",
"manifest.json": "4f832deb5c4398eeb7cc61b11c63d22a",
"splash/img/dark-1x.png": "967891d29b635a1757e2e10e7579a349",
"splash/img/dark-2x.png": "5caa2f95d016e8bfbad1d514502543a8",
"splash/img/dark-3x.png": "4f7760b5f1e11fa7b992b69227b63b49",
"splash/img/dark-4x.png": "823a8c6b91f296812e08df416495fe6f",
"splash/img/light-1x.png": "967891d29b635a1757e2e10e7579a349",
"splash/img/light-2x.png": "5caa2f95d016e8bfbad1d514502543a8",
"splash/img/light-3x.png": "4f7760b5f1e11fa7b992b69227b63b49",
"splash/img/light-4x.png": "823a8c6b91f296812e08df416495fe6f",
"version.json": "148811931d4f6ee719e14a14afced8b4"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
