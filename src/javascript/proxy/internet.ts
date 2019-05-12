/* 
 * Subject:
 *  An `interface` which expose the functionality available to be used 
 *  by the clients
 */
interface Internet {
  connectTo(serverHost: string): void;
}

/*
 * Real Subject: 
 *  A `class` implementing Subject and it is concrete implementation 
 *  which needs to be hidden behind a proxy
 */
class RealInternet implements Internet {
  connectTo(serverHost: string) {
    console.log(`Connecting to ${serverHost}`);
  }
}

/*
 * Proxy: 
 *  Hides the real object by extending it and clients communicate to 
 *  real object via this proxy object. Usually frameworks create this
 *  proxy object when client request for real object
 */ 
class ProxyInternet implements Internet {
  private internet: Internet = new RealInternet();
  private static bannedSites: Array<string>;

  static initialize() {
    ProxyInternet.bannedSites = new Array<string>();
    ProxyInternet.bannedSites.push("abc.com");
    ProxyInternet.bannedSites.push("def.com");
    ProxyInternet.bannedSites.push("ijk.com");
    ProxyInternet.bannedSites.push("lmn.com");
  }

  connectTo(serverHost: string) {
    if (ProxyInternet.bannedSites.includes(serverHost.toLowerCase())) {
      throw new Error("Access Denied");
    }
    this.internet.connectTo(serverHost);
  }
}

///////////////////////////////////////////////////////////////////////////////

ProxyInternet.initialize();
let internet = new ProxyInternet();

try {
  internet.connectTo("github.com");
  internet.connectTo("abc.com");
} catch (e) {
  console.log(e.message);
}

// tsc internet.ts --target ES2016
// Connecting to github.com
// Access Denied
