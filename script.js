const searchKeys = [
    { key: 'site:example -www -shop -share -ir -mfa', description: 'Belirtilen siteyi arar, belirli alt alan adlarını hariç tutar.' },
    { key: 'site:example intitle:"index of" "parent directory" inurl:admin', description: 'Belirtilen sitede yönetici dizinlerini arar.' },
    { key: 'site:example intext:"password" filetype:log', description: 'Belirtilen sitede şifre içeren log dosyalarını arar.' },
    { key: 'site:example inurl:config filetype:xml', description: 'Belirtilen sitede XML yapılandırma dosyalarını arar.' },
    { key: 'site:example filetype:cfg', description: 'Belirtilen sitede CFG dosyalarını arar.' },
    { key: 'site:example intext:"database error"', description: 'Belirtilen sitede veritabanı hatalarını arar.' },
    { key: 'site:example intext: "index of / git" "parent directory"', description: 'Belirtilen sitede git dizinlerini arar.' },
    { key: 'site:example intext: "index of / backup" "parent directory"', description: 'Belirtilen sitede yedekleme dizinlerini arar.' },
    { key: 'site:.s3.amazonaws "Company"', description: 'Amazon S3 üzerinde belirtilen şirketi arar.' },
    { key: 'site:pastebin OR site:jsfiddle.net OR site:codebeautify.org OR site:codepen.io "example"', description: 'Belirtilen sitede kod paylaşım platformlarında arama yapar.' },
    { key: 'site:example ext:php inurl:?', description: 'Belirtilen sitede PHP dosyalarını arar.' },
    { key: 'site:openbugbounty.org inurl:reports intext:"example"', description: 'Open Bug Bounty üzerinde belirtilen siteyi arar.' },
    { key: '(site:example | site:example) & "choose file"', description: 'Belirtilen sitede dosya yükleme formlarını arar.' },
    { key: 'site:s3.amazonaws "example" OR site:blob.core.windows.net "example" OR site:googleapis "example" OR site:drive.google "example"', description: 'Belirtilen sitede çeşitli bulut depolama hizmetlerinde arama yapar.' },
    { key: '"submit vulnerability report" OR "powered by bugcrowd" OR "powered by hackerone"', description: 'Güvenlik açığı raporlama sayfalarını arar.' },
    { key: 'site:example inurl:/wp-admin/admin-ajax.php', description: 'Belirtilen sitede WordPress admin-ajax.php dosyasını arar.' },
    { key: 'site:example intext:"Powered by" & intext:Drupal & inurl:user', description: 'Belirtilen sitede Drupal kullanıcı sayfalarını arar.' },
    { key: 'site:*/joomla/login', description: 'Belirtilen sitede Joomla giriş sayfalarını arar.' },
    { key: 'site:docs.google inurl:"/d/" "example"', description: 'Google Docs üzerinde belirtilen siteyi arar.' },
    { key: 'site:onedrive.live "example"', description: 'OneDrive üzerinde belirtilen siteyi arar.' },
    { key: 'site:box/s "example"', description: 'Box üzerinde belirtilen siteyi arar.' },
    { key: 'site:dev.azure "example"', description: 'Azure DevOps üzerinde belirtilen siteyi arar.' },
    { key: 'site:sharepoint "example"', description: 'SharePoint üzerinde belirtilen siteyi arar.' },
    { key: 'site:digitaloceanspaces "example"', description: 'DigitalOcean Spaces üzerinde belirtilen siteyi arar.' },
    { key: 'site:firebaseio "example"', description: 'Firebase üzerinde belirtilen siteyi arar.' },
    { key: 'site:jfrog.io "example"', description: 'JFrog üzerinde belirtilen siteyi arar.' },
    { key: 'site:s3-external-1.amazonaws "example"', description: 'Amazon S3 üzerinde belirtilen siteyi arar.' },
    { key: 'site:s3.dualstack.us-east-1.amazonaws "example"', description: 'Amazon S3 üzerinde belirtilen siteyi arar.' },
    { key: 'site:example.* ext:pdf confidential', description: 'Belirtilen sitede gizli PDF dosyalarını arar.' },
    { key: 'site:example.* ext:pdf classified', description: 'Belirtilen sitede sınıflandırılmış PDF dosyalarını arar.' },
    { key: 'site:example.* ext:php', description: 'Belirtilen sitede PHP dosyalarını arar.' },
    { key: 'site:example.* intitle:"index of"', description: 'Belirtilen sitede dizin indekslerini arar.' },
    { key: 'site:example.* ext:php inurl:id', description: 'Belirtilen sitede PHP dosyalarını ve ID parametresini arar.' },
    { key: 'site:example.* ext:php inurl:cat', description: 'Belirtilen sitede PHP dosyalarını ve kategori parametresini arar.' },
    { key: '"The example Company. All rights reserved."', description: 'Sitenin imzasına veya haklarına göre arar.' }
];

let domainList = [];

function performSearch() {
    const query = document.getElementById('search-input').value; // Arama metnini almak için input alanının value özelliğini kullanın
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    searchKeys.forEach((keyObj) => {
        const panel = document.createElement('div');
        panel.className = 'result-panel';

        const searchKeyElement = document.createElement('div');
        searchKeyElement.className = 'search-key';
        searchKeyElement.textContent = `Arama Anahtarı: ${keyObj.key}`;

        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'description';
        descriptionElement.textContent = keyObj.description;

        const sitesListElement = document.createElement('div');
        sitesListElement.className = 'sites-list';

        domainList.forEach(domain => {
            const linkElement = document.createElement('a');
            linkElement.className = 'site';
            const fullQuery = keyObj.key.includes('example') ? keyObj.key.replace(/example/g, domain) : `site:${domain} ${keyObj.key}`;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`;
            linkElement.href = searchUrl;
            linkElement.target = '_blank';
            linkElement.textContent = domain;
            sitesListElement.appendChild(linkElement);
            sitesListElement.appendChild(document.createElement('br'));
        });

        panel.appendChild(searchKeyElement);
        panel.appendChild(descriptionElement);
        panel.appendChild(sitesListElement);
        resultsContainer.appendChild(panel);
    });
}

function displayResults() {
    const query = document.getElementById('search-input').value;
    domainList = query.split('\n').map(domain => domain.trim()).filter(domain => domain);
    performSearch(); // Arama işlemini başlat
}
function loadDomains() {
    fetch('domains.txt')
        .then(response => response.text())
        .then(data => {
            domainList = data.split('\n').map(domain => domain.trim()).filter(domain => domain);
            console.log('Domain listesi yüklendi!');
            performSearch(); // Arama işlemini başlat
        })
        .catch(error => {
            console.error('Error loading domain list:', error);
        });
}
function loadDomainsArea() {
    const domainInput = document.getElementById('domain-list').value;
    domainList = domainInput.split('\n').map(domain => domain.trim()).filter(domain => domain);
    console.log('Domain listesi yüklendi!');
    performSearch(); // Arama işlemini başlat
}